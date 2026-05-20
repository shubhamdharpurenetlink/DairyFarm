"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Button } from "antd";
import { ArrowRight, Calendar, ChevronDown, Sparkles } from "lucide-react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tSite = useTranslations("site");

  const words = t("heroHeadline").split(" ");

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=1080&fit=crop&auto=format&q=75"
          className={styles.video}
          aria-hidden
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-cows-grazing-in-pasture-7611/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <motion.span
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={14} />
          {tSite("tagline")}
        </motion.span>

        <h1 className={styles.headline}>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className={styles.wordWrap}>
              <motion.span
                className={styles.word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t("heroSub")}
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/about">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRight size={18} />}
              iconPosition="end"
            >
              {tCommon("exploreFarm")}
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="large"
              icon={<Calendar size={18} />}
              className={styles.ghostBtn}
            >
              {tCommon("bookVisit")}
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.button
        className={styles.scrollHint}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}
