"use client";

import { Button, Tooltip, Space } from "antd";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { subscriberRepo } from "@/services/repos";
import { formatDate } from "@/lib/formatters";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Subscriber } from "@/types";

export default function SubscribersView() {
  const t = useTranslations("admin.subscribers");
  const { locale } = useBilingual();
  const data = useHydratedRepo(subscriberRepo);
  const ready = useRepoReady(subscriberRepo);
  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <DataTable<Subscriber>
        data={data}
        rowKey="id"
        loading={!ready}
        searchableFields={["email"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          { title: t("col.email"), dataIndex: "email" },
          { title: t("col.joined"), dataIndex: "createdAt", render: (v: string) => formatDate(v, locale), sorter: (a, b) => a.createdAt.localeCompare(b.createdAt), defaultSortOrder: "descend" },
          {
            title: t("col.actions"),
            width: 80,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("delete")}>
                  <Button
                    type="text"
                    danger
                    icon={<Trash2 size={16} />}
                    onClick={() =>
                      confirmDelete({
                        title: t("confirmDeleteTitle"),
                        onOk: () => subscriberRepo.remove(r.id),
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
