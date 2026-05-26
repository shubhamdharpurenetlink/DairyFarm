"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Input, Select } from "antd";
import { Search } from "lucide-react";
import PageBanner from "@/ui/PageBanner";
import Container from "@/ui/Container";
import EmptyState from "@/ui/EmptyState";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useBilingual } from "@/hooks/useBilingual";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { productRepo } from "@/services/repos";
import type { Product, ProductCategory } from "@/types";
import ProductCard from "../ProductCard";
import CategoryChips from "../CategoryChips";
import { ListSkeleton, ProductCardSkeleton } from "@/ui/Skeleton";
import styles from "./ProductsListing.module.scss";

type SortKey = "featured" | "priceAsc" | "priceDesc" | "newest";

export default function ProductsListing() {
  const t = useTranslations("products");
  const tCommon = useTranslations("common");
  const { pick } = useBilingual();

  const allProducts = useHydratedRepo(productRepo);
  const ready = useRepoReady(productRepo);
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const debounced = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    let list: Product[] = allProducts.filter((p) => p.isAvailable);
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (debounced.trim()) {
      const q = debounced.toLowerCase();
      list = list.filter(
        (p) =>
          pick(p.name).toLowerCase().includes(q) ||
          pick(p.shortDesc).toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }
    list = [...list];
    switch (sort) {
      case "priceAsc":
        list.sort((a, b) => minPrice(a) - minPrice(b));
        break;
      case "priceDesc":
        list.sort((a, b) => minPrice(b) - minPrice(a));
        break;
      case "newest":
        list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        break;
      default:
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return list;
  }, [allProducts, category, debounced, sort, pick]);

  return (
    <>
      <PageBanner
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="section">
        <Container>
          <div className={styles.controls}>
            <CategoryChips
              value={category}
              onChange={setCategory}
              allLabel={tCommon("all")}
            />
            <div className={styles.toolbar}>
              <Input
                prefix={<Search size={16} />}
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
                size="large"
                className={styles.searchInput}
              />
              <Select
                value={sort}
                onChange={(v) => setSort(v as SortKey)}
                size="large"
                className={styles.sortSelect}
                options={[
                  { label: t("sortFeatured"), value: "featured" },
                  { label: t("sortPriceAsc"), value: "priceAsc" },
                  { label: t("sortPriceDesc"), value: "priceDesc" },
                  { label: t("sortNewest"), value: "newest" },
                ]}
              />
            </div>
          </div>

          {!ready && allProducts.length === 0 ? (
            <ListSkeleton count={9} variant="default" card={ProductCardSkeleton} />
          ) : filtered.length === 0 ? (
            <EmptyState title={t("emptyTitle")} description={t("emptyDesc")} />
          ) : (
            <motion.div
              className={styles.grid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {filtered.map((p) => (
                <motion.div key={p.slug} variants={fadeUp}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}

const minPrice = (p: Product) =>
  Math.min(...p.variants.map((v) => v.priceInr));
