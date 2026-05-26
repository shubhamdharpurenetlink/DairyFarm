"use client";

import { apiFetch, ApiError } from "./apiClient";
import type { ResolvedCartLine } from "./cartService";
import type { Order, OrderCustomer, OrderStatus, PaymentMode } from "@/types";

export class OrderError extends Error {
  constructor(
    public code:
      | "STOCK_EXCEEDED"
      | "PRODUCT_UNAVAILABLE"
      | "EMPTY_CART"
      | "PAYMENT_NOT_SUPPORTED"
      | "PINCODE_NOT_SERVICEABLE"
      | "MIN_ORDER"
      | "PAYMENT_INIT_FAILED"
      | "PAYMENT_CANCELLED"
      | "INVALID_SIGNATURE"
      | "SERVER_ERROR",
    message: string,
  ) {
    super(message);
    this.name = "OrderError";
  }
}

export type RazorpayInitPayload = {
  id: string;
  amount: number;
  currency: string;
  keyId: string;
};

export type PlaceOrderResponse = {
  order: Order;
  razorpayOrder: RazorpayInitPayload | null;
};

export const orderService = {
  /**
   * All payment modes are server-validated. The COD path is unchanged; UPI/Card
   * routes through Razorpay test mode. UI still calls `isPaymentSupported`
   * to gate the UPI/Card buttons when env keys are missing.
   */
  isPaymentSupported(mode: PaymentMode): boolean {
    if (mode === "cod") return true;
    if (typeof window === "undefined") return true;
    return Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
  },

  async placeOrder(
    customer: OrderCustomer,
    paymentMode: PaymentMode,
    resolved: ResolvedCartLine[],
  ): Promise<PlaceOrderResponse> {
    if (resolved.length === 0) {
      throw new OrderError("EMPTY_CART", "Cart is empty");
    }
    try {
      return await apiFetch<PlaceOrderResponse>({
        path: "/orders",
        method: "POST",
        body: {
          ...customer,
          email: customer.email ?? "",
          paymentMode,
          lines: resolved.map((l) => ({
            productSlug: l.productId,
            variantId: l.variantId,
            qty: l.qty,
          })),
        },
      });
    } catch (e) {
      if (e instanceof ApiError) {
        const known = [
          "STOCK_EXCEEDED",
          "PRODUCT_UNAVAILABLE",
          "PINCODE_NOT_SERVICEABLE",
          "MIN_ORDER",
          "PAYMENT_INIT_FAILED",
        ] as const;
        const code = (known as readonly string[]).includes(e.code)
          ? (e.code as OrderError["code"])
          : "SERVER_ERROR";
        throw new OrderError(code, e.message);
      }
      throw e;
    }
  },

  async verifyRazorpay(input: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): Promise<Order> {
    try {
      const res = await apiFetch<{ order: Order }>({
        path: `/orders/${input.orderId}/razorpay-verify`,
        method: "POST",
        body: {
          razorpayOrderId: input.razorpayOrderId,
          razorpayPaymentId: input.razorpayPaymentId,
          razorpaySignature: input.razorpaySignature,
        },
      });
      return res.order;
    } catch (e) {
      if (e instanceof ApiError && e.code === "INVALID_SIGNATURE") {
        throw new OrderError("INVALID_SIGNATURE", e.message);
      }
      throw e;
    }
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return apiFetch<Order>({
      path: `/orders/${id}`,
      method: "PATCH",
      body: { status },
    });
  },

  async getByNumber(orderNumber: string): Promise<Order | undefined> {
    try {
      return await apiFetch<Order>({
        path: `/orders/by-number/${orderNumber}`,
        cache: "no-store",
      });
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return undefined;
      throw e;
    }
  },
};
