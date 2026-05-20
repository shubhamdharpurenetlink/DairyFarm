"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { authService } from "@/services/authService";
import type { AdminSession } from "@/types";

interface AdminAuthState {
  session: AdminSession | null;
  status: "idle" | "loading" | "error";
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  hasHydrated: boolean;
  setHydrated: () => void;
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      session: null,
      status: "idle",
      error: null,
      hasHydrated: false,

      login: async (email, password) => {
        set({ status: "loading", error: null });
        try {
          const session = await authService.login(email, password);
          set({ session, status: "idle", error: null });
        } catch (e) {
          const err = e as Error;
          set({
            status: "error",
            error: err.message === "INVALID_CREDENTIALS" ? "Invalid email or password" : "Login failed",
          });
          throw e;
        }
      },

      logout: async () => {
        await authService.logout();
        set({ session: null, status: "idle", error: null });
      },

      isAuthenticated: () => get().session !== null,
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: STORAGE_KEYS.admin,
      partialize: (state) => ({ session: state.session }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
