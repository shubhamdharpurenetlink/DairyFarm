import { setRequestLocale } from "next-intl/server";
import SettingsView from "@/features/admin/modules/settings/SettingsView";

export const metadata = { title: "Admin · Settings" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SettingsView />;
}
