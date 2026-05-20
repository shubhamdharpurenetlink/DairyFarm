import { setRequestLocale } from "next-intl/server";
import TeamMemberForm from "@/features/admin/modules/team/TeamMemberForm";

export const metadata = { title: "Admin · New Team Member" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TeamMemberForm />;
}
