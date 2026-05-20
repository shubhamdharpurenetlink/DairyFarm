import type { ID } from "./common";

export interface CartLine {
  productId: ID;
  variantId: ID;
  qty: number;
}

export type CartIssueCode =
  | "MIN_ORDER"
  | "PINCODE_NOT_SERVICEABLE"
  | "STOCK_EXCEEDED"
  | "PRODUCT_UNAVAILABLE";

export interface CartIssue {
  code: CartIssueCode;
  /** Optional payload for UI to show specifics (e.g. shortfall amount). */
  meta?: Record<string, string | number>;
}

export interface CartSummary {
  itemCount: number;
  subtotalInr: number;
  deliveryFeeInr: number;
  totalInr: number;
  /**
   * Hard validation issues that must be resolved before checkout. UI should
   * surface these inline and disable the place-order button when present.
   */
  issues: CartIssue[];
  /** True when {@link issues} is empty. */
  isCheckoutReady: boolean;
}
