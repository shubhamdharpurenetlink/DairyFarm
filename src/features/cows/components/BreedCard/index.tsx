"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Tag, Checkbox } from "antd";
import { ArrowRight } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";
import type { CowBreed } from "@/types";
import styles from "./BreedCard.module.scss";

interface Props {
  cow: CowBreed;
  locale: string;
}

export default function BreedCard({ cow, locale }: Props) {
  const tCommon = useTranslations("common");
  const tCows = useTranslations("cows");
  const isHi = locale === "hi";
  const { compareList, toggleCompare } = useUIStore();
  const checked = compareList.includes(cow.slug);

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imgWrap}>
        <Image
          src={cow.image}
          alt={isHi ? cow.nameHi : cow.nameEn}
          fill
          sizes="(min-width: 1024px) 320px, 80vw"
          className={styles.img}
        />
        <div className={styles.topRow}>
          <Tag color={tagColor(cow.category)} className={styles.catTag}>
            {tCommon(cow.category)}
          </Tag>
          <label
            className={styles.compareToggle}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={checked}
              onChange={() => toggleCompare(cow.slug)}
            >
              {tCommon("compare")}
            </Checkbox>
          </label>
        </div>
      </div>

      <Link href={`/cows/${cow.slug}`} className={styles.link}>
        <div className={styles.body}>
          <div>
            <h3 className={styles.title}>
              {isHi ? cow.nameHi : cow.nameEn}
            </h3>
            <p className={styles.origin}>{cow.origin}</p>
          </div>
          <p className={styles.shortDesc}>
            {isHi ? cow.shortDesc.hi : cow.shortDesc.en}
          </p>

          <div className={styles.stats}>
            <div>
              <span className={styles.lbl}>{tCows("milkYield")}</span>
              <span className={styles.val}>
                {cow.milkYieldLitresPerDay.min}-{cow.milkYieldLitresPerDay.max}{" "}
                {tCows("litresDay")}
              </span>
            </div>
            <div>
              <span className={styles.lbl}>{tCows("fatContent")}</span>
              <span className={styles.val}>{cow.fatPercent}%</span>
            </div>
          </div>

          <span className={styles.cta}>
            {tCows("viewDetails")} <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function tagColor(cat: string) {
  if (cat === "indigenous") return "green";
  if (cat === "exotic") return "gold";
  return "blue";
}
