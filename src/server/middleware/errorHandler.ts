import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "not_found" });
};

/**
 * Final error handler. Express 5 forwards rejected async handlers here too.
 * 4xx errors from Express/body-parser carry `status` + `expose`; anything else is a 500.
 */
export function errorHandler(exposeDetails: boolean): ErrorRequestHandler {
  return (err, _req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    const rawStatus = typeof err?.status === "number" ? err.status : err?.statusCode;
    const status = typeof rawStatus === "number" && rawStatus >= 400 && rawStatus < 600 ? rawStatus : 500;

    if (status >= 500) console.error("[api] unhandled error:", err);

    const body: { error: string; message?: string } = {
      error: status >= 500 ? "internal_error" : "request_error",
    };
    if ((status < 500 && err?.expose) || exposeDetails) {
      body.message = String(err?.message ?? err);
    }
    res.status(status).json(body);
  };
}
