"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Input, InputNumber, Select, DatePicker, Button, Result } from "antd";
import { motion } from "framer-motion";
import type { TrainingProgram } from "@/types";
import styles from "./EnrollmentForm.module.scss";

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone number"),
  email: z.string().email("Enter a valid email"),
  age: z.number().min(16).max(80),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  education: z.string().min(2),
  source: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  program: TrainingProgram;
}

export default function EnrollmentForm({ program }: Props) {
  const t = useTranslations("training.form");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      console.info("Enrollment", { program: program.slug, ...data });
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
              Enroll Another
            </Button>
          }
        />
      </motion.div>
    );
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={styles.form}>
      <Form.Item
        label={t("fullName")}
        required
        validateStatus={errors.fullName ? "error" : ""}
        help={errors.fullName?.message}
      >
        <Input {...register("fullName")} size="large" placeholder={t("fullName")} />
      </Form.Item>

      <div className={styles.row}>
        <Form.Item
          label={t("phone")}
          required
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone?.message}
        >
          <Input {...register("phone")} size="large" placeholder="9876543210" />
        </Form.Item>

        <Form.Item
          label={t("age")}
          required
          validateStatus={errors.age ? "error" : ""}
          help={errors.age?.message}
        >
          <InputNumber
            size="large"
            min={16}
            max={80}
            placeholder="25"
            style={{ width: "100%" }}
            onChange={(v) => setValue("age", Number(v))}
          />
        </Form.Item>
      </div>

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

      <div className={styles.row}>
        <Form.Item
          label={t("state")}
          required
          validateStatus={errors.state ? "error" : ""}
          help={errors.state?.message}
        >
          <Input {...register("state")} size="large" placeholder="Haryana" />
        </Form.Item>
        <Form.Item
          label={t("district")}
          required
          validateStatus={errors.district ? "error" : ""}
          help={errors.district?.message}
        >
          <Input {...register("district")} size="large" placeholder="Karnal" />
        </Form.Item>
      </div>

      <Form.Item
        label={t("education")}
        required
        validateStatus={errors.education ? "error" : ""}
        help={errors.education?.message}
      >
        <Input
          {...register("education")}
          size="large"
          placeholder="12th / Graduate / Working farmer"
        />
      </Form.Item>

      <Form.Item label={t("source")}>
        <Select
          size="large"
          placeholder="Select source"
          options={[
            { value: "google", label: "Google Search" },
            { value: "facebook", label: "Facebook" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "friend", label: "Friend / Family" },
            { value: "other", label: "Other" },
          ]}
          onChange={(v) => setValue("source", v)}
        />
      </Form.Item>

      <Form.Item label={t("message")}>
        <Input.TextArea
          {...register("message")}
          rows={3}
          placeholder={t("message")}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
      >
        {t("submit")}
      </Button>
    </Form>
  );
}
