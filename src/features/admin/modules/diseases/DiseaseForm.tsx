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
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { diseaseRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { slugify } from "@/lib/formatters";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Disease } from "@/types";

interface Props {
  slug?: string;
}

const CATEGORIES: Disease["category"][] = [
  "disease",
  "nutrition",
  "calving",
  "hoof",
  "vaccination",
];

export default function DiseaseForm({ slug }: Props) {
  const t = useTranslations("admin.diseases");
  const router = useRouter();
  const [form] = Form.useForm<Disease>();
  const isEdit = Boolean(slug);
  const existing = slug ? diseaseRepo.get(slug) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({
        slug: "",
        category: "disease",
        readTimeMin: 5,
        symptoms: { en: [], hi: [] },
        causes: { en: [], hi: [] },
        prevention: { en: [], hi: [] },
        treatment: { en: [], hi: [] },
      } as unknown as Disease);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toISOString();
      const item: Disease = {
        ...values,
        slug: values.slug || slugify(values.title?.en ?? "topic"),
        publishedAt: existing?.publishedAt ?? now,
      };
      if (isEdit) {
        diseaseRepo.update(item.slug, item);
        message.success(t("updated"));
      } else if (diseaseRepo.get(item.slug)) {
        message.error(t("slugExists"));
        return;
      } else {
        diseaseRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.diseases);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        diseaseRepo.remove(existing.slug);
        router.push(routes.admin.diseases);
      },
    });
  };

  const tagsField = (name: ["symptoms" | "causes" | "prevention" | "treatment", "en" | "hi"], placeholder: string) => (
    <Form.Item name={name} label={`${name[0]} (${name[1]})`}>
      <Select mode="tags" tokenSeparators={[","]} placeholder={placeholder} />
    </Form.Item>
  );

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.diseases}>
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
                name="readTimeMin"
                label={t("field.readMin")}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="image"
                label={t("field.image")}
                rules={[{ required: true, type: "url" }]}
              >
                <Input placeholder="https://..." />
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
                    <BilingualInput
                      name="title"
                      label={t("field.title")}
                      required
                    />
                    <BilingualInput
                      name="summary"
                      label={t("field.summary")}
                      required
                      textarea
                      rows={3}
                    />
                  </>
                ),
              },
              {
                key: "details",
                label: t("tab.details"),
                children: (
                  <>
                    <Divider>{t("symptoms")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {tagsField(["symptoms", "en"], "Fever, low feed intake...")}
                      {tagsField(["symptoms", "hi"], "बुखार, खाना कम खाना...")}
                    </div>
                    <Divider>{t("causes")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {tagsField(["causes", "en"], "Bacterial infection...")}
                      {tagsField(["causes", "hi"], "जीवाणु संक्रमण...")}
                    </div>
                    <Divider>{t("prevention")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {tagsField(["prevention", "en"], "Hygiene, vaccination...")}
                      {tagsField(["prevention", "hi"], "स्वच्छता, टीकाकरण...")}
                    </div>
                    <Divider>{t("treatment")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {tagsField(["treatment", "en"], "Antibiotics, fluids...")}
                      {tagsField(["treatment", "hi"], "एंटीबायोटिक, द्रव...")}
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
