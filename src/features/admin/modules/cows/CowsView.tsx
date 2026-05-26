"use client";

import { Avatar, Tag, Button, Space, Tooltip } from "antd";
import { Trash2, ExternalLink, Plus, Pencil } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { cowRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { CowBreed } from "@/types";

export default function CowsView() {
  const t = useTranslations("admin.cows");
  const data = useHydratedRepo(cowRepo);
  const ready = useRepoReady(cowRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.cowNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<CowBreed>
        data={data}
        rowKey="slug"
        loading={!ready}
        searchableFields={["slug", "nameEn", "origin"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "image",
            width: 56,
            render: (src: string, r) => <Avatar shape="square" size={40} src={src} alt={r.slug} />,
          },
          {
            title: t("col.name"),
            render: (_, r) => (
              <div>
                <div style={{ fontWeight: 600 }}>{pick({ en: r.nameEn, hi: r.nameHi })}</div>
                <div style={{ fontSize: 12, color: "#8a8a8a" }}>{r.origin}</div>
              </div>
            ),
          },
          {
            title: t("col.category"),
            dataIndex: "category",
            render: (v: string) => (
              <Tag color={v === "indigenous" ? "green" : v === "exotic" ? "gold" : "blue"}>{v}</Tag>
            ),
            filters: ["indigenous", "exotic", "crossbreed"].map((v) => ({ text: v, value: v })),
            onFilter: (v, r) => r.category === v,
          },
          {
            title: t("col.yield"),
            render: (_, r) => `${r.milkYieldLitresPerDay.min}–${r.milkYieldLitresPerDay.max} L/day`,
          },
          { title: t("col.fat"), dataIndex: "fatPercent", render: (v: number) => `${v}%` },
          {
            title: t("col.actions"),
            width: 160,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() => router.push(routes.admin.cowEdit(r.slug))}
                  />
                </Tooltip>
                <Tooltip title={t("preview")}>
                  <Button
                    type="text"
                    icon={<ExternalLink size={16} />}
                    onClick={() => router.push(routes.cowDetail(r.slug))}
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
                        description: t("confirmDeleteDesc", { name: r.nameEn }),
                        onOk: () => cowRepo.remove(r.slug),
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
