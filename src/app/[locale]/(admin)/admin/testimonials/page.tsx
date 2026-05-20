import { setRequestLocale } from "next-intl/server";
import TestimonialsView from "@/features/admin/modules/testimonials/TestimonialsView";

export const metadata = { title: "Admin · Testimonials" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TestimonialsView />;
}
