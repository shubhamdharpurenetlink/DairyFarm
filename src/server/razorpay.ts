import crypto from "node:crypto";
import Razorpay from "razorpay";

export type RazorpayOrder = {
  id: string;
  amount: number | string;
  currency: string;
  receipt: string | undefined;
  status: string;
};

let cached: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (cached) return cached;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay env vars RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set",
    );
  }
  cached = new Razorpay({ key_id, key_secret });
  return cached;
}

export async function createRazorpayOrder(params: {
  amountInr: number;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  const rp = getRazorpay();
  const order = await rp.orders.create({
    amount: params.amountInr * 100,
    currency: "INR",
    receipt: params.receipt,
    notes: params.notes,
  });
  return {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    status: order.status,
  };
}

export function verifyRazorpaySignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest("hex");
  return expected === params.razorpaySignature;
}
