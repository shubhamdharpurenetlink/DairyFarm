"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Home,
  Droplets,
  Sprout,
  Stethoscope,
  Leaf,
  Baby,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { facilityRepo } from "@/services/repos";
import styles from "./FacilitiesGrid.module.scss";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  droplets: Droplets,
  sprout: Sprout,
  stethoscope: Stethoscope,
  leaf: Leaf,
  baby: Baby,
};

export default function FacilitiesGrid() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isHi = locale === "hi";
  const facilities = useHydratedRepo(facilityRepo);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          eyebrow={t("facilitiesSub")}
          title={t("facilitiesTitle")}
        />
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {facilities.map((f) => {
            const Icon = iconMap[f.icon] ?? Home;
            return (
              <motion.div
                key={f.id}
                className={styles.card}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.imgWrap}>
                  <Image
                    src={f.image}
                    alt={isHi ? f.name.hi : f.name.en}
                    fill
                    sizes="(min-width: 768px) 380px, 90vw"
                    className={styles.img}
                  />
                  <div className={styles.iconBadge}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>
                    {isHi ? f.name.hi : f.name.en}
                  </h3>
                  <p className={styles.cardDesc}>
                    {isHi ? f.description.hi : f.description.en}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
