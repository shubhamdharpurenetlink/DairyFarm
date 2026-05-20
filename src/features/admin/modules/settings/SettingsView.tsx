"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Card,
  Divider,
  Tabs,
  Select,
} from "antd";
import { Save, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { settingsService } from "@/services/settingsService";
import PageHeader from "../../components/PageHeader";
import BilingualInput from "../../components/BilingualInput";
import type { SiteSettings } from "@/types";

export default function SettingsView() {
  const t = useTranslations("admin.settings");
  const [form] = Form.useForm<SiteSettings>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(settingsService.get());
  }, [form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      settingsService.save(values);
      message.success(t("saved"));
    } catch {
      message.error(t("invalid"));
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => {
    const fresh = settingsService.reset();
    form.setFieldsValue(fresh);
    message.success(t("reset"));
  };

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <>
            <Button icon={<RotateCcw size={14} />} onClick={onReset}>
              {t("resetDefaults")}
            </Button>
            <Button
              type="primary"
              icon={<Save size={14} />}
              loading={saving}
              onClick={onSave}
            >
              {t("save")}
            </Button>
          </>
        }
      />

      <Card>
        <Form form={form} layout="vertical">
          <Tabs
            defaultActiveKey="brand"
            items={[
              {
                key: "brand",
                label: t("tab.brand"),
                children: (
                  <>
                    <BilingualInput name="farmName" label={t("field.farmName")} required />
                    <BilingualInput name="tagline" label={t("field.tagline")} required />
                    <Form.Item name="foundedYear" label={t("field.foundedYear")}>
                      <InputNumber min={1900} max={2100} style={{ width: 200 }} />
                    </Form.Item>
                  </>
                ),
              },
              {
                key: "contact",
                label: t("tab.contact"),
                children: (
                  <>
                    <BilingualInput name="address" label={t("field.address")} required textarea rows={2} />
                    <BilingualInput name="hours" label={t("field.hours")} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      <Form.Item name="phone" label={t("field.phone")} rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="whatsapp" label={t("field.whatsapp")} rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label={t("field.email")}
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </>
                ),
              },
              {
                key: "social",
                label: t("tab.social"),
                children: (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Form.Item name={["socials", "facebook"]} label="Facebook">
                      <Input placeholder="https://facebook.com/..." />
                    </Form.Item>
                    <Form.Item name={["socials", "instagram"]} label="Instagram">
                      <Input placeholder="https://instagram.com/..." />
                    </Form.Item>
                    <Form.Item name={["socials", "youtube"]} label="YouTube">
                      <Input placeholder="https://youtube.com/..." />
                    </Form.Item>
                    <Form.Item name={["socials", "twitter"]} label="Twitter">
                      <Input placeholder="https://twitter.com/..." />
                    </Form.Item>
                  </div>
                ),
              },
              {
                key: "stats",
                label: t("tab.stats"),
                children: (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Form.Item name={["stats", "yearsHeritage"]} label={t("field.yearsHeritage")}>
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name={["stats", "healthyCows"]} label={t("field.healthyCows")}>
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name={["stats", "litresPerDay"]} label={t("field.litresPerDay")}>
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name={["stats", "happyCustomers"]} label={t("field.happyCustomers")}>
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                ),
              },
              {
                key: "delivery",
                label: t("tab.delivery"),
                children: (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      <Form.Item name={["delivery", "freeAboveInr"]} label={t("field.freeAbove")}>
                        <InputNumber prefix="₹" min={0} style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item name={["delivery", "flatFeeInr"]} label={t("field.flatFee")}>
                        <InputNumber prefix="₹" min={0} style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item name={["delivery", "minOrderInr"]} label={t("field.minOrder")}>
                        <InputNumber prefix="₹" min={0} style={{ width: "100%" }} />
                      </Form.Item>
                    </div>
                    <Divider />
                    <Form.Item
                      name={["delivery", "serviceablePincodes"]}
                      label={t("field.pincodes")}
                      tooltip={t("pincodesHint")}
                      rules={[
                        {
                          validator: (_, value: unknown) => {
                            if (!Array.isArray(value) || value.length === 0) {
                              return Promise.resolve();
                            }
                            const bad = (value as string[]).find(
                              (v) => !/^\d{6}$/.test(v),
                            );
                            return bad
                              ? Promise.reject(new Error(t("pincodesInvalid")))
                              : Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Select
                        mode="tags"
                        size="large"
                        tokenSeparators={[",", " "]}
                        placeholder="132001, 132023, 132024..."
                      />
                    </Form.Item>
                  </>
                ),
              },
            ]}
          />
        </Form>
      </Card>
    </>
  );
}
