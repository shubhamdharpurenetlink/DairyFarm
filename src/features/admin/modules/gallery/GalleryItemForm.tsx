"use client";

import { useEffect } from "react";
import { Form, Input, InputNumber, Select, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { galleryRepo } from "@/services/repos";
import { newId } from "@/services/repository";
import { routes } from "@/lib/routes";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { GalleryItem } from "@/types";

interface Props {
  id?: string;
}

const TYPES: GalleryItem["type"][] = ["photo", "video"];

export default function GalleryItemForm({ id }: Props) {
  const t = useTranslations("admin.gallery");
  const router = useRouter();
  const [form] = Form.useForm<GalleryItem>();
  const isEdit = Boolean(id);
  const existing = id ? galleryRepo.get(id) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({
        type: "photo",
        aspectRatio: 1.5,
      } as unknown as GalleryItem);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: GalleryItem = {
        ...values,
        id: existing?.id ?? newId("gal"),
      };
      if (isEdit) {
        galleryRepo.update(item.id, item);
        message.success(t("updated"));
      } else {
        galleryRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.gallery);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        galleryRepo.remove(existing.id);
        router.push(routes.admin.gallery);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.gallery}>
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
            name="type"
            label={t("field.type")}
            rules={[{ required: true }]}
          >
            <Select options={TYPES.map((v) => ({ value: v, label: v }))} />
          </Form.Item>
          <BilingualInput name="title" label={t("field.title")} required />
          <Form.Item
            name="url"
            label={t("field.url")}
            rules={[{ required: true, type: "url" }]}
            tooltip={t("urlHint")}
          >
            <Input size="large" placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="thumbnail"
            label={t("field.thumbnail")}
            rules={[{ required: true, type: "url" }]}
          >
            <Input size="large" placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="aspectRatio"
            label={t("field.aspectRatio")}
            tooltip={t("aspectRatioHint")}
          >
            <InputNumber min={0.5} max={3} step={0.05} style={{ width: 200 }} />
          </Form.Item>
        </FormShell>
      </Form>
    </>
  );
}
