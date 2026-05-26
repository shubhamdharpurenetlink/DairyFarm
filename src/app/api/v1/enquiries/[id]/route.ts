import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeEnquiry } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { enquiryStatusSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    const row = await prisma.enquiry.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Enquiry not found.", 404);
    return apiOk(serializeEnquiry(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, enquiryStatusSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status: body.status },
    });
    return apiOk(serializeEnquiry(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.enquiry.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
