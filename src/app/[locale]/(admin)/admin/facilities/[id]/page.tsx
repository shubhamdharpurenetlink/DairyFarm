import { setRequestLocale } from "next-intl/server";
import FacilityForm from "@/features/admin/modules/facilities/FacilityForm";

export const metadata = { title: "Admin · Edit Facility" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <FacilityForm id={id} />;
}
