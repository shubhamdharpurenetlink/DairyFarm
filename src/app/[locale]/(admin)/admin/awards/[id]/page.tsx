import { setRequestLocale } from "next-intl/server";
import AwardForm from "@/features/admin/modules/awards/AwardForm";

export const metadata = { title: "Admin · Edit Award" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AwardForm id={id} />;
}
