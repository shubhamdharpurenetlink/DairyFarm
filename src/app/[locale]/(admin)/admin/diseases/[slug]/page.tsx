import { setRequestLocale } from "next-intl/server";
import DiseaseForm from "@/features/admin/modules/diseases/DiseaseForm";

export const metadata = { title: "Admin · Edit Care Topic" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <DiseaseForm slug={slug} />;
}
