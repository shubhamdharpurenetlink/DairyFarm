"use client";

import { useTranslations } from "next-intl";
import { useBilingual } from "@/hooks/useBilingual";
import type { ProductVariant } from "@/types";
import { formatInr } from "@/lib/formatters";
import styles from "./VariantPicker.module.scss";

interface Props {
  variants: ProductVariant[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function VariantPicker({ variants, selectedId, onChange }: Props) {
  const { pick } = useBilingual();
  const t = useTranslations("products");
  return (
    <div
      className={styles.picker}
      role="radiogroup"
      aria-label={t("selectVariant")}
    >
      {variants.map((v) => {
        const active = v.id === selectedId;
        const out = v.stockQty === 0;
        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={out}
            onClick={() => onChange(v.id)}
            className={`${styles.option} ${active ? styles.active : ""} ${out ? styles.out : ""}`}
          >
            <span className={styles.label}>{pick(v.label)}</span>
            <span className={styles.price}>{formatInr(v.priceInr)}</span>
            {out && <span className={styles.outBadge}>{t("outOfStock")}</span>}
          </button>
        );
      })}
    </div>
  );
}
