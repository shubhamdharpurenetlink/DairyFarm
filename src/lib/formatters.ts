import type { Locale } from "@/types";

export const formatInr = (n: number): string =>
  `₹${n.toLocaleString("en-IN")}`;

export const formatInrCompact = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return formatInr(n);
};

export const formatNumber = (n: number, locale: Locale = "en"): string =>
  n.toLocaleString(locale === "hi" ? "hi-IN" : "en-IN");

export const formatDate = (iso: string, locale: Locale = "en"): string =>
  new Date(iso).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatRelativeTime = (iso: string, locale: Locale = "en"): string => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return locale === "hi" ? "अभी" : "just now";
  if (diffMin < 60)
    return locale === "hi" ? `${diffMin} मिनट पहले` : `${diffMin} min ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)
    return locale === "hi" ? `${diffH} घंटे पहले` : `${diffH} hours ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7)
    return locale === "hi" ? `${diffD} दिन पहले` : `${diffD} days ago`;
  return formatDate(iso, locale);
};

export const discountPercent = (mrp: number, price: number): number => {
  if (mrp <= 0 || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const truncate = (s: string, n: number): string =>
  s.length > n ? `${s.slice(0, n - 1)}…` : s;

export const initials = (name: string): string =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
