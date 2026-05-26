"use client";

import { Select, Button, Tooltip, Space, Tag } from "antd";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { enrollmentRepo } from "@/services/repos";
import { formatDate } from "@/lib/formatters";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusTag from "../../components/StatusTag";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Enrollment } from "@/types";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

export default function EnrollmentsView() {
  const t = useTranslations("admin.enrollments");
  const { locale } = useBilingual();
  const data = useHydratedRepo(enrollmentRepo);
  const ready = useRepoReady(enrollmentRepo);
  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <DataTable<Enrollment>
        data={data}
        rowKey="id"
        loading={!ready}
        searchableFields={["fullName", "email", "trainingTitleEn", "state"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          { title: t("col.name"), dataIndex: "fullName", render: (v, r) => (
            <div>
              <div style={{ fontWeight: 600 }}>{v}</div>
              <div style={{ fontSize: 12, color: "#8a8a8a" }}>{r.email} • {r.phone}</div>
            </div>
          ) },
          { title: t("col.program"), dataIndex: "trainingTitleEn", render: (v) => <Tag color="blue">{v}</Tag> },
          { title: t("col.batch"), dataIndex: "batchDate", render: (v: string) => formatDate(v, locale) },
          { title: t("col.location"), render: (_, r) => `${r.district}, ${r.state}` },
          {
            title: t("col.status"),
            dataIndex: "status",
            render: (v: Enrollment["status"], r) => (
              <Select
                value={v}
                bordered={false}
                onChange={(s) => enrollmentRepo.update(r.id, { status: s })}
                options={STATUSES.map((s) => ({ value: s, label: <StatusTag value={s} /> }))}
                style={{ minWidth: 150 }}
              />
            ),
          },
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
                        onOk: () => enrollmentRepo.remove(r.id),
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
