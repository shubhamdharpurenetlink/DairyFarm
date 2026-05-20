"use client";

import { Avatar, Rate, Button, Tooltip, Space } from "antd";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { testimonialRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Testimonial } from "@/types";

export default function TestimonialsView() {
  const t = useTranslations("admin.testimonials");
  const data = useHydratedRepo(testimonialRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.testimonialNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<Testimonial>
        data={data}
        rowKey="id"
        searchableFields={["name", "city"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: "",
            dataIndex: "avatar",
            width: 56,
            render: (src: string, r) => <Avatar src={src} alt={r.name} />,
          },
          {
            title: t("col.customer"),
            render: (_, r) => (
              <div>
                <div style={{ fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "#8a8a8a" }}>{r.city}</div>
              </div>
            ),
          },
          { title: t("col.rating"), dataIndex: "rating", render: (v: number) => <Rate disabled defaultValue={v} /> },
          { title: t("col.quote"), render: (_, r) => pick(r.quote), ellipsis: true },
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
                      router.push(routes.admin.testimonialEdit(r.id))
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
                        onOk: () => testimonialRepo.remove(r.id),
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
