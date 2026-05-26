import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTraining } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { trainingFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  try {
    const row = await prisma.training.findUnique({ where: { slug } });
    if (!row) return apiError("NOT_FOUND", "Program not found.", 404);
    return apiOk(serializeTraining(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  const body = await parseJsonBody(req, trainingFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.training.update({
      where: { slug },
      data: {
        slug: body.slug,
        title: body.title,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        image: body.image,
        durationDays: body.durationDays,
        priceInr: body.priceInr,
        level: body.level,
        seatsTotal: body.seatsTotal,
        seatsLeft: body.seatsLeft,
        syllabus: body.syllabus,
        instructor: body.instructor as object,
        schedule: body.schedule,
        includes: body.includes,
      },
    });
    return apiOk(serializeTraining(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  try {
    await prisma.training.delete({ where: { slug } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
