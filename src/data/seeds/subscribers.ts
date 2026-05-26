import type { Subscriber } from "@/types";

/**
 * Production seed contains no sample newsletter subscribers — the dashboard
 * starts empty and grows only when real visitors opt in via the footer form.
 */
export const subscribers: Subscriber[] = [];
