import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeCow } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { cowFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  try {
    const row = await prisma.cow.findUnique({ where: { slug } });
    if (!row) return apiError("NOT_FOUND", "Breed not found.", 404);
    return apiOk(serializeCow(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  const body = await parseJsonBody(req, cowFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.cow.update({
      where: { slug },
      data: {
        slug: body.slug,
        nameEn: body.nameEn,
        nameHi: body.nameHi,
        category: body.category,
        origin: body.origin,
        color: body.color,
        milkYieldLitresPerDay: body.milkYieldLitresPerDay,
        fatPercent: body.fatPercent,
        image: body.image,
        gallery: body.gallery,
        shortDesc: body.shortDesc,
        description: body.description,
        characteristics: body.characteristics,
        history: body.history,
        temperament: body.temperament,
        suitability: body.suitability,
      },
    });
    return apiOk(serializeCow(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  try {
    await prisma.cow.delete({ where: { slug } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
