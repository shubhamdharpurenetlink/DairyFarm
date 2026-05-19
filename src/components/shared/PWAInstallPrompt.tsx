"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "antd";
import { Download, X } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import styles from "./PWAInstallPrompt.module.scss";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const t = useTranslations("pwa");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [show, setShow] = useState(false);
  const { installPromptDismissed, dismissInstallPrompt, incrementPageViews } =
    useUIStore();

  useEffect(() => {
    incrementPageViews();
  }, [incrementPageViews]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      setDeferred(evt);
      (window as unknown as { _deferredInstallPrompt?: Event })._deferredInstallPrompt =
        evt;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (installPromptDismissed || !deferred) return;
    const t = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(t);
  }, [deferred, installPromptDismissed]);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShow(false);
  };

  const dismiss = () => {
    setShow(false);
    dismissInstallPrompt();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.prompt}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button
            onClick={dismiss}
            className={styles.close}
            aria-label="dismiss"
          >
            <X size={16} />
          </button>
          <div className={styles.icon}>
            <Download size={22} />
          </div>
          <div className={styles.text}>
            <h4>{t("installTitle")}</h4>
            <p>{t("installDesc")}</p>
          </div>
          <div className={styles.actions}>
            <Button onClick={dismiss}>{t("dismiss")}</Button>
            <Button type="primary" onClick={install}>
              {t("install")}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
