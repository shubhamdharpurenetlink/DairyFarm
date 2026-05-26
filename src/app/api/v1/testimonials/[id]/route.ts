import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTestimonial } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { testimonialFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const row = await prisma.testimonial.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Testimonial not found.", 404);
    return apiOk(serializeTestimonial(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, testimonialFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name,
        city: body.city,
        avatar: body.avatar,
        rating: body.rating,
        quote: body.quote,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeTestimonial(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
