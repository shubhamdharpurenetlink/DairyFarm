import { setRequestLocale } from "next-intl/server";
import EnrollmentsView from "@/features/admin/modules/enrollments/EnrollmentsView";

export const metadata = { title: "Admin · Enrollments" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EnrollmentsView />;
}
