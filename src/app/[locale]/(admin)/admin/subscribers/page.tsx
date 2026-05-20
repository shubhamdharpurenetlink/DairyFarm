import { setRequestLocale } from "next-intl/server";
import SubscribersView from "@/features/admin/modules/subscribers/SubscribersView";

export const metadata = { title: "Admin · Subscribers" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SubscribersView />;
}
