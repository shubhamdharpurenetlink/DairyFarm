import { z } from "zod";
import { bilingualSchema } from "./common";

export const productVariantSchema = z.object({
  id: z.string().optional(),
  label: bilingualSchema,
  unit: z.enum(["L", "ml", "kg", "g", "piece"]),
  size: z.coerce.number().positive(),
  priceInr: z.coerce.number().nonnegative(),
  mrpInr: z.coerce.number().nonnegative().optional(),
  stockQty: z.coerce.number().int().nonnegative(),
  sku: z.string().min(1),
});

export const productFormSchema = z.object({
  slug: z.string().min(2).max(80),
  name: bilingualSchema,
  shortDesc: bilingualSchema,
  description: bilingualSchema,
  category: z.enum([
    "milk",
    "ghee",
    "curd",
    "paneer",
    "butter",
    "mava",
    "sweets",
    "other",
  ]),
  primaryImage: z.string().url(),
  images: z.array(z.string().url()).min(1),
  variants: z.array(productVariantSchema).min(1),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  ingredients: bilingualSchema.optional(),
  shelfLifeDays: z.coerce.number().int().positive().optional(),
  storageInstructions: bilingualSchema.optional(),
  badges: z.array(bilingualSchema).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  ratingCount: z.coerce.number().int().nonnegative().optional(),
  nutrition: z
    .object({
      energyKcal: z.coerce.number().nonnegative().optional(),
      proteinG: z.coerce.number().nonnegative().optional(),
      fatG: z.coerce.number().nonnegative().optional(),
      carbsG: z.coerce.number().nonnegative().optional(),
    })
    .partial()
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
