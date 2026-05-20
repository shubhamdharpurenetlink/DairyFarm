import { setRequestLocale } from "next-intl/server";
import TeamMemberForm from "@/features/admin/modules/team/TeamMemberForm";

export const metadata = { title: "Admin · Edit Team Member" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <TeamMemberForm id={id} />;
}
