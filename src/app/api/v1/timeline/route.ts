import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTimelineEvent } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { timelineEventFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.timelineEvent.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "asc" }] });
    return apiOk(rows.map(serializeTimelineEvent));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, timelineEventFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.timelineEvent.create({
      data: {
        year: body.year,
        title: body.title,
        description: body.description,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeTimelineEvent(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
