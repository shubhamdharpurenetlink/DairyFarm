/**
 * Normalise Google Drive / Google Photos share URLs into direct-view URLs
 * that work with `<img src>` and `next/image`.
 *
 * Examples:
 *   https://drive.google.com/file/d/<ID>/view?usp=sharing
 *     -> https://lh3.googleusercontent.com/d/<ID>=w1200
 *
 *   https://drive.google.com/open?id=<ID>
 *     -> https://lh3.googleusercontent.com/d/<ID>=w1200
 *
 *   https://docs.google.com/uc?export=download&id=<ID>
 *     -> https://lh3.googleusercontent.com/d/<ID>=w1200
 *
 *   https://photos.app.goo.gl/<short>   (Photos share link)
 *     -> returned unchanged (cannot resolve client-side without HEAD request)
 *
 * Already direct URLs (`lh3.googleusercontent.com`, `images.unsplash.com`,
 * `i.pravatar.cc`, etc.) pass through untouched.
 */

const FILE_PATH_RE = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{15,})/;
const OPEN_QUERY_RE = /[?&]id=([a-zA-Z0-9_-]{15,})/;

export function extractGoogleDriveId(url: string): string | null {
  const m1 = url.match(FILE_PATH_RE);
  if (m1) return m1[1];
  const m2 = url.match(OPEN_QUERY_RE);
  if (m2 && /drive\.google\.com|docs\.google\.com/.test(url)) return m2[1];
  return null;
}

export function normaliseImageUrl(input: string, opts?: { width?: number }): string {
  if (!input) return input;
  const trimmed = input.trim();
  if (!trimmed) return trimmed;

  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    const w = opts?.width ?? 1200;
    return `https://lh3.googleusercontent.com/d/${driveId}=w${w}`;
  }

  return trimmed;
}

export function isGoogleHosted(url: string): boolean {
  return /lh3\.googleusercontent\.com|drive\.google\.com|drive\.usercontent\.google\.com|photos\.fife\.usercontent\.google\.com/.test(
    url,
  );
}
