import { setRequestLocale } from "next-intl/server";
import CowsView from "@/features/admin/modules/cows/CowsView";

export const metadata = { title: "Admin · Cows" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CowsView />;
}
