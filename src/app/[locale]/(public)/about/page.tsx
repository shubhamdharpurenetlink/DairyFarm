import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutHero from "@/features/about/components/AboutHero";
import FounderMessage from "@/features/about/components/FounderMessage";
import Timeline from "@/features/about/components/Timeline";
import FacilitiesGrid from "@/features/about/components/FacilitiesGrid";
import TeamGrid from "@/features/about/components/TeamGrid";
import Awards from "@/features/about/components/Awards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <FounderMessage />
      <Timeline />
      <FacilitiesGrid />
      <TeamGrid />
      <Awards />
    </>
  );
}
