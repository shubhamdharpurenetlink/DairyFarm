"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import { timeline } from "@/data/team";
import styles from "./Timeline.module.scss";

export default function Timeline() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isHi = locale === "hi";

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("timelineTitle")} />
        <motion.div
          className={styles.timeline}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {timeline.map((evt, i) => (
            <motion.div
              key={evt.year}
              className={`${styles.event} ${i % 2 === 0 ? styles.left : styles.right}`}
              variants={fadeUp}
            >
              <div className={styles.dot} />
              <div className={styles.card}>
                <span className={styles.year}>{evt.year}</span>
                <h4 className={styles.title}>
                  {isHi ? evt.title.hi : evt.title.en}
                </h4>
                <p className={styles.desc}>
                  {isHi ? evt.description.hi : evt.description.en}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
