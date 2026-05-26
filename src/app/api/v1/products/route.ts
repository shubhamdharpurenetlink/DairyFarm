import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeProduct } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { productFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    });
    return apiOk(products.map(serializeProduct));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const body = await parseJsonBody(req, productFormSchema);
  if (body instanceof NextResponse) return body;

  try {
    const created = await prisma.product.create({
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
    return apiOk(serializeProduct(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
