import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import styles from "./EmptyState.module.scss";

interface Props {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  title = "Nothing here yet",
  description,
  icon,
  action,
}: Props) {
  return (
    <div className={styles.empty} role="status">
      <div className={styles.icon}>{icon ?? <Inbox size={36} />}</div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
