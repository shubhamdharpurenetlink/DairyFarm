import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(4, "Min 4 characters"),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
