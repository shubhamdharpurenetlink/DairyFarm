import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeCategory } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { categoryFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    return apiOk(rows.map(serializeCategory));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, categoryFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.category.create({
      data: {
        slug: body.slug,
        name: body.name,
        icon: body.icon,
        color: body.color,
        description: body.description ?? undefined,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeCategory(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
