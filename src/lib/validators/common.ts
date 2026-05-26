import { z } from "zod";
import { normaliseImageUrl } from "../imageUrl";

export const phoneRegex = /^(?:\+?91[-\s]?)?[6-9]\d{9}$/;
export const pincodeRegex = /^\d{6}$/;

export const emailSchema = z.string().email("Enter a valid email");

export const bilingualSchema = z.object({
  en: z.string().min(1, "English value required"),
  hi: z.string().min(1, "Hindi value required"),
});

export const bilingualListSchema = z.object({
  en: z.array(z.string().min(1)),
  hi: z.array(z.string().min(1)),
});

/**
 * A URL field that auto-converts Google Drive / Photos share links into
 * direct-view URLs before validation. Used in admin form schemas so the
 * server stores a directly-loadable URL even if the admin pasted a share link.
 */
export const imageUrlSchema = z
  .string()
  .min(1, "Image URL required")
  .transform((v) => normaliseImageUrl(v))
  .pipe(z.string().url("Enter a valid URL"));
