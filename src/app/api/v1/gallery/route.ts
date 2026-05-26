import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeGalleryItem } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { galleryItemFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
    return apiOk(rows.map(serializeGalleryItem));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, galleryItemFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.galleryItem.create({
      data: {
        type: body.type,
        url: body.url,
        thumbnail: body.thumbnail,
        title: body.title,
        aspectRatio: body.aspectRatio,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeGalleryItem(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
