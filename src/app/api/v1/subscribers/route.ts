import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeSubscriber } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { subscriberSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  try {
    const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
    return apiOk(rows.map(serializeSubscriber));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const body = await parseJsonBody(req, subscriberSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.subscriber.upsert({
      where: { email: body.email.toLowerCase() },
      create: { email: body.email.toLowerCase() },
      update: {},
    });
    return apiOk(serializeSubscriber(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
