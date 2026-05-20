"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Tabs, Button, Tag, message } from "antd";
import { ShoppingBag, Minus, Plus, Truck, ShieldCheck, Leaf } from "lucide-react";
import Container from "@/ui/Container";
import PriceTag from "@/ui/PriceTag";
import Rating from "@/ui/Rating";
import { useBilingual } from "@/hooks/useBilingual";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { productRepo } from "@/services/repos";
import { useCartStore } from "@/stores/useCartStore";
import { fadeUp } from "@/lib/animations";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import VariantPicker from "./VariantPicker";
import styles from "./ProductDetail.module.scss";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const t = useTranslations("products");
  const { pick } = useBilingual();
  const [activeImage, setActiveImage] = useState(product.primaryImage);
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const add = useCartStore((s) => s.add);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const allProducts = useHydratedRepo(productRepo);

  const related = useMemo(
    () =>
      allProducts
        .filter(
          (p) =>
            p.isAvailable &&
            p.category === product.category &&
            p.slug !== product.slug,
        )
        .slice(0, 4),
    [allProducts, product],
  );

  const handleAdd = () => {
    const added = add(product.slug, variant.id, qty);
    if (added > 0) {
      message.success(t("addedToCart"));
    } else {
      message.warning(t("outOfStock"));
    }
  };

  return (
    <article className={styles.page}>
      <Container size="xl">
        <motion.div
          className={styles.layout}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <section className={styles.gallery}>
            <div className={styles.heroImage}>
              <Image
                src={activeImage}
                alt={pick(product.name)}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className={styles.heroImg}
                priority
              />
              {product.badges?.[0] && (
                <span className={styles.heroBadge}>{pick(product.badges[0])}</span>
              )}
            </div>
            <div className={styles.thumbs}>
              {product.images.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles.thumb} ${activeImage === src ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImage(src)}
                  aria-label={t("thumbAria", { index: idx + 1 })}
                >
                  <Image src={src} alt="" fill sizes="80px" />
                </button>
              ))}
            </div>
          </section>

          <section className={styles.info}>
            <div className={styles.tagRow}>
              <Tag color="green">{t(`category.${product.category}`)}</Tag>
              {product.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} className={styles.softTag}>
                  #{tag}
                </Tag>
              ))}
            </div>

            <h1 className={styles.title}>{pick(product.name)}</h1>
            <p className={styles.short}>{pick(product.shortDesc)}</p>

            <div className={styles.metaRow}>
              {product.rating !== undefined && (
                <Rating value={product.rating} count={product.ratingCount} size={16} />
              )}
              <span className={styles.stock}>
                {variant.stockQty > 0
                  ? t("inStock", { count: variant.stockQty })
                  : t("outOfStock")}
              </span>
            </div>

            <PriceTag
              priceInr={variant.priceInr}
              mrpInr={variant.mrpInr}
              size="lg"
            />

            <div className={styles.divider} />

            <label className={styles.label}>{t("selectVariant")}</label>
            <VariantPicker
              variants={product.variants}
              selectedId={variant.id}
              onChange={setVariantId}
            />

            <label className={styles.label}>{t("quantity")}</label>
            <div className={styles.qtyRow}>
              <div className={styles.qtyStepper}>
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label={t("qtyDecrease")}
                >
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(variant.stockQty || 1, qty + 1))}
                  aria-label={t("qtyIncrease")}
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingBag size={18} />}
                onClick={handleAdd}
                disabled={variant.stockQty === 0}
                className={styles.addBtn}
              >
                {t("addToCart")}
              </Button>
            </div>

            <ul className={styles.perks}>
              <li>
                <Leaf size={16} /> {t("perkOrganic")}
              </li>
              <li>
                <Truck size={16} /> {t("perkDelivery")}
              </li>
              <li>
                <ShieldCheck size={16} /> {t("perkQuality")}
              </li>
            </ul>
          </section>
        </motion.div>

        <section className={styles.tabsSection}>
          <Tabs
            size="large"
            items={[
              {
                key: "desc",
                label: t("tabDescription"),
                children: (
                  <p className={styles.long}>{pick(product.description)}</p>
                ),
              },
              ...(product.ingredients
                ? [
                    {
                      key: "ing",
                      label: t("tabIngredients"),
                      children: (
                        <p className={styles.long}>{pick(product.ingredients!)}</p>
                      ),
                    },
                  ]
                : []),
              ...(product.storageInstructions
                ? [
                    {
                      key: "stor",
                      label: t("tabStorage"),
                      children: (
                        <div>
                          <p className={styles.long}>
                            {pick(product.storageInstructions!)}
                          </p>
                          {product.shelfLifeDays && (
                            <p>
                              <strong>{t("shelfLife")}:</strong>{" "}
                              {product.shelfLifeDays} {t("days")}
                            </p>
                          )}
                        </div>
                      ),
                    },
                  ]
                : []),
              ...(product.nutrition
                ? [
                    {
                      key: "nutr",
                      label: t("tabNutrition"),
                      children: (
                        <table className={styles.nutritionTable}>
                          <tbody>
                            {product.nutrition.energyKcal !== undefined && (
                              <tr>
                                <td>{t("energy")}</td>
                                <td>{product.nutrition.energyKcal} kcal</td>
                              </tr>
                            )}
                            {product.nutrition.proteinG !== undefined && (
                              <tr>
                                <td>{t("protein")}</td>
                                <td>{product.nutrition.proteinG} g</td>
                              </tr>
                            )}
                            {product.nutrition.fatG !== undefined && (
                              <tr>
                                <td>{t("fat")}</td>
                                <td>{product.nutrition.fatG} g</td>
                              </tr>
                            )}
                            {product.nutrition.carbsG !== undefined && (
                              <tr>
                                <td>{t("carbs")}</td>
                                <td>{product.nutrition.carbsG} g</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      ),
                    },
                  ]
                : []),
            ]}
          />
        </section>

        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>{t("youMayLike")}</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
