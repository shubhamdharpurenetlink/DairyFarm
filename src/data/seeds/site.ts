import type { SiteSettings } from "@/types";

export const site: SiteSettings = {
  farmName: { en: "Laxmi Dairy Farm", hi: "लक्ष्मी डेयरी फार्म" },
  tagline: {
    en: "Pure milk, pure tradition, since 1985",
    hi: "शुद्ध दूध, शुद्ध परंपरा, 1985 से",
  },
  foundedYear: 1985,
  address: {
    en: "Village Jamlapani, Post Mohgaon, Tehsil Sausar, District Pandhurna, Madhya Pradesh – 480106, India",
    hi: "गाँव जामलापानी, पोस्ट मोहगांव, तहसील सौंसर, जिला पांढुर्णा, मध्य प्रदेश – 480106, भारत",
  },
  phone: "+91 89829 91614",
  whatsapp: "+918982991614",
  email: "hello@laxmidairy.in",
  hours: {
    en: "Mon-Sun: 6 AM to 7 PM",
    hi: "सोम-रवि: सुबह 6 बजे से शाम 7 बजे तक",
  },
  socials: {
    facebook: "https://facebook.com/laxmidairy",
    instagram: "https://instagram.com/laxmidairy",
    youtube: "https://youtube.com/@laxmidairy",
    twitter: "https://twitter.com/laxmidairy",
  },
  stats: {
    yearsHeritage: 40,
    healthyCows: 215,
    litresPerDay: 3500,
    happyCustomers: 1200,
  },
  delivery: {
    freeAboveInr: 999,
    flatFeeInr: 49,
    minOrderInr: 199,
    serviceablePincodes: [
      "480106", "480001", "480002", "480108", "480109",
      "480110", "480111", "480334", "480337", "480447",
    ],
  },
};
