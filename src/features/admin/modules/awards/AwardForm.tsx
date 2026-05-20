"use client";

import { useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { awardRepo } from "@/services/repos";
import { newId } from "@/services/repository";
import { routes } from "@/lib/routes";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Award } from "@/types";

interface Props {
  id?: string;
}

export default function AwardForm({ id }: Props) {
  const t = useTranslations("admin.awards");
  const router = useRouter();
  const [form] = Form.useForm<Award>();
  const isEdit = Boolean(id);
  const existing = id ? awardRepo.get(id) : undefined;

  useEffect(() => {
    if (existing) form.setFieldsValue(existing);
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: Award = {
        ...values,
        id: existing?.id ?? newId("aw"),
      };
      if (isEdit) {
        awardRepo.update(item.id, item);
        message.success(t("updated"));
      } else {
        awardRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.awards);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        awardRepo.remove(existing.id);
        router.push(routes.admin.awards);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.awards}>
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
            name="year"
            label={t("field.year")}
            rules={[{ required: true, pattern: /^\d{4}$/ }]}
          >
            <Input size="large" placeholder="2024" style={{ width: 200 }} />
          </Form.Item>
          <BilingualInput name="title" label={t("field.title")} required />
          <Form.Item
            name="issuer"
            label={t("field.issuer")}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="State Govt." />
          </Form.Item>
          <Form.Item
            name="icon"
            label={t("field.icon")}
            tooltip={t("iconHint")}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="🏆" />
          </Form.Item>
        </FormShell>
      </Form>
    </>
  );
}
