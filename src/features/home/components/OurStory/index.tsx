"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import StatCounter from "@/ui/StatCounter";
import { fadeUp, slideInLeft, slideInRight, viewport } from "@/lib/animations";
import { useHydratedSettings } from "@/hooks/useHydratedSettings";
import styles from "./OurStory.module.scss";

export default function OurStory() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const site = useHydratedSettings();
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
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=1100&fit=crop&auto=format&q=75"
              alt="Our farm story"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className={styles.img}
            />
            <div className={styles.imgBadge}>
              <span className={styles.badgeYear}>1985</span>
              <span className={styles.badgeText}>Est.</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.textCol}
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.title}>{t("ourStoryTitle")}</h2>
          <p className={styles.text}>{t("ourStoryText")}</p>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ delay: 0.3 }}
          >
            <StatItem
              value={site.stats.yearsHeritage}
              label={tCommon("yearsHeritage")}
              suffix="+"
            />
            <StatItem
              value={site.stats.healthyCows}
              label={tCommon("healthyCows")}
            />
            <StatItem
              value={site.stats.litresPerDay}
              label={tCommon("litresPerDay")}
              suffix=" L"
            />
            <StatItem
              value={site.stats.happyCustomers}
              label={tCommon("happyCustomers")}
              suffix="+"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ delay: 0.5 }}
          >
            <Link href="/about">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRight size={18} />}
                iconPosition="end"
              >
                {tCommon("learnMore")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>
        <StatCounter value={value} suffix={suffix} />
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
