import type { ID } from "./common";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentMode = "cod" | "upi" | "card";

export interface OrderItem {
  productId: ID;
  productNameEn: string;
  variantId: ID;
  variantLabelEn: string;
  qty: number;
  unitPriceInr: number;
  lineTotalInr: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  id: ID;
  orderNumber: string; // human friendly e.g. LD-2026-0001
  customer: OrderCustomer;
  items: OrderItem[];
  subtotalInr: number;
  deliveryFeeInr: number;
  totalInr: number;
  status: OrderStatus;
  paymentMode: PaymentMode;
  paymentRef?: string;
  createdAt: string;
  updatedAt: string;
}
