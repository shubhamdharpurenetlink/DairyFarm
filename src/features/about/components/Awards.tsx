"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Trophy, Leaf, ShieldCheck, Lightbulb, type LucideIcon } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { awardRepo } from "@/services/repos";
import styles from "./Awards.module.scss";

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  leaf: Leaf,
  "shield-check": ShieldCheck,
  lightbulb: Lightbulb,
};

export default function Awards() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isHi = locale === "hi";
  const awards = useHydratedRepo(awardRepo);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("awardsTitle")} />
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {awards.map((a) => {
            const Icon = iconMap[a.icon] ?? Trophy;
            return (
              <motion.div
                key={a.id}
                className={styles.card}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.iconWrap}>
                  <Icon size={28} />
                </div>
                <span className={styles.year}>{a.year}</span>
                <h4 className={styles.title}>{isHi ? a.title.hi : a.title.en}</h4>
                <p className={styles.issuer}>{a.issuer}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
