"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Home, Beef, GraduationCap, MessageCircle } from "lucide-react";
import styles from "./MobileBottomNav.module.scss";

const items = [
  { href: "/", key: "home" as const, Icon: Home },
  { href: "/cows", key: "cows" as const, Icon: Beef },
  { href: "/training", key: "training" as const, Icon: GraduationCap },
  { href: "/contact", key: "contact" as const, Icon: MessageCircle },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className={styles.nav} aria-label="Mobile bottom navigation">
      {items.map(({ href, key, Icon }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
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
