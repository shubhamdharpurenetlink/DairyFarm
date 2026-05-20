import { setRequestLocale } from "next-intl/server";
import EnquiriesView from "@/features/admin/modules/enquiries/EnquiriesView";

export const metadata = { title: "Admin · Enquiries" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EnquiriesView />;
}
