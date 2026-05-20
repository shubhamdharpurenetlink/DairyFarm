"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Result,
} from "antd";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import type { TrainingProgram } from "@/types";
import { enrollmentService } from "@/services/entityServices";
import {
  enrollmentSchema,
  type EnrollmentFormValues,
} from "@/lib/validators/enrollment";
import styles from "./EnrollmentForm.module.scss";

const SOURCES = ["google", "facebook", "whatsapp", "friend", "other"] as const;

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
    control,
    formState: { errors },
    reset,
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: { batchDate: "" },
  });

  const onSubmit = (data: EnrollmentFormValues) => {
    setLoading(true);
    setTimeout(() => {
      enrollmentService.create({
        ...data,
        trainingId: program.slug,
        trainingTitleEn: program.title.en,
      });
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
              {t("enrollAnother")}
            </Button>
          }
        />
      </motion.div>
    );
  }

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <Form.Item
        label={t("fullName")}
        required
        validateStatus={errors.fullName ? "error" : ""}
        help={errors.fullName?.message}
      >
        <Input
          {...register("fullName")}
          size="large"
          placeholder={t("fullName")}
        />
      </Form.Item>

      <div className={styles.row}>
        <Form.Item
          label={t("phone")}
          required
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone?.message}
        >
          <Input
            {...register("phone")}
            size="large"
            placeholder="9876543210"
          />
        </Form.Item>

        <Form.Item
          label={t("age")}
          required
          validateStatus={errors.age ? "error" : ""}
          help={errors.age?.message}
        >
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                size="large"
                min={15}
                max={80}
                placeholder="25"
                style={{ width: "100%" }}
              />
            )}
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

      <Form.Item
        label={t("batchDate")}
        required
        validateStatus={errors.batchDate ? "error" : ""}
        help={errors.batchDate?.message}
      >
        <Controller
          name="batchDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder={t("batchDatePlaceholder")}
              value={field.value ? dayjs(field.value) : null}
              onChange={(d) =>
                field.onChange(d ? d.format("YYYY-MM-DD") : "")
              }
            />
          )}
        />
      </Form.Item>

      <Form.Item label={t("source")}>
        <Controller
          name="source"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="large"
              placeholder={t("selectSource")}
              allowClear
              options={SOURCES.map((value) => ({
                value,
                label: t(
                  `source${value.charAt(0).toUpperCase()}${value.slice(1)}` as
                    | "sourceGoogle"
                    | "sourceFacebook"
                    | "sourceWhatsapp"
                    | "sourceFriend"
                    | "sourceOther",
                ),
              }))}
            />
          )}
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
