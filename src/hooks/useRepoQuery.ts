"use client";

import { useEffect, useState } from "react";
import type { Repository } from "@/services/repository";

/**
 * Reactive read of a Repository that's safe across SSR/CSR.
 *
 * On the server (and the very first client render), returns the seed snapshot
 * the repository was created with so markup matches between server and client.
 * After hydration it switches to the live `localStorage`-backed list and
 * re-renders whenever any part of the app mutates the same repo.
 */
export const useHydratedRepo = <T>(repo: Repository<T>): T[] => {
  const [items, setItems] = useState<T[]>(() => repo.list());
  useEffect(() => {
    setItems(repo.list());
    return repo.subscribe((next) => setItems(next));
  }, [repo]);
  return items;
};
