"use client";

import { useEffect, useState } from "react";
import { Card, Descriptions, Table, Tag, Select, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { orderRepo } from "@/services/repos";
import { orderService } from "@/services/orderService";
import { formatInr, formatDate } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import StatusTag from "../../components/StatusTag";
import type { Order, OrderItem, OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

interface Props {
  id: string;
}

export default function OrderDetail({ id }: Props) {
  const t = useTranslations("admin.orders");
  const router = useRouter();
  const { locale } = useBilingual();
  const [order, setOrder] = useState<Order | undefined>(() => orderRepo.get(id));

  useEffect(() => {
    const unsub = orderRepo.subscribe(() => setOrder(orderRepo.get(id)));
    return unsub;
  }, [id]);

  if (!order) {
    return (
      <Card>
        <p>{t("notFound")}</p>
        <Link href={routes.admin.orders}>
          <Button>{t("backToList")}</Button>
        </Link>
      </Card>
    );
  }

  const onStatusChange = (status: OrderStatus) => {
    orderService.updateStatus(order.id, status);
    message.success(t("statusUpdated"));
  };

  return (
    <>
      <PageHeader
        title={order.orderNumber}
        subtitle={`Placed ${formatDate(order.createdAt, locale)}`}
        breadcrumb={
          <Link href={routes.admin.orders}>
            <ArrowLeft size={12} style={{ verticalAlign: "middle" }} /> {t("backToList")}
          </Link>
        }
        actions={
          <Space>
            <Select
              value={order.status}
              onChange={onStatusChange}
              style={{ minWidth: 200 }}
              options={STATUS_OPTIONS.map((s) => ({
                value: s,
                label: <StatusTag value={s} />,
              }))}
            />
            <Button onClick={() => router.push(routes.admin.orders)}>{t("backToList")}</Button>
          </Space>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <Card title={t("items")}>
          <Table<OrderItem>
            dataSource={order.items}
            rowKey={(r) => `${r.productId}-${r.variantId}`}
            pagination={false}
            columns={[
              { title: t("col.product"), dataIndex: "productNameEn" },
              { title: t("col.variant"), dataIndex: "variantLabelEn" },
              { title: t("col.qty"), dataIndex: "qty", width: 80 },
              {
                title: t("col.unitPrice"),
                dataIndex: "unitPriceInr",
                render: (v: number) => formatInr(v),
              },
              {
                title: t("col.lineTotal"),
                dataIndex: "lineTotalInr",
                render: (v: number) => <strong>{formatInr(v)}</strong>,
              },
            ]}
          />
          <Descriptions
            column={1}
            style={{ marginTop: 16 }}
            items={[
              { label: t("subtotal"), children: formatInr(order.subtotalInr) },
              {
                label: t("delivery"),
                children:
                  order.deliveryFeeInr === 0 ? (
                    <Tag color="green">FREE</Tag>
                  ) : (
                    formatInr(order.deliveryFeeInr)
                  ),
              },
              {
                label: <strong>{t("total")}</strong>,
                children: <strong style={{ fontSize: 18 }}>{formatInr(order.totalInr)}</strong>,
              },
            ]}
          />
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title={t("customer")}>
            <Descriptions column={1} items={[
              { label: t("col.name"), children: order.customer.name },
              { label: t("col.phone"), children: order.customer.phone },
              ...(order.customer.email ? [{ label: "Email", children: order.customer.email }] : []),
              {
                label: t("col.address"),
                children: `${order.customer.addressLine}, ${order.customer.city}, ${order.customer.state} ${order.customer.pincode}`,
              },
            ]} />
          </Card>

          <Card title={t("payment")}>
            <Descriptions column={1} items={[
              { label: t("col.mode"), children: order.paymentMode.toUpperCase() },
              ...(order.paymentRef ? [{ label: "Ref", children: order.paymentRef }] : []),
              { label: t("col.status"), children: <StatusTag value={order.status} /> },
            ]} />
          </Card>
        </div>
      </div>
    </>
  );
}
