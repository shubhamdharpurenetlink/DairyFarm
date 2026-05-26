import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const ADMIN_PATH_RE = /^\/(?:en\/|hi\/)?admin(?:\/|$)/;
const LOGIN_PATH_RE = /^\/(?:en\/|hi\/)?admin\/login$/;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (ADMIN_PATH_RE.test(pathname) && !LOGIN_PATH_RE.test(pathname)) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    if (!token) {
      const loginUrl = req.nextUrl.clone();
      const localeMatch = pathname.match(/^\/(en|hi)\//);
      const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";
      loginUrl.pathname = `${localePrefix}/admin/login`;
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
