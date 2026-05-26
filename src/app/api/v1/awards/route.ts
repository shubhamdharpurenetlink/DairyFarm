import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeAward } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { awardFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.award.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "desc" }] });
    return apiOk(rows.map(serializeAward));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, awardFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.award.create({
      data: {
        year: body.year,
        title: body.title,
        issuer: body.issuer,
        icon: body.icon,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeAward(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
