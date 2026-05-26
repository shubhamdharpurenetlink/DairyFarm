import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CowsListing from "@/features/cows/components/CowsListing";
import RepoHydrator from "@/services/repoHydration";
import { getCows } from "@/server/data";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cows" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function CowsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cows = await getCows();
  return (
    <RepoHydrator data={{ cows }}>
      <CowsListing />
    </RepoHydrator>
  );
}
