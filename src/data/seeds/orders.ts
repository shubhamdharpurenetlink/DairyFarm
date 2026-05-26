import type { Order } from "@/types";

/**
 * Production seed contains no sample orders — the admin order screen starts
 * clean and only fills as customers actually check out through the storefront
 * (COD or Razorpay).
 */
export const orders: Order[] = [];
