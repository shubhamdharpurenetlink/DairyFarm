"use client";

import { Form, Input } from "antd";
import type { Rule } from "antd/es/form";
import styles from "./BilingualInput.module.scss";

type FormName = string | (string | number)[];

interface Props {
  /**
   * Field path. Pass a string for top-level fields (e.g. `"name"`) or an
   * array path for nested fields (e.g. `["instructor", "role"]`). A `.en`
   * and `.hi` segment is appended automatically.
   */
  name: FormName;
  label: string;
  placeholder?: { en?: string; hi?: string };
  textarea?: boolean;
  required?: boolean;
  rows?: number;
}

const toPath = (name: FormName): (string | number)[] =>
  Array.isArray(name) ? name : [name];

export default function BilingualInput({
  name,
  label,
  placeholder,
  textarea,
  required,
  rows = 3,
}: Props) {
  const enRules: Rule[] = required
    ? [{ required: true, message: "English value required" }]
    : [];
  const hiRules: Rule[] = required
    ? [{ required: true, message: "Hindi value required" }]
    : [];
  const Comp = textarea ? Input.TextArea : Input;
  const path = toPath(name);
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.grid}>
        <Form.Item
          name={[...path, "en"]}
          rules={enRules}
          extra={<span className={styles.lang}>English</span>}
        >
          <Comp
            placeholder={placeholder?.en ?? "English"}
            size="large"
            rows={textarea ? rows : undefined}
          />
        </Form.Item>
        <Form.Item
          name={[...path, "hi"]}
          rules={hiRules}
          extra={<span className={styles.lang}>हिंदी</span>}
        >
          <Comp
            placeholder={placeholder?.hi ?? "हिंदी"}
            size="large"
            rows={textarea ? rows : undefined}
            className={styles.hindi}
          />
        </Form.Item>
      </div>
    </div>
  );
}
