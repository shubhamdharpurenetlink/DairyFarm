import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeProduct } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { productFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return apiError("NOT_FOUND", "Product not found.", 404);
    return apiOk(serializeProduct(product));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { slug } = await params;
  const body = await parseJsonBody(req, productFormSchema);
  if (body instanceof NextResponse) return body;

  try {
    const updated = await prisma.product.update({
      where: { slug },
      data: {
        slug: body.slug,
        name: body.name,
        shortDesc: body.shortDesc,
        description: body.description,
        category: body.category,
        primaryImage: body.primaryImage,
        images: body.images,
        variants: body.variants as object,
        tags: body.tags,
        isFeatured: body.isFeatured,
        isAvailable: body.isAvailable,
        rating: body.rating,
        ratingCount: body.ratingCount,
        badges: body.badges as object | undefined,
        shelfLifeDays: body.shelfLifeDays,
        storageInstructions: body.storageInstructions as object | undefined,
        ingredients: body.ingredients as object | undefined,
        nutrition: body.nutrition as object | undefined,
      },
    });
    return apiOk(serializeProduct(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { slug } = await params;
  try {
    await prisma.product.delete({ where: { slug } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
