"use client";

import { useEffect } from "react";
import { Form, Input, InputNumber, Button, Space, message } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { testimonialRepo } from "@/services/repos";
import { newId } from "@/services/repository";
import { routes } from "@/lib/routes";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Testimonial } from "@/types";

interface Props {
  id?: string;
}

export default function TestimonialForm({ id }: Props) {
  const t = useTranslations("admin.testimonials");
  const router = useRouter();
  const [form] = Form.useForm<Testimonial>();
  const isEdit = Boolean(id);
  const existing = id ? testimonialRepo.get(id) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({ rating: 5 } as unknown as Testimonial);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: Testimonial = {
        ...values,
        id: existing?.id ?? newId("tst"),
      };
      if (isEdit) {
        testimonialRepo.update(item.id, item);
        message.success(t("updated"));
      } else {
        testimonialRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.testimonials);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        testimonialRepo.remove(existing.id);
        router.push(routes.admin.testimonials);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.testimonials}>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Form.Item
              name="name"
              label={t("field.name")}
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="Suresh Kumar" />
            </Form.Item>
            <Form.Item
              name="city"
              label={t("field.city")}
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="Karnal" />
            </Form.Item>
          </div>
          <Form.Item
            name="avatar"
            label={t("field.avatar")}
            rules={[{ required: true, type: "url" }]}
          >
            <Input size="large" placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="rating"
            label={t("field.rating")}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={5} step={0.5} style={{ width: 200 }} />
          </Form.Item>
          <BilingualInput
            name="quote"
            label={t("field.quote")}
            required
            textarea
            rows={3}
          />
        </FormShell>
      </Form>
    </>
  );
}
