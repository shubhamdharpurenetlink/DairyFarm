"use client";

import { Avatar, Tag, Button, Space, Tooltip } from "antd";
import { Trash2, ExternalLink, Plus, Pencil } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { trainingRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { formatInr } from "@/lib/formatters";
import { useBilingual } from "@/hooks/useBilingual";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { TrainingProgram } from "@/types";

export default function TrainingsView() {
  const t = useTranslations("admin.trainings");
  const data = useHydratedRepo(trainingRepo);
  const { pick } = useBilingual();
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Link href={routes.admin.trainingNew}>
            <Button type="primary" icon={<Plus size={14} />}>
              {t("newAction")}
            </Button>
          </Link>
        }
      />
      <DataTable<TrainingProgram>
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
            render: (_, r) => <strong>{pick(r.title)}</strong>,
          },
          {
            title: t("col.level"),
            dataIndex: "level",
            render: (v: string) => (
              <Tag color={v === "beginner" ? "blue" : v === "intermediate" ? "gold" : "magenta"}>{v}</Tag>
            ),
          },
          { title: t("col.duration"), dataIndex: "durationDays", render: (v: number) => `${v} days` },
          { title: t("col.price"), dataIndex: "priceInr", render: (v: number) => formatInr(v) },
          {
            title: t("col.seats"),
            render: (_, r) => (
              <Tag color={r.seatsLeft < 5 ? "red" : r.seatsLeft < 10 ? "orange" : "green"}>
                {r.seatsLeft} / {r.seatsTotal}
              </Tag>
            ),
          },
          {
            title: t("col.actions"),
            width: 160,
            render: (_, r) => (
              <Space>
                <Tooltip title={t("edit")}>
                  <Button
                    type="text"
                    icon={<Pencil size={16} />}
                    onClick={() =>
                      router.push(routes.admin.trainingEdit(r.slug))
                    }
                  />
                </Tooltip>
                <Tooltip title={t("preview")}>
                  <Button
                    type="text"
                    icon={<ExternalLink size={16} />}
                    onClick={() => router.push(routes.trainingDetail(r.slug))}
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
                        onOk: () => trainingRepo.remove(r.slug),
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
