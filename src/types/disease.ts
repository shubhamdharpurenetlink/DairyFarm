import type { Bilingual, BilingualList } from "./common";

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
