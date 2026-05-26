import { NextResponse } from "next/server";
import { ZodError, type ZodTypeAny, type z } from "zod";

export type ApiError = {
  error: string;
  message: string;
  issues?: { path: string; message: string }[];
};

export const apiOk = <T>(data: T, init?: number | ResponseInit): NextResponse =>
  NextResponse.json(data, typeof init === "number" ? { status: init } : init);

export const apiError = (
  code: string,
  message: string,
  status = 400,
  issues?: { path: string; message: string }[],
): NextResponse<ApiError> =>
  NextResponse.json({ error: code, message, issues }, { status });

export const apiServerError = (e: unknown): NextResponse<ApiError> => {
  console.error("[api]", e);
  const message = e instanceof Error ? e.message : "Unknown server error";
  return NextResponse.json(
    { error: "SERVER_ERROR", message },
    { status: 500 },
  );
};

/**
 * Parse JSON body against a Zod schema, returning either the parsed payload
 * or a 400 response with field-level issues.
 */
export async function parseJsonBody<S extends ZodTypeAny>(
  request: Request,
  schema: S,
): Promise<z.infer<S> | NextResponse<ApiError>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return apiError(
      "VALIDATION_ERROR",
      "One or more fields are invalid.",
      422,
      formatZodError(parsed.error),
    );
  }
  return parsed.data as z.infer<S>;
}

export function formatZodError(err: ZodError) {
  return err.issues.map((i) => ({
    path: i.path.join("."),
    message: i.message,
  }));
}
