import { newId } from "./repository";
import { orderRepo, productRepo } from "./repos";
import { summarise, type ResolvedCartLine } from "./cartService";
import type { Order, OrderCustomer, OrderStatus, PaymentMode } from "@/types";

const formatOrderNumber = (n: number) =>
  `LD-${new Date().getFullYear()}-${n.toString().padStart(4, "0")}`;

const ORDER_NUMBER_RE = /^LD-\d{4}-(\d+)$/;

const nextOrderNumber = (): string => {
  const existing = orderRepo
    .list()
    .map((o) => {
      const match = ORDER_NUMBER_RE.exec(o.orderNumber);
      return match ? Number.parseInt(match[1], 10) : 0;
    })
    .filter((n) => Number.isFinite(n));
  const next = existing.length === 0 ? 1 : Math.max(...existing) + 1;
  return formatOrderNumber(next);
};

export class OrderError extends Error {
  constructor(
    public code:
      | "STOCK_EXCEEDED"
      | "PRODUCT_UNAVAILABLE"
      | "EMPTY_CART"
      | "PAYMENT_NOT_SUPPORTED",
    message: string,
  ) {
    super(message);
    this.name = "OrderError";
  }
}

/**
 * Decrement inventory for every line in a successful order.
 *
 * The Repository is in-memory + localStorage so this is best-effort: if a
 * concurrent tab places another order between read and write, the second tab
 * may oversell. That is acceptable for a Phase-1 demo; a real backend will
 * enforce inventory atomically.
 */
const decrementStock = (resolved: ResolvedCartLine[]): void => {
  for (const line of resolved) {
    const product = productRepo.get(line.productId);
    if (!product) continue;
    const updatedVariants = product.variants.map((v) =>
      v.id === line.variantId
        ? { ...v, stockQty: Math.max(0, v.stockQty - line.qty) }
        : v,
    );
    productRepo.update(product.slug, {
      variants: updatedVariants,
      updatedAt: new Date().toISOString(),
    });
  }
};

export const orderService = {
  /**
   * Phase-1 supports COD only. UPI/card are reserved for Phase 2 once a real
   * gateway is wired — they are surfaced in the UI as "coming soon" but blocked
   * here as a defence-in-depth check.
   */
  isPaymentSupported(mode: PaymentMode): boolean {
    return mode === "cod";
  },

  placeOrder(
    customer: OrderCustomer,
    paymentMode: PaymentMode,
    resolved: ResolvedCartLine[],
  ): Order {
    if (resolved.length === 0) {
      throw new OrderError("EMPTY_CART", "Cart is empty");
    }
    if (resolved.some((l) => l.productUnavailable)) {
      throw new OrderError(
        "PRODUCT_UNAVAILABLE",
        "One or more items are no longer available",
      );
    }
    if (resolved.some((l) => l.exceedsStock)) {
      throw new OrderError(
        "STOCK_EXCEEDED",
        "One or more items exceed available stock",
      );
    }
    if (!orderService.isPaymentSupported(paymentMode)) {
      throw new OrderError(
        "PAYMENT_NOT_SUPPORTED",
        `Payment mode ${paymentMode} is not yet supported`,
      );
    }

    const summary = summarise(resolved);
    const now = new Date().toISOString();
    const order: Order = {
      id: newId("ord"),
      orderNumber: nextOrderNumber(),
      customer,
      items: resolved.map((l) => ({
        productId: l.productId,
        productNameEn: l.product.name.en,
        variantId: l.variantId,
        variantLabelEn: l.variantLabelEn,
        qty: l.qty,
        unitPriceInr: l.unitPriceInr,
        lineTotalInr: l.lineTotalInr,
      })),
      subtotalInr: summary.subtotalInr,
      deliveryFeeInr: summary.deliveryFeeInr,
      totalInr: summary.totalInr,
      status: "pending",
      paymentMode,
      createdAt: now,
      updatedAt: now,
    };
    const saved = orderRepo.create(order);
    decrementStock(resolved);
    return saved;
  },

  updateStatus(id: string, status: OrderStatus): Order | undefined {
    return orderRepo.update(id, { status, updatedAt: new Date().toISOString() });
  },

  getByNumber(orderNumber: string): Order | undefined {
    return orderRepo.find((o) => o.orderNumber === orderNumber);
  },
};
