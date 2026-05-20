import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/features/home/components/Hero";
import Features from "@/features/home/components/Features";
import OurStory from "@/features/home/components/OurStory";
import ProductsTeaser from "@/features/products/components/ProductsTeaser";
import BreedsCarousel from "@/features/home/components/BreedsCarousel";
import KnowledgePreview from "@/features/home/components/KnowledgePreview";
import TrainingPreview from "@/features/home/components/TrainingPreview";
import Testimonials from "@/features/home/components/Testimonials";
import Newsletter from "@/features/home/components/Newsletter";

export const metadata: Metadata = {
  title: "Laxmi Dairy Farm — Pure A2 Milk Since 1985",
  description:
    "Premium A2 milk from indigenous Gir, Sahiwal & Tharparkar cows. Ethical, organic, family-run dairy in Pandhurna, Madhya Pradesh since 1985.",
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
      <ProductsTeaser />
      <BreedsCarousel />
      <KnowledgePreview />
      <TrainingPreview />
      <Testimonials />
      <Newsletter />
    </>
  );
}
