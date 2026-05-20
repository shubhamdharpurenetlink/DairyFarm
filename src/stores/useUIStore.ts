"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Cross-cutting UI state that isn't tied to a single feature.
 *
 * The mobile-nav drawer lives in {@link Header} as local component state, and
 * the cart drawer lives in {@link useCartStore}; this store is intentionally
 * kept small and focused on app-wide UX state we want to persist (PWA install
 * prompt, page-view counter, breed compare list).
 */
interface UIState {
  installPromptDismissed: boolean;
  dismissInstallPrompt: () => void;

  pageViews: number;
  incrementPageViews: () => void;

  compareList: string[];
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      installPromptDismissed: false,
      dismissInstallPrompt: () => set({ installPromptDismissed: true }),

      pageViews: 0,
      incrementPageViews: () => set({ pageViews: get().pageViews + 1 }),

      compareList: [],
      toggleCompare: (slug) => {
        const list = get().compareList;
        if (list.includes(slug)) {
          set({ compareList: list.filter((s) => s !== slug) });
        } else if (list.length < 3) {
          set({ compareList: [...list, slug] });
        }
      },
      clearCompare: () => set({ compareList: [] }),
    }),
    {
      name: STORAGE_KEYS.ui,
      partialize: (state) => ({
        installPromptDismissed: state.installPromptDismissed,
        pageViews: state.pageViews,
      }),
    },
  ),
);
