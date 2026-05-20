import { setRequestLocale } from "next-intl/server";
import FacilitiesView from "@/features/admin/modules/facilities/FacilitiesView";

export const metadata = { title: "Admin · Facilities" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FacilitiesView />;
}
