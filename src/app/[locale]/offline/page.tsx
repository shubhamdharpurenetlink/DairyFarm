"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "antd";
import { WifiOff, RefreshCw } from "lucide-react";
import styles from "./offline.module.scss";

export default function OfflinePage() {
  const t = useTranslations("pwa");
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.icon}>
          <WifiOff size={48} />
        </div>
        <h1 className={styles.title}>{t("offlineTitle")}</h1>
        <p className={styles.desc}>{t("offlineDesc")}</p>
        <Button
          type="primary"
          size="large"
          icon={<RefreshCw size={16} />}
          onClick={() => window.location.reload()}
        >
          {t("retry")}
        </Button>
      </motion.div>
    </section>
  );
}
