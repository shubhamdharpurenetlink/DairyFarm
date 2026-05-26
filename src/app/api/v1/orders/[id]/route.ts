import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeOrder } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { orderStatusSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    const row = await prisma.order.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Order not found.", 404);
    return apiOk(serializeOrder(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, orderStatusSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.order.update({
      where: { id },
      data: { status: body.status },
    });
    return apiOk(serializeOrder(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.order.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
