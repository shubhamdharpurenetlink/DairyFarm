"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button, Tag } from "antd";
import { ArrowRight, Calendar, Users } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { trainings } from "@/data/trainings";
import styles from "./TrainingPreview.module.scss";

export default function TrainingPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tTraining = useTranslations("training");
  const locale = useLocale();
  const isHi = locale === "hi";

  const items = trainings.slice(0, 2);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          eyebrow={t("trainingSub")}
          title={t("trainingTitle")}
        />

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map((p) => (
            <motion.div
              key={p.slug}
              className={styles.card}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/training/${p.slug}`} className={styles.cardLink}>
                <div className={styles.imgWrap}>
                  <Image
                    src={p.image}
                    alt={isHi ? p.title.hi : p.title.en}
                    fill
                    sizes="(min-width: 768px) 580px, 90vw"
                    className={styles.img}
                  />
                  <div className={styles.priceTag}>
                    ₹{p.priceInr.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.tags}>
                    <Tag color={levelColor(p.level)}>{tCommon(p.level)}</Tag>
                    <span className={styles.duration}>
                      <Calendar size={14} />
                      {p.durationDays} {tCommon("days", { count: p.durationDays })}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>
                    {isHi ? p.title.hi : p.title.en}
                  </h3>
                  <p className={styles.cardDesc}>
                    {isHi ? p.shortDesc.hi : p.shortDesc.en}
                  </p>
                  <div className={styles.cardFoot}>
                    <span className={styles.seats}>
                      <Users size={14} />
                      {tCommon("seatsLeft", { count: p.seatsLeft })}
                    </span>
                    <span className={styles.enroll}>
                      {tCommon("enrollNow")} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.viewAll}>
          <Link href="/training">
            <Button
              type="default"
              size="large"
              icon={<ArrowRight size={18} />}
              iconPosition="end"
            >
              {tTraining("title")} — {tCommon("viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function levelColor(l: string) {
  if (l === "beginner") return "blue";
  if (l === "intermediate") return "gold";
  return "magenta";
}
