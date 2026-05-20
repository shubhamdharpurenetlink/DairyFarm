import { setRequestLocale } from "next-intl/server";
import ProductForm from "@/features/admin/modules/products/ProductForm";

export const metadata = { title: "Admin · New Product" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductForm />;
}
