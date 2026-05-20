import { z } from "zod";

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
