"use client";

import { useEffect, useState } from "react";
import { Form, InputNumber, Button, message, Card, Tabs } from "antd";
import { Save, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { settingsService } from "@/services/settingsService";
import PageHeader from "../../components/PageHeader";
import BilingualInput from "../../components/BilingualInput";
import type { SiteSettings } from "@/types";

/**
 * Editorial surface for the site's homepage / about-page narrative content
 * (farm name, tagline, founding year, headline statistics). Backed by the
 * same `settingsService` as `SettingsView` but split into its own page so
 * editors don't need to scroll past contact + delivery config to reach it.
 */
export default function SiteContentView() {
  const t = useTranslations("admin.siteContent");
  const [form] = Form.useForm<SiteSettings>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(settingsService.get());
  }, [form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const current = settingsService.get();
      // Only persist the fields this page exposes — leaves contact / delivery
      // configuration owned by SettingsView untouched.
      settingsService.save({
        ...current,
        farmName: values.farmName,
        tagline: values.tagline,
        foundedYear: values.foundedYear,
        stats: values.stats,
      });
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
            defaultActiveKey="hero"
            items={[
              {
                key: "hero",
                label: t("tab.hero"),
                children: (
                  <>
                    <BilingualInput
                      name="farmName"
                      label={t("field.farmName")}
                      required
                    />
                    <BilingualInput
                      name="tagline"
                      label={t("field.tagline")}
                      required
                      textarea
                      rows={2}
                    />
                    <Form.Item
                      name="foundedYear"
                      label={t("field.foundedYear")}
                    >
                      <InputNumber
                        min={1900}
                        max={2100}
                        style={{ width: 200 }}
                      />
                    </Form.Item>
                  </>
                ),
              },
              {
                key: "stats",
                label: t("tab.stats"),
                children: (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <Form.Item
                      name={["stats", "yearsHeritage"]}
                      label={t("field.yearsHeritage")}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name={["stats", "healthyCows"]}
                      label={t("field.healthyCows")}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name={["stats", "litresPerDay"]}
                      label={t("field.litresPerDay")}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name={["stats", "happyCustomers"]}
                      label={t("field.happyCustomers")}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                ),
              },
            ]}
          />
        </Form>
      </Card>
    </>
  );
}
