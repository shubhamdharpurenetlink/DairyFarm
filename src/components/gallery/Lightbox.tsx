"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/types";
import styles from "./Lightbox.module.scss";

interface Props {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
  locale: string;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  locale,
}: Props) {
  const isHi = locale === "hi";
  const current = images[currentIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate(Math.min(currentIndex + 1, images.length - 1));
      if (e.key === "ArrowLeft") onNavigate(Math.max(currentIndex - 1, 0));
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className={`${styles.btn} ${styles.close}`}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {currentIndex > 0 && (
        <button
          type="button"
          className={`${styles.btn} ${styles.prev}`}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          type="button"
          className={`${styles.btn} ${styles.next}`}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
      )}

      <motion.div
        key={current.id}
        className={styles.frame}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.imgWrap}>
          <Image
            src={current.url}
            alt={isHi ? current.title.hi : current.title.en}
            fill
            sizes="90vw"
            className={styles.img}
            priority
          />
        </div>
        <div className={styles.caption}>
          {isHi ? current.title.hi : current.title.en}
          <span className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
