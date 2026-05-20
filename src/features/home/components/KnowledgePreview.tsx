"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button, Tag } from "antd";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { diseaseRepo } from "@/services/repos";
import styles from "./KnowledgePreview.module.scss";

export default function KnowledgePreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tCare = useTranslations("care");
  const locale = useLocale();
  const isHi = locale === "hi";
  const diseases = useHydratedRepo(diseaseRepo);

  const items = diseases.slice(0, 3);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          eyebrow={t("knowledgeSub")}
          title={t("knowledgeTitle")}
        />

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map((d) => (
            <motion.article
              key={d.slug}
              className={styles.card}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/cow-care/${d.slug}`} className={styles.cardLink}>
                <div className={styles.imgWrap}>
                  <Image
                    src={d.image}
                    alt={isHi ? d.title.hi : d.title.en}
                    fill
                    sizes="(min-width: 768px) 400px, 90vw"
                    className={styles.img}
                  />
                </div>
                <div className={styles.cardBody}>
                  <Tag color="green" className={styles.cat}>
                    {tCare(`category${capital(d.category)}`)}
                  </Tag>
                  <h3 className={styles.cardTitle}>
                    {isHi ? d.title.hi : d.title.en}
                  </h3>
                  <p className={styles.cardSummary}>
                    {isHi ? d.summary.hi : d.summary.en}
                  </p>
                  <div className={styles.cardMeta}>
                    <Clock size={14} />
                    <span>{d.readTimeMin} min read</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className={styles.viewAll}>
          <Link href="/cow-care">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRight size={18} />}
              iconPosition="end"
            >
              {tCommon("viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function capital(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
