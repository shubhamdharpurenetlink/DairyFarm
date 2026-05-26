import type { Enquiry } from "@/types";

/**
 * Production seed contains no sample enquiries — the admin dashboard starts
 * clean and fills up only when real visitors submit the contact form.
 * To seed demo records for local development, set `SEED_DEMO=1` and the
 * prisma seed script will pick them up (see prisma/seed.ts).
 */
export const enquiries: Enquiry[] = [];
