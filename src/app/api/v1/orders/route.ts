import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeOrder } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { placeOrderSchema } from "@/lib/validators";
import { createRazorpayOrder } from "@/server/razorpay";
import type { OrderItem, Product, ProductVariant, SiteSettings } from "@/types";
import { serializeProduct, serializeSettings } from "@/server/serialize";

export const runtime = "nodejs";

const ORDER_NUMBER_RE = /^LD-\d{4}-(\d+)$/;

async function nextOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `LD-${year}-`;
  const last = await prisma.order.findFirst({
    where: { orderNumber: { startsWith: prefix } },
    orderBy: { orderNumber: "desc" },
    select: { orderNumber: true },
  });
  const lastN = last ? Number.parseInt(ORDER_NUMBER_RE.exec(last.orderNumber)?.[1] ?? "0", 10) : 0;
  const next = (Number.isFinite(lastN) ? lastN : 0) + 1;
  return `${prefix}${next.toString().padStart(4, "0")}`;
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  try {
    const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    return apiOk(rows.map(serializeOrder));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const body = await parseJsonBody(req, placeOrderSchema);
  if (body instanceof NextResponse) return body;

  try {
    const settingsRow = await prisma.settings.findUnique({ where: { id: "default" } });
    if (!settingsRow) {
      return apiError("SERVER_ERROR", "Settings not initialised.", 500);
    }
    const settings: SiteSettings = serializeSettings(settingsRow);

    if (
      settings.delivery.serviceablePincodes.length > 0 &&
      !settings.delivery.serviceablePincodes.includes(body.pincode)
    ) {
      return apiError(
        "PINCODE_NOT_SERVICEABLE",
        "We do not deliver to this pincode yet.",
        422,
      );
    }

    const slugs = Array.from(new Set(body.lines.map((l) => l.productSlug)));
    const products = await prisma.product.findMany({ where: { slug: { in: slugs } } });
    if (products.length !== slugs.length) {
      return apiError("PRODUCT_UNAVAILABLE", "One or more products were removed.", 422);
    }
    const productBySlug = new Map<string, Product>(
      products.map((p) => [p.slug, serializeProduct(p)]),
    );

    let subtotalInr = 0;
    const items: OrderItem[] = [];
    for (const line of body.lines) {
      const product = productBySlug.get(line.productSlug);
      if (!product || !product.isAvailable) {
        return apiError(
          "PRODUCT_UNAVAILABLE",
          `Product ${line.productSlug} is not available.`,
          422,
        );
      }
      const variant = product.variants.find((v: ProductVariant) => v.id === line.variantId);
      if (!variant) {
        return apiError(
          "PRODUCT_UNAVAILABLE",
          `Variant ${line.variantId} not found.`,
          422,
        );
      }
      if (variant.stockQty < line.qty) {
        return apiError(
          "STOCK_EXCEEDED",
          `Only ${variant.stockQty} units left for ${product.name.en} (${variant.label.en}).`,
          422,
        );
      }
      const lineTotal = variant.priceInr * line.qty;
      subtotalInr += lineTotal;
      items.push({
        productId: product.slug,
        productNameEn: product.name.en,
        variantId: variant.id,
        variantLabelEn: variant.label.en,
        qty: line.qty,
        unitPriceInr: variant.priceInr,
        lineTotalInr: lineTotal,
      });
    }

    if (subtotalInr < settings.delivery.minOrderInr) {
      return apiError(
        "MIN_ORDER",
        `Minimum order is ₹${settings.delivery.minOrderInr}.`,
        422,
      );
    }

    const deliveryFeeInr =
      subtotalInr >= settings.delivery.freeAboveInr ? 0 : settings.delivery.flatFeeInr;
    const totalInr = subtotalInr + deliveryFeeInr;

    const orderNumber = await nextOrderNumber();

    const order = await prisma.$transaction(async (tx) => {
      const productList = await tx.product.findMany({ where: { slug: { in: slugs } } });
      const updatedProducts = new Map<string, Product>();
      for (const p of productList) {
        const next = serializeProduct(p);
        for (const line of body.lines.filter((l) => l.productSlug === p.slug)) {
          const variantIdx = next.variants.findIndex((v) => v.id === line.variantId);
          if (variantIdx === -1 || next.variants[variantIdx].stockQty < line.qty || !next.isAvailable) {
            throw Object.assign(new Error("STOCK_RACE"), { code: "STOCK_RACE" });
          }
          next.variants = next.variants.map((v, i) =>
            i === variantIdx ? { ...v, stockQty: v.stockQty - line.qty } : v,
          );
        }
        updatedProducts.set(p.slug, next);
      }

      for (const [slug, next] of updatedProducts) {
        await tx.product.update({
          where: { slug },
          data: { variants: next.variants as unknown as object },
        });
      }

      return tx.order.create({
        data: {
          orderNumber,
          customer: {
            name: body.name,
            phone: body.phone,
            email: body.email || undefined,
            addressLine: body.addressLine,
            city: body.city,
            state: body.state,
            pincode: body.pincode,
            notes: body.notes,
          },
          items: items as unknown as object,
          subtotalInr,
          deliveryFeeInr,
          totalInr,
          status: "pending",
          paymentMode: body.paymentMode,
        },
      });
    });

    if (body.paymentMode === "cod") {
      return apiOk({ order: serializeOrder(order), razorpayOrder: null }, 201);
    }

    try {
      const razorpayOrder = await createRazorpayOrder({
        amountInr: totalInr,
        receipt: order.orderNumber,
        notes: { orderId: order.id, customerPhone: body.phone },
      });
      await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
      });
      return apiOk(
        {
          order: serializeOrder({ ...order, razorpayOrderId: razorpayOrder.id }),
          razorpayOrder: {
            id: razorpayOrder.id,
            amount: Number(razorpayOrder.amount),
            currency: razorpayOrder.currency,
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID,
          },
        },
        201,
      );
    } catch (rpErr) {
      console.error("[razorpay] create order failed", rpErr);
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "cancelled" },
      });
      return apiError(
        "PAYMENT_INIT_FAILED",
        "Could not initiate online payment. Please try COD or contact us.",
        502,
      );
    }
  } catch (e) {
    const code = (e as { code?: string }).code;
    if (code === "STOCK_RACE") {
      return apiError(
        "STOCK_EXCEEDED",
        "Inventory changed while placing the order. Please retry.",
        409,
      );
    }
    return apiServerError(e);
  }
}
