import { setRequestLocale } from "next-intl/server";
import CategoriesView from "@/features/admin/modules/categories/CategoriesView";

export const metadata = { title: "Admin · Categories" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CategoriesView />;
}
