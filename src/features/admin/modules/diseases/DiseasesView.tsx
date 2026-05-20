"use client";

import { Avatar, Tag, Button, Space, Tooltip } from "antd";
import { Trash2, ExternalLink, Plus, Pencil } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { diseaseRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/formatters";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Disease } from "@/types";

export default function DiseasesView() {
  const t = useTranslations("admin.diseases");
  const data = useHydratedRepo(diseaseRepo);
  const { pick, locale } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.diseaseNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<Disease>
        data={data}
        rowKey="slug"
        searchableFields={["slug"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "image",
            width: 56,
            render: (src: string, r) => <Avatar shape="square" size={40} src={src} alt={r.slug} />,
          },
          {
            title: t("col.title"),
            render: (_, r) => (
              <div>
                <div style={{ fontWeight: 600 }}>{pick(r.title)}</div>
                <div style={{ fontSize: 12, color: "#8a8a8a" }}>{r.slug}</div>
              </div>
            ),
          },
          { title: t("col.category"), dataIndex: "category", render: (v: string) => <Tag color="green">{v}</Tag> },
          {
            title: t("col.published"),
            dataIndex: "publishedAt",
            render: (v: string) => formatDate(v, locale),
          },
          { title: t("col.readMin"), dataIndex: "readTimeMin" },
          {
            title: t("col.actions"),
            width: 160,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() => router.push(routes.admin.diseaseEdit(r.slug))}
                  />
                </Tooltip>
                <Tooltip title={t("preview")}>
                  <Button
                    type="text"
                    icon={<ExternalLink size={16} />}
                    onClick={() => router.push(routes.careDetail(r.slug))}
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
                        onOk: () => diseaseRepo.remove(r.slug),
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
