"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useHydratedSettings } from "@/hooks/useHydratedSettings";
import styles from "./WhatsAppFAB.module.scss";

export default function WhatsAppFAB() {
  const site = useHydratedSettings();
  const number = site.whatsapp.replace(/[^0-9]/g, "");
  const link = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hello Laxmi Dairy, I would like to know more.",
  )}`;
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08, rotate: -8 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className={styles.pulse} />
      <MessageCircle size={28} fill="white" />
    </motion.a>
  );
}
