import { Loader2 } from "lucide-react";
import styles from "./Loader.module.scss";

interface Props {
  label?: string;
  fullPage?: boolean;
}

export default function Loader({ label, fullPage }: Props) {
  return (
    <div className={`${styles.loader} ${fullPage ? styles.full : ""}`}>
      <Loader2 className={styles.spin} size={28} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
