import type { ReactNode } from "react";
import { Card } from "antd";
import styles from "./FormShell.module.scss";

interface Props {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function FormShell({ children, sidebar }: Props) {
  return (
    <div className={styles.shell}>
      <Card className={styles.main} bodyStyle={{ padding: 24 }}>
        {children}
      </Card>
      {sidebar && <aside className={styles.side}>{sidebar}</aside>}
    </div>
  );
}
