import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeDisease } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { diseaseFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.disease.findMany({ orderBy: { publishedAt: "desc" } });
    return apiOk(rows.map(serializeDisease));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, diseaseFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.disease.create({
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
    return apiOk(serializeDisease(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
