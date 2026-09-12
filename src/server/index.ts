/**
 * API server entry point.
 *
 *   npm run dev:api     # watch mode via tsx
 *   npm run start:api   # built output
 */

import "./config/dotenv.js";
import path from "node:path";
import { parse } from "date-fns";
import { runDifferentiationReport } from "../backtest/differentiationReport.js";
import { runBatchAnalysis, type BatchAnalysisOptions } from "../pipeline/batchAnalysis.js";
import {
  runRaceAnalysis,
  venueCode,
  type AnalysisLogger,
  type RaceAnalysisOptions,
} from "../pipeline/raceAnalysis.js";
import { toRaceAnalysisJson } from "../pipeline/raceAnalysisJson.js";
import { createApp } from "./app.js";
import { loadEnv, type Env } from "./config/env.js";
import { analysisCacheFile, type AnalysisParams } from "./routes/analyses.js";
import { backtestCacheFile, type BacktestParams } from "./routes/backtests.js";
import { batchCacheFile, type BatchAnalysisParams } from "./routes/batchAnalyses.js";
import { AnalysisService, createLimiter } from "./services/analysisService.js";

/** Pipeline progress → server log, prefixed with the job it belongs to */
function taggedLogger(tag: string): AnalysisLogger {
  return {
    info: (message) => console.log(tag, message.trim()),
    warn: (message) => console.warn(tag, message.trim()),
  };
}

const parseDate = (date: string): Date => parse(date, "yyyy-MM-dd", new Date());

/** POST /v1/analyses → tools/analyze-race.ts pipeline, JSON-safe output */
async function runAnalysis(params: AnalysisParams): Promise<unknown> {
  const options: RaceAnalysisOptions = {
    date: parseDate(params.date),
    venue: params.venue,
    raceNumber: params.raceNumber,
    useSaved: params.useSaved,
    bankroll: params.bankroll,
    kellyFraction: params.kellyFraction,
    minEdge: params.minEdge,
  };
  if (params.formData === "all") options.formData = "all";
  if (params.ignoreRecords.length > 0) options.ignoreRecords = params.ignoreRecords;

  const log = taggedLogger(`[analysis ${venueCode(params.venue)}-${params.date}-${params.raceNumber}]`);
  return toRaceAnalysisJson(await runRaceAnalysis(options, log));
}

/** POST /v1/backtests/differentiation → tools/backtest-differentiation.ts report */
async function runBacktest(params: BacktestParams): Promise<unknown> {
  const { ignoreAfter, ...options } = params;
  return runDifferentiationReport({ ...options, ...(ignoreAfter ? { ignoreAfter } : {}) });
}

/** POST /v1/batch-analyses → tools/batch-analyze.ts pipeline */
async function runBatch(params: BatchAnalysisParams): Promise<unknown> {
  const options: BatchAnalysisOptions = {
    date: parseDate(params.date),
    venue: params.venue,
    races: Array.from({ length: params.lastRace - params.firstRace + 1 }, (_, i) => params.firstRace + i),
    useSaved: params.useSaved,
    backtestMonths: params.backtestMonths,
  };
  if (params.formData === "all") options.formData = "all";

  return runBatchAnalysis(options, { log: taggedLogger(`[batch ${venueCode(params.venue)}-${params.date}]`) });
}

let env: Env;
try {
  env = loadEnv();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}

const cacheDir = path.resolve(env.ANALYSIS_CACHE_DIR);
// One cap across endpoints: live analyses launch Chromium, backtests are CPU-heavy
const limiter = createLimiter(env.ANALYSIS_MAX_CONCURRENT);

const app = createApp({
  apiKeys: env.API_KEYS,
  exposeErrorDetails: env.NODE_ENV !== "production",
  analysisService: new AnalysisService({ runner: runAnalysis, cacheDir, fileName: analysisCacheFile, limiter }),
  backtestService: new AnalysisService({ runner: runBacktest, cacheDir, fileName: backtestCacheFile, limiter }),
  batchAnalysisService: new AnalysisService({ runner: runBatch, cacheDir, fileName: batchCacheFile, limiter }),
});

const server = app.listen(env.PORT, (error) => {
  if (error) {
    console.error(`Failed to start API server: ${error.message}`);
    process.exit(1);
  }
  console.log(`API listening on http://localhost:${env.PORT} (${env.NODE_ENV}, ${env.API_KEYS.length} key(s))`);
});

function shutdown(signal: NodeJS.Signals): void {
  console.log(`${signal} received, shutting down`);
  server.close((err) => {
    if (err) console.error(err);
    process.exit(err ? 1 : 0);
  });
  // Don't hang forever on open keep-alive connections
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
