import { setRequestLocale } from "next-intl/server";
import CowForm from "@/features/admin/modules/cows/CowForm";

export const metadata = { title: "Admin · Edit Cow Breed" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <CowForm slug={slug} />;
}
