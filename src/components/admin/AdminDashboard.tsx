"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Layout, Menu, Card, Statistic, Table, Tag, Avatar, Badge } from "antd";
import type { MenuProps } from "antd";
import {
  LayoutDashboard,
  Beef,
  Stethoscope,
  Images,
  GraduationCap,
  ClipboardList,
  Mail,
  Settings,
  Milk,
  Beef as BeefIcon,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cows } from "@/data/cows";
import { trainings } from "@/data/trainings";
import { diseases } from "@/data/diseases";
import { site } from "@/data/site";
import styles from "./AdminDashboard.module.scss";

const { Sider, Content, Header } = Layout;

const menuItems: { key: string; Icon: LucideIcon }[] = [
  { key: "dashboard", Icon: LayoutDashboard },
  { key: "cows", Icon: Beef },
  { key: "diseases", Icon: Stethoscope },
  { key: "gallery", Icon: Images },
  { key: "trainings", Icon: GraduationCap },
  { key: "enrollments", Icon: ClipboardList },
  { key: "messages", Icon: Mail },
  { key: "settings", Icon: Settings },
];

export default function AdminDashboard() {
  const t = useTranslations("admin");
  const [active, setActive] = useState("dashboard");

  const items: MenuProps["items"] = menuItems.map(({ key, Icon }) => ({
    key,
    icon: <Icon size={18} />,
    label: t(`menu.${key}`),
  }));

  return (
    <Layout className={styles.layout}>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        width={240}
        theme="light"
        className={styles.sider}
      >
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Milk size={22} />
          </div>
          <span>Laxmi Admin</span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[active]}
          items={items}
          onClick={(e) => setActive(e.key)}
        />
        <div className={styles.siderFoot}>
          <Link href="/" className={styles.exit}>
            ← View site
          </Link>
        </div>
      </Sider>

      <Layout>
        <Header className={styles.topbar}>
          <div className={styles.topbarTitle}>{t(`menu.${active}`)}</div>
          <div className={styles.userBadge}>
            <Avatar size={32} style={{ background: "#2E7D5B" }}>
              A
            </Avatar>
            <div>
              <div className={styles.userName}>Admin</div>
              <div className={styles.userRole}>Owner</div>
            </div>
          </div>
        </Header>

        <Content className={styles.content}>
          {active === "dashboard" && (
            <DashboardView t={t} />
          )}
          {active === "cows" && <CowsTable />}
          {active === "diseases" && <DiseasesTable />}
          {active === "trainings" && <TrainingsTable />}
          {active === "enrollments" && <EnrollmentsTable />}
          {active === "messages" && <MessagesTable />}
          {active === "gallery" && (
            <Card>
              <p>Gallery management coming in Phase 2 with Supabase storage.</p>
            </Card>
          )}
          {active === "settings" && (
            <Card>
              <p>Site settings management coming in Phase 2.</p>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

function DashboardView({ t }: { t: ReturnType<typeof useTranslations> }) {
  const stats = [
    { label: t("stats.totalCows"), value: site.stats.healthyCows, suffix: "" },
    { label: t("stats.milkToday"), value: site.stats.litresPerDay, suffix: " L" },
    { label: t("stats.newEnrollments"), value: 18 },
    { label: t("stats.unreadMessages"), value: 7 },
  ];
  return (
    <motion.div
      className={styles.stats}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <Card className={styles.statCard}>
            <Statistic
              title={s.label}
              value={s.value}
              suffix={s.suffix}
              valueStyle={{ color: "#2E7D5B", fontWeight: 700 }}
            />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CowsTable() {
  return (
    <Card>
      <Table
        rowKey="slug"
        dataSource={cows}
        pagination={false}
        columns={[
          { title: "Slug", dataIndex: "slug" },
          { title: "Name", dataIndex: "nameEn" },
          {
            title: "Category",
            dataIndex: "category",
            render: (v: string) => <Tag color={v === "indigenous" ? "green" : v === "exotic" ? "gold" : "blue"}>{v}</Tag>,
          },
          { title: "Origin", dataIndex: "origin" },
          {
            title: "Yield (L/day)",
            render: (_: unknown, r: (typeof cows)[number]) =>
              `${r.milkYieldLitresPerDay.min}-${r.milkYieldLitresPerDay.max}`,
          },
          { title: "Fat %", dataIndex: "fatPercent" },
        ]}
      />
    </Card>
  );
}

function DiseasesTable() {
  return (
    <Card>
      <Table
        rowKey="slug"
        dataSource={diseases}
        pagination={false}
        columns={[
          { title: "Slug", dataIndex: "slug" },
          {
            title: "Title",
            dataIndex: ["title", "en"],
          },
          {
            title: "Category",
            dataIndex: "category",
            render: (v: string) => <Tag color="green">{v}</Tag>,
          },
          { title: "Published", dataIndex: "publishedAt" },
          { title: "Read min", dataIndex: "readTimeMin" },
        ]}
      />
    </Card>
  );
}

function TrainingsTable() {
  return (
    <Card>
      <Table
        rowKey="slug"
        dataSource={trainings}
        pagination={false}
        columns={[
          { title: "Slug", dataIndex: "slug" },
          { title: "Title", dataIndex: ["title", "en"] },
          {
            title: "Level",
            dataIndex: "level",
            render: (v: string) => (
              <Tag color={v === "beginner" ? "blue" : v === "intermediate" ? "gold" : "magenta"}>
                {v}
              </Tag>
            ),
          },
          { title: "Duration", dataIndex: "durationDays", render: (v: number) => `${v} days` },
          {
            title: "Price",
            dataIndex: "priceInr",
            render: (v: number) => `₹${v.toLocaleString("en-IN")}`,
          },
          {
            title: "Seats",
            render: (_: unknown, r: (typeof trainings)[number]) =>
              `${r.seatsLeft} / ${r.seatsTotal}`,
          },
        ]}
      />
    </Card>
  );
}

function EnrollmentsTable() {
  const sample = Array.from({ length: 8 }, (_, i) => ({
    id: `E${1000 + i}`,
    name: ["Ramesh", "Priya", "Anil", "Sunita", "Vikram", "Meera", "Karan", "Nisha"][i],
    program: trainings[i % trainings.length].title.en,
    batch: "15 Jun 2026",
    status: i % 3 === 0 ? "pending" : i % 3 === 1 ? "confirmed" : "completed",
  }));

  return (
    <Card>
      <Table
        rowKey="id"
        dataSource={sample}
        pagination={false}
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Name", dataIndex: "name" },
          { title: "Program", dataIndex: "program" },
          { title: "Batch", dataIndex: "batch" },
          {
            title: "Status",
            dataIndex: "status",
            render: (v: string) => (
              <Tag color={v === "confirmed" ? "green" : v === "pending" ? "orange" : "blue"}>
                {v}
              </Tag>
            ),
          },
        ]}
      />
    </Card>
  );
}

function MessagesTable() {
  const sample = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: ["Ravi Kumar", "Pooja Sharma", "Mohan Singh", "Anjali Devi", "Suresh Bhai", "Kavita Yadav"][i],
    subject: ["General", "Order", "Visit", "Training", "Partnership", "General"][i],
    received: "2 hours ago",
    unread: i < 3,
  }));

  return (
    <Card>
      <Table
        rowKey="id"
        dataSource={sample}
        pagination={false}
        columns={[
          {
            title: "",
            dataIndex: "unread",
            width: 40,
            render: (v: boolean) => (v ? <Badge status="processing" /> : null),
          },
          { title: "From", dataIndex: "name" },
          { title: "Subject", dataIndex: "subject" },
          { title: "Received", dataIndex: "received" },
        ]}
      />
    </Card>
  );
}
