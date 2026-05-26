import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeFacility } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { facilityFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const row = await prisma.facility.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Facility not found.", 404);
    return apiOk(serializeFacility(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, facilityFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.facility.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        icon: body.icon,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeFacility(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.facility.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
