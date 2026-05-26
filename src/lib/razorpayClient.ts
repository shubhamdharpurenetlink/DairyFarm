/**
 * Client-side helpers to load the Razorpay Standard Checkout JS and open it.
 */

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpayInstance = {
  open(): void;
  on(event: string, handler: (response: unknown) => void): void;
};

type RazorpayCtor = new (options: RazorpayOptions) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // paise
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
  handler?: (response: RazorpaySuccessResponse) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

let loading: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay can only load in the browser"));
  }
  if (window.Razorpay) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("Failed to load Razorpay checkout script"));
    };
    document.body.appendChild(script);
  });
  return loading;
}

export async function openRazorpayCheckout(
  opts: RazorpayOptions,
): Promise<RazorpaySuccessResponse> {
  await loadRazorpayScript();
  if (!window.Razorpay) throw new Error("Razorpay SDK unavailable");
  return new Promise<RazorpaySuccessResponse>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      ...opts,
      handler: (response) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error("PAYMENT_CANCELLED"));
        },
      },
    });
    rzp.open();
  });
}
