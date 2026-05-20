import { setRequestLocale } from "next-intl/server";
import TestimonialForm from "@/features/admin/modules/testimonials/TestimonialForm";

export const metadata = { title: "Admin · Edit Testimonial" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <TestimonialForm id={id} />;
}
