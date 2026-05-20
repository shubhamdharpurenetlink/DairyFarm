"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Form, Input, Button, Card, Alert } from "antd";
import { Lock, Mail, ShieldCheck, Milk } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useAdminAuth } from "@/stores/useAdminAuth";
import { routes } from "@/lib/routes";
import { ADMIN_DEMO_EMAIL, ADMIN_DEMO_PASSWORD } from "@/lib/constants";
import styles from "./AdminLogin.module.scss";

export default function AdminLogin() {
  const t = useTranslations("admin");
  const tSite = useTranslations("site");
  const router = useRouter();
  const login = useAdminAuth((s) => s.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (vals: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      await login(vals.email, vals.password);
      router.replace(routes.admin.dashboard);
    } catch {
      setError(t("invalidCreds"));
    } finally {
      setLoading(false);
    }
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
            <Milk size={26} />
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
            message={t("demoCreds")}
            description={`${ADMIN_DEMO_EMAIL} / ${ADMIN_DEMO_PASSWORD}`}
            className={styles.alert}
          />

          {error && (
            <Alert
              type="error"
              showIcon
              message={error}
              className={styles.alert}
            />
          )}

          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ email: ADMIN_DEMO_EMAIL, password: ADMIN_DEMO_PASSWORD }}
          >
            <Form.Item
              name="email"
              label={t("email")}
              rules={[{ required: true, type: "email" }]}
            >
              <Input prefix={<Mail size={14} />} size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("password")}
              rules={[{ required: true, min: 4 }]}
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
