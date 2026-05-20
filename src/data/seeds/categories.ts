import type { ProductCategoryDef } from "@/types";

export const productCategories: ProductCategoryDef[] = [
  {
    slug: "milk",
    name: { en: "Fresh Milk", hi: "ताज़ा दूध" },
    icon: "milk",
    color: "#3B82F6",
    description: {
      en: "Pure A2 milk delivered fresh every morning",
      hi: "हर सुबह ताज़ा A2 दूध की डिलीवरी",
    },
  },
  {
    slug: "ghee",
    name: { en: "Pure Ghee", hi: "शुद्ध घी" },
    icon: "droplets",
    color: "#F59E0B",
    description: {
      en: "Traditional bilona-method A2 cow ghee",
      hi: "पारंपरिक बिलोना विधि से बना A2 गाय का घी",
    },
  },
  {
    slug: "curd",
    name: { en: "Curd & Dahi", hi: "दही" },
    icon: "container",
    color: "#10B981",
    description: {
      en: "Hand-set, creamy desi cow curd",
      hi: "हाथ से जमाया हुआ, मलाईदार देसी गाय का दही",
    },
  },
  {
    slug: "paneer",
    name: { en: "Paneer", hi: "पनीर" },
    icon: "square",
    color: "#F97316",
    description: {
      en: "Soft, fresh A2 cow paneer made daily",
      hi: "रोज़ाना बनाया जाने वाला मुलायम A2 गाय का पनीर",
    },
  },
  {
    slug: "butter",
    name: { en: "White Butter", hi: "सफेद मक्खन" },
    icon: "circle",
    color: "#FBBF24",
    description: {
      en: "Hand-churned makhan from desi cow cream",
      hi: "देसी गाय की मलाई से हाथ से बना मक्खन",
    },
  },
  {
    slug: "mava",
    name: { en: "Mawa / Khoya", hi: "मावा / खोया" },
    icon: "cookie",
    color: "#D97706",
    description: {
      en: "Slow-cooked mawa perfect for sweets",
      hi: "मिठाइयों के लिए धीमी आँच पर बना मावा",
    },
  },
  {
    slug: "sweets",
    name: { en: "Traditional Sweets", hi: "पारंपरिक मिठाई" },
    icon: "cake",
    color: "#EC4899",
    description: {
      en: "Festive sweets made with desi ghee",
      hi: "देसी घी से बनी त्यौहार वाली मिठाइयाँ",
    },
  },
];
