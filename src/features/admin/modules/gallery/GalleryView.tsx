"use client";

import { Avatar, Tag, Button, Tooltip, Space } from "antd";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { galleryRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { GalleryItem } from "@/types";

export default function GalleryAdminView() {
  const t = useTranslations("admin.gallery");
  const data = useHydratedRepo(galleryRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.galleryNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<GalleryItem>
        data={data}
        rowKey="id"
        searchableFields={["id"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "thumbnail",
            width: 64,
            render: (src: string, r) => <Avatar shape="square" size={48} src={src} alt={r.id} />,
          },
          { title: t("col.title"), render: (_, r) => pick(r.title) },
          {
            title: t("col.type"),
            dataIndex: "type",
            render: (v: string) => <Tag color={v === "video" ? "magenta" : "blue"}>{v}</Tag>,
            filters: ["photo", "video"].map((v) => ({ text: v, value: v })),
            onFilter: (v, r) => r.type === v,
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
                    onClick={() => router.push(routes.admin.galleryEdit(r.id))}
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
                        onOk: () => galleryRepo.remove(r.id),
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
