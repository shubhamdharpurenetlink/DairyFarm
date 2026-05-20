import { setRequestLocale } from "next-intl/server";
import ProductsTable from "@/features/admin/modules/products/ProductsTable";

export const metadata = { title: "Admin · Products" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsTable />;
}
