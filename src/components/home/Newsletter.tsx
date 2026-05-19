"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button, Input, message } from "antd";
import { Mail, Send } from "lucide-react";
import { viewport, fadeUp } from "@/lib/animations";
import styles from "./Newsletter.module.scss";

export default function Newsletter() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      message.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      message.success("Thank you for subscribing!");
      setEmail("");
      setLoading(false);
    }, 700);
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.card}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className={styles.iconWrap}>
            <Mail size={28} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.title}>{t("newsletterTitle")}</h3>
            <p className={styles.sub}>{t("newsletterSub")}</p>
          </div>
          <form className={styles.form} onSubmit={submit}>
            <Input
              type="email"
              size="large"
              placeholder={t("newsletterPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              icon={<Send size={16} />}
              iconPosition="end"
            >
              {t("subscribe")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
