import { setRequestLocale } from "next-intl/server";
import ProductForm from "@/features/admin/modules/products/ProductForm";

export const metadata = { title: "Admin · Edit Product" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <ProductForm slug={id} />;
}
