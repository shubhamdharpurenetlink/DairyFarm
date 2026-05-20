import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CartPage from "@/features/products/components/CartPage";

export const metadata: Metadata = { title: "Cart" };

export default async function CartRoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartPage />;
}
