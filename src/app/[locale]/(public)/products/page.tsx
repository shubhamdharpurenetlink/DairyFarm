import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ProductsListing from "@/features/products/components/ProductsListing";
import RepoHydrator from "@/services/repoHydration";
import { getProducts, getCategories } from "@/server/data";

export const revalidate = 60;

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

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <RepoHydrator data={{ products, categories }}>
      <ProductsListing />
    </RepoHydrator>
  );
}
