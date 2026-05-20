import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProductDetail from "@/features/products/components/ProductDetail";
import { productService } from "@/services/entityServices";

// On the server, productService.list() returns the seed snapshot, so the build
// can pre-render every product that ships in the codebase. Setting
// `dynamicParams = true` lets admin-created products (only visible client-side)
// resolve at request time without a 404.
export const dynamicParams = true;

export function generateStaticParams() {
  return productService.list().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = productService.getBySlug(slug);
  if (!product) return {};
  const name = locale === "hi" ? product.name.hi : product.name.en;
  const desc = locale === "hi" ? product.shortDesc.hi : product.shortDesc.en;
  return {
    title: name,
    description: desc,
    openGraph: { images: [product.primaryImage] },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const product = productService.getBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
