import { setRequestLocale } from "next-intl/server";
import TrainingsView from "@/features/admin/modules/trainings/TrainingsView";

export const metadata = { title: "Admin · Trainings" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrainingsView />;
}
