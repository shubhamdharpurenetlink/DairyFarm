import type { Bilingual, ID } from "./common";

export interface Facility {
  id: ID;
  name: Bilingual;
  description: Bilingual;
  image: string;
  icon: string;
}
