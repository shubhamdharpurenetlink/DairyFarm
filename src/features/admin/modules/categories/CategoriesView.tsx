"use client";

import { Avatar, Tag, Button, Space, Tooltip } from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { categoryRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { ProductCategoryDef } from "@/types";

export default function CategoriesView() {
  const t = useTranslations("admin.categories");
  const data = useHydratedRepo(categoryRepo);
  const ready = useRepoReady(categoryRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.categoryNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<ProductCategoryDef>
        data={data}
        rowKey="slug"
        loading={!ready}
        searchableFields={["slug"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "color",
            width: 60,
            render: (color: string, r) => (
              <Avatar
                shape="square"
                size={40}
                style={{ background: `${color}20`, color, fontWeight: 700 }}
              >
                {r.slug[0]?.toUpperCase()}
              </Avatar>
            ),
          },
          {
            title: t("col.slug"),
            dataIndex: "slug",
            render: (v: string) => <Tag>{v}</Tag>,
          },
          {
            title: t("col.name"),
            render: (_, r) => pick(r.name),
          },
          {
            title: t("col.description"),
            render: (_, r) => r.description && pick(r.description),
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
                    onClick={() =>
                      router.push(routes.admin.categoryEdit(r.slug))
                    }
                  />
                </Tooltip>
                <Tooltip title={t("delete")}>
                  <Button
                    type="text"
                    danger
                    icon={<Trash2 size={16} />}
                    onClick={() =>
                      confirmDelete({
                        title: t("confirmDeleteTitle"),
                        onOk: () => categoryRepo.remove(r.slug),
                      })
                    }
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
