import { setRequestLocale } from "next-intl/server";
import OrdersTable from "@/features/admin/modules/orders/OrdersTable";

export const metadata = { title: "Admin · Orders" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OrdersTable />;
}
