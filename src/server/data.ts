/**
 * Server-side data readers for React Server Components.
 *
 * Each function calls Prisma directly and returns the frontend-friendly
 * shape (see src/server/serialize.ts). If the database is unreachable (e.g.
 * a developer running `next dev` without a Neon connection string) the
 * helpers gracefully fall back to the bundled `src/data/seeds/*` snapshot.
 * This keeps SSR markup useful while local Postgres is being set up.
 */

import "server-only";
import { prisma } from "./db";
import {
  serializeProduct,
  serializeCategory,
  serializeCow,
  serializeDisease,
  serializeTraining,
  serializeGalleryItem,
  serializeTeamMember,
  serializeTimelineEvent,
  serializeAward,
  serializeFacility,
  serializeTestimonial,
  serializeSettings,
} from "./serialize";
import {
  products as productSeed,
  productCategories as categorySeed,
  cows as cowSeed,
  diseases as diseaseSeed,
  trainings as trainingSeed,
  gallery as gallerySeed,
  team as teamSeed,
  timeline as timelineSeed,
  awards as awardSeed,
  facilities as facilitySeed,
  testimonials as testimonialSeed,
  site as siteSeed,
} from "@/data/seeds";

async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[server-data] ${label} fallback to seed:`, (e as Error).message);
    }
    return fallback;
  }
}

export async function getProducts() {
  return safe(
    async () => (await prisma.product.findMany({
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    })).map(serializeProduct),
    [...productSeed],
    "products",
  );
}

export async function getProductBySlug(slug: string) {
  return safe(
    async () => {
      const p = await prisma.product.findUnique({ where: { slug } });
      return p ? serializeProduct(p) : null;
    },
    productSeed.find((p) => p.slug === slug) ?? null,
    "product",
  );
}

export async function getCategories() {
  return safe(
    async () => (await prisma.category.findMany({ orderBy: { sortOrder: "asc" } })).map(serializeCategory),
    [...categorySeed],
    "categories",
  );
}

export async function getCows() {
  return safe(
    async () => (await prisma.cow.findMany({ orderBy: { slug: "asc" } })).map(serializeCow),
    [...cowSeed],
    "cows",
  );
}

export async function getCowBySlug(slug: string) {
  return safe(
    async () => {
      const c = await prisma.cow.findUnique({ where: { slug } });
      return c ? serializeCow(c) : null;
    },
    cowSeed.find((c) => c.slug === slug) ?? null,
    "cow",
  );
}

export async function getDiseases() {
  return safe(
    async () => (await prisma.disease.findMany({ orderBy: { publishedAt: "desc" } })).map(serializeDisease),
    [...diseaseSeed],
    "diseases",
  );
}

export async function getDiseaseBySlug(slug: string) {
  return safe(
    async () => {
      const d = await prisma.disease.findUnique({ where: { slug } });
      return d ? serializeDisease(d) : null;
    },
    diseaseSeed.find((d) => d.slug === slug) ?? null,
    "disease",
  );
}

export async function getTrainings() {
  return safe(
    async () => (await prisma.training.findMany({ orderBy: { createdAt: "desc" } })).map(serializeTraining),
    [...trainingSeed],
    "trainings",
  );
}

export async function getTrainingBySlug(slug: string) {
  return safe(
    async () => {
      const t = await prisma.training.findUnique({ where: { slug } });
      return t ? serializeTraining(t) : null;
    },
    trainingSeed.find((t) => t.slug === slug) ?? null,
    "training",
  );
}

export async function getGallery() {
  return safe(
    async () => (await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } })).map(serializeGalleryItem),
    [...gallerySeed],
    "gallery",
  );
}

export async function getTeam() {
  return safe(
    async () => (await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } })).map(serializeTeamMember),
    [...teamSeed],
    "team",
  );
}

export async function getTimeline() {
  return safe(
    async () =>
      (await prisma.timelineEvent.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "asc" }] })).map(
        serializeTimelineEvent,
      ),
    [...timelineSeed],
    "timeline",
  );
}

export async function getAwards() {
  return safe(
    async () =>
      (await prisma.award.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "desc" }] })).map(serializeAward),
    [...awardSeed],
    "awards",
  );
}

export async function getFacilities() {
  return safe(
    async () =>
      (await prisma.facility.findMany({ orderBy: { sortOrder: "asc" } })).map(serializeFacility),
    [...facilitySeed],
    "facilities",
  );
}

export async function getTestimonials() {
  return safe(
    async () =>
      (await prisma.testimonial.findMany({
        orderBy: [{ sortOrder: "asc" }, { rating: "desc" }],
      })).map(serializeTestimonial),
    [...testimonialSeed],
    "testimonials",
  );
}

export async function getSettings() {
  return safe(
    async () => {
      const s = await prisma.settings.findUnique({ where: { id: "default" } });
      return s ? serializeSettings(s) : siteSeed;
    },
    siteSeed,
    "settings",
  );
}
