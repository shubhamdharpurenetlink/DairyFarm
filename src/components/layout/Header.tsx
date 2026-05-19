"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Drawer, Button } from "antd";
import { Menu as MenuIcon, X, Milk } from "lucide-react";
import { motion } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/cows", key: "cows" },
  { href: "/cow-care", key: "care" },
  { href: "/gallery", key: "gallery" },
  { href: "/training", key: "training" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setDrawerOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={tSite("name")}>
          <span className={styles.logoIcon}>
            <Milk size={22} />
          </span>
          <span className={styles.logoText}>{tSite("name")}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <LanguageToggle />
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={close}
        placement="right"
        width={300}
        closeIcon={<X size={20} />}
        title={tSite("name")}
        styles={{ body: { padding: 0 } }}
      >
        <nav className={styles.drawerNav} aria-label="Mobile">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={close}
                className={`${styles.drawerLink} ${active ? styles.active : ""}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
        <div className={styles.drawerFooter}>
          <Button type="primary" block size="large" onClick={close}>
            <Link href="/contact">{t("contact")}</Link>
          </Button>
        </div>
      </Drawer>
    </motion.header>
  );
}
