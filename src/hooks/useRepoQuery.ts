"use client";

import { useEffect, useState } from "react";
import type { Repository } from "@/services/repository";

/**
 * Reactive read of a Repository that's safe across SSR/CSR.
 *
 * On the server (and the very first client render), returns the seed snapshot
 * the repository was created with so markup matches between server and client.
 * After hydration it switches to the live API-backed list and re-renders
 * whenever any part of the app mutates the same repo.
 */
export const useHydratedRepo = <T>(repo: Repository<T>): T[] => {
  const [items, setItems] = useState<T[]>(() => repo.list());
  useEffect(() => {
    setItems(repo.list());
    return repo.subscribe((next) => setItems(next));
  }, [repo]);
  return items;
};

/**
 * Returns `true` once the repo has been hydrated either from RSC handoff or
 * a successful (or failed) API refresh. On SSR and the very first client
 * render this is `false` so components can show skeletons.
 */
export const useRepoReady = <T>(repo: Repository<T>): boolean => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(repo.isReady());
    return repo.subscribeReady(setReady);
  }, [repo]);
  return ready;
};

/**
 * `true` once **all** the supplied repos report ready. Useful for pages that
 * paint a single skeleton until every section has data.
 */
export const useReposReady = (repos: Repository<unknown>[]): boolean => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setReady(repos.every((r) => r.isReady()));
    check();
    const unsubs = repos.map((r) => r.subscribeReady(check));
    return () => {
      for (const u of unsubs) u();
    };
  }, [repos]);
  return ready;
};
