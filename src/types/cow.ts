import type { Bilingual, BilingualList } from "./common";

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
