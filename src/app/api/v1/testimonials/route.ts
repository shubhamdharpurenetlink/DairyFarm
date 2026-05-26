import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTestimonial } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { testimonialFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { rating: "desc" }] });
    return apiOk(rows.map(serializeTestimonial));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, testimonialFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.testimonial.create({
      data: {
        name: body.name,
        city: body.city,
        avatar: body.avatar,
        rating: body.rating,
        quote: body.quote,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeTestimonial(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
