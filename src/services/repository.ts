/**
 * Repository pattern.
 *
 * Wraps a typed entity with localStorage persistence for the Phase-1 UI
 * (so admin edits, orders, and enquiries survive page reloads). In Phase 2
 * a server-backed implementation (Supabase, REST, etc.) can be swapped in
 * by replacing this single file — feature components stay untouched.
 */

export type EntityKey<T> = keyof T & string;

const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";

export class Repository<T> {
  private cache: T[] | null = null;
  private listeners = new Set<(items: T[]) => void>();
  private readonly versionKey: string;

  constructor(
    private readonly storageKey: string,
    private readonly seed: readonly T[],
    private readonly idKey: EntityKey<T>,
    private readonly seedVersion: string = "1",
  ) {
    this.versionKey = `${storageKey}.__v`;
  }

  private read(): T[] {
    if (this.cache) return this.cache;
    if (!isBrowser) {
      this.cache = [...this.seed];
      return this.cache;
    }
    try {
      const storedVersion = localStorage.getItem(this.versionKey);
      const raw = localStorage.getItem(this.storageKey);
      if (raw && storedVersion === this.seedVersion) {
        this.cache = JSON.parse(raw) as T[];
      } else {
        this.cache = [...this.seed];
        this.persist();
        localStorage.setItem(this.versionKey, this.seedVersion);
      }
    } catch {
      this.cache = [...this.seed];
    }
    return this.cache;
  }

  private persist() {
    if (!isBrowser || !this.cache) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cache));
    } catch {
      // storage quota / disabled — ignore
    }
    this.listeners.forEach((fn) => fn([...this.cache!]));
  }

  list(): T[] {
    return [...this.read()];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.read().find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.read().filter(predicate);
  }

  get(id: string): T | undefined {
    return this.read().find((x) => (x as Record<string, unknown>)[this.idKey] === id);
  }

  create(item: T): T {
    const items = [...this.read(), item];
    this.cache = items;
    this.persist();
    return item;
  }

  update(id: string, patch: Partial<T>): T | undefined {
    const items = this.read().map((x) =>
      (x as Record<string, unknown>)[this.idKey] === id ? { ...x, ...patch } : x,
    );
    this.cache = items;
    this.persist();
    return this.get(id);
  }

  upsert(item: T): T {
    const id = (item as Record<string, unknown>)[this.idKey] as string;
    const exists = this.get(id);
    return exists ? (this.update(id, item) ?? item) : this.create(item);
  }

  remove(id: string): boolean {
    const items = this.read().filter((x) => (x as Record<string, unknown>)[this.idKey] !== id);
    const changed = items.length !== this.read().length;
    this.cache = items;
    this.persist();
    return changed;
  }

  reset(): void {
    this.cache = [...this.seed];
    this.persist();
  }

  subscribe(listener: (items: T[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const newId = (prefix = "id"): string =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
