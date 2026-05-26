"use client";

import { Avatar, Tag, Select, Button, Tooltip, Space } from "antd";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { enquiryRepo } from "@/services/repos";
import { formatRelativeTime } from "@/lib/formatters";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusTag from "../../components/StatusTag";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Enquiry, EnquiryStatus } from "@/types";

const STATUSES: EnquiryStatus[] = ["new", "open", "resolved", "spam"];

export default function EnquiriesView() {
  const t = useTranslations("admin.enquiries");
  const data = useHydratedRepo(enquiryRepo);
  const ready = useRepoReady(enquiryRepo);
  const { locale } = useBilingual();

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <DataTable<Enquiry>
        data={data}
        rowKey="id"
        loading={!ready}
        searchableFields={["name", "email", "message"]}
        searchPlaceholder={t("searchPlaceholder")}
        columns={[
          {
            title: t("col.from"),
            render: (_, r) => (
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Avatar style={{ background: "#2E7D5B" }}>{r.name[0]}</Avatar>
                <div>
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                    {r.email} • {r.phone}
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: t("col.subject"),
            dataIndex: "subject",
            render: (v: string) => <Tag color="green">{v}</Tag>,
          },
          {
            title: t("col.message"),
            dataIndex: "message",
            ellipsis: true,
          },
          {
            title: t("col.received"),
            dataIndex: "createdAt",
            render: (v: string) => formatRelativeTime(v, locale),
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            defaultSortOrder: "descend",
          },
          {
            title: t("col.status"),
            dataIndex: "status",
            render: (status: EnquiryStatus, r) => (
              <Select
                value={status}
                bordered={false}
                onChange={(v) => enquiryRepo.update(r.id, { status: v })}
                options={STATUSES.map((s) => ({
                  value: s,
                  label: <StatusTag value={s} />,
                }))}
                style={{ minWidth: 140 }}
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
                        onOk: () => enquiryRepo.remove(r.id),
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
