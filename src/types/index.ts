// Shared types for the dairy farm site

export type Bilingual = { en: string; hi: string };
export type BilingualList = { en: string[]; hi: string[] };

export type Level = "beginner" | "intermediate" | "advanced";
export type CowCategory = "indigenous" | "exotic" | "crossbreed";

export interface CowBreed {
  slug: string;
  nameEn: string;
  nameHi: string;
  category: CowCategory;
  origin: string;
  milkYieldLitresPerDay: { min: number; max: number };
  fatPercent: number;
  image: string;
  gallery: string[];
  shortDesc: Bilingual;
  description: Bilingual;
  characteristics: BilingualList;
  history: Bilingual;
  temperament: Bilingual;
  suitability: Bilingual;
  color: string;
}

export type DiseaseCategory =
  | "disease"
  | "nutrition"
  | "calving"
  | "hoof"
  | "vaccination";

export interface Disease {
  slug: string;
  title: Bilingual;
  category: DiseaseCategory;
  image: string;
  summary: Bilingual;
  symptoms: BilingualList;
  causes: BilingualList;
  prevention: BilingualList;
  treatment: BilingualList;
  publishedAt: string;
  readTimeMin: number;
}

export interface TrainingProgram {
  slug: string;
  title: Bilingual;
  shortDesc: Bilingual;
  longDesc: Bilingual;
  image: string;
  durationDays: number;
  priceInr: number;
  level: Level;
  seatsTotal: number;
  seatsLeft: number;
  syllabus: BilingualList;
  instructor: {
    name: string;
    role: Bilingual;
    avatar: string;
    bioYears: number;
  };
  schedule: Bilingual;
  includes: BilingualList;
}

export interface Facility {
  id: string;
  name: Bilingual;
  description: Bilingual;
  image: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: Bilingual;
  avatar: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  quote: Bilingual;
}

export type GalleryType = "photo" | "video";

export interface GalleryItem {
  id: string;
  type: GalleryType;
  url: string;
  thumbnail: string;
  title: Bilingual;
  aspectRatio?: number;
}

export interface TimelineEvent {
  year: string;
  title: Bilingual;
  description: Bilingual;
}

export interface Award {
  id: string;
  year: string;
  title: Bilingual;
  issuer: string;
  icon: string;
}

export interface SiteSettings {
  farmName: Bilingual;
  tagline: Bilingual;
  foundedYear: number;
  address: Bilingual;
  phone: string;
  whatsapp: string;
  email: string;
  hours: Bilingual;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  stats: {
    yearsHeritage: number;
    healthyCows: number;
    litresPerDay: number;
    happyCustomers: number;
  };
}
