import { setRequestLocale } from "next-intl/server";
import TestimonialForm from "@/features/admin/modules/testimonials/TestimonialForm";

export const metadata = { title: "Admin · New Testimonial" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TestimonialForm />;
}
