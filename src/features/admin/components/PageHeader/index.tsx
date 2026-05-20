import type { ReactNode } from "react";
import styles from "./PageHeader.module.scss";

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}

export default function PageHeader({ title, subtitle, actions, breadcrumb }: Props) {
  return (
    <header className={styles.header}>
      <div>
        {breadcrumb && <div className={styles.crumb}>{breadcrumb}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
