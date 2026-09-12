/**
 * API key authentication.
 *
 * Accepts the key via `x-api-key: <key>` or `Authorization: Bearer <key>`.
 * Query-string keys are deliberately NOT supported — URLs leak into logs,
 * browser history and proxy caches.
 */

import { createHash, timingSafeEqual } from "node:crypto";
import type { Request, RequestHandler } from "express";

// Hash both sides so timingSafeEqual always compares equal-length buffers
const digest = (value: string): Buffer => createHash("sha256").update(value).digest();

function extractKey(req: Request): string | undefined {
  const headerKey = req.get("x-api-key")?.trim();
  if (headerKey) return headerKey;

  const match = req.get("authorization")?.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || undefined;
}

export function apiKeyAuth(apiKeys: readonly string[]): RequestHandler {
  if (apiKeys.length === 0) throw new Error("apiKeyAuth requires at least one API key");
  const keyDigests = apiKeys.map(digest);

  return (req, res, next) => {
    const provided = extractKey(req);
    let authorized = false;
    if (provided) {
      const providedDigest = digest(provided);
      // Compare against every key without short-circuiting, so timing doesn't reveal which key matched
      for (const keyDigest of keyDigests) {
        authorized = timingSafeEqual(keyDigest, providedDigest) || authorized;
      }
    }

    if (authorized) {
      next();
      return;
    }
    // Same response for missing and wrong keys — don't tell callers which one it was
    res.set("WWW-Authenticate", 'Bearer realm="api"').status(401).json({ error: "unauthorized" });
  };
}
