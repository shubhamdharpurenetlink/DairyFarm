import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeSettings } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { settingsFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const row = await prisma.settings.findUnique({ where: { id: "default" } });
    if (!row) return apiError("NOT_FOUND", "Settings not initialised.", 404);
    return apiOk(serializeSettings(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, settingsFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const row = await prisma.settings.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        farmName: body.farmName,
        tagline: body.tagline,
        foundedYear: body.foundedYear,
        address: body.address,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        hours: body.hours,
        socials: body.socials,
        stats: body.stats,
        delivery: body.delivery,
      },
      update: {
        farmName: body.farmName,
        tagline: body.tagline,
        foundedYear: body.foundedYear,
        address: body.address,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        hours: body.hours,
        socials: body.socials,
        stats: body.stats,
        delivery: body.delivery,
      },
    });
    return apiOk(serializeSettings(row));
  } catch (e) {
    return apiServerError(e);
  }
}
