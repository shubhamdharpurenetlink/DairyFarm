import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeGalleryItem } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { galleryItemFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const row = await prisma.galleryItem.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Gallery item not found.", 404);
    return apiOk(serializeGalleryItem(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, galleryItemFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        type: body.type,
        url: body.url,
        thumbnail: body.thumbnail,
        title: body.title,
        aspectRatio: body.aspectRatio,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeGalleryItem(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.galleryItem.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
