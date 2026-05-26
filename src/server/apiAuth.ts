import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import type { UserRole } from "@prisma/client";

export type AdminContext = {
  userId: string;
  email: string;
  role: UserRole;
};

/**
 * Require an authenticated admin session. Returns either the admin context
 * (when authorised) or a 401 response that callers should return directly.
 *
 *   const guard = await requireAdmin();
 *   if (guard instanceof NextResponse) return guard;
 *   // … use guard.userId
 */
export async function requireAdmin(): Promise<AdminContext | NextResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "UNAUTHORISED", message: "Sign in to continue." },
      { status: 401 },
    );
  }
  return {
    userId: session.user.id,
    email: session.user.email ?? "",
    role: session.user.role,
  };
}
