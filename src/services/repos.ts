import { Repository } from "./repository";
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

/**
 * Each repo points at a Route Handler under `/api/v1/<resource>`. The bundled
 * seed snapshot is used until the first client-side refresh hydrates from the
 * API (also enables instant SSR markup).
 */

export const productRepo = new Repository<Product>("products", products, "slug");
export const categoryRepo = new Repository<ProductCategoryDef>("categories", productCategories, "slug");
export const orderRepo = new Repository<Order>("orders", orders, "id");
export const cowRepo = new Repository<CowBreed>("cows", cows, "slug");
export const diseaseRepo = new Repository<Disease>("diseases", diseases, "slug");
export const trainingRepo = new Repository<TrainingProgram>("trainings", trainings, "slug");
export const enrollmentRepo = new Repository<Enrollment>("enrollments", enrollments, "id");
export const galleryRepo = new Repository<GalleryItem>("gallery", gallery, "id");
export const teamRepo = new Repository<TeamMember>("team", team, "id");
export const facilityRepo = new Repository<Facility>("facilities", facilities, "id");
export const testimonialRepo = new Repository<Testimonial>("testimonials", testimonials, "id");
export const enquiryRepo = new Repository<Enquiry>("enquiries", enquiries, "id");
export const subscriberRepo = new Repository<Subscriber>("subscribers", subscribers, "id");
export const awardRepo = new Repository<Award>("awards", awards, "id");
export const timelineRepo = new Repository<TimelineEvent>("timeline", timeline, "id");
