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

export const productRepo = new Repository<Product>(STORAGE_KEYS.products, products, "slug");
export const categoryRepo = new Repository<ProductCategoryDef>(STORAGE_KEYS.categories, productCategories, "slug");
export const orderRepo = new Repository<Order>(STORAGE_KEYS.orders, orders, "id");
export const cowRepo = new Repository<CowBreed>(STORAGE_KEYS.cows, cows, "slug");
export const diseaseRepo = new Repository<Disease>(STORAGE_KEYS.diseases, diseases, "slug");
export const trainingRepo = new Repository<TrainingProgram>(STORAGE_KEYS.trainings, trainings, "slug");
export const enrollmentRepo = new Repository<Enrollment>(STORAGE_KEYS.enrollments, enrollments, "id");
export const galleryRepo = new Repository<GalleryItem>(STORAGE_KEYS.gallery, gallery, "id");
export const teamRepo = new Repository<TeamMember>(STORAGE_KEYS.team, team, "id");
export const facilityRepo = new Repository<Facility>(STORAGE_KEYS.facilities, facilities, "id");
export const testimonialRepo = new Repository<Testimonial>(STORAGE_KEYS.testimonials, testimonials, "id");
export const enquiryRepo = new Repository<Enquiry>(STORAGE_KEYS.enquiries, enquiries, "id");
export const subscriberRepo = new Repository<Subscriber>(STORAGE_KEYS.subscribers, subscribers, "id");
export const awardRepo = new Repository<Award>(STORAGE_KEYS.awards, awards, "id");
export const timelineRepo = new Repository<TimelineEvent>(STORAGE_KEYS.timeline, timeline, "id");
