import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeDisease } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { diseaseFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  try {
    const row = await prisma.disease.findUnique({ where: { slug } });
    if (!row) return apiError("NOT_FOUND", "Article not found.", 404);
    return apiOk(serializeDisease(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  const body = await parseJsonBody(req, diseaseFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.disease.update({
      where: { slug },
      data: {
        slug: body.slug,
        title: body.title,
        category: body.category,
        image: body.image,
        summary: body.summary,
        symptoms: body.symptoms,
        causes: body.causes,
        prevention: body.prevention,
        treatment: body.treatment,
        readTimeMin: body.readTimeMin,
      },
    });
    return apiOk(serializeDisease(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  try {
    await prisma.disease.delete({ where: { slug } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
