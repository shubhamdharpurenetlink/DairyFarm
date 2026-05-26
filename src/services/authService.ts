"use client";

import { signIn, signOut } from "next-auth/react";

/**
 * Thin wrapper around Auth.js so legacy code that imports `authService` keeps
 * working. New code should call `signIn` / `signOut` from `next-auth/react`
 * or use `useAdminAuth()` (which is now backed by `useSession`).
 */
export const authService = {
  async login(email: string, password: string): Promise<void> {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res || res.error) {
      throw new Error("INVALID_CREDENTIALS");
    }
  },

  async logout(): Promise<void> {
    await signOut({ redirect: false });
  },
};
