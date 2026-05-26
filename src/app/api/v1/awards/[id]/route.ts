import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeAward } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { awardFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const row = await prisma.award.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Award not found.", 404);
    return apiOk(serializeAward(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, awardFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.award.update({
      where: { id },
      data: {
        year: body.year,
        title: body.title,
        issuer: body.issuer,
        icon: body.icon,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeAward(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.award.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
