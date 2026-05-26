/**
 * Convert Prisma rows into the JSON shape that the legacy frontend types
 * expect (Date -> ISO string, etc).
 */
import type {
  Product as PProduct,
  Cow as PCow,
  Disease as PDisease,
  Training as PTraining,
  Enrollment as PEnrollment,
  GalleryItem as PGalleryItem,
  TeamMember as PTeamMember,
  TimelineEvent as PTimelineEvent,
  Award as PAward,
  Facility as PFacility,
  Testimonial as PTestimonial,
  Enquiry as PEnquiry,
  Subscriber as PSubscriber,
  Order as POrder,
  Settings as PSettings,
  Category as PCategory,
} from "@prisma/client";

import type {
  Product,
  ProductCategoryDef,
  CowBreed,
  Disease,
  TrainingProgram,
  Enrollment,
  GalleryItem,
  TeamMember,
  TimelineEvent,
  Award,
  Facility,
  Testimonial,
  Enquiry,
  Subscriber,
  Order,
  SiteSettings,
  ProductCategory,
  ProductVariant,
  Bilingual,
  BilingualList,
  OrderItem,
  OrderCustomer,
} from "@/types";

const toISO = (d: Date | string | null | undefined): string =>
  d instanceof Date ? d.toISOString() : (d ?? "");

export function serializeProduct(p: PProduct): Product {
  return {
    slug: p.slug,
    name: p.name as Bilingual,
    shortDesc: p.shortDesc as Bilingual,
    description: p.description as Bilingual,
    category: p.category as ProductCategory,
    primaryImage: p.primaryImage,
    images: p.images,
    variants: p.variants as unknown as ProductVariant[],
    tags: p.tags,
    isFeatured: p.isFeatured,
    isAvailable: p.isAvailable,
    rating: p.rating ?? undefined,
    ratingCount: p.ratingCount ?? undefined,
    badges: (p.badges as Bilingual[] | null) ?? undefined,
    shelfLifeDays: p.shelfLifeDays ?? undefined,
    storageInstructions: (p.storageInstructions as Bilingual | null) ?? undefined,
    ingredients: (p.ingredients as Bilingual | null) ?? undefined,
    nutrition: (p.nutrition as Product["nutrition"]) ?? undefined,
    publishedAt: toISO(p.publishedAt),
    updatedAt: toISO(p.updatedAt),
  };
}

export function serializeCategory(c: PCategory): ProductCategoryDef {
  return {
    slug: c.slug as ProductCategory,
    name: c.name as Bilingual,
    icon: c.icon,
    color: c.color,
    description: (c.description as Bilingual | null) ?? undefined,
  };
}

export function serializeCow(c: PCow): CowBreed {
  return {
    slug: c.slug,
    nameEn: c.nameEn,
    nameHi: c.nameHi,
    category: c.category as CowBreed["category"],
    origin: c.origin,
    color: c.color,
    milkYieldLitresPerDay: c.milkYieldLitresPerDay as { min: number; max: number },
    fatPercent: c.fatPercent,
    image: c.image,
    gallery: c.gallery,
    shortDesc: c.shortDesc as Bilingual,
    description: c.description as Bilingual,
    characteristics: c.characteristics as BilingualList,
    history: c.history as Bilingual,
    temperament: c.temperament as Bilingual,
    suitability: c.suitability as Bilingual,
  };
}

export function serializeDisease(d: PDisease): Disease {
  return {
    slug: d.slug,
    title: d.title as Bilingual,
    category: d.category as Disease["category"],
    image: d.image,
    summary: d.summary as Bilingual,
    symptoms: d.symptoms as BilingualList,
    causes: d.causes as BilingualList,
    prevention: d.prevention as BilingualList,
    treatment: d.treatment as BilingualList,
    readTimeMin: d.readTimeMin,
    publishedAt: toISO(d.publishedAt),
  };
}

export function serializeTraining(t: PTraining): TrainingProgram {
  return {
    slug: t.slug,
    title: t.title as Bilingual,
    shortDesc: t.shortDesc as Bilingual,
    longDesc: t.longDesc as Bilingual,
    image: t.image,
    durationDays: t.durationDays,
    priceInr: t.priceInr,
    level: t.level as TrainingProgram["level"],
    seatsTotal: t.seatsTotal,
    seatsLeft: t.seatsLeft,
    syllabus: t.syllabus as BilingualList,
    instructor: t.instructor as unknown as TrainingProgram["instructor"],
    schedule: t.schedule as Bilingual,
    includes: t.includes as BilingualList,
  };
}

export function serializeEnrollment(en: PEnrollment): Enrollment {
  return {
    id: en.id,
    trainingId: en.trainingId,
    trainingTitleEn: en.trainingTitleEn,
    fullName: en.fullName,
    phone: en.phone,
    email: en.email,
    age: en.age,
    state: en.state,
    district: en.district,
    education: en.education,
    batchDate: en.batchDate,
    source: en.source ?? undefined,
    message: en.message ?? undefined,
    status: en.status,
    createdAt: toISO(en.createdAt),
  };
}

export function serializeGalleryItem(g: PGalleryItem): GalleryItem {
  return {
    id: g.id,
    type: g.type,
    url: g.url,
    thumbnail: g.thumbnail,
    title: g.title as Bilingual,
    aspectRatio: g.aspectRatio ?? undefined,
  };
}

export function serializeTeamMember(m: PTeamMember): TeamMember {
  return {
    id: m.id,
    name: m.name,
    role: m.role as Bilingual,
    avatar: m.avatar,
  };
}

export function serializeTimelineEvent(e: PTimelineEvent): TimelineEvent {
  return {
    id: e.id,
    year: e.year,
    title: e.title as Bilingual,
    description: e.description as Bilingual,
  };
}

export function serializeAward(a: PAward): Award {
  return {
    id: a.id,
    year: a.year,
    title: a.title as Bilingual,
    issuer: a.issuer,
    icon: a.icon,
  };
}

export function serializeFacility(f: PFacility): Facility {
  return {
    id: f.id,
    name: f.name as Bilingual,
    description: f.description as Bilingual,
    image: f.image,
    icon: f.icon,
  };
}

export function serializeTestimonial(t: PTestimonial): Testimonial {
  return {
    id: t.id,
    name: t.name,
    city: t.city,
    avatar: t.avatar,
    rating: t.rating,
    quote: t.quote as Bilingual,
  };
}

export function serializeEnquiry(e: PEnquiry): Enquiry {
  return {
    id: e.id,
    name: e.name,
    phone: e.phone,
    email: e.email,
    subject: e.subject as Enquiry["subject"],
    message: e.message,
    status: e.status,
    createdAt: toISO(e.createdAt),
  };
}

export function serializeSubscriber(s: PSubscriber): Subscriber {
  return {
    id: s.id,
    email: s.email,
    createdAt: toISO(s.createdAt),
  };
}

export function serializeOrder(o: POrder): Order {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customer: o.customer as unknown as OrderCustomer,
    items: o.items as unknown as OrderItem[],
    subtotalInr: o.subtotalInr,
    deliveryFeeInr: o.deliveryFeeInr,
    totalInr: o.totalInr,
    status: o.status,
    paymentMode: o.paymentMode as Order["paymentMode"],
    paymentRef: o.paymentRef ?? undefined,
    createdAt: toISO(o.createdAt),
    updatedAt: toISO(o.updatedAt),
  };
}

export function serializeSettings(s: PSettings): SiteSettings {
  return {
    farmName: s.farmName as Bilingual,
    tagline: s.tagline as Bilingual,
    foundedYear: s.foundedYear,
    address: s.address as Bilingual,
    phone: s.phone,
    whatsapp: s.whatsapp,
    email: s.email,
    hours: s.hours as Bilingual,
    socials: s.socials as SiteSettings["socials"],
    stats: s.stats as SiteSettings["stats"],
    delivery: s.delivery as SiteSettings["delivery"],
  };
}
