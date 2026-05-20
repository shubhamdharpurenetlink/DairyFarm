import { setRequestLocale } from "next-intl/server";
import TrainingForm from "@/features/admin/modules/trainings/TrainingForm";

export const metadata = { title: "Admin · New Training" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrainingForm />;
}
