"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, Empty } from "antd";
import { Play } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import Lightbox from "./Lightbox";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { galleryRepo } from "@/services/repos";
import type { GalleryItem } from "@/types";
import styles from "./GalleryView.module.scss";

export default function GalleryView() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const isHi = locale === "hi";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gallery = useHydratedRepo(galleryRepo);

  const photos = gallery.filter((g) => g.type === "photo");
  const videos = gallery.filter((g) => g.type === "video");

  const handleOpen = (item: GalleryItem) => {
    const idx = photos.findIndex((p) => p.id === item.id);
    setActiveIndex(idx >= 0 ? idx : null);
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <Tabs
          defaultActiveKey="photos"
          size="large"
          centered
          items={[
            {
              key: "photos",
              label: t("tabPhotos"),
              children: (
                <motion.div
                  className={styles.masonry}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                >
                  {photos.map((p) => (
                    <motion.button
                      key={p.id}
                      type="button"
                      onClick={() => handleOpen(p)}
                      variants={fadeUp}
                      className={styles.photo}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={p.thumbnail}
                        alt={isHi ? p.title.hi : p.title.en}
                        width={600}
                        height={Math.round(600 / (p.aspectRatio ?? 1.5))}
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className={styles.photoImg}
                      />
                      <div className={styles.photoOverlay}>
                        <span className={styles.photoTitle}>
                          {isHi ? p.title.hi : p.title.en}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ),
            },
            {
              key: "videos",
              label: t("tabVideos"),
              children: (
                <motion.div
                  className={styles.videoGrid}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                >
                  {videos.map((v) => (
                    <motion.a
                      key={v.id}
                      href={v.url.replace("/embed/", "/watch?v=")}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeUp}
                      className={styles.videoCard}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.videoThumbWrap}>
                        <Image
                          src={v.thumbnail}
                          alt={isHi ? v.title.hi : v.title.en}
                          fill
                          sizes="(min-width: 1024px) 400px, 90vw"
                          className={styles.videoThumb}
                        />
                        <div className={styles.playOverlay}>
                          <span className={styles.playBtn}>
                            <Play size={28} fill="white" />
                          </span>
                        </div>
                      </div>
                      <h4 className={styles.videoTitle}>
                        {isHi ? v.title.hi : v.title.en}
                      </h4>
                    </motion.a>
                  ))}
                </motion.div>
              ),
            },
            {
              key: "tour",
              label: t("tabTour"),
              children: (
                <Empty
                  description={t("tourComingSoon")}
                  className={styles.empty}
                />
              ),
            },
          ]}
        />
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            images={photos}
            currentIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
            locale={locale}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
