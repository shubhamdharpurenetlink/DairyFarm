"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Segmented, Tag } from "antd";
import { Calendar, Users, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import StatCounter from "@/components/shared/StatCounter";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { trainings } from "@/data/trainings";
import type { Level } from "@/types";
import styles from "./TrainingList.module.scss";

type LevelFilter = "all" | Level;

export default function TrainingList() {
  const t = useTranslations("training");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isHi = locale === "hi";
  const [level, setLevel] = useState<LevelFilter>("all");

  const items = useMemo(
    () =>
      level === "all" ? trainings : trainings.filter((tr) => tr.level === level),
    [level],
  );

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          className={styles.statsBar}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
        >
          <Stat label={t("studentsTrained")} value={2400} suffix="+" />
          <Stat label={t("programsOffered")} value={trainings.length} />
          <Stat label={t("yearsExperience")} value={11} suffix="+" />
        </motion.div>

        <div className={styles.filterRow}>
          <Segmented
            value={level}
            onChange={(v) => setLevel(v as LevelFilter)}
            options={[
              { label: tCommon("all"), value: "all" },
              { label: tCommon("beginner"), value: "beginner" },
              { label: tCommon("intermediate"), value: "intermediate" },
              { label: tCommon("advanced"), value: "advanced" },
            ]}
            size="large"
          />
        </div>

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
              <Link href={`/training/${p.slug}`} className={styles.link}>
                <div className={styles.imgWrap}>
                  <Image
                    src={p.image}
                    alt={isHi ? p.title.hi : p.title.en}
                    fill
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className={styles.img}
                  />
                  <div className={styles.price}>
                    ₹{p.priceInr.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className={styles.body}>
                  <div className={styles.tags}>
                    <Tag color={levelColor(p.level)}>{tCommon(p.level)}</Tag>
                    <span className={styles.dur}>
                      <Calendar size={14} /> {p.durationDays}{" "}
                      {tCommon("days", { count: p.durationDays })}
                    </span>
                  </div>
                  <h3 className={styles.title}>
                    {isHi ? p.title.hi : p.title.en}
                  </h3>
                  <p className={styles.shortDesc}>
                    {isHi ? p.shortDesc.hi : p.shortDesc.en}
                  </p>
                  <div className={styles.foot}>
                    <span className={styles.seats}>
                      <Users size={14} />{" "}
                      {tCommon("seatsLeft", { count: p.seatsLeft })}
                    </span>
                    <span className={styles.cta}>
                      {tCommon("enrollNow")} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
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

function levelColor(l: string) {
  if (l === "beginner") return "blue";
  if (l === "intermediate") return "gold";
  return "magenta";
}
