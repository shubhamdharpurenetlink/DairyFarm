import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { apiOk } from "@/server/apiHelpers";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHORISED" }, { status: 401 });
  }
  return apiOk({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  });
}
