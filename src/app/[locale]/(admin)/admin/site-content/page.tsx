import { setRequestLocale } from "next-intl/server";
import SiteContentView from "@/features/admin/modules/site-content/SiteContentView";

export const metadata = { title: "Admin · Site Content" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SiteContentView />;
}
