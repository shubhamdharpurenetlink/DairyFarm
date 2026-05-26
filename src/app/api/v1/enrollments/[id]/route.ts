import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeEnrollment } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { enrollmentStatusSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    const row = await prisma.enrollment.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Enrollment not found.", 404);
    return apiOk(serializeEnrollment(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, enrollmentStatusSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.enrollment.update({
      where: { id },
      data: { status: body.status },
    });
    return apiOk(serializeEnrollment(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.enrollment.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
