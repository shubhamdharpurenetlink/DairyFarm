import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TrainingList from "@/features/training/components/TrainingList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "training" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrainingList />;
}
