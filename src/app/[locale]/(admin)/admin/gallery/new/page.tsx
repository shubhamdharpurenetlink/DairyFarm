import { setRequestLocale } from "next-intl/server";
import GalleryItemForm from "@/features/admin/modules/gallery/GalleryItemForm";

export const metadata = { title: "Admin · New Gallery Item" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalleryItemForm />;
}
