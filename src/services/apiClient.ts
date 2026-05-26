/**
 * Thin wrapper around `fetch` for the v1 REST API.
 *
 * Server returns either the requested resource or
 * `{ error: string, message: string, issues?: [...] }` on validation/auth
 * failure. This client normalises both into a typed exception that callers
 * can match on for i18n.
 */

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    message: string,
    public readonly issues?: { path: string; message: string }[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const isServer = typeof window === "undefined";

const baseUrl = (() => {
  if (isServer) {
    return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  }
  return "";
})();

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequest<TBody = unknown> {
  path: string;
  method?: ApiMethod;
  body?: TBody;
  query?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: ApiRequest["query"]): string {
  const base = path.startsWith("/api/") ? path : `/api/v1${path.startsWith("/") ? "" : "/"}${path}`;
  if (!query) return `${baseUrl}${base}`;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined) params.set(k, String(v));
  }
  const qs = params.toString();
  return `${baseUrl}${base}${qs ? `?${qs}` : ""}`;
}

export async function apiFetch<T = unknown, B = unknown>(
  req: ApiRequest<B>,
): Promise<T> {
  const url = buildUrl(req.path, req.query);
  const init: RequestInit = {
    method: req.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: req.cache,
    signal: req.signal,
    credentials: "include",
  };
  if (req.next) {
    (init as RequestInit & { next?: { revalidate?: number; tags?: string[] } }).next = req.next;
  }
  if (req.body !== undefined) {
    init.body = JSON.stringify(req.body);
  }

  const res = await fetch(url, init);
  const text = await res.text();
  const data = text ? safeParse(text) : null;

  if (!res.ok) {
    const code = (data as { error?: string })?.error ?? `HTTP_${res.status}`;
    const message =
      (data as { message?: string })?.message ?? (res.statusText || "Request failed");
    const issues = (data as { issues?: { path: string; message: string }[] })?.issues;
    throw new ApiError(code, res.status, message, issues);
  }

  return data as T;
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
