import type { Bilingual, ID } from "./common";

export type ProductCategory =
  | "milk"
  | "ghee"
  | "curd"
  | "paneer"
  | "butter"
  | "mava"
  | "sweets"
  | "other";

export type Unit = "L" | "ml" | "kg" | "g" | "piece";

export interface ProductVariant {
  id: ID;
  label: Bilingual; // "1 L", "500 ml", "500 g"
  unit: Unit;
  size: number;
  priceInr: number;
  mrpInr?: number;
  stockQty: number;
  sku: string;
}

export interface ProductCategoryDef {
  slug: ProductCategory;
  name: Bilingual;
  icon: string;
  color: string;
  description?: Bilingual;
}

export interface Product {
  slug: string;
  name: Bilingual;
  shortDesc: Bilingual;
  description: Bilingual;
  category: ProductCategory;
  images: string[];
  primaryImage: string;
  variants: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  badges?: Bilingual[];
  ingredients?: Bilingual;
  shelfLifeDays?: number;
  storageInstructions?: Bilingual;
  nutrition?: {
    energyKcal?: number;
    proteinG?: number;
    fatG?: number;
    carbsG?: number;
  };
  rating?: number;
  ratingCount?: number;
  publishedAt: string;
  updatedAt: string;
}
