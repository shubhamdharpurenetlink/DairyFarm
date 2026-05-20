import type { Bilingual, ID } from "./common";

export type GalleryType = "photo" | "video";

export interface GalleryItem {
  id: ID;
  type: GalleryType;
  url: string;
  thumbnail: string;
  title: Bilingual;
  aspectRatio?: number;
}
