import { z } from "zod";
import { phoneRegex } from "./common";

export const enrollmentSchema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().regex(phoneRegex, "Valid Indian mobile required"),
  email: z.string().email(),
  age: z.coerce.number().int().min(15).max(80),
  state: z.string().min(2),
  district: z.string().min(2),
  education: z.string().min(2),
  batchDate: z.string().min(1),
  source: z.string().optional(),
  message: z.string().max(500).optional(),
});

export type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;
