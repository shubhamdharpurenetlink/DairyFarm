"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Mobile drawer
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // PWA install prompt
  installPromptDismissed: boolean;
  dismissInstallPrompt: () => void;

  // Page view count (used to show PWA prompt)
  pageViews: number;
  incrementPageViews: () => void;

  // Compare list for breeds
  compareList: string[];
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      drawerOpen: false,
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),

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
      name: "laxmi-dairy-ui-state",
      partialize: (state) => ({
        installPromptDismissed: state.installPromptDismissed,
        pageViews: state.pageViews,
      }),
    },
  ),
);
