import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db";
import { serializeEnrollment } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { enrollmentSchema } from "@/lib/validators";

export const runtime = "nodejs";

const publicEnrollmentSchema = enrollmentSchema.extend({
  trainingId: z.string().min(1),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  try {
    const rows = await prisma.enrollment.findMany({ orderBy: { createdAt: "desc" } });
    return apiOk(rows.map(serializeEnrollment));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const body = await parseJsonBody(req, publicEnrollmentSchema);
  if (body instanceof NextResponse) return body;

  try {
    const program = await prisma.training.findUnique({ where: { slug: body.trainingId } });
    if (!program) {
      return apiError("PROGRAM_NOT_FOUND", "Training program not found.", 404);
    }
    if (program.seatsLeft <= 0) {
      return apiError("SEATS_FULL", "This batch is full. Please try another date.", 409);
    }
    const trainingTitleEn =
      typeof program.title === "object" && program.title !== null
        ? (program.title as { en?: string }).en ?? program.slug
        : program.slug;

    const created = await prisma.$transaction(async (tx) => {
      const en = await tx.enrollment.create({
        data: {
          trainingId: program.slug,
          trainingTitleEn,
          fullName: body.fullName,
          phone: body.phone,
          email: body.email,
          age: body.age,
          state: body.state,
          district: body.district,
          education: body.education,
          batchDate: body.batchDate,
          source: body.source,
          message: body.message,
          status: "pending",
        },
      });
      await tx.training.update({
        where: { slug: program.slug },
        data: { seatsLeft: { decrement: 1 } },
      });
      return en;
    });

    return apiOk(serializeEnrollment(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
