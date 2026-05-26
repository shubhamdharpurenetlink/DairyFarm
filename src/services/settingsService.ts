"use client";

import { apiFetch, ApiError } from "./apiClient";
import { site as seedSite } from "@/data/seeds";
import type { SiteSettings } from "@/types";

const isBrowser = typeof window !== "undefined";

type Listener = (settings: SiteSettings) => void;
const listeners = new Set<Listener>();

let cache: SiteSettings = seedSite;
let hasRefreshed = false;
let refreshing: Promise<SiteSettings> | null = null;

const notify = (settings: SiteSettings) => {
  cache = settings;
  for (const fn of listeners) fn(settings);
};

const refresh = (): Promise<SiteSettings> => {
  if (!isBrowser) return Promise.resolve(cache);
  if (refreshing) return refreshing;
  refreshing = apiFetch<SiteSettings>({ path: "/settings", cache: "no-store" })
    .then((s) => {
      notify(s);
      return s;
    })
    .catch((e) => {
      if (!(e instanceof ApiError) || e.status !== 404) {
        console.warn("[settings] refresh failed:", (e as Error).message);
      }
      return cache;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
};

export const settingsService = {
  get(): SiteSettings {
    if (isBrowser && !hasRefreshed) {
      hasRefreshed = true;
      void refresh();
    }
    return cache;
  },

  save(s: SiteSettings): SiteSettings {
    const prev = cache;
    notify(s);
    if (isBrowser) {
      void apiFetch<SiteSettings>({ path: "/settings", method: "PUT", body: s })
        .then((saved) => notify(saved))
        .catch((e) => {
          notify(prev);
          console.error("[settings] save failed:", (e as Error).message);
        });
    }
    return s;
  },

  reset(): SiteSettings {
    notify(seedSite);
    if (isBrowser) void refresh();
    return seedSite;
  },

  refresh,

  hydrate(s: SiteSettings) {
    cache = s;
    hasRefreshed = true;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
