/**
 * Thin entity services on top of the Repository<T> abstraction.
 *
 * Public storefront and admin both go through these services so a single
 * source of truth is maintained: admin writes via Repository, the storefront
 * reads via Service (which subscribes to the same Repository), and Phase-2 can
 * swap the underlying Repository for a real backend without touching either.
 *
 * Each service exposes the same minimal surface so callers can be written
 * generically:
 *
 *   list(): T[]
 *   getById(id: string): T | undefined          (where applicable)
 *   getBySlug(slug: string): T | undefined      (where applicable)
 *   featured(): T[]                             (products only)
 *   byCategory(c): T[]                          (products only)
 *   create / update / remove                    (Repository pass-through)
 *   subscribe(cb): () => void                   (live updates)
 */

import { newId } from "./repository";
import {
  productRepo,
  categoryRepo,
  cowRepo,
  diseaseRepo,
  trainingRepo,
  galleryRepo,
  teamRepo,
  facilityRepo,
  awardRepo,
  testimonialRepo,
  timelineRepo,
  enquiryRepo,
  enrollmentRepo,
  subscriberRepo,
} from "./repos";
import type {
  Product,
  ProductCategory,
  ProductCategoryDef,
  CowBreed,
  Disease,
  TrainingProgram,
  GalleryItem,
  TeamMember,
  Facility,
  Award,
  Testimonial,
  TimelineEvent,
  Enquiry,
  EnquirySubject,
  EnquiryStatus,
  Enrollment,
  Subscriber,
} from "@/types";

const bySlug =
  <T extends { slug: string }>(slug: string) =>
  (item: T) =>
    item.slug === slug;

const byId =
  <T extends { id: string }>(id: string) =>
  (item: T) =>
    item.id === id;

export const productService = {
  repo: productRepo,
  list: () => productRepo.list(),
  getBySlug: (slug: string) => productRepo.find(bySlug<Product>(slug)),
  featured: () => productRepo.filter((p) => p.isAvailable && p.isFeatured),
  available: () => productRepo.filter((p) => p.isAvailable),
  byCategory: (category: ProductCategory) =>
    productRepo.filter((p) => p.category === category),
  create: (product: Product) => productRepo.create(product),
  update: (slug: string, patch: Partial<Product>) => productRepo.update(slug, patch),
  remove: (slug: string) => productRepo.remove(slug),
  subscribe: (cb: (products: Product[]) => void) => productRepo.subscribe(cb),
};

export const categoryService = {
  repo: categoryRepo,
  list: () => categoryRepo.list(),
  getBySlug: (slug: ProductCategory) =>
    categoryRepo.find((c) => c.slug === slug),
  create: (category: ProductCategoryDef) => categoryRepo.create(category),
  update: (slug: ProductCategory, patch: Partial<ProductCategoryDef>) =>
    categoryRepo.update(slug, patch),
  remove: (slug: ProductCategory) => categoryRepo.remove(slug),
  subscribe: (cb: (categories: ProductCategoryDef[]) => void) =>
    categoryRepo.subscribe(cb),
};

export const cowService = {
  repo: cowRepo,
  list: () => cowRepo.list(),
  getBySlug: (slug: string) => cowRepo.find(bySlug<CowBreed>(slug)),
  create: (cow: CowBreed) => cowRepo.create(cow),
  update: (slug: string, patch: Partial<CowBreed>) => cowRepo.update(slug, patch),
  remove: (slug: string) => cowRepo.remove(slug),
  subscribe: (cb: (cows: CowBreed[]) => void) => cowRepo.subscribe(cb),
};

export const diseaseService = {
  repo: diseaseRepo,
  list: () => diseaseRepo.list(),
  getBySlug: (slug: string) => diseaseRepo.find(bySlug<Disease>(slug)),
  byCategory: (category: Disease["category"]) =>
    diseaseRepo.filter((d) => d.category === category),
  create: (disease: Disease) => diseaseRepo.create(disease),
  update: (slug: string, patch: Partial<Disease>) =>
    diseaseRepo.update(slug, patch),
  remove: (slug: string) => diseaseRepo.remove(slug),
  subscribe: (cb: (diseases: Disease[]) => void) => diseaseRepo.subscribe(cb),
};

export const trainingService = {
  repo: trainingRepo,
  list: () => trainingRepo.list(),
  getBySlug: (slug: string) => trainingRepo.find(bySlug<TrainingProgram>(slug)),
  withSeatsLeft: () => trainingRepo.filter((t) => t.seatsLeft > 0),
  create: (training: TrainingProgram) => trainingRepo.create(training),
  update: (slug: string, patch: Partial<TrainingProgram>) =>
    trainingRepo.update(slug, patch),
  remove: (slug: string) => trainingRepo.remove(slug),
  subscribe: (cb: (trainings: TrainingProgram[]) => void) =>
    trainingRepo.subscribe(cb),
};

export const galleryService = {
  repo: galleryRepo,
  list: () => galleryRepo.list(),
  photos: () => galleryRepo.filter((g) => g.type === "photo"),
  videos: () => galleryRepo.filter((g) => g.type === "video"),
  getById: (id: string) => galleryRepo.find(byId<GalleryItem>(id)),
  create: (item: GalleryItem) => galleryRepo.create(item),
  update: (id: string, patch: Partial<GalleryItem>) =>
    galleryRepo.update(id, patch),
  remove: (id: string) => galleryRepo.remove(id),
  subscribe: (cb: (items: GalleryItem[]) => void) => galleryRepo.subscribe(cb),
};

export const teamService = {
  repo: teamRepo,
  list: () => teamRepo.list(),
  getById: (id: string) => teamRepo.find(byId<TeamMember>(id)),
  create: (member: TeamMember) => teamRepo.create(member),
  update: (id: string, patch: Partial<TeamMember>) => teamRepo.update(id, patch),
  remove: (id: string) => teamRepo.remove(id),
  subscribe: (cb: (members: TeamMember[]) => void) => teamRepo.subscribe(cb),
};

export const facilityService = {
  repo: facilityRepo,
  list: () => facilityRepo.list(),
  getById: (id: string) => facilityRepo.find(byId<Facility>(id)),
  create: (facility: Facility) => facilityRepo.create(facility),
  update: (id: string, patch: Partial<Facility>) =>
    facilityRepo.update(id, patch),
  remove: (id: string) => facilityRepo.remove(id),
  subscribe: (cb: (facilities: Facility[]) => void) =>
    facilityRepo.subscribe(cb),
};

export const awardService = {
  repo: awardRepo,
  list: () => awardRepo.list(),
  getById: (id: string) => awardRepo.find(byId<Award>(id)),
  create: (award: Award) => awardRepo.create(award),
  update: (id: string, patch: Partial<Award>) => awardRepo.update(id, patch),
  remove: (id: string) => awardRepo.remove(id),
  subscribe: (cb: (awards: Award[]) => void) => awardRepo.subscribe(cb),
};

export const testimonialService = {
  repo: testimonialRepo,
  list: () => testimonialRepo.list(),
  topRated: () =>
    testimonialRepo
      .list()
      .slice()
      .sort((a, b) => b.rating - a.rating),
  getById: (id: string) => testimonialRepo.find(byId<Testimonial>(id)),
  create: (testimonial: Testimonial) => testimonialRepo.create(testimonial),
  update: (id: string, patch: Partial<Testimonial>) =>
    testimonialRepo.update(id, patch),
  remove: (id: string) => testimonialRepo.remove(id),
  subscribe: (cb: (testimonials: Testimonial[]) => void) =>
    testimonialRepo.subscribe(cb),
};

export const timelineService = {
  repo: timelineRepo,
  list: () =>
    timelineRepo.list().slice().sort((a, b) => a.year.localeCompare(b.year)),
  getById: (id: string) => timelineRepo.find(byId<TimelineEvent>(id)),
  create: (event: TimelineEvent) => timelineRepo.create(event),
  update: (id: string, patch: Partial<TimelineEvent>) =>
    timelineRepo.update(id, patch),
  remove: (id: string) => timelineRepo.remove(id),
  subscribe: (cb: (events: TimelineEvent[]) => void) =>
    timelineRepo.subscribe(cb),
};

// ─────────────────────── Engagement services ───────────────────────
//
// These are the write-paths the public website uses when a visitor submits
// a form. They centralise stamping (id, createdAt, default status) so the
// admin engagement panels see a consistent shape regardless of source.

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  subject: EnquirySubject;
  message: string;
}

export const enquiryService = {
  repo: enquiryRepo,
  list: () => enquiryRepo.list(),
  byStatus: (status: EnquiryStatus) =>
    enquiryRepo.filter((e) => e.status === status),
  getById: (id: string) => enquiryRepo.find(byId<Enquiry>(id)),
  create: (input: EnquiryInput): Enquiry =>
    enquiryRepo.create({
      id: newId("enq"),
      ...input,
      status: "new",
      createdAt: new Date().toISOString(),
    }),
  updateStatus: (id: string, status: EnquiryStatus) =>
    enquiryRepo.update(id, { status }),
  remove: (id: string) => enquiryRepo.remove(id),
  subscribe: (cb: (enquiries: Enquiry[]) => void) => enquiryRepo.subscribe(cb),
};

export interface EnrollmentInput {
  trainingId: string;
  trainingTitleEn: string;
  fullName: string;
  phone: string;
  email: string;
  age: number;
  state: string;
  district: string;
  education: string;
  batchDate: string;
  source?: string;
  message?: string;
}

export const enrollmentService = {
  repo: enrollmentRepo,
  list: () => enrollmentRepo.list(),
  byStatus: (status: Enrollment["status"]) =>
    enrollmentRepo.filter((e) => e.status === status),
  byTraining: (trainingId: string) =>
    enrollmentRepo.filter((e) => e.trainingId === trainingId),
  getById: (id: string) => enrollmentRepo.find(byId<Enrollment>(id)),
  create: (input: EnrollmentInput): Enrollment =>
    enrollmentRepo.create({
      id: newId("enr"),
      ...input,
      status: "pending",
      createdAt: new Date().toISOString(),
    }),
  updateStatus: (id: string, status: Enrollment["status"]) =>
    enrollmentRepo.update(id, { status }),
  remove: (id: string) => enrollmentRepo.remove(id),
  subscribe: (cb: (enrollments: Enrollment[]) => void) =>
    enrollmentRepo.subscribe(cb),
};

export type SubscribeResult =
  | { ok: true; subscriber: Subscriber; alreadySubscribed: false }
  | { ok: true; subscriber: Subscriber; alreadySubscribed: true }
  | { ok: false; reason: "INVALID_EMAIL" };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscriberService = {
  repo: subscriberRepo,
  list: () => subscriberRepo.list(),
  getById: (id: string) => subscriberRepo.find(byId<Subscriber>(id)),
  /** Idempotent subscribe — returns the existing record if email already exists. */
  subscribe(emailRaw: string): SubscribeResult {
    const email = emailRaw.trim().toLowerCase();
    if (!emailRe.test(email)) return { ok: false, reason: "INVALID_EMAIL" };
    const existing = subscriberRepo.find(
      (s) => s.email.toLowerCase() === email,
    );
    if (existing) {
      return { ok: true, subscriber: existing, alreadySubscribed: true };
    }
    const subscriber = subscriberRepo.create({
      id: newId("sub"),
      email,
      createdAt: new Date().toISOString(),
    });
    return { ok: true, subscriber, alreadySubscribed: false };
  },
  remove: (id: string) => subscriberRepo.remove(id),
  subscribeChanges: (cb: (subscribers: Subscriber[]) => void) =>
    subscriberRepo.subscribe(cb),
};
