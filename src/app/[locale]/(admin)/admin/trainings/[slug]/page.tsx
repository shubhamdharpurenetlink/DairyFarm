import { setRequestLocale } from "next-intl/server";
import TrainingForm from "@/features/admin/modules/trainings/TrainingForm";

export const metadata = { title: "Admin · Edit Training" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <TrainingForm slug={slug} />;
}
