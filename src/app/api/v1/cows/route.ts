import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeCow } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { cowFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.cow.findMany({ orderBy: { slug: "asc" } });
    return apiOk(rows.map(serializeCow));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, cowFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.cow.create({
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
    return apiOk(serializeCow(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
