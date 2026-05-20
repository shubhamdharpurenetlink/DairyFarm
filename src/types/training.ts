import type { Bilingual, BilingualList, ID, Level } from "./common";

export interface TrainingProgram {
  slug: string;
  title: Bilingual;
  shortDesc: Bilingual;
  longDesc: Bilingual;
  image: string;
  durationDays: number;
  priceInr: number;
  level: Level;
  seatsTotal: number;
  seatsLeft: number;
  syllabus: BilingualList;
  instructor: {
    name: string;
    role: Bilingual;
    avatar: string;
    bioYears: number;
  };
  schedule: Bilingual;
  includes: BilingualList;
}

export interface Enrollment {
  id: ID;
  trainingId: ID;
  trainingTitleEn: string;
  fullName: string;
  phone: string;
  email: string;
  age: number;
  state: string;
  district: string;
  education: string;
  batchDate: string;
  source?: string;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}
