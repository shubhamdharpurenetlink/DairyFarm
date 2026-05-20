import { setRequestLocale } from "next-intl/server";
import FacilityForm from "@/features/admin/modules/facilities/FacilityForm";

export const metadata = { title: "Admin · New Facility" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FacilityForm />;
}
