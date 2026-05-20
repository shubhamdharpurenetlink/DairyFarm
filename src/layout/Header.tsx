"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Drawer, Button, Badge } from "antd";
import { Menu as MenuIcon, X, Milk, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import { publicNav, routes } from "@/lib/routes";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useCartStore } from "@/stores/useCartStore";
import styles from "./Header.module.scss";

export default function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();
  const { scrolled } = useScrollDirection();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openDrawer);

  const close = () => setDrawerOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <Link href={routes.home} className={styles.logo} aria-label={tSite("name")}>
          <span className={styles.logoIcon}>
            <Milk size={22} />
          </span>
          <span className={styles.logoText}>{tSite("name")}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {publicNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageToggle />
          <button
            type="button"
            className={styles.cartBtn}
            onClick={openCart}
            aria-label="Cart"
          >
            <Badge count={itemCount} size="small" offset={[-2, 4]} color="#2E7D5B">
              <ShoppingBag size={22} />
            </Badge>
          </button>
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
          {publicNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={close}
              className={`${styles.drawerLink} ${isActive(item.href) ? styles.active : ""}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <Link href={routes.contact} onClick={close}>
            <Button type="primary" block size="large">
              {t("contact")}
            </Button>
          </Link>
        </div>
      </Drawer>
    </motion.header>
  );
}
