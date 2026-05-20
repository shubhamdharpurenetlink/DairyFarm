"use client";

import { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card,
  Space,
  message,
  Tabs,
  Divider,
} from "antd";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Save, Trash2, Plus, ArrowLeft } from "lucide-react";
import { cowRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { slugify } from "@/lib/formatters";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { CowBreed } from "@/types";

interface Props {
  slug?: string;
}

const CATEGORIES: CowBreed["category"][] = [
  "indigenous",
  "exotic",
  "crossbreed",
];

export default function CowForm({ slug }: Props) {
  const t = useTranslations("admin.cows");
  const router = useRouter();
  const [form] = Form.useForm<CowBreed>();
  const isEdit = Boolean(slug);
  const existing = slug ? cowRepo.get(slug) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({
        slug: "",
        nameEn: "",
        nameHi: "",
        category: "indigenous",
        origin: "",
        milkYieldLitresPerDay: { min: 0, max: 0 },
        fatPercent: 0,
        image: "",
        gallery: [],
        characteristics: { en: [], hi: [] },
        color: "",
      } as unknown as CowBreed);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const cow: CowBreed = {
        ...values,
        slug: values.slug || slugify(values.nameEn),
        gallery: (values.gallery ?? []).filter(Boolean),
      };
      if (isEdit) {
        cowRepo.update(cow.slug, cow);
        message.success(t("updated"));
      } else if (cowRepo.get(cow.slug)) {
        message.error(t("slugExists"));
        return;
      } else {
        cowRepo.create(cow);
        message.success(t("created"));
      }
      router.push(routes.admin.cows);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      description: t("confirmDeleteDesc", { name: existing.nameEn }),
      onOk: () => {
        cowRepo.remove(existing.slug);
        router.push(routes.admin.cows);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.cows}>
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
        <FormShell
          sidebar={
            <Card title={t("organize")} bodyStyle={{ padding: 16 }}>
              <Form.Item
                name="category"
                label={t("field.category")}
                rules={[{ required: true }]}
              >
                <Select
                  options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                />
              </Form.Item>
              <Form.Item
                name="color"
                label={t("field.color")}
                rules={[{ required: true }]}
              >
                <Input placeholder="#d4a574" />
              </Form.Item>
              <Form.Item
                name="origin"
                label={t("field.origin")}
                rules={[{ required: true }]}
              >
                <Input placeholder="Haryana, India" />
              </Form.Item>
            </Card>
          }
        >
          <Tabs
            defaultActiveKey="basic"
            items={[
              {
                key: "basic",
                label: t("tab.basic"),
                children: (
                  <>
                    <Form.Item
                      name="slug"
                      label={t("field.slug")}
                      rules={[
                        { required: true, pattern: /^[a-z0-9-]+$/ },
                      ]}
                    >
                      <Input size="large" disabled={isEdit} />
                    </Form.Item>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Form.Item
                        name="nameEn"
                        label={t("field.nameEn")}
                        rules={[{ required: true }]}
                      >
                        <Input size="large" placeholder="Gir" />
                      </Form.Item>
                      <Form.Item
                        name="nameHi"
                        label={t("field.nameHi")}
                        rules={[{ required: true }]}
                      >
                        <Input size="large" placeholder="गिर" />
                      </Form.Item>
                    </div>
                    <BilingualInput
                      name="shortDesc"
                      label={t("field.shortDesc")}
                      required
                      textarea
                      rows={2}
                    />
                    <BilingualInput
                      name="description"
                      label={t("field.description")}
                      required
                      textarea
                      rows={5}
                    />
                  </>
                ),
              },
              {
                key: "metrics",
                label: t("tab.metrics"),
                children: (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <Form.Item
                      name={["milkYieldLitresPerDay", "min"]}
                      label={t("field.yieldMin")}
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name={["milkYieldLitresPerDay", "max"]}
                      label={t("field.yieldMax")}
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="fatPercent"
                      label={t("field.fat")}
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        min={0}
                        max={20}
                        step={0.1}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </div>
                ),
              },
              {
                key: "media",
                label: t("tab.media"),
                children: (
                  <>
                    <Form.Item
                      name="image"
                      label={t("field.primaryImage")}
                      rules={[{ required: true, type: "url" }]}
                    >
                      <Input size="large" placeholder="https://..." />
                    </Form.Item>
                    <Divider>{t("gallery")}</Divider>
                    <Form.List name="gallery">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <Space
                              key={field.key}
                              style={{ display: "flex", marginBottom: 8 }}
                            >
                              <Form.Item
                                {...field}
                                rules={[{ required: true, type: "url" }]}
                                noStyle
                              >
                                <Input
                                  size="large"
                                  placeholder="https://..."
                                  style={{ width: 460 }}
                                />
                              </Form.Item>
                              <Button
                                danger
                                icon={<Trash2 size={14} />}
                                onClick={() => remove(field.name)}
                              />
                            </Space>
                          ))}
                          <Button
                            onClick={() => add("")}
                            icon={<Plus size={14} />}
                          >
                            {t("addImage")}
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </>
                ),
              },
              {
                key: "details",
                label: t("tab.details"),
                children: (
                  <>
                    <BilingualInput
                      name="history"
                      label={t("field.history")}
                      textarea
                      rows={3}
                    />
                    <BilingualInput
                      name="temperament"
                      label={t("field.temperament")}
                      textarea
                      rows={2}
                    />
                    <BilingualInput
                      name="suitability"
                      label={t("field.suitability")}
                      textarea
                      rows={2}
                    />
                    <Divider>{t("characteristics")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Form.Item
                        name={["characteristics", "en"]}
                        label="English"
                      >
                        <Select
                          mode="tags"
                          tokenSeparators={[","]}
                          placeholder="Heat tolerant, A2 milk..."
                        />
                      </Form.Item>
                      <Form.Item
                        name={["characteristics", "hi"]}
                        label="हिंदी"
                      >
                        <Select
                          mode="tags"
                          tokenSeparators={[","]}
                          placeholder="गर्मी सहन, A2 दूध..."
                        />
                      </Form.Item>
                    </div>
                  </>
                ),
              },
            ]}
          />
        </FormShell>
      </Form>
    </>
  );
}
