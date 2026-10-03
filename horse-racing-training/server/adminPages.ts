// /admin pages (the lazy admin SPA): never indexed, never framed. A plain function middleware so it covers
// /admin, /admin/ and every deep link (/admin/users/123…) including the SPA fallback — a regex mount
// (`app.use(/^\/admin(\/|$)/)`) only matched the first two (docs/admin/QA-REPORT.md AD-02).
import type { RequestHandler } from "express";

export const ADMIN_PAGE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "frame-ancestors 'none'",
} as const;

/** True for /admin and anything under it (case-insensitive, like Express routing); not /administrator. */
export const isAdminPagePath = (p: string) => /^\/admin(?:\/|$)/i.test(p.split("?")[0]);

export const adminPageHeaders: RequestHandler = (req, res, next) => {
  if (isAdminPagePath(req.path)) res.set(ADMIN_PAGE_HEADERS);
  next();
};
