import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeCategory } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { categoryFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  try {
    const row = await prisma.category.findUnique({ where: { slug } });
    if (!row) return apiError("NOT_FOUND", "Category not found.", 404);
    return apiOk(serializeCategory(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  const body = await parseJsonBody(req, categoryFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.category.update({
      where: { slug },
      data: {
        slug: body.slug,
        name: body.name,
        icon: body.icon,
        color: body.color,
        description: body.description ?? undefined,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeCategory(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  try {
    await prisma.category.delete({ where: { slug } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
