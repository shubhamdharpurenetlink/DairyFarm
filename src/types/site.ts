import type { Bilingual } from "./common";

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
  delivery: {
    freeAboveInr: number;
    flatFeeInr: number;
    minOrderInr: number;
    serviceablePincodes: string[];
  };
}
