"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button, Tag } from "antd";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { cowRepo } from "@/services/repos";
import { ListSkeleton, CowCardSkeleton } from "@/ui/Skeleton";
import styles from "./BreedsCarousel.module.scss";

export default function BreedsCarousel() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tCows = useTranslations("cows");
  const locale = useLocale();
  const isHi = locale === "hi";
  const cows = useHydratedRepo(cowRepo);
  const ready = useRepoReady(cowRepo);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          eyebrow={t("breedsSub")}
          title={t("breedsTitle")}
        />

        {!ready && cows.length === 0 ? (
          <ListSkeleton count={4} variant="default" card={CowCardSkeleton} />
        ) : (
        <motion.div
          className={styles.scroller}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {cows.map((cow) => (
            <motion.div
              key={cow.slug}
              className={styles.card}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/cows/${cow.slug}`}>
                <div className={styles.imgWrap}>
                  <Image
                    src={cow.image}
                    alt={isHi ? cow.nameHi : cow.nameEn}
                    fill
                    sizes="(min-width: 768px) 280px, 80vw"
                    className={styles.img}
                  />
                  <div className={styles.cardBadge}>
                    <Tag color={tagColor(cow.category)}>
                      {tCommon(cow.category)}
                    </Tag>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>
                    {isHi ? cow.nameHi : cow.nameEn}
                  </h3>
                  <p className={styles.cardOrigin}>{cow.origin}</p>
                  <div className={styles.cardStats}>
                    <div>
                      <span className={styles.statLabel}>
                        {tCows("milkYield")}
                      </span>
                      <span className={styles.statValue}>
                        {cow.milkYieldLitresPerDay.min}-
                        {cow.milkYieldLitresPerDay.max} {tCows("litresDay")}
                      </span>
                    </div>
                    <div>
                      <span className={styles.statLabel}>
                        {tCows("fatContent")}
                      </span>
                      <span className={styles.statValue}>{cow.fatPercent}%</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        )}

        <div className={styles.viewAll}>
          <Link href="/cows">
            <Button
              type="link"
              icon={<ArrowRight size={16} />}
              iconPosition="end"
              size="large"
            >
              {tCommon("viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function tagColor(cat: string) {
  if (cat === "indigenous") return "green";
  if (cat === "exotic") return "gold";
  return "blue";
}
