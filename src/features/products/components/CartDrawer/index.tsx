"use client";

import { Drawer, Button, Empty } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useCartStore } from "@/stores/useCartStore";
import { useBilingual } from "@/hooks/useBilingual";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { productRepo } from "@/services/repos";
import { resolveCart, summarise } from "@/services/cartService";
import { formatInr } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import styles from "./CartDrawer.module.scss";

export default function CartDrawer() {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const { pick } = useBilingual();
  const open = useCartStore((s) => s.drawerOpen);
  const close = useCartStore((s) => s.closeDrawer);
  const lines = useCartStore((s) => s.lines);
  const inc = useCartStore((s) => s.increment);
  const dec = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const products = useHydratedRepo(productRepo);

  const resolved = resolveCart(lines, products);
  const summary = summarise(resolved);

  return (
    <Drawer
      open={open}
      onClose={close}
      placement="right"
      width={420}
      title={
        <span className={styles.title}>
          <ShoppingBag size={18} /> {t("title")} ({summary.itemCount})
        </span>
      }
      styles={{ body: { padding: 0, display: "flex", flexDirection: "column" } }}
    >
      {resolved.length === 0 ? (
        <div className={styles.empty}>
          <Empty description={t("empty")} />
          <Link href={routes.products} onClick={close}>
            <Button type="primary" className={styles.shopBtn}>
              {t("startShopping")}
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.lines}>
            {resolved.map((line) => (
              <div key={`${line.productId}-${line.variantId}`} className={styles.line}>
                <div className={styles.thumb}>
                  <Image
                    src={line.product.primaryImage}
                    alt={pick(line.product.name)}
                    fill
                    sizes="80px"
                  />
                </div>
                <div className={styles.body}>
                  <Link
                    href={routes.productDetail(line.product.slug)}
                    onClick={close}
                    className={styles.name}
                  >
                    {pick(line.product.name)}
                  </Link>
                  <span className={styles.variant}>
                    {line.product.variants.find((v) => v.id === line.variantId)
                      ? pick(
                          line.product.variants.find(
                            (v) => v.id === line.variantId,
                          )!.label,
                        )
                      : ""}
                  </span>
                  <div className={styles.qtyRow}>
                    <div className={styles.qty}>
                      <button
                        type="button"
                        onClick={() => dec(line.productId, line.variantId)}
                        aria-label={tProducts("qtyDecrease")}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => inc(line.productId, line.variantId)}
                        aria-label={tProducts("qtyIncrease")}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className={styles.lineTotal}>
                      {formatInr(line.lineTotalInr)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(line.productId, line.variantId)}
                  aria-label={t("removeItem")}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.row}>
              <span>{t("subtotal")}</span>
              <span>{formatInr(summary.subtotalInr)}</span>
            </div>
            <div className={styles.row}>
              <span>{t("delivery")}</span>
              <span>
                {summary.deliveryFeeInr === 0
                  ? t("free")
                  : formatInr(summary.deliveryFeeInr)}
              </span>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
              <span>{t("total")}</span>
              <span>{formatInr(summary.totalInr)}</span>
            </div>
            <Link href={routes.cart} onClick={close}>
              <Button type="primary" block size="large">
                {t("checkout")}
              </Button>
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}
