import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { apiOk, apiServerError } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.subscriber.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
