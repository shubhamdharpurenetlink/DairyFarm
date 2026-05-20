"use client";

import { useLocale } from "next-intl";
import type { Bilingual, Locale } from "@/types";

export const useBilingual = () => {
  const locale = useLocale() as Locale;
  const isHi = locale === "hi";
  const pick = <T extends string = string>(b: { en: T; hi: T }): T =>
    isHi ? b.hi : b.en;
  return { locale, isHi, pick };
};

export const pickBilingual = (b: Bilingual, locale: string): string =>
  locale === "hi" ? b.hi : b.en;
