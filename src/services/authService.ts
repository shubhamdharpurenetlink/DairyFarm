"use client";

import { ADMIN_DEMO_EMAIL, ADMIN_DEMO_PASSWORD } from "@/lib/constants";
import type { AdminSession, AdminUser } from "@/types";

/**
 * Phase-1 demo authentication. Hardcoded credentials, client-side only.
 * Replace with Supabase Auth / NextAuth in Phase 2 by swapping this file.
 */
export const authService = {
  async login(email: string, password: string): Promise<AdminSession> {
    await sleep(450); // simulated network latency
    if (
      email.trim().toLowerCase() !== ADMIN_DEMO_EMAIL ||
      password !== ADMIN_DEMO_PASSWORD
    ) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const user: AdminUser = {
      id: "admin-1",
      name: "Farm Admin",
      email: ADMIN_DEMO_EMAIL,
      role: "owner",
    };
    return {
      user,
      token: `demo.${Date.now()}.${Math.random().toString(36).slice(2)}`,
      issuedAt: new Date().toISOString(),
    };
  },
  async logout(): Promise<void> {
    await sleep(120);
  },
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
