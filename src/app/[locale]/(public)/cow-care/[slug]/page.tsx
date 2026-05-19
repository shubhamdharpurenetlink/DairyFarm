import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import DiseaseDetail from "@/components/care/DiseaseDetail";
import { diseases, getDiseaseBySlug } from "@/data/diseases";

export function generateStaticParams() {
  return diseases.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const d = getDiseaseBySlug(slug);
  if (!d) return {};
  const title = locale === "hi" ? d.title.hi : d.title.en;
  const desc = locale === "hi" ? d.summary.hi : d.summary.en;
  return { title, description: desc };
}

export default async function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const d = getDiseaseBySlug(slug);
  if (!d) notFound();
  return <DiseaseDetail disease={d} />;
}
