import type { Bilingual, ID } from "./common";

export interface TeamMember {
  id: ID;
  name: string;
  role: Bilingual;
  avatar: string;
}

export interface TimelineEvent {
  id: ID;
  year: string;
  title: Bilingual;
  description: Bilingual;
}

export interface Award {
  id: ID;
  year: string;
  title: Bilingual;
  issuer: string;
  icon: string;
}
