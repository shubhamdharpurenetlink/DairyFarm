"use client";

import { useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { facilityRepo } from "@/services/repos";
import { newId } from "@/services/repository";
import { routes } from "@/lib/routes";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Facility } from "@/types";

interface Props {
  id?: string;
}

export default function FacilityForm({ id }: Props) {
  const t = useTranslations("admin.facilities");
  const router = useRouter();
  const [form] = Form.useForm<Facility>();
  const isEdit = Boolean(id);
  const existing = id ? facilityRepo.get(id) : undefined;

  useEffect(() => {
    if (existing) form.setFieldsValue(existing);
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: Facility = {
        ...values,
        id: existing?.id ?? newId("fac"),
      };
      if (isEdit) {
        facilityRepo.update(item.id, item);
        message.success(t("updated"));
      } else {
        facilityRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.facilities);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        facilityRepo.remove(existing.id);
        router.push(routes.admin.facilities);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.facilities}>
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
          <BilingualInput name="name" label={t("field.name")} required />
          <BilingualInput
            name="description"
            label={t("field.description")}
            required
            textarea
            rows={3}
          />
          <Form.Item
            name="image"
            label={t("field.image")}
            rules={[{ required: true, type: "url" }]}
          >
            <Input size="large" placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="icon"
            label={t("field.icon")}
            tooltip={t("iconHint")}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="🐄" />
          </Form.Item>
        </FormShell>
      </Form>
    </>
  );
}
