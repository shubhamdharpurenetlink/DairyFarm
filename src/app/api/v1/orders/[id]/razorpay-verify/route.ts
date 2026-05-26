import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeOrder } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { razorpayVerifySchema } from "@/lib/validators";
import { verifyRazorpaySignature } from "@/server/razorpay";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await parseJsonBody(req, razorpayVerifySchema);
  if (body instanceof NextResponse) return body;

  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return apiError("NOT_FOUND", "Order not found.", 404);
    if (order.razorpayOrderId !== body.razorpayOrderId) {
      return apiError("ORDER_MISMATCH", "Order id does not match payment.", 422);
    }

    const ok = verifyRazorpaySignature(body);
    if (!ok) {
      await prisma.order.update({
        where: { id },
        data: { status: "cancelled" },
      });
      return apiError("INVALID_SIGNATURE", "Payment signature did not match.", 422);
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status: "confirmed",
        paymentRef: body.razorpayPaymentId,
      },
    });
    return apiOk({ order: serializeOrder(updated) });
  } catch (e) {
    return apiServerError(e);
  }
}
