"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Form, Input, Button, Card, Alert } from "antd";
import { Lock, Mail, ShieldCheck, Milk } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import styles from "./AdminLogin.module.scss";

export default function AdminLogin() {
  const t = useTranslations("admin");
  const tSite = useTranslations("site");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (vals: { email: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      console.info("Demo login:", vals);
      router.push("/admin/dashboard");
    }, 700);
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <Milk size={28} />
          </div>
          <h1 className={styles.brandTitle}>{tSite("name")}</h1>
        </div>

        <Card className={styles.formCard}>
          <div className={styles.head}>
            <ShieldCheck size={28} className={styles.headIcon} />
            <h2>{t("loginTitle")}</h2>
            <p>{t("loginSub")}</p>
          </div>

          <Alert
            type="info"
            showIcon
            message={t("comingSoon")}
            description={t("comingSoonDesc")}
            className={styles.alert}
          />

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label={t("email")}
              rules={[{ required: true, type: "email" }]}
              initialValue="admin@laxmidairy.in"
            >
              <Input prefix={<Mail size={14} />} size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("password")}
              rules={[{ required: true, min: 4 }]}
              initialValue="demo1234"
            >
              <Input.Password prefix={<Lock size={14} />} size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              {t("signIn")}
            </Button>
          </Form>
        </Card>
      </motion.div>
    </section>
  );
}
