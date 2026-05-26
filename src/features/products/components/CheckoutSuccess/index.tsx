"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Result, Button, Descriptions, Tag } from "antd";
import { CheckCircle2, Truck, Phone, Mail, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import Container from "@/ui/Container";
import { orderService } from "@/services/orderService";
import { useBilingual } from "@/hooks/useBilingual";
import { formatInr } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import type { Order } from "@/types";
import styles from "./CheckoutSuccess.module.scss";

interface Props {
  orderNumber: string;
}

/**
 * Order confirmation page rendered at /products/checkout/success/[orderNumber].
 *
 * Reads the order from the repository on mount (client-side because orders
 * live in localStorage). Falls back to a generic confirmation panel if the
 * order can't be resolved — this can happen when the user shares the success
 * URL across devices and the recipient has no local order history.
 */
export default function CheckoutSuccess({ orderNumber }: Props) {
  const t = useTranslations("checkout");
  const { pick } = useBilingual();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    orderService
      .getByNumber(orderNumber)
      .then((o) => {
        if (active) setOrder(o ?? null);
      })
      .catch(() => {
        if (active) setOrder(null);
      });
    return () => {
      active = false;
    };
  }, [orderNumber]);

  return (
    <Container size="md" className={styles.wrap}>
      <Result
        status="success"
        icon={<CheckCircle2 size={56} className={styles.icon} />}
        title={t("title")}
        subTitle={t("subtitle", { orderNumber })}
        extra={[
          <Link key="shop" href={routes.products}>
            <Button type="primary" icon={<ShoppingBag size={16} />}>
              {t("continueShopping")}
            </Button>
          </Link>,
          <Link key="home" href={routes.home}>
            <Button>{t("backHome")}</Button>
          </Link>,
        ]}
      />

      {order && (
        <div className={styles.detailsWrap}>
          <Descriptions
            title={t("orderDetailsTitle")}
            bordered
            size="small"
            column={1}
            labelStyle={{ width: 160, fontWeight: 600 }}
          >
            <Descriptions.Item label={t("orderNumber")}>
              <Tag color="green">{order.orderNumber}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t("statusLabel")}>
              <Tag color="blue">{t(`status.${order.status}`)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t("paymentLabel")}>
              {t(`paymentMode.${order.paymentMode}`)}
            </Descriptions.Item>
            <Descriptions.Item label={t("itemCount")}>
              {order.items.reduce((n, i) => n + i.qty, 0)} ({order.items.length}{" "}
              {t("lines")})
            </Descriptions.Item>
            <Descriptions.Item label={t("subtotal")}>
              {formatInr(order.subtotalInr)}
            </Descriptions.Item>
            <Descriptions.Item label={t("delivery")}>
              {order.deliveryFeeInr === 0
                ? t("freeDelivery")
                : formatInr(order.deliveryFeeInr)}
            </Descriptions.Item>
            <Descriptions.Item label={t("total")}>
              <strong>{formatInr(order.totalInr)}</strong>
            </Descriptions.Item>
            <Descriptions.Item label={t("deliveryAddress")}>
              {order.customer.name}
              <br />
              {order.customer.addressLine}
              <br />
              {order.customer.city}, {order.customer.state} —{" "}
              {order.customer.pincode}
              <br />
              <Phone size={12} /> {order.customer.phone}
              {order.customer.email && (
                <>
                  <br />
                  <Mail size={12} /> {order.customer.email}
                </>
              )}
            </Descriptions.Item>
          </Descriptions>

          <ul className={styles.items}>
            {order.items.map((item) => {
              const product = pick({
                en: item.productNameEn,
                hi: item.productNameEn,
              });
              return (
                <li key={`${item.productId}-${item.variantId}`}>
                  <span>
                    {product} ({item.variantLabelEn}) × {item.qty}
                  </span>
                  <span>{formatInr(item.lineTotalInr)}</span>
                </li>
              );
            })}
          </ul>

          <p className={styles.next}>
            <Truck size={16} /> {t("nextStep")}
          </p>
        </div>
      )}
    </Container>
  );
}
