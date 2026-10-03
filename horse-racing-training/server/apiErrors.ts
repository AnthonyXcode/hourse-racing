// Last-resort error handler for /api: JSON in the `{ error: { code } }` shape instead of Express's HTML page
// (which includes a stack trace in dev). Body-parser failures (malformed / oversized JSON) are client errors.
import type { NextFunction, Request, Response } from "express";

export function apiErrorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);
  const e = err as { type?: unknown; status?: unknown; statusCode?: unknown };
  const status = Number(e?.status ?? e?.statusCode);
  // body-parser sets `type` (entity.parse.failed, entity.too.large, encoding.unsupported, …) and a 4xx status.
  if (typeof e?.type === "string" && status >= 400 && status < 500) return res.status(status).json({ error: { code: "bad_request" } });
  console.error("[api] unhandled error:", err instanceof Error ? err.message : err);
  res.status(500).json({ error: { code: "server_error" } });
}
