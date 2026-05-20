"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Milk,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Download,
} from "lucide-react";
import { Button } from "antd";
import { useHydratedSettings } from "@/hooks/useHydratedSettings";
import { routes } from "@/lib/routes";
import styles from "./Footer.module.scss";

const quickLinks = [
  { href: routes.home, key: "home" as const },
  { href: routes.about, key: "about" as const },
  { href: routes.products, key: "products" as const },
  { href: routes.cows, key: "cows" as const },
  { href: routes.contact, key: "contact" as const },
];

const knowMoreLinks = [
  { href: routes.care, key: "care" as const },
  { href: routes.gallery, key: "gallery" as const },
  { href: routes.training, key: "training" as const },
  { href: routes.admin.login, key: "admin" as const },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const tContact = useTranslations("contact");
  const site = useHydratedSettings();
  const year = new Date().getFullYear();
  const socials = [
    { icon: Facebook, url: site.socials.facebook, label: "Facebook" },
    { icon: Instagram, url: site.socials.instagram, label: "Instagram" },
    { icon: Youtube, url: site.socials.youtube, label: "YouTube" },
    { icon: Twitter, url: site.socials.twitter, label: "Twitter" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>
              <Milk size={22} />
            </span>
            <span>{tSite("name")}</span>
          </div>
          <p className={styles.tagline}>{t("tagline")}</p>
          <div className={styles.socials}>
            {socials.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialBtn}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t("quickLinks")}</h4>
          <ul className={styles.list}>
            {quickLinks.map((l) => (
              <li key={l.key}>
                <Link href={l.href}>{tNav(l.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t("knowMore")}</h4>
          <ul className={styles.list}>
            {knowMoreLinks.map((l) => (
              <li key={l.key}>
                <Link href={l.href}>{tNav(l.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t("contactUs")}</h4>
          <ul className={styles.list}>
            <li className={styles.contactItem}>
              <MapPin size={16} />
              <span>{tContact("addressValue")}</span>
            </li>
            <li className={styles.contactItem}>
              <Phone size={16} />
              <a href={`tel:${site.phone}`}>{tContact("phoneValue")}</a>
            </li>
            <li className={styles.contactItem}>
              <Mail size={16} />
              <a href={`mailto:${site.email}`}>{tContact("emailValue")}</a>
            </li>
          </ul>
          <Button
            icon={<Download size={16} />}
            className={styles.installBtn}
            onClick={() => {
              const evt = (window as unknown as { _deferredInstallPrompt?: Event })
                ._deferredInstallPrompt;
              if (evt) {
                (evt as Event & { prompt: () => void }).prompt();
              } else {
                alert("App install is only available on supported browsers.");
              }
            }}
          >
            {t("installApp")}
          </Button>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>
            © {year} {t("copyright")}
          </p>
          <div className={styles.legal}>
            <a href="#">{t("privacyPolicy")}</a>
            <span>·</span>
            <a href="#">{t("terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
