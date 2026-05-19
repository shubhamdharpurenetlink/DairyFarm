"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Input, Select, Button, Result } from "antd";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Pick a subject"),
  message: z.string().min(10, "Message is too short"),
});

type FormValues = z.infer<typeof schema>;

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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "subjectGeneral" },
  });

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      console.info("Contact message", data);
      setLoading(false);
      setSubmitted(true);
      reset();
    }, 800);
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
              Send another
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
              options={[
                { value: "subjectGeneral", label: t("subjectGeneral") },
                { value: "subjectVisit", label: t("subjectVisit") },
                { value: "subjectOrder", label: t("subjectOrder") },
                { value: "subjectTraining", label: t("subjectTraining") },
                { value: "subjectPartnership", label: t("subjectPartnership") },
              ]}
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
          placeholder="Type your message here..."
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
