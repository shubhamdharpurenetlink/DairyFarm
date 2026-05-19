import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import TrainingDetail from "@/components/training/TrainingDetail";
import { trainings, getTrainingBySlug } from "@/data/trainings";

export function generateStaticParams() {
  return trainings.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const p = getTrainingBySlug(slug);
  if (!p) return {};
  const title = locale === "hi" ? p.title.hi : p.title.en;
  const desc = locale === "hi" ? p.shortDesc.hi : p.shortDesc.en;
  return { title, description: desc };
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const p = getTrainingBySlug(slug);
  if (!p) notFound();
  return <TrainingDetail program={p} />;
}
