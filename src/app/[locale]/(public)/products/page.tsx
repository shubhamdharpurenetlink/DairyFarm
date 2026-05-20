import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ProductsListing from "@/features/products/components/ProductsListing";

export const metadata: Metadata = {
  title: "Products",
  description: "Fresh A2 milk, ghee, dahi, paneer, butter, mawa & traditional sweets",
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsListing />;
}
