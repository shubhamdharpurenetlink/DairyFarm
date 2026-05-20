"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Carousel, Rate } from "antd";
import { Quote } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { testimonialRepo } from "@/services/repos";
import styles from "./Testimonials.module.scss";

export default function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isHi = locale === "hi";
  const testimonials = useHydratedRepo(testimonialRepo);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("testimonialsTitle")} />
        <Carousel
          autoplay
          autoplaySpeed={5000}
          className={styles.carousel}
          dots={{ className: styles.dots }}
        >
          {testimonials.map((tt) => (
            <div key={tt.id}>
              <div className={styles.card}>
                <Quote className={styles.quoteIcon} size={56} />
                <Rate disabled defaultValue={tt.rating} className={styles.rate} />
                <p className={styles.quote}>
                  &ldquo;{isHi ? tt.quote.hi : tt.quote.en}&rdquo;
                </p>
                <div className={styles.author}>
                  <Image
                    src={tt.avatar}
                    alt={tt.name}
                    width={56}
                    height={56}
                    className={styles.avatar}
                  />
                  <div>
                    <div className={styles.name}>{tt.name}</div>
                    <div className={styles.city}>{tt.city}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
