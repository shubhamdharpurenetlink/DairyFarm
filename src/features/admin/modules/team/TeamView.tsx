"use client";

import { Avatar, Button, Tooltip, Space } from "antd";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { teamRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { TeamMember } from "@/types";

export default function TeamView() {
  const t = useTranslations("admin.team");
  const data = useHydratedRepo(teamRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.teamNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<TeamMember>
        data={data}
        rowKey="id"
        searchableFields={["name"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "avatar",
            width: 56,
            render: (src: string, r) => <Avatar src={src} alt={r.name} />,
          },
          { title: t("col.name"), dataIndex: "name", render: (v) => <strong>{v}</strong> },
          { title: t("col.role"), render: (_, r) => pick(r.role) },
          {
            title: t("col.actions"),
            width: 120,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() => router.push(routes.admin.teamEdit(r.id))}
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
                        onOk: () => teamRepo.remove(r.id),
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
