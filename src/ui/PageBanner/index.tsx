"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Container from "../Container";
import styles from "./PageBanner.module.scss";

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: ReactNode;
  image?: string;
  align?: "left" | "center";
}

export default function PageBanner({
  title,
  subtitle,
  eyebrow,
  actions,
  image,
  align = "center",
}: Props) {
  return (
    <section
      className={`${styles.banner} ${align === "left" ? styles.left : styles.center}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className={styles.overlay} aria-hidden />
      <Container size="lg" className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={styles.content}
        >
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
