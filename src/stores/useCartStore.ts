"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { productRepo } from "@/services/repos";
import type { CartLine } from "@/types";

interface CartState {
  lines: CartLine[];
  drawerOpen: boolean;

  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  /**
   * Add or top-up a cart line. Returns the qty actually added (clamped to
   * available stock). The caller is responsible for surfacing user-facing
   * messaging when the return value is less than what was requested.
   */
  add: (productId: string, variantId: string, qty?: number) => number;
  setQty: (productId: string, variantId: string, qty: number) => number;
  increment: (productId: string, variantId: string) => number;
  decrement: (productId: string, variantId: string) => number;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;

  itemCount: () => number;
}

const sameLine = (a: CartLine, productId: string, variantId: string) =>
  a.productId === productId && a.variantId === variantId;

/** Look up the available stock for a (product, variant) pair, or `Infinity`
 *  if the product/variant cannot be resolved (defensive default — the cart
 *  page will surface PRODUCT_UNAVAILABLE separately). */
const availableStock = (productId: string, variantId: string): number => {
  const product = productRepo.get(productId);
  if (!product) return Number.POSITIVE_INFINITY;
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) return Number.POSITIVE_INFINITY;
  return Math.max(0, variant.stockQty);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      drawerOpen: false,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),

      add: (productId, variantId, qty = 1) => {
        const lines = get().lines;
        const existing = lines.find((l) => sameLine(l, productId, variantId));
        const stock = availableStock(productId, variantId);
        const currentQty = existing?.qty ?? 0;
        const requested = currentQty + Math.max(1, qty);
        const finalQty = Math.min(requested, stock);
        if (finalQty <= currentQty) {
          // Already at the cap; just open the drawer so the user notices.
          set({ drawerOpen: true });
          return 0;
        }
        if (existing) {
          set({
            lines: lines.map((l) =>
              sameLine(l, productId, variantId) ? { ...l, qty: finalQty } : l,
            ),
            drawerOpen: true,
          });
        } else {
          set({
            lines: [...lines, { productId, variantId, qty: finalQty }],
            drawerOpen: true,
          });
        }
        return finalQty - currentQty;
      },

      setQty: (productId, variantId, qty) => {
        if (qty <= 0) {
          get().remove(productId, variantId);
          return 0;
        }
        const stock = availableStock(productId, variantId);
        const finalQty = Math.min(qty, stock);
        set({
          lines: get().lines.map((l) =>
            sameLine(l, productId, variantId) ? { ...l, qty: finalQty } : l,
          ),
        });
        return finalQty;
      },

      increment: (productId, variantId) => {
        const line = get().lines.find((l) => sameLine(l, productId, variantId));
        return get().setQty(productId, variantId, (line?.qty ?? 0) + 1);
      },

      decrement: (productId, variantId) => {
        const line = get().lines.find((l) => sameLine(l, productId, variantId));
        return get().setQty(productId, variantId, (line?.qty ?? 0) - 1);
      },

      remove: (productId, variantId) =>
        set({
          lines: get().lines.filter((l) => !sameLine(l, productId, variantId)),
        }),

      clear: () => set({ lines: [], drawerOpen: false }),

      itemCount: () => get().lines.reduce((n, l) => n + l.qty, 0),
    }),
    {
      name: STORAGE_KEYS.cart,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
