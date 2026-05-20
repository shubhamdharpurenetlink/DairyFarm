"use client";

import { useEffect } from "react";
import { Form, Input, Select, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { categoryRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { ProductCategoryDef, ProductCategory } from "@/types";

interface Props {
  slug?: string;
}

const SLUGS: ProductCategory[] = [
  "milk",
  "ghee",
  "curd",
  "paneer",
  "butter",
  "mava",
  "sweets",
  "other",
];

export default function CategoryForm({ slug }: Props) {
  const t = useTranslations("admin.categories");
  const router = useRouter();
  const [form] = Form.useForm<ProductCategoryDef>();
  const isEdit = Boolean(slug);
  const existing = slug ? categoryRepo.get(slug) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({
        slug: "milk",
        color: "#3a86ff",
      } as unknown as ProductCategoryDef);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: ProductCategoryDef = { ...values };
      if (isEdit) {
        categoryRepo.update(item.slug, item);
        message.success(t("updated"));
      } else if (categoryRepo.get(item.slug)) {
        message.error(t("slugExists"));
        return;
      } else {
        categoryRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.categories);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        categoryRepo.remove(existing.slug);
        router.push(routes.admin.categories);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.categories}>
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
            name="slug"
            label={t("field.slug")}
            rules={[{ required: true }]}
          >
            <Select
              size="large"
              disabled={isEdit}
              options={SLUGS.map((v) => ({ value: v, label: v }))}
            />
          </Form.Item>
          <BilingualInput name="name" label={t("field.name")} required />
          <BilingualInput
            name="description"
            label={t("field.description")}
            textarea
            rows={2}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Form.Item
              name="icon"
              label={t("field.icon")}
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="🥛" />
            </Form.Item>
            <Form.Item
              name="color"
              label={t("field.color")}
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="#3a86ff" />
            </Form.Item>
          </div>
        </FormShell>
      </Form>
    </>
  );
}
