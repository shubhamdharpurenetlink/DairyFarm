"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Card, Statistic, Tag, Avatar } from "antd";
import {
  ShoppingBag,
  Mail,
  Users,
  IndianRupee,
  ArrowUpRight,
  TrendingUp,
  Package,
} from "lucide-react";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import {
  productRepo,
  orderRepo,
  enquiryRepo,
  subscriberRepo,
  enrollmentRepo,
} from "@/services/repos";
import { formatInr, formatInrCompact, formatRelativeTime } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import StatusTag from "../../../components/StatusTag";
import PageHeader from "../../../components/PageHeader";
import styles from "./Dashboard.module.scss";

export default function DashboardView() {
  const t = useTranslations("admin.dashboard");
  const products = useHydratedRepo(productRepo);
  const orders = useHydratedRepo(orderRepo);
  const enquiries = useHydratedRepo(enquiryRepo);
  const enrollments = useHydratedRepo(enrollmentRepo);
  const subscribers = useHydratedRepo(subscriberRepo);
  const { locale } = useBilingual();

  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalInr, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const lowStock = products.filter((p) =>
    p.variants.some((v) => v.stockQty < 20),
  ).length;

  const stats = [
    {
      key: "revenue",
      label: t("revenue"),
      value: formatInrCompact(revenue),
      sub: `${orders.length} ${t("orders")}`,
      Icon: IndianRupee,
      color: "#10B981",
    },
    {
      key: "products",
      label: t("products"),
      value: products.length,
      sub: lowStock > 0 ? `${lowStock} ${t("lowStock")}` : t("inStock"),
      Icon: Package,
      color: "#3B82F6",
    },
    {
      key: "enquiries",
      label: t("newEnquiries"),
      value: newEnquiries,
      sub: `${enquiries.length} ${t("total")}`,
      Icon: Mail,
      color: "#F59E0B",
    },
    {
      key: "subscribers",
      label: t("subscribers"),
      value: subscribers.length,
      sub: `+${enrollments.length} ${t("enrollments")}`,
      Icon: Users,
      color: "#EC4899",
    },
  ];

  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);
  const recentEnquiries = [...enquiries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <motion.div
        className={styles.statsGrid}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {stats.map(({ key, label, value, sub, Icon, color }) => (
          <motion.div
            key={key}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className={styles.statCard} bordered={false}>
              <div className={styles.statRow}>
                <div>
                  <Statistic
                    title={label}
                    value={value}
                    valueStyle={{ fontWeight: 700, fontSize: 28 }}
                  />
                  <span className={styles.statSub}>{sub}</span>
                </div>
                <div
                  className={styles.statIcon}
                  style={{ background: `${color}15`, color }}
                >
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.twoCol}>
        <Card
          className={styles.panel}
          title={
            <span className={styles.panelTitle}>
              <ShoppingBag size={16} /> {t("recentOrders")}
            </span>
          }
          extra={<Link href={routes.admin.orders}>{t("viewAll")}</Link>}
        >
          {recentOrders.length === 0 ? (
            <p className={styles.empty}>{t("noOrders")}</p>
          ) : (
            <ul className={styles.orderList}>
              {recentOrders.map((o) => (
                <li key={o.id}>
                  <div className={styles.orderInfo}>
                    <Link href={routes.admin.orderDetail(o.id)} className={styles.orderNum}>
                      {o.orderNumber}
                    </Link>
                    <span className={styles.orderMeta}>
                      {o.customer.name} • {o.items.length} items
                    </span>
                  </div>
                  <div className={styles.orderRight}>
                    <span className={styles.orderAmt}>{formatInr(o.totalInr)}</span>
                    <StatusTag value={o.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          className={styles.panel}
          title={
            <span className={styles.panelTitle}>
              <Mail size={16} /> {t("recentEnquiries")}
            </span>
          }
          extra={<Link href={routes.admin.enquiries}>{t("viewAll")}</Link>}
        >
          {recentEnquiries.length === 0 ? (
            <p className={styles.empty}>{t("noEnquiries")}</p>
          ) : (
            <ul className={styles.enquiryList}>
              {recentEnquiries.map((e) => (
                <li key={e.id}>
                  <Avatar size={36} style={{ background: "#2E7D5B" }}>
                    {e.name[0]}
                  </Avatar>
                  <div className={styles.enquiryBody}>
                    <div className={styles.enquiryHead}>
                      <strong>{e.name}</strong>
                      <Tag color="green">{e.subject}</Tag>
                    </div>
                    <p>{e.message}</p>
                    <span className={styles.time}>
                      <TrendingUp size={11} /> {formatRelativeTime(e.createdAt, locale)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card
        className={styles.quickActions}
        title={
          <span className={styles.panelTitle}>
            <ArrowUpRight size={16} /> {t("quickActions")}
          </span>
        }
      >
        <div className={styles.actionsGrid}>
          {[
            { href: routes.admin.productNew, label: t("actAddProduct"), color: "#10B981" },
            { href: routes.admin.products, label: t("actManageProducts"), color: "#3B82F6" },
            { href: routes.admin.orders, label: t("actManageOrders"), color: "#F59E0B" },
            { href: routes.admin.settings, label: t("actSiteSettings"), color: "#EC4899" },
          ].map((a) => (
            <Link key={a.href} href={a.href} className={styles.action}>
              <span
                className={styles.actionDot}
                style={{ background: a.color }}
              />
              {a.label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}
