"use client";

import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { authService } from "@/services/authService";
import type { AdminSession, AdminRole } from "@/types";

/**
 * Hook that keeps the legacy `useAdminAuth` shape but is now backed by
 * Auth.js (httpOnly cookie session). Drop-in for AdminGuard / AdminShell /
 * AdminLogin.
 */
type Status = "idle" | "loading" | "error";

interface AdminAuthSnapshot {
  session: AdminSession | null;
  status: Status;
  error: string | null;
  hasHydrated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  setHydrated: () => void;
}

function selector<T>(snap: AdminAuthSnapshot, sel: (s: AdminAuthSnapshot) => T): T {
  return sel(snap);
}

export function useAdminAuth<T>(sel: (s: AdminAuthSnapshot) => T): T;
export function useAdminAuth(): AdminAuthSnapshot;
export function useAdminAuth<T>(sel?: (s: AdminAuthSnapshot) => T): T | AdminAuthSnapshot {
  const { data, status } = useSession();

  const session = useMemo<AdminSession | null>(() => {
    if (!data?.user) return null;
    return {
      user: {
        id: data.user.id ?? "admin",
        name: data.user.name ?? "Admin",
        email: data.user.email ?? "",
        role: ((data.user as { role?: AdminRole }).role ?? "owner") as AdminRole,
        avatar: data.user.image ?? undefined,
      },
      token: "auth.js",
      issuedAt: new Date().toISOString(),
    };
  }, [data]);

  const login = useCallback(async (email: string, password: string) => {
    await authService.login(email, password);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
  }, []);

  const snap: AdminAuthSnapshot = {
    session,
    status:
      status === "loading"
        ? "loading"
        : "idle",
    error: null,
    hasHydrated: status !== "loading",
    login,
    logout,
    isAuthenticated: () => session !== null,
    setHydrated: () => undefined,
  };

  return sel ? selector(snap, sel) : snap;
}
