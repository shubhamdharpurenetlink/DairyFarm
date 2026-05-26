"use client";

import { Tag, Button, Tooltip, Space } from "antd";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { awardRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Award } from "@/types";

export default function AwardsView() {
  const t = useTranslations("admin.awards");
  const data = useHydratedRepo(awardRepo);
  const ready = useRepoReady(awardRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.awardNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<Award>
        data={data}
        rowKey="id"
        loading={!ready}
        searchableFields={["issuer"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          { title: t("col.year"), dataIndex: "year", width: 100, render: (v: string) => <Tag color="gold">{v}</Tag> },
          { title: t("col.title"), render: (_, r) => <strong>{pick(r.title)}</strong> },
          { title: t("col.issuer"), dataIndex: "issuer" },
          {
            title: t("col.actions"),
            width: 120,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() => router.push(routes.admin.awardEdit(r.id))}
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
                        onOk: () => awardRepo.remove(r.id),
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
