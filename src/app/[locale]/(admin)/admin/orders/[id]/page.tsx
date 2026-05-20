import { setRequestLocale } from "next-intl/server";
import OrderDetail from "@/features/admin/modules/orders/OrderDetail";

export const metadata = { title: "Admin · Order" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <OrderDetail id={id} />;
}
