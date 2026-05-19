import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutHero from "@/components/about/AboutHero";
import FounderMessage from "@/components/about/FounderMessage";
import Timeline from "@/components/about/Timeline";
import FacilitiesGrid from "@/components/about/FacilitiesGrid";
import TeamGrid from "@/components/about/TeamGrid";
import Awards from "@/components/about/Awards";

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
