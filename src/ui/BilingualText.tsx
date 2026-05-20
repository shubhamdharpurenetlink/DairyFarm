"use client";

import type { ElementType } from "react";
import { useBilingual } from "@/hooks/useBilingual";
import type { Bilingual } from "@/types";

interface Props {
  value: Bilingual;
  as?: ElementType;
  className?: string;
}

export default function BilingualText({ value, as: Tag = "span", className }: Props) {
  const { pick } = useBilingual();
  return <Tag className={className}>{pick(value)}</Tag>;
}
