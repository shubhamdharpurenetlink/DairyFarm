"use client";

import { Avatar, Button, Tooltip, Space } from "antd";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { facilityRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Facility } from "@/types";

export default function FacilitiesView() {
  const t = useTranslations("admin.facilities");
  const data = useHydratedRepo(facilityRepo);
  const ready = useRepoReady(facilityRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.facilityNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<Facility>
        data={data}
        rowKey="id"
        loading={!ready}
        searchableFields={["id"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "image",
            width: 64,
            render: (src: string, r) => <Avatar shape="square" size={44} src={src} alt={r.id} />,
          },
          { title: t("col.name"), render: (_, r) => <strong>{pick(r.name)}</strong> },
          { title: t("col.description"), render: (_, r) => pick(r.description), ellipsis: true },
          {
            title: t("col.actions"),
            width: 120,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() => router.push(routes.admin.facilityEdit(r.id))}
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
                        onOk: () => facilityRepo.remove(r.id),
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
