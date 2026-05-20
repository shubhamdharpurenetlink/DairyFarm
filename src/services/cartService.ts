import type {
  CartIssue,
  CartLine,
  CartSummary,
  Product,
} from "@/types";
import { settingsService } from "./settingsService";

export interface ResolvedCartLine extends CartLine {
  product: Product;
  variantLabelEn: string;
  variantLabelHi: string;
  unitPriceInr: number;
  lineTotalInr: number;
  /** True when the requested qty exceeds current variant stock. */
  exceedsStock: boolean;
  /** True when the product was withdrawn from sale after it was added. */
  productUnavailable: boolean;
  /** Available stock at resolution time (for UI clamping). */
  stockQty: number;
}

export const resolveCart = (
  lines: CartLine[],
  products: Product[],
): ResolvedCartLine[] => {
  return lines
    .map((line) => {
      const product = products.find((p) => p.slug === line.productId);
      if (!product) return null;
      const variant = product.variants.find((v) => v.id === line.variantId);
      if (!variant) return null;
      const unitPriceInr = variant.priceInr;
      return {
        ...line,
        product,
        variantLabelEn: variant.label.en,
        variantLabelHi: variant.label.hi,
        unitPriceInr,
        lineTotalInr: unitPriceInr * line.qty,
        stockQty: variant.stockQty,
        exceedsStock: line.qty > variant.stockQty,
        productUnavailable: !product.isAvailable,
      } as ResolvedCartLine;
    })
    .filter((x): x is ResolvedCartLine => x !== null);
};

export interface SummariseOptions {
  /** Six-digit pincode entered at checkout. When undefined, pincode rule is
   *  not enforced (used for cart drawer / pre-checkout views). */
  pincode?: string;
}

const computeIssues = (
  resolved: ResolvedCartLine[],
  subtotalInr: number,
  options: SummariseOptions,
): CartIssue[] => {
  const settings = settingsService.get();
  const issues: CartIssue[] = [];

  if (resolved.some((l) => l.productUnavailable)) {
    issues.push({ code: "PRODUCT_UNAVAILABLE" });
  }

  if (resolved.some((l) => l.exceedsStock)) {
    issues.push({ code: "STOCK_EXCEEDED" });
  }

  if (resolved.length > 0 && subtotalInr < settings.delivery.minOrderInr) {
    issues.push({
      code: "MIN_ORDER",
      meta: {
        minOrderInr: settings.delivery.minOrderInr,
        shortfallInr: settings.delivery.minOrderInr - subtotalInr,
      },
    });
  }

  if (
    options.pincode &&
    settings.delivery.serviceablePincodes.length > 0 &&
    !settings.delivery.serviceablePincodes.includes(options.pincode)
  ) {
    issues.push({
      code: "PINCODE_NOT_SERVICEABLE",
      meta: { pincode: options.pincode },
    });
  }

  return issues;
};

export const summarise = (
  resolved: ResolvedCartLine[],
  options: SummariseOptions = {},
): CartSummary => {
  const settings = settingsService.get();
  const subtotalInr = resolved.reduce((sum, l) => sum + l.lineTotalInr, 0);
  const itemCount = resolved.reduce((sum, l) => sum + l.qty, 0);
  const deliveryFeeInr =
    subtotalInr === 0
      ? 0
      : subtotalInr >= settings.delivery.freeAboveInr
        ? 0
        : settings.delivery.flatFeeInr;
  const issues = computeIssues(resolved, subtotalInr, options);
  return {
    itemCount,
    subtotalInr,
    deliveryFeeInr,
    totalInr: subtotalInr + deliveryFeeInr,
    issues,
    isCheckoutReady: issues.length === 0 && resolved.length > 0,
  };
};
