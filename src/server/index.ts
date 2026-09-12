/**
 * API server entry point.
 *
 *   npm run dev:api     # watch mode via tsx
 *   npm run start:api   # built output
 */

import "./config/dotenv.js";
import path from "node:path";
import { parse } from "date-fns";
import {
  runRaceAnalysis,
  venueCode,
  type AnalysisLogger,
  type RaceAnalysisOptions,
} from "../pipeline/raceAnalysis.js";
import { toRaceAnalysisJson } from "../pipeline/raceAnalysisJson.js";
import { createApp } from "./app.js";
import { loadEnv, type Env } from "./config/env.js";
import { AnalysisService, type AnalysisParams } from "./services/analysisService.js";

/** Maps validated API params onto the analysis pipeline; returns JSON-safe output. */
async function runAnalysis(params: AnalysisParams): Promise<unknown> {
  const tag = `[analysis ${venueCode(params.venue)}-${params.date}-${params.raceNumber}]`;
  const log: AnalysisLogger = {
    info: (message) => console.log(tag, message.trim()),
    warn: (message) => console.warn(tag, message.trim()),
  };

  const options: RaceAnalysisOptions = {
    date: parse(params.date, "yyyy-MM-dd", new Date()),
    venue: params.venue,
    raceNumber: params.raceNumber,
    useSaved: params.useSaved,
    bankroll: params.bankroll,
    kellyFraction: params.kellyFraction,
    minEdge: params.minEdge,
  };
  if (params.formData === "all") options.formData = "all";
  if (params.ignoreRecords.length > 0) options.ignoreRecords = params.ignoreRecords;

  return toRaceAnalysisJson(await runRaceAnalysis(options, log));
}

let env: Env;
try {
  env = loadEnv();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}

const analysisService = new AnalysisService({
  runner: runAnalysis,
  cacheDir: path.resolve(env.ANALYSIS_CACHE_DIR),
  maxConcurrent: env.ANALYSIS_MAX_CONCURRENT,
});

const app = createApp({
  apiKeys: env.API_KEYS,
  exposeErrorDetails: env.NODE_ENV !== "production",
  analysisService,
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
