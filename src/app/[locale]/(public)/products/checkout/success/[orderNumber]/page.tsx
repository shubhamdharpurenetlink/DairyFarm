import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CheckoutSuccess from "@/features/products/components/CheckoutSuccess";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order placed",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string; orderNumber: string }>;
}) {
  const { locale, orderNumber } = await params;
  setRequestLocale(locale);
  return <CheckoutSuccess orderNumber={decodeURIComponent(orderNumber)} />;
}
