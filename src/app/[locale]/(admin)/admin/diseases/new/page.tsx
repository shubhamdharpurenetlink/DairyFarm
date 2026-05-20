import { setRequestLocale } from "next-intl/server";
import DiseaseForm from "@/features/admin/modules/diseases/DiseaseForm";

export const metadata = { title: "Admin · New Care Topic" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DiseaseForm />;
}
