"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { site as seedSite } from "@/data/seeds";
import type { SiteSettings } from "@/types";

const isBrowser = typeof window !== "undefined";
// Bump SEED_VERSION whenever site seed shape or contents change so stale
// localStorage caches re-seed automatically on next visit.
const SEED_VERSION = "2";
const VERSION_KEY = `${STORAGE_KEYS.settings}.__v`;

type Listener = (settings: SiteSettings) => void;
const listeners = new Set<Listener>();

const read = (): SiteSettings => {
  if (!isBrowser) return seedSite;
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== SEED_VERSION) {
      localStorage.removeItem(STORAGE_KEYS.settings);
      localStorage.setItem(VERSION_KEY, SEED_VERSION);
      return seedSite;
    }
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    return raw ? (JSON.parse(raw) as SiteSettings) : seedSite;
  } catch {
    return seedSite;
  }
};

const notify = (settings: SiteSettings) => {
  listeners.forEach((fn) => fn(settings));
};

export const settingsService = {
  /** Read current site settings (returns the seed snapshot during SSR). */
  get(): SiteSettings {
    return read();
  },
  save(s: SiteSettings): SiteSettings {
    if (isBrowser) {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s));
    }
    notify(s);
    return s;
  },
  reset(): SiteSettings {
    if (isBrowser) localStorage.removeItem(STORAGE_KEYS.settings);
    notify(seedSite);
    return seedSite;
  },
  /** Subscribe to settings changes. Returns an unsubscribe function. */
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
