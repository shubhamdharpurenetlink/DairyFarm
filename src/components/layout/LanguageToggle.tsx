"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Segmented } from "antd";
import styles from "./LanguageToggle.module.scss";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string | number) => {
    const next = value as "en" | "hi";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <Segmented
      className={styles.toggle}
      value={locale}
      onChange={handleChange}
      disabled={isPending}
      options={[
        { label: "EN", value: "en" },
        { label: "हि", value: "hi" },
      ]}
    />
  );
}
