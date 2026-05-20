import type { Bilingual, ID } from "./common";

export interface Testimonial {
  id: ID;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  quote: Bilingual;
}
