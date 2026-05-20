"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Home, ShoppingBag, Beef, GraduationCap, MessageCircle, type LucideIcon } from "lucide-react";
import { mobileBottomNav } from "@/lib/routes";
import styles from "./MobileBottomNav.module.scss";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  products: ShoppingBag,
  cows: Beef,
  training: GraduationCap,
  contact: MessageCircle,
};

export default function MobileBottomNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className={styles.nav} aria-label="Mobile bottom navigation">
      {mobileBottomNav.map(({ href, key }) => {
        const Icon = ICONS[key] ?? Home;
        const active =
          href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={key}
            href={href}
            className={`${styles.item} ${active ? styles.active : ""}`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
            <span>{t(key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
