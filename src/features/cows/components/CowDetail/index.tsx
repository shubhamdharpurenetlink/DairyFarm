"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Tag, Button, Tabs } from "antd";
import { ArrowLeft, Droplet, Percent, MapPin, ArrowRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import type { CowBreed } from "@/types";
import styles from "./CowDetail.module.scss";

interface Props {
  cow: CowBreed;
}

export default function CowDetail({ cow }: Props) {
  const tCommon = useTranslations("common");
  const tCows = useTranslations("cows");
  const locale = useLocale();
  const isHi = locale === "hi";
  const [activeImg, setActiveImg] = useState(cow.image);

  const name = isHi ? cow.nameHi : cow.nameEn;
  const desc = isHi ? cow.description.hi : cow.description.en;
  const characteristics = isHi ? cow.characteristics.hi : cow.characteristics.en;
  const history = isHi ? cow.history.hi : cow.history.en;
  const temperament = isHi ? cow.temperament.hi : cow.temperament.en;
  const suitability = isHi ? cow.suitability.hi : cow.suitability.en;

  return (
    <article className={styles.page}>
      <div className={`container ${styles.top}`}>
        <Link href="/cows" className={styles.back}>
          <ArrowLeft size={16} /> {tCommon("back")}
        </Link>
      </div>

      <div className={`container ${styles.hero}`}>
        <motion.div
          className={styles.gallery}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.mainImg}>
            <Image
              src={activeImg}
              alt={name}
              fill
              sizes="(min-width: 1024px) 600px, 90vw"
              priority
              className={styles.img}
            />
          </div>
          <div className={styles.thumbs}>
            {cow.gallery.map((g, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === g ? styles.active : ""}`}
                onClick={() => setActiveImg(g)}
                aria-label={`Image ${i + 1}`}
              >
                <Image
                  src={g}
                  alt=""
                  fill
                  sizes="80px"
                  className={styles.thumbImg}
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tag color={tagColor(cow.category)} className={styles.cat}>
            {tCommon(cow.category)}
          </Tag>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.origin}>
            <MapPin size={16} /> {cow.origin}
          </p>
          <p className={styles.desc}>{desc}</p>

          <div className={styles.statsCards}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Droplet size={20} />
              </div>
              <span className={styles.statLbl}>{tCows("milkYield")}</span>
              <span className={styles.statVal}>
                {cow.milkYieldLitresPerDay.min}-{cow.milkYieldLitresPerDay.max}{" "}
                {tCows("litresDay")}
              </span>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Percent size={20} />
              </div>
              <span className={styles.statLbl}>{tCows("fatContent")}</span>
              <span className={styles.statVal}>{cow.fatPercent}%</span>
            </div>
          </div>

          <div className={styles.cta}>
            <Link href="/contact">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRight size={18} />}
                iconPosition="end"
              >
                {tCommon("bookVisit")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={`container ${styles.details}`}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <Tabs
          defaultActiveKey="char"
          size="large"
          items={[
            {
              key: "char",
              label: tCows("characteristics"),
              children: (
                <ul className={styles.list}>
                  {characteristics.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              ),
            },
            {
              key: "history",
              label: tCows("history"),
              children: <p className={styles.para}>{history}</p>,
            },
            {
              key: "temp",
              label: tCows("temperament"),
              children: <p className={styles.para}>{temperament}</p>,
            },
            {
              key: "suit",
              label: tCows("suitability"),
              children: <p className={styles.para}>{suitability}</p>,
            },
          ]}
        />
      </motion.div>
    </article>
  );
}

function tagColor(cat: string) {
  if (cat === "indigenous") return "green";
  if (cat === "exotic") return "gold";
  return "blue";
}
