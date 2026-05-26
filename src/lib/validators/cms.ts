/**
 * Server-side Zod schemas for admin CMS entities that were validated only by
 * antd Form rules in the client. These mirror the TS types in `src/types/`.
 */
import { z } from "zod";
import {
  bilingualSchema,
  bilingualListSchema,
  emailSchema,
  imageUrlSchema,
  phoneRegex,
} from "./common";

export const PRODUCT_CATEGORIES = [
  "milk",
  "ghee",
  "curd",
  "paneer",
  "butter",
  "mava",
  "sweets",
  "other",
] as const;

export const COW_CATEGORIES = ["indigenous", "exotic", "crossbreed"] as const;

export const DISEASE_CATEGORIES = [
  "disease",
  "nutrition",
  "calving",
  "hoof",
  "vaccination",
] as const;

export const TRAINING_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const GALLERY_TYPES = ["photo", "video"] as const;

// ----------------- Category -----------------

export const categoryFormSchema = z.object({
  slug: z.enum(PRODUCT_CATEGORIES),
  name: bilingualSchema,
  icon: z.string().min(1),
  color: z.string().min(1),
  description: bilingualSchema.optional(),
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

// ----------------- Cow -----------------

export const cowFormSchema = z.object({
  slug: z.string().min(2),
  nameEn: z.string().min(1),
  nameHi: z.string().min(1),
  category: z.enum(COW_CATEGORIES),
  origin: z.string().min(1),
  color: z.string().min(1),
  milkYieldLitresPerDay: z.object({
    min: z.coerce.number().nonnegative(),
    max: z.coerce.number().nonnegative(),
  }),
  fatPercent: z.coerce.number().min(0).max(20),
  image: imageUrlSchema,
  gallery: z.array(imageUrlSchema).default([]),
  shortDesc: bilingualSchema,
  description: bilingualSchema,
  characteristics: bilingualListSchema,
  history: bilingualSchema,
  temperament: bilingualSchema,
  suitability: bilingualSchema,
});

// ----------------- Disease -----------------

export const diseaseFormSchema = z.object({
  slug: z.string().min(2),
  title: bilingualSchema,
  category: z.enum(DISEASE_CATEGORIES),
  image: imageUrlSchema,
  summary: bilingualSchema,
  symptoms: bilingualListSchema,
  causes: bilingualListSchema,
  prevention: bilingualListSchema,
  treatment: bilingualListSchema,
  readTimeMin: z.coerce.number().int().positive().default(5),
});

// ----------------- Training program -----------------

export const trainingFormSchema = z.object({
  slug: z.string().min(2),
  title: bilingualSchema,
  shortDesc: bilingualSchema,
  longDesc: bilingualSchema,
  image: imageUrlSchema,
  durationDays: z.coerce.number().int().positive(),
  priceInr: z.coerce.number().int().nonnegative(),
  level: z.enum(TRAINING_LEVELS),
  seatsTotal: z.coerce.number().int().positive(),
  seatsLeft: z.coerce.number().int().nonnegative(),
  syllabus: bilingualListSchema,
  instructor: z.object({
    name: z.string().min(1),
    role: bilingualSchema,
    avatar: imageUrlSchema,
    bioYears: z.coerce.number().nonnegative(),
  }),
  schedule: bilingualSchema,
  includes: bilingualListSchema,
});

// ----------------- Gallery item -----------------

export const galleryItemFormSchema = z.object({
  type: z.enum(GALLERY_TYPES),
  url: imageUrlSchema,
  thumbnail: imageUrlSchema,
  title: bilingualSchema,
  aspectRatio: z.coerce.number().positive().optional(),
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

// ----------------- Team / Award / Timeline / Facility -----------------

export const teamMemberFormSchema = z.object({
  name: z.string().min(1),
  role: bilingualSchema,
  avatar: imageUrlSchema,
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

export const timelineEventFormSchema = z.object({
  year: z.string().min(4),
  title: bilingualSchema,
  description: bilingualSchema,
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

export const awardFormSchema = z.object({
  year: z.string().min(4),
  title: bilingualSchema,
  issuer: z.string().min(1),
  icon: z.string().min(1),
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

export const facilityFormSchema = z.object({
  name: bilingualSchema,
  description: bilingualSchema,
  image: imageUrlSchema,
  icon: z.string().min(1),
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

// ----------------- Testimonial -----------------

export const testimonialFormSchema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  avatar: imageUrlSchema,
  rating: z.coerce.number().int().min(1).max(5),
  quote: bilingualSchema,
  sortOrder: z.coerce.number().int().nonnegative().optional(),
});

// ----------------- Subscriber -----------------

export const subscriberSchema = z.object({
  email: emailSchema,
});

// ----------------- Site settings -----------------

export const settingsFormSchema = z.object({
  farmName: bilingualSchema,
  tagline: bilingualSchema,
  foundedYear: z.coerce.number().int().min(1800).max(3000),
  address: bilingualSchema,
  phone: z.string().regex(phoneRegex, "Valid Indian mobile required"),
  whatsapp: z.string().min(8),
  email: emailSchema,
  hours: bilingualSchema,
  socials: z.object({
    facebook: z.string().url().or(z.literal("")),
    instagram: z.string().url().or(z.literal("")),
    youtube: z.string().url().or(z.literal("")),
    twitter: z.string().url().or(z.literal("")),
  }),
  stats: z.object({
    yearsHeritage: z.coerce.number().int().nonnegative(),
    healthyCows: z.coerce.number().int().nonnegative(),
    litresPerDay: z.coerce.number().int().nonnegative(),
    happyCustomers: z.coerce.number().int().nonnegative(),
  }),
  delivery: z.object({
    freeAboveInr: z.coerce.number().int().nonnegative(),
    flatFeeInr: z.coerce.number().int().nonnegative(),
    minOrderInr: z.coerce.number().int().nonnegative(),
    serviceablePincodes: z.array(z.string().regex(/^\d{6}$/)).default([]),
  }),
});

// ----------------- Order status update -----------------

export const orderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ]),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "open", "resolved", "spam"]),
});

export const enrollmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
export type CowFormValues = z.infer<typeof cowFormSchema>;
export type DiseaseFormValues = z.infer<typeof diseaseFormSchema>;
export type TrainingFormValues = z.infer<typeof trainingFormSchema>;
export type GalleryItemFormValues = z.infer<typeof galleryItemFormSchema>;
export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;
export type TimelineEventFormValues = z.infer<typeof timelineEventFormSchema>;
export type AwardFormValues = z.infer<typeof awardFormSchema>;
export type FacilityFormValues = z.infer<typeof facilityFormSchema>;
export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
