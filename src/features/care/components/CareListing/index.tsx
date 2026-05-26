"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Input, Segmented, Tag, Alert } from "antd";
import { Search, Clock, ArrowRight } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { diseaseRepo } from "@/services/repos";
import { ListSkeleton, DiseaseCardSkeleton } from "@/ui/Skeleton";
import type { DiseaseCategory } from "@/types";
import styles from "./CareListing.module.scss";

type CatFilter = "all" | DiseaseCategory;

export default function CareListing() {
  const t = useTranslations("care");
  const locale = useLocale();
  const isHi = locale === "hi";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatFilter>("all");
  const diseases = useHydratedRepo(diseaseRepo);
  const ready = useRepoReady(diseaseRepo);

  const items = useMemo(() => {
    return diseases.filter((d) => {
      const matchesCat = cat === "all" || d.category === cat;
      if (!matchesCat) return false;
      if (!q.trim()) return true;
      const lower = q.toLowerCase();
      const fields = [
        d.title.en,
        d.title.hi,
        d.summary.en,
        d.summary.hi,
        ...d.symptoms.en,
        ...d.symptoms.hi,
      ];
      return fields.some((f) => f.toLowerCase().includes(lower));
    });
  }, [diseases, q, cat]);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <Alert
          type="warning"
          showIcon
          message={t("disclaimer")}
          className={styles.disclaimer}
        />

        <div className={styles.controls}>
          <Input
            size="large"
            prefix={<Search size={18} />}
            placeholder={t("searchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            allowClear
            className={styles.search}
          />
          <Segmented
            value={cat}
            onChange={(v) => setCat(v as CatFilter)}
            options={[
              { label: t("categoryAll"), value: "all" },
              { label: t("categoryDisease"), value: "disease" },
              { label: t("categoryNutrition"), value: "nutrition" },
              { label: t("categoryCalving"), value: "calving" },
              { label: t("categoryVaccination"), value: "vaccination" },
            ]}
            size="large"
            className={styles.segmented}
          />
        </div>

        {!ready && diseases.length === 0 ? (
          <ListSkeleton count={6} variant="wide" card={DiseaseCardSkeleton} />
        ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${cat}-${q}`}
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
          >
            {items.map((d) => (
              <motion.article
                key={d.slug}
                className={styles.card}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/cow-care/${d.slug}`} className={styles.link}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={d.image}
                      alt={isHi ? d.title.hi : d.title.en}
                      fill
                      sizes="(min-width: 1024px) 380px, 90vw"
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.body}>
                    <Tag color="green">{t(`category${capital(d.category)}`)}</Tag>
                    <h3 className={styles.title}>
                      {isHi ? d.title.hi : d.title.en}
                    </h3>
                    <p className={styles.summary}>
                      {isHi ? d.summary.hi : d.summary.en}
                    </p>
                    <div className={styles.meta}>
                      <span>
                        <Clock size={14} /> {d.readTimeMin} min
                      </span>
                      <span className={styles.cta}>
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        )}
      </div>
    </section>
  );
}

function capital(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
