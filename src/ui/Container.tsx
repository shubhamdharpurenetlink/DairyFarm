import type { ReactNode } from "react";
import styles from "./Container.module.scss";

interface Props {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  as?: "div" | "section" | "main";
}

export default function Container({
  children,
  size = "lg",
  className,
  as: Tag = "div",
}: Props) {
  return (
    <Tag className={`${styles.container} ${styles[size]} ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
