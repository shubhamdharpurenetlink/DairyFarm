"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";

interface Props {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "section" | "article";
  delay?: number;
}

export default function AnimatedSection({
  children,
  variants = fadeUp,
  className,
  as = "div",
  delay = 0,
}: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
