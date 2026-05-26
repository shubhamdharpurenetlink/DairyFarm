/**
 * Repository pattern (Phase-2: API-backed).
 *
 * Public method signatures are unchanged from Phase 1 so feature components
 * and hooks (`useHydratedRepo`, `useHydratedSettings`, …) keep working. The
 * implementation now:
 *
 *   - keeps an in-memory cache, seeded from the bundled snapshot for SSR
 *   - on first browser use, refreshes from `GET /api/v1/<resource>`
 *   - mutations (`create`/`update`/`upsert`/`remove`) are **optimistic** —
 *     they update the cache and notify subscribers immediately, then fire
 *     a background API request. On failure the change is reverted and an
 *     error event is dispatched so the UI can show a toast.
 *
 * Use cases that need to await a server result (e.g. checkout) should call
 * the API directly through `services/apiClient.ts`.
 */

import { apiFetch, ApiError } from "./apiClient";

export type EntityKey<T> = keyof T & string;

const isBrowser = typeof window !== "undefined";

const REPO_ERROR_EVENT = "laxmi-repo-error";

export interface RepoErrorDetail {
  resource: string;
  op: "create" | "update" | "remove" | "refresh";
  code: string;
  message: string;
}

export function onRepositoryError(
  listener: (detail: RepoErrorDetail) => void,
): () => void {
  if (!isBrowser) return () => undefined;
  const handler = (e: Event) =>
    listener((e as CustomEvent<RepoErrorDetail>).detail);
  window.addEventListener(REPO_ERROR_EVENT, handler);
  return () => window.removeEventListener(REPO_ERROR_EVENT, handler);
}

function emitError(detail: RepoErrorDetail) {
  if (!isBrowser) return;
  window.dispatchEvent(new CustomEvent<RepoErrorDetail>(REPO_ERROR_EVENT, { detail }));
}

export class Repository<T> {
  private cache: T[];
  private listeners = new Set<(items: T[]) => void>();
  private hasRefreshed = false;
  private refreshPromise: Promise<T[]> | null = null;

  constructor(
    private readonly resource: string,
    seed: readonly T[],
    private readonly idKey: EntityKey<T>,
  ) {
    this.cache = [...seed];
  }

  private setCache(next: T[]) {
    this.cache = next;
    for (const fn of this.listeners) fn([...this.cache]);
  }

  private getId(item: T): string {
    return (item as Record<string, unknown>)[this.idKey] as string;
  }

  // ---------- Reads ----------

  list(): T[] {
    if (isBrowser && !this.hasRefreshed) {
      this.hasRefreshed = true;
      void this.refresh();
    }
    return [...this.cache];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.list().find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.list().filter(predicate);
  }

  get(id: string): T | undefined {
    return this.list().find((x) => this.getId(x) === id);
  }

  /**
   * Force-refetch the resource from the API. Returns the new list.
   * Reuses an in-flight request if called concurrently.
   */
  refresh(): Promise<T[]> {
    if (!isBrowser) return Promise.resolve([...this.cache]);
    if (this.refreshPromise) return this.refreshPromise;
    this.refreshPromise = apiFetch<T[]>({ path: `/${this.resource}`, cache: "no-store" })
      .then((items) => {
        this.setCache(items);
        return items;
      })
      .catch((e: unknown) => {
        const code = e instanceof ApiError ? e.code : "NETWORK_ERROR";
        const message = e instanceof Error ? e.message : "Failed to refresh";
        emitError({ resource: this.resource, op: "refresh", code, message });
        return this.cache;
      })
      .finally(() => {
        this.refreshPromise = null;
      });
    return this.refreshPromise;
  }

  // ---------- Mutations (optimistic) ----------

  create(item: T): T {
    const optimistic = item;
    const prev = this.cache;
    this.setCache([...this.cache, optimistic]);

    if (isBrowser) {
      void apiFetch<T>({ path: `/${this.resource}`, method: "POST", body: item })
        .then((saved) => {
          const next = this.cache.map((x) => (x === optimistic ? saved : x));
          this.setCache(next);
        })
        .catch((e: unknown) => {
          this.setCache(prev);
          const code = e instanceof ApiError ? e.code : "NETWORK_ERROR";
          const message = e instanceof Error ? e.message : "Failed to create";
          emitError({ resource: this.resource, op: "create", code, message });
        });
    }
    return optimistic;
  }

  update(id: string, patch: Partial<T>): T | undefined {
    const prev = this.cache;
    const idx = this.cache.findIndex((x) => this.getId(x) === id);
    if (idx === -1) return undefined;

    const optimistic = { ...this.cache[idx], ...patch };
    const next = [...this.cache];
    next[idx] = optimistic;
    this.setCache(next);

    if (isBrowser) {
      const isFullObject =
        Object.prototype.hasOwnProperty.call(optimistic, this.idKey) &&
        Object.keys(patch).length > 2; // crude: probably a full PUT

      const requestBody = isFullObject ? optimistic : { ...optimistic };

      void apiFetch<T>({
        path: `/${this.resource}/${encodeURIComponent(id)}`,
        method: "PUT",
        body: requestBody,
      })
        .then((saved) => {
          const idx2 = this.cache.findIndex((x) => this.getId(x) === this.getId(saved));
          if (idx2 !== -1) {
            const next2 = [...this.cache];
            next2[idx2] = saved;
            this.setCache(next2);
          }
        })
        .catch((e: unknown) => {
          if (e instanceof ApiError && e.status === 404) {
            // resource path doesn't accept PUT (e.g. enquiries use PATCH for status).
            // Try PATCH as a fallback for status-only updates.
            void apiFetch<T>({
              path: `/${this.resource}/${encodeURIComponent(id)}`,
              method: "PATCH",
              body: patch,
            })
              .then((saved) => {
                const idx2 = this.cache.findIndex((x) => this.getId(x) === this.getId(saved));
                if (idx2 !== -1) {
                  const next2 = [...this.cache];
                  next2[idx2] = saved;
                  this.setCache(next2);
                }
              })
              .catch((err2: unknown) => {
                this.setCache(prev);
                const code = err2 instanceof ApiError ? err2.code : "NETWORK_ERROR";
                const message = err2 instanceof Error ? err2.message : "Failed to update";
                emitError({ resource: this.resource, op: "update", code, message });
              });
            return;
          }
          this.setCache(prev);
          const code = e instanceof ApiError ? e.code : "NETWORK_ERROR";
          const message = e instanceof Error ? e.message : "Failed to update";
          emitError({ resource: this.resource, op: "update", code, message });
        });
    }
    return optimistic;
  }

  upsert(item: T): T {
    const id = this.getId(item);
    const exists = this.get(id);
    return exists ? (this.update(id, item) ?? item) : this.create(item);
  }

  remove(id: string): boolean {
    const prev = this.cache;
    const next = this.cache.filter((x) => this.getId(x) !== id);
    const changed = next.length !== this.cache.length;
    if (!changed) return false;
    this.setCache(next);

    if (isBrowser) {
      void apiFetch<{ ok: true }>({
        path: `/${this.resource}/${encodeURIComponent(id)}`,
        method: "DELETE",
      }).catch((e: unknown) => {
        this.setCache(prev);
        const code = e instanceof ApiError ? e.code : "NETWORK_ERROR";
        const message = e instanceof Error ? e.message : "Failed to delete";
        emitError({ resource: this.resource, op: "remove", code, message });
      });
    }
    return true;
  }

  /** Replace cache with `seed` (used by admin "reset to defaults" actions). */
  reset(): void {
    this.setCache([...this.cache]);
    void this.refresh();
  }

  /** Manually hydrate the cache (used by server components passing initial data). */
  hydrate(items: T[]): void {
    this.cache = [...items];
    this.hasRefreshed = true;
  }

  subscribe(listener: (items: T[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const newId = (prefix = "id"): string =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
