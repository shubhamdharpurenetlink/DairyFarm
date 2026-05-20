import { setRequestLocale } from "next-intl/server";
import GalleryItemForm from "@/features/admin/modules/gallery/GalleryItemForm";

export const metadata = { title: "Admin · Edit Gallery Item" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <GalleryItemForm id={id} />;
}
