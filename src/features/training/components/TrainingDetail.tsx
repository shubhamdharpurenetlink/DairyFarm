"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Tag, Card } from "antd";
import {
  ArrowLeft,
  Calendar,
  Clock,
  IndianRupee,
  Users,
  Award,
  CheckCircle2,
} from "lucide-react";
import EnrollmentForm from "./EnrollmentForm";
import { fadeUp, viewport } from "@/lib/animations";
import type { TrainingProgram } from "@/types";
import styles from "./TrainingDetail.module.scss";

interface Props {
  program: TrainingProgram;
}

export default function TrainingDetail({ program }: Props) {
  const t = useTranslations("training");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isHi = locale === "hi";

  const title = isHi ? program.title.hi : program.title.en;
  const longDesc = isHi ? program.longDesc.hi : program.longDesc.en;
  const syllabus = isHi ? program.syllabus.hi : program.syllabus.en;
  const includes = isHi ? program.includes.hi : program.includes.en;
  const schedule = isHi ? program.schedule.hi : program.schedule.en;
  const instructorRole = isHi
    ? program.instructor.role.hi
    : program.instructor.role.en;

  return (
    <article className={styles.page}>
      <div className={styles.heroWrap}>
        <Image
          src={program.image}
          alt={title}
          fill
          priority
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <Link href="/training" className={styles.back}>
            <ArrowLeft size={16} /> {tCommon("back")}
          </Link>
          <div className={styles.heroTags}>
            <Tag color={levelColor(program.level)}>{tCommon(program.level)}</Tag>
            <span>
              <Calendar size={14} /> {program.durationDays}{" "}
              {tCommon("days", { count: program.durationDays })}
            </span>
            <span>
              <Users size={14} /> {tCommon("seatsLeft", { count: program.seatsLeft })}
            </span>
          </div>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.left}>
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <p className={styles.longDesc}>{longDesc}</p>
          </motion.section>

          <motion.section
            className={styles.block}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <h3>{t("syllabus")}</h3>
            <ol className={styles.syllabus}>
              {syllabus.map((s, i) => (
                <li key={i}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </motion.section>

          <motion.section
            className={styles.block}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <h3>{t("whatsIncluded")}</h3>
            <ul className={styles.includes}>
              {includes.map((inc, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} /> <span>{inc}</span>
                </li>
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
            <h3>{t("instructor")}</h3>
            <Card className={styles.instructorCard}>
              <div className={styles.instructor}>
                <Image
                  src={program.instructor.avatar}
                  alt={program.instructor.name}
                  width={80}
                  height={80}
                  className={styles.instructorImg}
                />
                <div>
                  <div className={styles.instructorName}>
                    {program.instructor.name}
                  </div>
                  <div className={styles.instructorRole}>{instructorRole}</div>
                  <div className={styles.instructorYears}>
                    {program.instructor.bioYears}+ years experience
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>

        <motion.aside
          className={styles.sidebar}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
        >
          <Card className={styles.priceCard}>
            <div className={styles.priceRow}>
              <IndianRupee size={28} />
              <span className={styles.price}>
                {program.priceInr.toLocaleString("en-IN")}
              </span>
            </div>
            <div className={styles.priceMetaRow}>
              <div>
                <Clock size={16} />
                <span>{t("duration")}</span>
              </div>
              <strong>
                {program.durationDays} {tCommon("days", { count: program.durationDays })}
              </strong>
            </div>
            <div className={styles.priceMetaRow}>
              <div>
                <Award size={16} />
                <span>{t("level")}</span>
              </div>
              <strong>{tCommon(program.level)}</strong>
            </div>
            <div className={styles.priceMetaRow}>
              <div>
                <Calendar size={16} />
                <span>{t("schedule")}</span>
              </div>
              <strong>{schedule}</strong>
            </div>
            <div className={styles.seatsBadge}>
              <Users size={16} />
              {tCommon("seatsLeft", { count: program.seatsLeft })}
            </div>
          </Card>

          <Card className={styles.formCard} title={t("enrollTitle")}>
            <EnrollmentForm program={program} />
          </Card>
        </motion.aside>
      </div>
    </article>
  );
}

function levelColor(l: string) {
  if (l === "beginner") return "blue";
  if (l === "intermediate") return "gold";
  return "magenta";
}
