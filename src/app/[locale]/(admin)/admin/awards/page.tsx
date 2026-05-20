import { setRequestLocale } from "next-intl/server";
import AwardsView from "@/features/admin/modules/awards/AwardsView";

export const metadata = { title: "Admin · Awards" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AwardsView />;
}
