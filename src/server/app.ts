/**
 * Express app factory. Kept separate from `index.ts` (which calls listen)
 * so tests can build an app with known keys.
 */

import { readFileSync } from "node:fs";
import express, { type Express } from "express";
import { apiKeyAuth } from "./middleware/apiKeyAuth.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { analysesRouter, type AnalysisParams } from "./routes/analyses.js";
import { backtestsRouter, type BacktestParams } from "./routes/backtests.js";
import { batchAnalysesRouter, type BatchAnalysisParams } from "./routes/batchAnalyses.js";
import { healthRouter } from "./routes/health.js";
import type { AnalysisService } from "./services/analysisService.js";

export interface AppOptions {
  apiKeys: readonly string[];
  /** Defaults to the version in package.json */
  version?: string;
  /** Include error messages in 5xx responses (never enable in production) */
  exposeErrorDetails?: boolean;
  /** Mounts POST /v1/analyses when provided */
  analysisService?: AnalysisService<AnalysisParams>;
  /** Mounts POST /v1/backtests/differentiation when provided */
  backtestService?: AnalysisService<BacktestParams>;
  /** Mounts POST /v1/batch-analyses when provided */
  batchAnalysisService?: AnalysisService<BatchAnalysisParams>;
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
  backtestService,
  batchAnalysisService,
}: AppOptions): Express {
  const app = express();

  app.disable("x-powered-by");

  // Auth runs before everything else, so every route is protected by default
  app.use(apiKeyAuth(apiKeys));
  app.use(express.json({ limit: "100kb" }));

  app.use("/health", healthRouter(version));
  if (analysisService) app.use("/v1/analyses", analysesRouter(analysisService));
  if (backtestService) app.use("/v1/backtests", backtestsRouter(backtestService));
  if (batchAnalysisService) app.use("/v1/batch-analyses", batchAnalysesRouter(batchAnalysisService));

  app.use(notFound);
  app.use(errorHandler(exposeErrorDetails));

  return app;
}
