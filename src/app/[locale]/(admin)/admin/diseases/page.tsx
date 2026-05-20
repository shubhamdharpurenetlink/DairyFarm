import { setRequestLocale } from "next-intl/server";
import DiseasesView from "@/features/admin/modules/diseases/DiseasesView";

export const metadata = { title: "Admin · Diseases" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DiseasesView />;
}
