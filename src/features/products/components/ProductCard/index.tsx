"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Tag, message } from "antd";
import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { routes } from "@/lib/routes";
import PriceTag from "@/ui/PriceTag";
import Rating from "@/ui/Rating";
import { useBilingual } from "@/hooks/useBilingual";
import { useCartStore } from "@/stores/useCartStore";
import type { Product } from "@/types";
import { cardHover } from "@/lib/animations";
import styles from "./ProductCard.module.scss";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const t = useTranslations("products");
  const tCart = useTranslations("cart");
  const { pick } = useBilingual();
  const add = useCartStore((s) => s.add);

  const first = product.variants[0];
  const lowestPrice = Math.min(...product.variants.map((v) => v.priceInr));
  const lowestMrp = Math.min(
    ...product.variants.map((v) => v.mrpInr ?? v.priceInr),
  );

  return (
    <motion.article
      className={styles.card}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
    >
      <Link href={routes.productDetail(product.slug)} className={styles.imgLink}>
        <div className={styles.imgWrap}>
          <Image
            src={product.primaryImage}
            alt={pick(product.name)}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className={styles.img}
          />
          {product.badges?.[0] && (
            <span className={styles.badge}>{pick(product.badges[0])}</span>
          )}
          {!product.isAvailable && (
            <span className={styles.outOfStock}>{tCart("outOfStock")}</span>
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <Link href={routes.productDetail(product.slug)} className={styles.titleLink}>
          <h3 className={styles.title}>{pick(product.name)}</h3>
        </Link>
        <p className={styles.desc}>{pick(product.shortDesc)}</p>

        <div className={styles.meta}>
          {product.rating !== undefined && (
            <Rating value={product.rating} count={product.ratingCount} />
          )}
          {first && (
            <Tag color="default" className={styles.variantTag}>
              {pick(first.label)}
            </Tag>
          )}
        </div>

        <div className={styles.footer}>
          <PriceTag
            priceInr={lowestPrice}
            mrpInr={lowestMrp > lowestPrice ? lowestMrp : undefined}
          />
          <button
            type="button"
            className={styles.cta}
            disabled={!product.isAvailable || !first}
            onClick={() => {
              if (!first) return;
              const added = add(product.slug, first.id, 1);
              if (added > 0) {
                message.success(t("addedToCart"));
              } else {
                message.warning(tCart("outOfStock"));
              }
            }}
            aria-label={t("addToCart")}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
