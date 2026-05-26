"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/ui/SectionHeader";
import Container from "@/ui/Container";
import { staggerContainer, fadeUp, viewport } from "@/lib/animations";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { productRepo } from "@/services/repos";
import { routes } from "@/lib/routes";
import ProductCard from "../ProductCard";
import { ListSkeleton, ProductCardSkeleton } from "@/ui/Skeleton";
import styles from "./ProductsTeaser.module.scss";

export default function ProductsTeaser() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const all = useHydratedRepo(productRepo);
  const ready = useRepoReady(productRepo);
  const featured = all
    .filter((p) => p.isAvailable && p.isFeatured)
    .slice(0, 4);

  return (
    <section className={`section ${styles.section}`}>
      <Container>
        <SectionHeader
          eyebrow={t("productsEyebrow")}
          title={t("productsTitle")}
          subtitle={t("productsSub")}
        />

        {!ready && all.length === 0 ? (
          <ListSkeleton count={4} variant="default" card={ProductCardSkeleton} />
        ) : (
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {featured.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
        )}

        <div className={styles.viewAll}>
          <Link href={routes.products}>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRight size={18} />}
              iconPosition="end"
            >
              {tCommon("viewAll")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
