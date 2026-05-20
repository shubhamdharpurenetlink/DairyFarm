import { setRequestLocale } from "next-intl/server";
import GalleryAdminView from "@/features/admin/modules/gallery/GalleryView";

export const metadata = { title: "Admin · Gallery" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalleryAdminView />;
}
