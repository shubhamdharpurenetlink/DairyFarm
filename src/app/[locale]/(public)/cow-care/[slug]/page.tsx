import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import DiseaseDetail from "@/features/care/components/DiseaseDetail";
import { diseaseService } from "@/services/entityServices";

export const dynamicParams = true;

export function generateStaticParams() {
  return diseaseService.list().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const d = diseaseService.getBySlug(slug);
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
  const d = diseaseService.getBySlug(slug);
  if (!d) notFound();
  return <DiseaseDetail disease={d} />;
}
