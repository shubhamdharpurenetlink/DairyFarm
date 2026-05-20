"use client";

import { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
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
import { productRepo, categoryRepo } from "@/services/repos";
import { newId } from "@/services/repository";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { routes } from "@/lib/routes";
import { slugify } from "@/lib/formatters";
import { productFormSchema } from "@/lib/validators/product";
import PageHeader from "../../components/PageHeader";
import FormShell from "../../components/FormShell";
import BilingualInput from "../../components/BilingualInput";
import { confirmDelete } from "../../components/ConfirmDelete";
import type { Product } from "@/types";

interface Props {
  slug?: string;
}

export default function ProductForm({ slug }: Props) {
  const t = useTranslations("admin.products");
  const router = useRouter();
  const [form] = Form.useForm<Product>();
  const isEdit = Boolean(slug);
  const categories = useHydratedRepo(categoryRepo);
  const existing = slug ? productRepo.get(slug) : undefined;

  useEffect(() => {
    if (existing) {
      form.setFieldsValue(existing);
    } else {
      form.setFieldsValue({
        slug: "",
        category: "milk",
        isAvailable: true,
        isFeatured: false,
        tags: [],
        images: [],
        variants: [
          {
            id: newId("var"),
            label: { en: "1 L", hi: "1 लीटर" },
            unit: "L",
            size: 1,
            priceInr: 0,
            stockQty: 0,
            sku: "",
          },
        ],
      } as unknown as Product);
    }
  }, [existing, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      // Final cross-cutting validation via the canonical zod schema —
      // catches anything Ant Design's per-field rules can't express
      // (e.g. variant array shape, badge bilingual completeness).
      const parsed = productFormSchema.safeParse({
        ...values,
        slug: values.slug || slugify(values.name?.en ?? "product"),
        primaryImage: values.primaryImage || values.images?.[0],
        images: (values.images ?? []).filter(Boolean),
      });
      if (!parsed.success) {
        const first = parsed.error.issues[0];
        message.error(
          first
            ? `${first.path.join(".") || t("validationFailed")}: ${first.message}`
            : t("validationFailed"),
        );
        return;
      }
      const now = new Date().toISOString();
      const product: Product = {
        ...(parsed.data as Product),
        publishedAt: existing?.publishedAt ?? now,
        updatedAt: now,
      };
      if (isEdit) {
        productRepo.update(product.slug, product);
        message.success(t("updated"));
      } else if (productRepo.get(product.slug)) {
        message.error(t("slugExists"));
        return;
      } else {
        productRepo.create(product);
        message.success(t("created"));
      }
      router.push(routes.admin.products);
    } catch {
      message.error(t("validationFailed"));
    }
  };

  const onDelete = () => {
    if (!existing) return;
    confirmDelete({
      title: t("confirmDeleteTitle"),
      description: t("confirmDeleteDesc", { name: existing.name.en }),
      onOk: () => {
        productRepo.remove(existing.slug);
        router.push(routes.admin.products);
      },
    });
  };

  return (
    <>
      <PageHeader
        title={isEdit ? t("editTitle") : t("newTitle")}
        breadcrumb={
          <Link href={routes.admin.products}>
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
            <>
              <Card title={t("organize")} bodyStyle={{ padding: 16 }}>
                <Form.Item
                  name="category"
                  label={t("field.category")}
                  rules={[{ required: true }]}
                >
                  <Select
                    options={categories.map((c) => ({
                      value: c.slug,
                      label: `${c.name.en} / ${c.name.hi}`,
                    }))}
                  />
                </Form.Item>
                <Form.Item name="isAvailable" label={t("field.isAvailable")} valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item name="isFeatured" label={t("field.isFeatured")} valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item name="tags" label={t("field.tags")}>
                  <Select mode="tags" tokenSeparators={[","]} placeholder="bestseller, a2..." />
                </Form.Item>
              </Card>

              <Card title={t("commerce")} bodyStyle={{ padding: 16 }}>
                <Form.Item name="shelfLifeDays" label={t("field.shelfLifeDays")}>
                  <InputNumber style={{ width: "100%" }} min={1} />
                </Form.Item>
                <Divider style={{ margin: "12px 0" }} />
                <small style={{ color: "#8a8a8a" }}>{t("commerceHint")}</small>
              </Card>
            </>
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
                      rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}
                    >
                      <Input size="large" disabled={isEdit} />
                    </Form.Item>
                    <BilingualInput
                      name="name"
                      label={t("field.name")}
                      required
                      placeholder={{ en: "A2 Bilona Ghee", hi: "A2 बिलोना घी" }}
                    />
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
                key: "media",
                label: t("tab.media"),
                children: (
                  <>
                    <Form.Item
                      name="primaryImage"
                      label={t("field.primaryImage")}
                      rules={[{ required: true, type: "url" }]}
                    >
                      <Input size="large" placeholder="https://..." />
                    </Form.Item>
                    <Form.List name="images">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <Space key={field.key} style={{ display: "flex", marginBottom: 8 }}>
                              <Form.Item
                                {...field}
                                rules={[{ required: true, type: "url" }]}
                                noStyle
                              >
                                <Input size="large" placeholder="https://..." style={{ width: 460 }} />
                              </Form.Item>
                              <Button danger icon={<Trash2 size={14} />} onClick={() => remove(field.name)} />
                            </Space>
                          ))}
                          <Button onClick={() => add("")} icon={<Plus size={14} />}>
                            {t("addImage")}
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </>
                ),
              },
              {
                key: "variants",
                label: t("tab.variants"),
                children: (
                  <Form.List name="variants">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <Card
                            key={field.key}
                            size="small"
                            style={{ marginBottom: 12 }}
                            extra={
                              fields.length > 1 ? (
                                <Button
                                  danger
                                  size="small"
                                  icon={<Trash2 size={14} />}
                                  onClick={() => remove(field.name)}
                                />
                              ) : null
                            }
                            title={`${t("variant")} ${field.name + 1}`}
                          >
                            <Form.Item name={[field.name, "id"]} hidden>
                              <Input />
                            </Form.Item>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                              <Form.Item
                                label={t("field.variantLabelEn")}
                                name={[field.name, "label", "en"]}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="500 ml" />
                              </Form.Item>
                              <Form.Item
                                label={t("field.variantLabelHi")}
                                name={[field.name, "label", "hi"]}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="500 मिली" />
                              </Form.Item>
                              <Form.Item
                                label={t("field.unit")}
                                name={[field.name, "unit"]}
                                rules={[{ required: true }]}
                              >
                                <Select
                                  options={["L", "ml", "kg", "g", "piece"].map((u) => ({
                                    value: u,
                                    label: u,
                                  }))}
                                />
                              </Form.Item>
                              <Form.Item
                                label={t("field.size")}
                                name={[field.name, "size"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber style={{ width: "100%" }} min={0} />
                              </Form.Item>
                              <Form.Item
                                label={t("field.price")}
                                name={[field.name, "priceInr"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber prefix="₹" style={{ width: "100%" }} min={0} />
                              </Form.Item>
                              <Form.Item label={t("field.mrp")} name={[field.name, "mrpInr"]}>
                                <InputNumber prefix="₹" style={{ width: "100%" }} min={0} />
                              </Form.Item>
                              <Form.Item
                                label={t("field.stock")}
                                name={[field.name, "stockQty"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber style={{ width: "100%" }} min={0} />
                              </Form.Item>
                              <Form.Item
                                label={t("field.sku")}
                                name={[field.name, "sku"]}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="GHEE-BIL-500" />
                              </Form.Item>
                            </div>
                          </Card>
                        ))}
                        <Button
                          icon={<Plus size={14} />}
                          onClick={() =>
                            add({
                              id: newId("var"),
                              label: { en: "", hi: "" },
                              unit: "L",
                              size: 1,
                              priceInr: 0,
                              stockQty: 0,
                              sku: "",
                            })
                          }
                        >
                          {t("addVariant")}
                        </Button>
                      </>
                    )}
                  </Form.List>
                ),
              },
              {
                key: "details",
                label: t("tab.details"),
                children: (
                  <>
                    <BilingualInput
                      name="ingredients"
                      label={t("field.ingredients")}
                      textarea
                      rows={2}
                    />
                    <BilingualInput
                      name="storageInstructions"
                      label={t("field.storage")}
                      textarea
                      rows={2}
                    />
                    <Divider>{t("badges")}</Divider>
                    <Form.List name="badges">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <div
                              key={field.key}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr auto",
                                gap: 12,
                                marginBottom: 8,
                              }}
                            >
                              <Form.Item
                                name={[field.name, "en"]}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="Bestseller" />
                              </Form.Item>
                              <Form.Item
                                name={[field.name, "hi"]}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="बेस्टसेलर" />
                              </Form.Item>
                              <Button
                                danger
                                icon={<Trash2 size={14} />}
                                onClick={() => remove(field.name)}
                              />
                            </div>
                          ))}
                          <Button
                            icon={<Plus size={14} />}
                            onClick={() => add({ en: "", hi: "" })}
                          >
                            {t("addBadge")}
                          </Button>
                        </>
                      )}
                    </Form.List>
                    <Divider>{t("rating")}</Divider>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Form.Item name="rating" label={t("field.rating")}>
                        <InputNumber
                          min={0}
                          max={5}
                          step={0.1}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="ratingCount"
                        label={t("field.ratingCount")}
                      >
                        <InputNumber min={0} style={{ width: "100%" }} />
                      </Form.Item>
                    </div>
                    <Divider>{t("nutrition")}</Divider>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                      <Form.Item label="Energy (kcal)" name={["nutrition", "energyKcal"]}>
                        <InputNumber style={{ width: "100%" }} min={0} />
                      </Form.Item>
                      <Form.Item label="Protein (g)" name={["nutrition", "proteinG"]}>
                        <InputNumber style={{ width: "100%" }} min={0} step={0.1} />
                      </Form.Item>
                      <Form.Item label="Fat (g)" name={["nutrition", "fatG"]}>
                        <InputNumber style={{ width: "100%" }} min={0} step={0.1} />
                      </Form.Item>
                      <Form.Item label="Carbs (g)" name={["nutrition", "carbsG"]}>
                        <InputNumber style={{ width: "100%" }} min={0} step={0.1} />
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
