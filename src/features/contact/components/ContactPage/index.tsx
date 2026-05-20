"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "antd";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import ContactForm from "../ContactForm";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { useHydratedSettings } from "@/hooks/useHydratedSettings";
import styles from "./ContactPage.module.scss";

export default function ContactPage() {
  const t = useTranslations("contact");
  const site = useHydratedSettings();

  const items = [
    {
      Icon: MapPin,
      label: t("address"),
      value: t("addressValue"),
      href: `https://maps.google.com/?q=${encodeURIComponent(t("addressValue"))}`,
    },
    {
      Icon: Phone,
      label: t("phone"),
      value: t("phoneValue"),
      href: `tel:${site.phone}`,
    },
    {
      Icon: MessageCircle,
      label: t("whatsapp"),
      value: t("whatsappValue"),
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
    },
    {
      Icon: Mail,
      label: t("email"),
      value: t("emailValue"),
      href: `mailto:${site.email}`,
    },
    { Icon: Clock, label: t("hours"), value: t("hoursValue"), href: null },
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          className={styles.infoGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {items.map(({ Icon, label, value, href }) => (
            <motion.div key={label} variants={fadeUp}>
              <Card className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Icon size={20} />
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>{label}</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={styles.infoVal}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className={styles.infoVal}>{value}</span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.formMapGrid}>
          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
          >
            <Card className={styles.formCard}>
              <ContactForm />
            </Card>
          </motion.div>

          <motion.div
            className={styles.mapWrap}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
          >
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.95%2C29.62%2C77.05%2C29.72&amp;layer=mapnik&amp;marker=29.67%2C77.00"
              className={styles.map}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
