"use client";

import { useEffect, useState } from "react";
import { settingsService } from "@/services/settingsService";
import type { SiteSettings } from "@/types";

/**
 * Reactive read of {@link settingsService} that is safe across SSR.
 *
 * SSR/initial render returns the seed snapshot; after hydration the hook
 * switches to the localStorage-backed settings the admin "Settings" panel
 * writes, and re-renders whenever those settings change.
 */
export const useHydratedSettings = (): SiteSettings => {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    settingsService.get(),
  );
  useEffect(() => {
    setSettings(settingsService.get());
    return settingsService.subscribe(setSettings);
  }, []);
  return settings;
};
