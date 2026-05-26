"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Form, Input, Radio, Button, Card, Tag, Alert, message } from "antd";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Wallet,
  Banknote,
  AlertTriangle,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";
import Container from "@/ui/Container";
import PageBanner from "@/ui/PageBanner";
import { useCartStore } from "@/stores/useCartStore";
import { useBilingual } from "@/hooks/useBilingual";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { productRepo } from "@/services/repos";
import {
  resolveCart,
  summarise,
  type ResolvedCartLine,
} from "@/services/cartService";
import { orderService, OrderError } from "@/services/orderService";
import { openRazorpayCheckout } from "@/lib/razorpayClient";
import { useHydratedSettings } from "@/hooks/useHydratedSettings";
import { formatInr } from "@/lib/formatters";
import { routes } from "@/lib/routes";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validators/order";
import type { CartIssue, PaymentMode } from "@/types";
import styles from "./CartPage.module.scss";

const PAYMENT_MODES: PaymentMode[] = ["cod", "upi", "card"];

export default function CartPage() {
  const t = useTranslations("cart");
  const tForm = useTranslations("cart.form");
  const tIssue = useTranslations("cart.issues");
  const tProducts = useTranslations("products");
  const { pick } = useBilingual();
  const router = useRouter();
  const [form] = Form.useForm<CheckoutFormValues>();
  const [submitting, setSubmitting] = useState(false);

  const lines = useCartStore((s) => s.lines);
  const inc = useCartStore((s) => s.increment);
  const dec = useCartStore((s) => s.decrement);
  const removeLine = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const products = useHydratedRepo(productRepo);
  const site = useHydratedSettings();

  const pincodeWatch = Form.useWatch("pincode", form) as string | undefined;

  const resolved = useMemo(() => resolveCart(lines, products), [lines, products]);
  const summary = useMemo(
    () => summarise(resolved, { pincode: pincodeWatch }),
    [resolved, pincodeWatch],
  );

  const onCheckout = async () => {
    let values: CheckoutFormValues;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }
    const parsed = checkoutSchema.safeParse(values);
    if (!parsed.success) return;
    if (!summary.isCheckoutReady) return;

    try {
      setSubmitting(true);
      const { order, razorpayOrder } = await orderService.placeOrder(
        {
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email || undefined,
          addressLine: parsed.data.addressLine,
          city: parsed.data.city,
          state: parsed.data.state,
          pincode: parsed.data.pincode,
          notes: parsed.data.notes,
        },
        parsed.data.paymentMode as PaymentMode,
        resolved,
      );

      if (parsed.data.paymentMode !== "cod" && razorpayOrder) {
        try {
          const result = await openRazorpayCheckout({
            key: razorpayOrder.keyId,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: "Laxmi Dairy Farm",
            description: order.orderNumber,
            order_id: razorpayOrder.id,
            prefill: {
              name: parsed.data.name,
              email: parsed.data.email || undefined,
              contact: parsed.data.phone,
            },
            theme: { color: "#2E7D5B" },
          });
          await orderService.verifyRazorpay({
            orderId: order.id,
            razorpayOrderId: result.razorpay_order_id,
            razorpayPaymentId: result.razorpay_payment_id,
            razorpaySignature: result.razorpay_signature,
          });
        } catch (payErr) {
          if (payErr instanceof Error && payErr.message === "PAYMENT_CANCELLED") {
            message.warning(t("paymentCancelled"));
            return;
          }
          throw payErr;
        }
      }

      clear();
      router.push(routes.checkoutSuccess(order.orderNumber));
    } catch (err) {
      let msgText: string = t("placeOrderFailed");
      if (err instanceof OrderError) {
        const code = err.code;
        const i18nKeys: Record<string, string> = {
          STOCK_EXCEEDED: "STOCK_EXCEEDED",
          PRODUCT_UNAVAILABLE: "PRODUCT_UNAVAILABLE",
          PINCODE_NOT_SERVICEABLE: "PINCODE_NOT_SERVICEABLE",
          MIN_ORDER: "MIN_ORDER",
        };
        if (i18nKeys[code]) {
          msgText = tIssue(i18nKeys[code]);
        } else if (code === "INVALID_SIGNATURE" || code === "PAYMENT_INIT_FAILED") {
          msgText = t("paymentFailed");
        } else {
          msgText = err.message || msgText;
        }
      }
      message.error(msgText);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <Container size="xl" className={styles.page}>
        {resolved.length === 0 ? (
          <Card className={styles.emptyCard}>
            <ShoppingBag size={48} className={styles.emptyIcon} />
            <h2>{t("empty")}</h2>
            <Link href={routes.products}>
              <Button type="primary" size="large">
                {t("startShopping")}
              </Button>
            </Link>
          </Card>
        ) : (
          <motion.div
            className={styles.grid}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <section className={styles.itemsCol}>
              <h2 className={styles.sectionTitle}>{t("yourItems")}</h2>
              <div className={styles.items}>
                {resolved.map((line) => (
                  <CartItemCard
                    key={`${line.productId}-${line.variantId}`}
                    line={line}
                    pickName={(b) => pick(b)}
                    onInc={() => inc(line.productId, line.variantId)}
                    onDec={() => dec(line.productId, line.variantId)}
                    onRemove={() => removeLine(line.productId, line.variantId)}
                    eachLabel={t("each")}
                    unavailableLabel={t("unavailable")}
                    stockOnlyLabel={(count) => t("stockOnly", { count })}
                    decreaseLabel={tProducts("qtyDecrease")}
                    increaseLabel={tProducts("qtyIncrease")}
                    removeLabel={t("removeItem")}
                  />
                ))}
              </div>

              <h2 className={styles.sectionTitle}>{t("deliveryDetails")}</h2>
              <Card className={styles.formCard} bodyStyle={{ padding: 24 }}>
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{ paymentMode: "cod", state: "Madhya Pradesh" }}
                  requiredMark={false}
                >
                  <div className={styles.formGrid}>
                    <Form.Item
                      label={tForm("name")}
                      name="name"
                      rules={[{ required: true, min: 2, max: 80, message: tForm("nameRequired") }]}
                    >
                      <Input size="large" placeholder={tForm("namePlaceholder")} />
                    </Form.Item>
                    <Form.Item
                      label={tForm("phone")}
                      name="phone"
                      rules={[{
                        required: true,
                        pattern: /^(?:\+?91[-\s]?)?[6-9]\d{9}$/,
                        message: tForm("phoneInvalid"),
                      }]}
                    >
                      <Input size="large" placeholder={tForm("phonePlaceholder")} />
                    </Form.Item>
                    <Form.Item
                      label={tForm("email")}
                      name="email"
                      rules={[{ type: "email", message: tForm("emailInvalid") }]}
                    >
                      <Input size="large" placeholder={tForm("emailPlaceholder")} />
                    </Form.Item>
                    <Form.Item
                      label={tForm("pincode")}
                      name="pincode"
                      rules={[{
                        required: true,
                        pattern: /^\d{6}$/,
                        message: tForm("pincodeInvalid"),
                      }]}
                    >
                      <Input size="large" placeholder={tForm("pincodePlaceholder")} />
                    </Form.Item>
                    <Form.Item
                      label={tForm("addressLine")}
                      name="addressLine"
                      rules={[{ required: true, min: 8, max: 200, message: tForm("addressRequired") }]}
                      className={styles.fullSpan}
                    >
                      <Input.TextArea size="large" rows={2} placeholder={tForm("addressPlaceholder")} />
                    </Form.Item>
                    <Form.Item
                      label={tForm("city")}
                      name="city"
                      rules={[{ required: true, min: 2 }]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      label={tForm("state")}
                      name="state"
                      rules={[{ required: true, min: 2 }]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      label={tForm("notes")}
                      name="notes"
                      className={styles.fullSpan}
                    >
                      <Input.TextArea size="large" rows={2} />
                    </Form.Item>

                    <Form.Item
                      label={tForm("paymentMode")}
                      name="paymentMode"
                      className={styles.fullSpan}
                    >
                      <Radio.Group className={styles.payGroup}>
                        {PAYMENT_MODES.map((mode) => {
                          const supported = orderService.isPaymentSupported(mode);
                          const Icon =
                            mode === "cod" ? Banknote : mode === "upi" ? Wallet : CreditCard;
                          return (
                            <Radio.Button
                              key={mode}
                              value={mode}
                              disabled={!supported}
                              className={styles.payOption}
                            >
                              <Icon size={16} /> {tForm(mode)}
                              {!supported && (
                                <span className={styles.comingSoon}>
                                  {tForm("comingSoon")}
                                </span>
                              )}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Form>
              </Card>
            </section>

            <aside className={styles.summaryCol}>
              <Card className={styles.summaryCard} bodyStyle={{ padding: 24 }}>
                <h3 className={styles.summaryTitle}>{t("orderSummary")}</h3>

                <div className={styles.summaryLines}>
                  {resolved.map((l) => (
                    <div
                      key={`${l.productId}-${l.variantId}`}
                      className={styles.sumLine}
                    >
                      <span>
                        {pick(l.product.name)} × {l.qty}
                      </span>
                      <span>{formatInr(l.lineTotalInr)}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.divider} />

                <div className={styles.sumRow}>
                  <span>{t("subtotal")}</span>
                  <span>{formatInr(summary.subtotalInr)}</span>
                </div>
                <div className={styles.sumRow}>
                  <span>{t("delivery")}</span>
                  <span>
                    {summary.deliveryFeeInr === 0 ? (
                      <Tag color="green">{t("free")}</Tag>
                    ) : (
                      formatInr(summary.deliveryFeeInr)
                    )}
                  </span>
                </div>
                <div className={`${styles.sumRow} ${styles.sumTotal}`}>
                  <span>{t("total")}</span>
                  <span>{formatInr(summary.totalInr)}</span>
                </div>

                <CartIssues issues={summary.issues} />

                <Button
                  type="primary"
                  size="large"
                  block
                  loading={submitting}
                  onClick={onCheckout}
                  disabled={!summary.isCheckoutReady}
                  className={styles.placeBtn}
                >
                  {t("placeOrder")}
                </Button>
                <p className={styles.helper}>{t("safeCheckout")}</p>
                {site.delivery.minOrderInr > 0 && (
                  <p className={styles.minOrder}>
                    {t("minOrderHint", {
                      amount: formatInr(site.delivery.minOrderInr),
                    })}
                  </p>
                )}
              </Card>
            </aside>
          </motion.div>
        )}
      </Container>
    </>
  );
}

interface CartItemCardProps {
  line: ResolvedCartLine;
  pickName: (b: { en: string; hi: string }) => string;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
  eachLabel: string;
  unavailableLabel: string;
  stockOnlyLabel: (count: number) => string;
  decreaseLabel: string;
  increaseLabel: string;
  removeLabel: string;
}

function CartItemCard({
  line,
  pickName,
  onInc,
  onDec,
  onRemove,
  eachLabel,
  unavailableLabel,
  stockOnlyLabel,
  decreaseLabel,
  increaseLabel,
  removeLabel,
}: CartItemCardProps) {
  const variant =
    line.product.variants.find((v) => v.id === line.variantId) ??
    line.product.variants[0];
  return (
    <Card className={styles.itemCard} bodyStyle={{ padding: 16 }}>
      <div className={styles.itemRow}>
        <div className={styles.thumb}>
          <Image
            src={line.product.primaryImage}
            alt={pickName(line.product.name)}
            fill
            sizes="120px"
          />
        </div>
        <div className={styles.itemBody}>
          <Link
            href={routes.productDetail(line.product.slug)}
            className={styles.itemName}
          >
            {pickName(line.product.name)}
          </Link>
          <span className={styles.itemVariant}>{pickName(variant.label)}</span>
          <span className={styles.itemPrice}>
            {formatInr(line.unitPriceInr)} {eachLabel}
          </span>
          {(line.exceedsStock || line.productUnavailable) && (
            <span className={styles.itemWarn}>
              <AlertTriangle size={12} />{" "}
              {line.productUnavailable
                ? unavailableLabel
                : stockOnlyLabel(line.stockQty)}
            </span>
          )}
        </div>
        <div className={styles.itemRight}>
          <div className={styles.qty}>
            <button type="button" onClick={onDec} aria-label={decreaseLabel}>
              <Minus size={14} />
            </button>
            <span>{line.qty}</span>
            <button type="button" onClick={onInc} aria-label={increaseLabel}>
              <Plus size={14} />
            </button>
          </div>
          <span className={styles.lineTotal}>{formatInr(line.lineTotalInr)}</span>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={onRemove}
            aria-label={removeLabel}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
}

function CartIssues({ issues }: { issues: CartIssue[] }) {
  const tIssue = useTranslations("cart.issues");
  if (issues.length === 0) return null;
  return (
    <div className={styles.issues}>
      {issues.map((issue) => (
        <Alert
          key={issue.code}
          type={issue.code === "MIN_ORDER" ? "warning" : "error"}
          showIcon
          message={tIssue(issue.code, issue.meta as Record<string, string | number>)}
        />
      ))}
    </div>
  );
}
