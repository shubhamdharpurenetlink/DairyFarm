import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeFacility } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { facilityFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.facility.findMany({ orderBy: { sortOrder: "asc" } });
    return apiOk(rows.map(serializeFacility));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, facilityFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.facility.create({
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        icon: body.icon,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeFacility(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
