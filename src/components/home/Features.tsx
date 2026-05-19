"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Leaf, Milk, HeartHandshake, Stethoscope } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import styles from "./Features.module.scss";

const items = [
  { key: 1, Icon: Leaf },
  { key: 2, Icon: Milk },
  { key: 3, Icon: HeartHandshake },
  { key: 4, Icon: Stethoscope },
];

export default function Features() {
  const t = useTranslations("home");
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          eyebrow={t("whyChooseSub")}
          title={t("whyChooseTitle")}
        />
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map(({ key, Icon }) => (
            <motion.div
              key={key}
              className={styles.card}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.iconWrap}>
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h3 className={styles.title}>{t(`feature${key}Title`)}</h3>
              <p className={styles.desc}>{t(`feature${key}Desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
