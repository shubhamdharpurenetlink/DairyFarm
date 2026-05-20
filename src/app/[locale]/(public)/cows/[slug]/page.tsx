import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import CowDetail from "@/features/cows/components/CowDetail";
import { cowService } from "@/services/entityServices";

export const dynamicParams = true;

export function generateStaticParams() {
  return cowService.list().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const cow = cowService.getBySlug(slug);
  if (!cow) return {};
  const name = locale === "hi" ? cow.nameHi : cow.nameEn;
  const desc = locale === "hi" ? cow.shortDesc.hi : cow.shortDesc.en;
  return { title: name, description: desc };
}

export default async function CowDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const cow = cowService.getBySlug(slug);
  if (!cow) notFound();
  return <CowDetail cow={cow} />;
}
