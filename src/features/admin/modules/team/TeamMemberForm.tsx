"use client";

import { useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { teamRepo } from "@/services/repos";
import { newId } from "@/services/repository";
import { routes } from "@/lib/routes";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { TeamMember } from "@/types";

interface Props {
  id?: string;
}

export default function TeamMemberForm({ id }: Props) {
  const t = useTranslations("admin.team");
  const router = useRouter();
  const [form] = Form.useForm<TeamMember>();
  const isEdit = Boolean(id);
  const existing = id ? teamRepo.get(id) : undefined;

  useEffect(() => {
    if (existing) form.setFieldsValue(existing);
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: TeamMember = {
        ...values,
        id: existing?.id ?? newId("tm"),
      };
      if (isEdit) {
        teamRepo.update(item.id, item);
        message.success(t("updated"));
      } else {
        teamRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.team);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        teamRepo.remove(existing.id);
        router.push(routes.admin.team);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.team}>
            <ArrowLeft size={12} style={{ verticalAlign: "middle" }} />{" "}
            {t("backToList")}
          </Link>
        }
        actions={
          <Space>
            {isEdit && (
              <Button danger icon={<Trash2 size={14} />} onClick={onDelete}>
                {t("delete")}
              </Button>
            )}
            <Button type="primary" icon={<Save size={14} />} onClick={onSave}>
              {t("save")}
            </Button>
          </Space>
        }
      />
      <Form form={form} layout="vertical">
        <FormShell>
          <Form.Item
            name="name"
            label={t("field.name")}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Ramesh Yadav" />
          </Form.Item>
          <BilingualInput name="role" label={t("field.role")} required />
          <Form.Item
            name="avatar"
            label={t("field.avatar")}
            rules={[{ required: true, type: "url" }]}
          >
            <Input size="large" placeholder="https://..." />
          </Form.Item>
        </FormShell>
      </Form>
    </>
  );
}
