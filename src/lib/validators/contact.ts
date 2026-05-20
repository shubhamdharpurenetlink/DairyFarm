import { z } from "zod";
import { phoneRegex } from "./common";

export const ENQUIRY_SUBJECTS = [
  "general",
  "visit",
  "order",
  "training",
  "partnership",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(phoneRegex, "Enter a valid Indian mobile"),
  email: z.string().email("Valid email required"),
  subject: z.enum(ENQUIRY_SUBJECTS),
  message: z.string().min(10).max(1000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
