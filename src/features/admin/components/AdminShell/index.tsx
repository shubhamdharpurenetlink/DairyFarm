"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Layout, Avatar, Dropdown, Button } from "antd";
import { Menu as MenuIcon, X, LogOut, ExternalLink, Milk } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useAdminAuth } from "@/stores/useAdminAuth";
import { routes } from "@/lib/routes";
import { initials } from "@/lib/formatters";
import AdminSidebar from "../AdminSidebar";
import LanguageToggle from "@/layout/LanguageToggle";
import RepoErrorToaster from "../RepoErrorToaster";
import styles from "./AdminShell.module.scss";

interface Props {
  children: ReactNode;
}

export default function AdminShell({ children }: Props) {
  const router = useRouter();
  const t = useTranslations("admin");
  const session = useAdminAuth((s) => s.session);
  const logout = useAdminAuth((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace(routes.admin.login);
  };

  if (!session) return <>{children}</>;

  return (
    <Layout className={styles.shell}>
      <RepoErrorToaster />
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Layout className={styles.main}>
        <Layout.Header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMobileOpen(true)}
            aria-label={t("openMenu")}
          >
            <MenuIcon size={20} />
          </button>
          <div className={styles.brand}>
            <Milk size={18} />
            <span>{t("brand")}</span>
          </div>
          <div className={styles.topbarRight}>
            <LanguageToggle />
            <Button
              type="text"
              icon={<ExternalLink size={16} />}
              onClick={() => router.push(routes.home)}
              className={styles.viewSite}
            >
              {t("viewSite")}
            </Button>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "logout",
                    label: t("logout"),
                    icon: <LogOut size={14} />,
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <button className={styles.userBtn} type="button">
                <Avatar
                  size={36}
                  style={{ background: "#2E7D5B", fontWeight: 600 }}
                >
                  {initials(session.user.name)}
                </Avatar>
                <span className={styles.userMeta}>
                  <span className={styles.userName}>{session.user.name}</span>
                  <span className={styles.userRole}>{session.user.role}</span>
                </span>
              </button>
            </Dropdown>
          </div>
        </Layout.Header>
        <Layout.Content className={styles.content}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}

export function MobileClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      className={styles.closeBtn}
      onClick={onClose}
      aria-label="Close"
    >
      <X size={18} />
    </button>
  );
}
