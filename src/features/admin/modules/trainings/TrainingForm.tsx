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
import { trainingRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import { slugify } from "@/lib/formatters";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { TrainingProgram } from "@/types";

interface Props {
  slug?: string;
}

const LEVELS = ["beginner", "intermediate", "advanced"] as const;

export default function TrainingForm({ slug }: Props) {
  const t = useTranslations("admin.trainings");
  const router = useRouter();
  const [form] = Form.useForm<TrainingProgram>();
  const isEdit = Boolean(slug);
  const existing = slug ? trainingRepo.get(slug) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({
        slug: "",
        durationDays: 3,
        priceInr: 0,
        level: "beginner",
        seatsTotal: 20,
        seatsLeft: 20,
        syllabus: { en: [], hi: [] },
        includes: { en: [], hi: [] },
        instructor: { name: "", role: { en: "", hi: "" }, avatar: "", bioYears: 0 },
      } as unknown as TrainingProgram);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const item: TrainingProgram = {
        ...values,
        slug: values.slug || slugify(values.title?.en ?? "training"),
      };
      if (isEdit) {
        trainingRepo.update(item.slug, item);
        message.success(t("updated"));
      } else if (trainingRepo.get(item.slug)) {
        message.error(t("slugExists"));
        return;
      } else {
        trainingRepo.create(item);
        message.success(t("created"));
      }
      router.push(routes.admin.trainings);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      onOk: () => {
        trainingRepo.remove(existing.slug);
        router.push(routes.admin.trainings);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.trainings}>
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
                name="level"
                label={t("field.level")}
                rules={[{ required: true }]}
              >
                <Select
                  options={LEVELS.map((l) => ({ value: l, label: l }))}
                />
              </Form.Item>
              <Form.Item
                name="durationDays"
                label={t("field.durationDays")}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="priceInr"
                label={t("field.price")}
                rules={[{ required: true }]}
              >
                <InputNumber prefix="₹" min={0} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="seatsTotal"
                label={t("field.seatsTotal")}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="seatsLeft"
                label={t("field.seatsLeft")}
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
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
                    <BilingualInput name="title" label={t("field.title")} required />
                    <BilingualInput
                      name="shortDesc"
                      label={t("field.shortDesc")}
                      required
                      textarea
                      rows={2}
                    />
                    <BilingualInput
                      name="longDesc"
                      label={t("field.longDesc")}
                      required
                      textarea
                      rows={5}
                    />
                    <BilingualInput
                      name="schedule"
                      label={t("field.schedule")}
                      required
                    />
                  </>
                ),
              },
              {
                key: "instructor",
                label: t("tab.instructor"),
                children: (
                  <>
                    <Form.Item
                      name={["instructor", "name"]}
                      label={t("field.instructorName")}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Dr. Anil Sharma" />
                    </Form.Item>
                    <BilingualInput
                      name={["instructor", "role"]}
                      label={t("field.instructorRole")}
                      required
                    />
                    <Form.Item
                      name={["instructor", "avatar"]}
                      label={t("field.instructorAvatar")}
                      rules={[{ required: true, type: "url" }]}
                    >
                      <Input placeholder="https://..." />
                    </Form.Item>
                    <Form.Item
                      name={["instructor", "bioYears"]}
                      label={t("field.instructorBioYears")}
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} style={{ width: 200 }} />
                    </Form.Item>
                  </>
                ),
              },
              {
                key: "content",
                label: t("tab.content"),
                children: (
                  <>
                    <Divider>{t("syllabus")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Form.Item name={["syllabus", "en"]} label="English">
                        <Select mode="tags" tokenSeparators={[","]} />
                      </Form.Item>
                      <Form.Item name={["syllabus", "hi"]} label="हिंदी">
                        <Select mode="tags" tokenSeparators={[","]} />
                      </Form.Item>
                    </div>
                    <Divider>{t("includes")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Form.Item name={["includes", "en"]} label="English">
                        <Select mode="tags" tokenSeparators={[","]} />
                      </Form.Item>
                      <Form.Item name={["includes", "hi"]} label="हिंदी">
                        <Select mode="tags" tokenSeparators={[","]} />
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
