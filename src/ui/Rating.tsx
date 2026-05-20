import { Star } from "lucide-react";
import styles from "./Rating.module.scss";

interface Props {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
}

export default function Rating({ value, count, size = 14, showValue = true }: Props) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className={styles.rating}>
      <Star size={size} fill="currentColor" />
      {showValue && <span className={styles.value}>{rounded.toFixed(1)}</span>}
      {count !== undefined && (
        <span className={styles.count}>({count})</span>
      )}
    </span>
  );
}
