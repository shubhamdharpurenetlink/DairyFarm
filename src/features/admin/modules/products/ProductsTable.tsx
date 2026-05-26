"use client";

import { Button, Space, Tag, Tooltip, Avatar } from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { productRepo } from "@/services/repos";
import { formatInr } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Product } from "@/types";

export default function ProductsTable() {
  const t = useTranslations("admin.products");
  const router = useRouter();
  const products = useHydratedRepo(productRepo);
  const ready = useRepoReady(productRepo);
  const { pick } = useBilingual();

  const handleDelete = (p: Product) =>
    confirmDelete({
      title: t("confirmDeleteTitle"),
      description: t("confirmDeleteDesc", { name: p.name.en }),
      onOk: () => productRepo.remove(p.slug),
    });

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => router.push(routes.admin.productNew)}
          >
            {t("addNew")}
          </Button>
        }
      />

      <DataTable<Product>
        data={products}
        rowKey="slug"
        loading={!ready}
        searchableFields={["slug", "name", "category"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "primaryImage",
            width: 64,
            render: (src: string, row) => (
              <Avatar shape="square" size={44} src={src} alt={row.slug} />
            ),
          },
          {
            title: t("col.name"),
            dataIndex: "name",
            render: (_, row) => (
              <div>
                <Link
                  href={routes.admin.productEdit(row.slug)}
                  style={{ fontWeight: 600 }}
                >
                  {pick(row.name)}
                </Link>
                <div style={{ fontSize: 12, color: "#8a8a8a" }}>{row.slug}</div>
              </div>
            ),
          },
          {
            title: t("col.category"),
            dataIndex: "category",
            render: (v: string) => <Tag color="green">{v}</Tag>,
            filters: [
              "milk",
              "ghee",
              "curd",
              "paneer",
              "butter",
              "mava",
              "sweets",
              "other",
            ].map((v) => ({ text: v, value: v })),
            onFilter: (v, r) => r.category === v,
          },
          {
            title: t("col.variants"),
            render: (_, r) => r.variants.length,
          },
          {
            title: t("col.priceRange"),
            render: (_, r) => {
              const min = Math.min(...r.variants.map((v) => v.priceInr));
              const max = Math.max(...r.variants.map((v) => v.priceInr));
              return min === max
                ? formatInr(min)
                : `${formatInr(min)} – ${formatInr(max)}`;
            },
          },
          {
            title: t("col.stock"),
            render: (_, r) => {
              const total = r.variants.reduce((s, v) => s + v.stockQty, 0);
              const tone =
                total === 0 ? "red" : total < 30 ? "orange" : "green";
              return <Tag color={tone}>{total}</Tag>;
            },
            sorter: (a, b) =>
              a.variants.reduce((s, v) => s + v.stockQty, 0) -
              b.variants.reduce((s, v) => s + v.stockQty, 0),
          },
          {
            title: t("col.status"),
            dataIndex: "isAvailable",
            render: (v: boolean) => (
              <Tag color={v ? "green" : "default"}>
                {v ? t("status.available") : t("status.hidden")}
              </Tag>
            ),
          },
          {
            title: t("col.featured"),
            dataIndex: "isFeatured",
            render: (v: boolean) => (v ? <Tag color="gold">★</Tag> : null),
          },
          {
            title: t("col.actions"),
            width: 120,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() => router.push(routes.admin.productEdit(r.slug))}
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
