"use client";

import { useBilingual } from "@/hooks/useBilingual";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { categoryRepo } from "@/services/repos";
import type { ProductCategory } from "@/types";
import styles from "./CategoryChips.module.scss";

interface Props {
  value: ProductCategory | "all";
  onChange: (value: ProductCategory | "all") => void;
  allLabel: string;
}

export default function CategoryChips({ value, onChange, allLabel }: Props) {
  const { pick } = useBilingual();
  const productCategories = useHydratedRepo(categoryRepo);
  return (
    <div className={styles.chips} role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={value === "all"}
        onClick={() => onChange("all")}
        className={`${styles.chip} ${value === "all" ? styles.active : ""}`}
      >
        {allLabel}
      </button>
      {productCategories.map((c) => (
        <button
          key={c.slug}
          type="button"
          role="tab"
          aria-selected={value === c.slug}
          onClick={() => onChange(c.slug)}
          className={`${styles.chip} ${value === c.slug ? styles.active : ""}`}
          style={value === c.slug ? { borderColor: c.color, color: c.color } : undefined}
        >
          {pick(c.name)}
        </button>
      ))}
    </div>
  );
}
