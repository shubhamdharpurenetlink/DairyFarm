import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTraining } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { trainingFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.training.findMany({ orderBy: { createdAt: "desc" } });
    return apiOk(rows.map(serializeTraining));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, trainingFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.training.create({
      data: {
        slug: body.slug,
        title: body.title,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        image: body.image,
        durationDays: body.durationDays,
        priceInr: body.priceInr,
        level: body.level,
        seatsTotal: body.seatsTotal,
        seatsLeft: body.seatsLeft,
        syllabus: body.syllabus,
        instructor: body.instructor as object,
        schedule: body.schedule,
        includes: body.includes,
      },
    });
    return apiOk(serializeTraining(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
