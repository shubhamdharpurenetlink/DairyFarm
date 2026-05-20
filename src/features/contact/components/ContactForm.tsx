"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select, Button, Result } from "antd";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { enquiryService } from "@/services/entityServices";
import {
  ENQUIRY_SUBJECTS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "general" },
  });

  const onSubmit = (data: ContactFormValues) => {
    setLoading(true);
    // Repository writes are synchronous (localStorage); we still wrap with a
    // short timeout so the loading spinner is perceptible — feels less janky
    // than an instant flip and mirrors how the future API submit will behave.
    setTimeout(() => {
      enquiryService.create(data);
      setLoading(false);
      setSubmitted(true);
      reset();
    }, 400);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Result
          status="success"
          title={t("successTitle")}
          subTitle={t("successMsg")}
          extra={
            <Button type="primary" onClick={() => setSubmitted(false)}>
              {t("sendAnother")}
            </Button>
          }
        />
      </motion.div>
    );
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label={t("name")}
        required
        validateStatus={errors.name ? "error" : ""}
        help={errors.name?.message}
      >
        <Input {...register("name")} size="large" placeholder={t("name")} />
      </Form.Item>

      <Form.Item
        label={t("phone")}
        required
        validateStatus={errors.phone ? "error" : ""}
        help={errors.phone?.message}
      >
        <Input {...register("phone")} size="large" placeholder="9876543210" />
      </Form.Item>

      <Form.Item
        label={t("email")}
        required
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Input
          type="email"
          {...register("email")}
          size="large"
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item
        label={t("subject")}
        required
        validateStatus={errors.subject ? "error" : ""}
        help={errors.subject?.message}
      >
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="large"
              options={ENQUIRY_SUBJECTS.map((value) => ({
                value,
                label: t(
                  `subject${value.charAt(0).toUpperCase()}${value.slice(1)}`,
                ),
              }))}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("message")}
        required
        validateStatus={errors.message ? "error" : ""}
        help={errors.message?.message}
      >
        <Input.TextArea
          {...register("message")}
          rows={4}
          placeholder={t("messagePlaceholder")}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        icon={<Send size={16} />}
        iconPosition="end"
        loading={loading}
      >
        {t("submit")}
      </Button>
    </Form>
  );
}
