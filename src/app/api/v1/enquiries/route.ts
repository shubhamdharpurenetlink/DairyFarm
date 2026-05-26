import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeEnquiry } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { contactSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  try {
    const rows = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    return apiOk(rows.map(serializeEnquiry));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const body = await parseJsonBody(req, contactSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.enquiry.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        subject: body.subject,
        message: body.message,
        status: "new",
      },
    });
    return apiOk(serializeEnquiry(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
