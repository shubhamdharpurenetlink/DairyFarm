import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import OurStory from "@/components/home/OurStory";
import BreedsCarousel from "@/components/home/BreedsCarousel";
import KnowledgePreview from "@/components/home/KnowledgePreview";
import TrainingPreview from "@/components/home/TrainingPreview";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Laxmi Dairy Farm — Pure A2 Milk Since 1985",
  description:
    "Premium A2 milk from indigenous Gir, Sahiwal & Tharparkar cows. Ethical, organic, family-run dairy in Karnal since 1985.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Features />
      <OurStory />
      <BreedsCarousel />
      <KnowledgePreview />
      <TrainingPreview />
      <Testimonials />
      <Newsletter />
    </>
  );
}
