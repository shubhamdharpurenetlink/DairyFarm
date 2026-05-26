import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTimelineEvent } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { timelineEventFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const row = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Timeline event not found.", 404);
    return apiOk(serializeTimelineEvent(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, timelineEventFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.timelineEvent.update({
      where: { id },
      data: {
        year: body.year,
        title: body.title,
        description: body.description,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeTimelineEvent(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.timelineEvent.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
