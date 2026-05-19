"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Tag, Alert, Steps } from "antd";
import {
  ArrowLeft,
  Clock,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import type { Disease } from "@/types";
import styles from "./DiseaseDetail.module.scss";

interface Props {
  disease: Disease;
}

export default function DiseaseDetail({ disease }: Props) {
  const t = useTranslations("care");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isHi = locale === "hi";

  const title = isHi ? disease.title.hi : disease.title.en;
  const summary = isHi ? disease.summary.hi : disease.summary.en;
  const symptoms = isHi ? disease.symptoms.hi : disease.symptoms.en;
  const causes = isHi ? disease.causes.hi : disease.causes.en;
  const prevention = isHi ? disease.prevention.hi : disease.prevention.en;
  const treatment = isHi ? disease.treatment.hi : disease.treatment.en;

  return (
    <article className={styles.page}>
      <div className={styles.heroWrap}>
        <Image
          src={disease.image}
          alt={title}
          fill
          priority
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <Link href="/cow-care" className={styles.back}>
            <ArrowLeft size={16} /> {tCommon("back")}
          </Link>
          <Tag color="green" className={styles.cat}>
            {t(`category${capital(disease.category)}`)}
          </Tag>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span>
              <Clock size={14} /> {disease.readTimeMin} min read
            </span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <Alert type="warning" message={t("disclaimer")} showIcon className={styles.disclaimer} />

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <p className={styles.summary}>{summary}</p>
        </motion.section>

        <motion.section
          className={styles.block}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <SectionTitle icon={Activity} title={t("symptoms")} />
          <ul className={styles.list}>
            {symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className={styles.block}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <SectionTitle icon={AlertTriangle} title={t("causes")} />
          <ul className={styles.list}>
            {causes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className={styles.block}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <SectionTitle icon={ShieldCheck} title={t("prevention")} />
          <ul className={styles.list}>
            {prevention.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className={`${styles.block} ${styles.treatmentBlock}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <SectionTitle icon={Stethoscope} title={t("treatment")} />
          <Steps
            direction="vertical"
            current={treatment.length}
            items={treatment.map((step, i) => ({
              title: `Step ${i + 1}`,
              description: step,
            }))}
          />
        </motion.section>
      </div>
    </article>
  );
}

import type { LucideIcon } from "lucide-react";
function SectionTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className={styles.blockTitle}>
      <span className={styles.blockIcon}>
        <Icon size={20} />
      </span>
      <h3>{title}</h3>
    </div>
  );
}

function capital(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
