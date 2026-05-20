"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import styles from "./AboutHero.module.scss";

export default function AboutHero() {
  const t = useTranslations("about");
  return (
    <section className={styles.hero}>
      <Image
        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&h=700&fit=crop&auto=format&q=75"
        alt=""
        fill
        priority
        className={styles.bg}
      />
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Since 1985
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.title}
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={styles.sub}
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
