import { setRequestLocale } from "next-intl/server";
import CategoryForm from "@/features/admin/modules/categories/CategoryForm";

export const metadata = { title: "Admin · New Category" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CategoryForm />;
}
