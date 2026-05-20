import { setRequestLocale } from "next-intl/server";
import CategoryForm from "@/features/admin/modules/categories/CategoryForm";

export const metadata = { title: "Admin · Edit Category" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <CategoryForm slug={slug} />;
}
