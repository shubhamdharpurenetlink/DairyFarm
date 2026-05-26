"use client";

import { useMemo } from "react";
import {
  productRepo,
  categoryRepo,
  cowRepo,
  diseaseRepo,
  trainingRepo,
  galleryRepo,
  teamRepo,
  facilityRepo,
  awardRepo,
  testimonialRepo,
  timelineRepo,
} from "@/services/repos";
import { settingsService } from "@/services/settingsService";
import type {
  Product,
  ProductCategoryDef,
  CowBreed,
  Disease,
  TrainingProgram,
  GalleryItem,
  TeamMember,
  Facility,
  Award,
  Testimonial,
  TimelineEvent,
  SiteSettings,
} from "@/types";

export interface InitialData {
  products?: Product[];
  categories?: ProductCategoryDef[];
  cows?: CowBreed[];
  diseases?: Disease[];
  trainings?: TrainingProgram[];
  gallery?: GalleryItem[];
  team?: TeamMember[];
  facilities?: Facility[];
  awards?: Award[];
  testimonials?: Testimonial[];
  timeline?: TimelineEvent[];
  settings?: SiteSettings;
}

/**
 * Hydrate one or more repos with server-fetched data so the very first client
 * render mirrors the SSR markup. Subsequent mutations and refreshes still go
 * through the normal repository flow.
 */
export default function RepoHydrator({
  data,
  children,
}: {
  data: InitialData;
  children: React.ReactNode;
}) {
  useMemo(() => {
    if (data.products) productRepo.hydrate(data.products);
    if (data.categories) categoryRepo.hydrate(data.categories);
    if (data.cows) cowRepo.hydrate(data.cows);
    if (data.diseases) diseaseRepo.hydrate(data.diseases);
    if (data.trainings) trainingRepo.hydrate(data.trainings);
    if (data.gallery) galleryRepo.hydrate(data.gallery);
    if (data.team) teamRepo.hydrate(data.team);
    if (data.facilities) facilityRepo.hydrate(data.facilities);
    if (data.awards) awardRepo.hydrate(data.awards);
    if (data.testimonials) testimonialRepo.hydrate(data.testimonials);
    if (data.timeline) timelineRepo.hydrate(data.timeline);
    if (data.settings) settingsService.hydrate(data.settings);
  }, [data]);
  return <>{children}</>;
}
