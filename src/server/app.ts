/**
 * Express app factory. Kept separate from `index.ts` (which calls listen)
 * so tests can build an app with known keys.
 */

import { readFileSync } from "node:fs";
import express, { type Express } from "express";
import { apiKeyAuth } from "./middleware/apiKeyAuth.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { analysesRouter } from "./routes/analyses.js";
import { healthRouter } from "./routes/health.js";
import type { AnalysisService } from "./services/analysisService.js";

export interface AppOptions {
  apiKeys: readonly string[];
  /** Defaults to the version in package.json */
  version?: string;
  /** Include error messages in 5xx responses (never enable in production) */
  exposeErrorDetails?: boolean;
  /** Mounts POST /v1/analyses when provided */
  analysisService?: AnalysisService;
}

function readPackageVersion(): string {
  // Same relative path from src/server/ and dist/server/
  const pkgUrl = new URL("../../package.json", import.meta.url);
  const pkg = JSON.parse(readFileSync(pkgUrl, "utf8")) as { version?: string };
  return pkg.version ?? "unknown";
}

export function createApp({
  apiKeys,
  version = readPackageVersion(),
  exposeErrorDetails = false,
  analysisService,
}: AppOptions): Express {
  const app = express();

  app.disable("x-powered-by");

  // Auth runs before everything else, so every route is protected by default
  app.use(apiKeyAuth(apiKeys));
  app.use(express.json({ limit: "100kb" }));

  app.use("/health", healthRouter(version));
  if (analysisService) app.use("/v1/analyses", analysesRouter(analysisService));

  app.use(notFound);
  app.use(errorHandler(exposeErrorDetails));

  return app;
}
