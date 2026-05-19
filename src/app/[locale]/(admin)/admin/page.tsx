import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata: Metadata = { title: "Admin Login" };

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminLogin />;
}
