import { setRequestLocale } from "next-intl/server";
import CowForm from "@/features/admin/modules/cows/CowForm";

export const metadata = { title: "Admin · New Cow Breed" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CowForm />;
}
