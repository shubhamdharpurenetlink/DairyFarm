"use client";

import { useState } from "react";
import { Button, Space, Tooltip, Select } from "antd";
import { Eye, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { orderRepo } from "@/services/repos";
import { orderService } from "@/services/orderService";
import { formatInr, formatRelativeTime } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusTag from "../../components/StatusTag";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Order, OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function OrdersTable() {
  const t = useTranslations("admin.orders");
  const router = useRouter();
  const orders = useHydratedRepo(orderRepo);
  const { locale } = useBilingual();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filtered = orders.filter(
    (o) => statusFilter === "all" || o.status === statusFilter,
  );

  const handleDelete = (o: Order) =>
    confirmDelete({
      title: t("confirmDeleteTitle"),
      description: t("confirmDeleteDesc", { number: o.orderNumber }),
      onOk: () => orderRepo.remove(o.id),
    });

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <DataTable<Order>
        data={filtered}
        rowKey="id"
        searchableFields={["orderNumber"]}
        searchPlaceholder={t("searchPlaceholder")}
        toolbar={
          <Select
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as OrderStatus | "all")}
            style={{ minWidth: 180 }}
            options={[
              { value: "all", label: t("allStatuses") },
              ...STATUS_OPTIONS.map((s) => ({ value: s, label: s.replace(/_/g, " ") })),
            ]}
          />
        }
        columns={[
          {
            title: t("col.order"),
            dataIndex: "orderNumber",
            render: (v: string, r) => (
              <Link href={routes.admin.orderDetail(r.id)} style={{ fontWeight: 600 }}>
                {v}
              </Link>
            ),
          },
          {
            title: t("col.customer"),
            render: (_, r) => (
              <div>
                <div style={{ fontWeight: 500 }}>{r.customer.name}</div>
                <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                  {r.customer.phone} • {r.customer.city}
                </div>
              </div>
            ),
          },
          {
            title: t("col.items"),
            render: (_, r) => `${r.items.length} items`,
          },
          {
            title: t("col.total"),
            dataIndex: "totalInr",
            render: (v: number) => <strong>{formatInr(v)}</strong>,
            sorter: (a, b) => a.totalInr - b.totalInr,
          },
          {
            title: t("col.payment"),
            dataIndex: "paymentMode",
            render: (v: string) => v.toUpperCase(),
          },
          {
            title: t("col.status"),
            dataIndex: "status",
            render: (status: OrderStatus, r) => (
              <Select
                value={status}
                bordered={false}
                onChange={(v) => orderService.updateStatus(r.id, v)}
                options={STATUS_OPTIONS.map((s) => ({
                  value: s,
                  label: <StatusTag value={s} />,
                }))}
                style={{ minWidth: 170 }}
              />
            ),
          },
          {
            title: t("col.received"),
            dataIndex: "createdAt",
            render: (v: string) => formatRelativeTime(v, locale),
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
          },
          {
            title: t("col.actions"),
            width: 110,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("view")}>
                  <Button
                    type="text"
                    icon={<Eye size={16} />}
                    onClick={() => router.push(routes.admin.orderDetail(r.id))}
                  />
                </Tooltip>
                <Tooltip title={t("delete")}>
                  <Button
                    type="text"
                    danger
                    icon={<Trash2 size={16} />}
                    onClick={() => handleDelete(r)}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
      />
    </>
  );
}
