"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Layout, Menu, Drawer } from "antd";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import { Milk } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Receipt,
  Beef,
  Stethoscope,
  GraduationCap,
  Images,
  Users,
  Building2,
  Trophy,
  MessageSquareQuote,
  Mail,
  ClipboardList,
  Bookmark,
  Settings,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { adminNavGroups } from "@/lib/routes";
import styles from "./AdminSidebar.module.scss";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  products: ShoppingBag,
  categories: Layers,
  orders: Receipt,
  cows: Beef,
  diseases: Stethoscope,
  trainings: GraduationCap,
  gallery: Images,
  team: Users,
  facilities: Building2,
  awards: Trophy,
  testimonials: MessageSquareQuote,
  enquiries: Mail,
  enrollments: ClipboardList,
  subscribers: Bookmark,
  siteContent: FileText,
  settings: Settings,
};

interface Props {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onClose }: Props) {
  const t = useTranslations("admin");
  const router = useRouter();
  const pathname = usePathname();

  const items = useMemo(
    () =>
      adminNavGroups.map((g) => ({
        key: g.key,
        label: <span className={styles.groupLabel}>{t(`groups.${g.key}`)}</span>,
        type: "group" as const,
        children: g.items.map((item) => {
          const Icon = ICONS[item.key] ?? LayoutDashboard;
          return {
            key: item.href,
            icon: <Icon size={17} />,
            label: t(`menu.${item.key}`),
          };
        }),
      })),
    [t],
  );

  const selectedKey =
    [...adminNavGroups.flatMap((g) => g.items)]
      .map((i) => i.href)
      .sort((a, b) => b.length - a.length)
      .find((href) => pathname === href || pathname.startsWith(`${href}/`)) ?? "";

  const inner = (
    <>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>
          <Milk size={20} />
        </span>
        <span>
          {t("brand")}
          <small>{t("brandSub")}</small>
        </span>
      </div>
      <Menu
        mode="inline"
        items={items}
        selectedKeys={selectedKey ? [selectedKey] : []}
        onClick={({ key }) => {
          router.push(key as string);
          onClose();
        }}
        className={styles.menu}
      />
      <div className={styles.footer}>
        <Link href="/" className={styles.exit}>
          {t("exitToPublic")}
        </Link>
      </div>
    </>
  );

  return (
    <>
      <Layout.Sider
        width={260}
        theme="light"
        className={styles.sider}
        breakpoint="sm"
        collapsedWidth={0}
        trigger={null}
      >
        {inner}
      </Layout.Sider>
      <Drawer
        open={mobileOpen}
        onClose={onClose}
        placement="left"
        width={260}
        styles={{ body: { padding: 0 } }}
        closeIcon={null}
        title={null}
        className={styles.drawer}
      >
        {inner}
      </Drawer>
    </>
  );
}
