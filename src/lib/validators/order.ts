import { z } from "zod";
import { phoneRegex, pincodeRegex } from "./common";

export const checkoutSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(phoneRegex, "Valid Indian mobile required"),
  email: z.string().email().optional().or(z.literal("")),
  addressLine: z.string().min(8, "Enter complete address").max(200),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  pincode: z.string().regex(pincodeRegex, "Valid 6-digit pincode required"),
  notes: z.string().max(300).optional(),
  paymentMode: z.enum(["cod", "upi", "card"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const orderLineSchema = z.object({
  productSlug: z.string().min(1),
  variantId: z.string().min(1),
  qty: z.coerce.number().int().min(1).max(99),
});

export const placeOrderSchema = checkoutSchema.extend({
  lines: z.array(orderLineSchema).min(1, "Cart is empty"),
});

export type PlaceOrderPayload = z.infer<typeof placeOrderSchema>;

export const razorpayVerifySchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});
