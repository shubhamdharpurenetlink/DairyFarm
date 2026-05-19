import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminDashboard />;
}
