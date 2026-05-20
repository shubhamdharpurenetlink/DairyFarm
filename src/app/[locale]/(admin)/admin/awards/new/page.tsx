import { setRequestLocale } from "next-intl/server";
import AwardForm from "@/features/admin/modules/awards/AwardForm";

export const metadata = { title: "Admin · New Award" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AwardForm />;
}
