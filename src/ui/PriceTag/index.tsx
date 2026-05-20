"use client";

import { discountPercent, formatInr } from "@/lib/formatters";
import styles from "./PriceTag.module.scss";

interface Props {
  priceInr: number;
  mrpInr?: number;
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
}

export default function PriceTag({
  priceInr,
  mrpInr,
  size = "md",
  align = "start",
}: Props) {
  const discount = mrpInr ? discountPercent(mrpInr, priceInr) : 0;
  return (
    <div
      className={`${styles.priceTag} ${styles[size]} ${styles[`align-${align}`]}`}
    >
      <span className={styles.price}>{formatInr(priceInr)}</span>
      {mrpInr && mrpInr > priceInr && (
        <>
          <span className={styles.mrp}>{formatInr(mrpInr)}</span>
          <span className={styles.discount}>{discount}% OFF</span>
        </>
      )}
    </div>
  );
}
