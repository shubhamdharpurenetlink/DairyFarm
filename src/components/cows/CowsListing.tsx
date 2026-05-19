"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Segmented, Badge } from "antd";
import { GitCompareArrows } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import BreedCard from "@/components/cows/BreedCard";
import CompareModal from "@/components/cows/CompareModal";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { cows } from "@/data/cows";
import { useUIStore } from "@/store/useUIStore";
import type { CowCategory } from "@/types";
import styles from "./CowsListing.module.scss";

type Filter = "all" | CowCategory;

export default function CowsListing() {
  const t = useTranslations("cows");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [compareOpen, setCompareOpen] = useState(false);
  const { compareList } = useUIStore();

  const items = useMemo(
    () => (filter === "all" ? cows : cows.filter((c) => c.category === filter)),
    [filter],
  );

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className={styles.controls}>
          <Segmented
            value={filter}
            onChange={(v) => setFilter(v as Filter)}
            options={[
              { label: tCommon("all"), value: "all" },
              { label: tCommon("indigenous"), value: "indigenous" },
              { label: tCommon("exotic"), value: "exotic" },
              { label: tCommon("crossbreed"), value: "crossbreed" },
            ]}
            size="large"
          />

          <Badge count={compareList.length} offset={[-8, 8]}>
            <Button
              type="primary"
              size="large"
              icon={<GitCompareArrows size={18} />}
              onClick={() => setCompareOpen(true)}
              disabled={compareList.length < 2}
            >
              {t("compareTitle")}
            </Button>
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
          >
            {items.map((cow) => (
              <motion.div key={cow.slug} variants={fadeUp}>
                <BreedCard cow={cow} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        locale={locale}
      />
    </section>
  );
}
