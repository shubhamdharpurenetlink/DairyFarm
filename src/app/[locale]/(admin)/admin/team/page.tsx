import { setRequestLocale } from "next-intl/server";
import TeamView from "@/features/admin/modules/team/TeamView";

export const metadata = { title: "Admin · Team" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TeamView />;
}
