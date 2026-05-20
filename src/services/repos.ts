import { Repository } from "./repository";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  cows,
  diseases,
  trainings,
  facilities,
  testimonials,
  gallery,
  team,
  awards,
  timeline,
  products,
  productCategories,
  orders,
  enquiries,
  enrollments,
  subscribers,
} from "@/data/seeds";
import type {
  CowBreed,
  Disease,
  TrainingProgram,
  Facility,
  Testimonial,
  GalleryItem,
  TeamMember,
  Award,
  TimelineEvent,
  Product,
  ProductCategoryDef,
  Order,
  Enquiry,
  Enrollment,
  Subscriber,
} from "@/types";

// Bump SEED_VERSION whenever seed images / shapes change so existing
// localStorage caches get re-seeded automatically on next visit.
const SEED_VERSION = "2";

export const productRepo = new Repository<Product>(STORAGE_KEYS.products, products, "slug", SEED_VERSION);
export const categoryRepo = new Repository<ProductCategoryDef>(STORAGE_KEYS.categories, productCategories, "slug", SEED_VERSION);
export const orderRepo = new Repository<Order>(STORAGE_KEYS.orders, orders, "id", SEED_VERSION);
export const cowRepo = new Repository<CowBreed>(STORAGE_KEYS.cows, cows, "slug", SEED_VERSION);
export const diseaseRepo = new Repository<Disease>(STORAGE_KEYS.diseases, diseases, "slug", SEED_VERSION);
export const trainingRepo = new Repository<TrainingProgram>(STORAGE_KEYS.trainings, trainings, "slug", SEED_VERSION);
export const enrollmentRepo = new Repository<Enrollment>(STORAGE_KEYS.enrollments, enrollments, "id", SEED_VERSION);
export const galleryRepo = new Repository<GalleryItem>(STORAGE_KEYS.gallery, gallery, "id", SEED_VERSION);
export const teamRepo = new Repository<TeamMember>(STORAGE_KEYS.team, team, "id", SEED_VERSION);
export const facilityRepo = new Repository<Facility>(STORAGE_KEYS.facilities, facilities, "id", SEED_VERSION);
export const testimonialRepo = new Repository<Testimonial>(STORAGE_KEYS.testimonials, testimonials, "id", SEED_VERSION);
export const enquiryRepo = new Repository<Enquiry>(STORAGE_KEYS.enquiries, enquiries, "id", SEED_VERSION);
export const subscriberRepo = new Repository<Subscriber>(STORAGE_KEYS.subscribers, subscribers, "id", SEED_VERSION);
export const awardRepo = new Repository<Award>(STORAGE_KEYS.awards, awards, "id", SEED_VERSION);
export const timelineRepo = new Repository<TimelineEvent>(STORAGE_KEYS.timeline, timeline, "id", SEED_VERSION);
