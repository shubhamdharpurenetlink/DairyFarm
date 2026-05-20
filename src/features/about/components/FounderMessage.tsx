"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { slideInLeft, slideInRight, viewport } from "@/lib/animations";
import styles from "./FounderMessage.module.scss";

export default function FounderMessage() {
  const t = useTranslations("about");
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.imgCol}
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className={styles.imgWrap}>
            <Image
              src="https://i.pravatar.cc/600?u=founder"
              alt={t("founderName")}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className={styles.img}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.textCol}
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <Quote size={48} className={styles.icon} />
          <span className={styles.eyebrow}>{t("founderTitle")}</span>
          <blockquote className={styles.quote}>
            {t("founderQuote")}
          </blockquote>
          <div className={styles.attr}>
            <span className={styles.name}>{t("founderName")}</span>
            <span className={styles.role}>{t("founderRole")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
