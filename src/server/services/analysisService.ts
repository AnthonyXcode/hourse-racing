/**
 * Race analysis with a JSON file cache (stale-while-revalidate).
 *
 *   cache hit  → return the cached file right away, re-run the analysis in the
 *                background and overwrite the file when it finishes
 *   cache miss → run the analysis, save it, then return it
 *
 * Cache file: <cacheDir>/<ST|HV>-<YYYY-MM-DD>-<race>.json. A cached file produced
 * with different options (bankroll, formData, …) counts as a miss and is overwritten.
 */

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { venueCode } from "../../pipeline/raceAnalysis.js";
import type { Venue } from "../../types/index.js";

/** Validated request options with all defaults filled in. */
export interface AnalysisParams {
  /** YYYY-MM-DD */
  date: string;
  venue: Venue;
  raceNumber: number;
  formData: "all" | "venue";
  useSaved: boolean;
  bankroll: number;
  kellyFraction: number;
  minEdge: number;
  ignoreRecords: string[];
}

export interface CachedAnalysis {
  params: AnalysisParams;
  generatedAt: string;
  result: unknown;
}

export interface AnalysisResponse extends CachedAnalysis {
  /** "hit" = served from the cache file; a background refresh has been started */
  cache: "hit" | "miss";
}

export interface AnalysisServiceOptions {
  runner: (params: AnalysisParams) => Promise<unknown>;
  cacheDir: string;
  /** Max analyses running at once — live runs each launch Chromium. Default 1. */
  maxConcurrent?: number;
  onRefreshError?: (error: unknown, params: AnalysisParams) => void;
}

type Limiter = <R>(task: () => Promise<R>) => Promise<R>;

export class AnalysisService {
  private readonly runner: AnalysisServiceOptions["runner"];
  private readonly cacheDir: string;
  private readonly limit: Limiter;
  private readonly onRefreshError: NonNullable<AnalysisServiceOptions["onRefreshError"]>;
  private readonly inFlight = new Map<string, Promise<CachedAnalysis>>();

  constructor(options: AnalysisServiceOptions) {
    this.runner = options.runner;
    this.cacheDir = options.cacheDir;
    this.limit = createLimiter(options.maxConcurrent ?? 1);
    this.onRefreshError =
      options.onRefreshError ??
      ((error, params) =>
        console.error(
          `[analysis] background refresh failed for ${path.basename(this.cachePath(params))}:`,
          error instanceof Error ? error.message : error
        ));
  }

  async getAnalysis(params: AnalysisParams): Promise<AnalysisResponse> {
    const cached = await this.readCache(params);
    if (cached && paramsKey(cached.params) === paramsKey(params)) {
      // Serve the cached copy now; the refresh overwrites the file for later callers
      if (!this.inFlight.has(paramsKey(params))) {
        this.run(params).catch((error: unknown) => this.onRefreshError(error, params));
      }
      return { ...cached, cache: "hit" };
    }
    return { ...(await this.run(params)), cache: "miss" };
  }

  /** Resolves once no analysis is running (tests, shutdown). */
  async idle(): Promise<void> {
    while (this.inFlight.size > 0) {
      await Promise.allSettled(this.inFlight.values());
    }
  }

  cachePath(params: AnalysisParams): string {
    return path.join(this.cacheDir, `${venueCode(params.venue)}-${params.date}-${params.raceNumber}.json`);
  }

  /** Runs the analysis and saves it; joins an identical run that is already in flight. */
  private run(params: AnalysisParams): Promise<CachedAnalysis> {
    const key = paramsKey(params);
    const existing = this.inFlight.get(key);
    if (existing) return existing;

    const promise = this.limit(async () => {
      const result = await this.runner(params);
      const entry: CachedAnalysis = { params, generatedAt: new Date().toISOString(), result };
      await this.writeCache(entry);
      return entry;
    }).finally(() => this.inFlight.delete(key));

    this.inFlight.set(key, promise);
    return promise;
  }

  private async readCache(params: AnalysisParams): Promise<CachedAnalysis | null> {
    try {
      const parsed = JSON.parse(await readFile(this.cachePath(params), "utf8")) as Partial<CachedAnalysis>;
      return parsed.params && Array.isArray(parsed.params.ignoreRecords) && "result" in parsed
        ? (parsed as CachedAnalysis)
        : null;
    } catch {
      return null; // missing or unreadable → miss; the next run overwrites it
    }
  }

  private async writeCache(entry: CachedAnalysis): Promise<void> {
    const file = this.cachePath(entry.params);
    const tmp = `${file}.${randomUUID()}.tmp`;
    await mkdir(this.cacheDir, { recursive: true });
    // Write-then-rename so a reader never sees a half-written file
    await writeFile(tmp, JSON.stringify(entry, null, 2));
    await rename(tmp, file);
  }
}

/** Canonical form of every option that affects the result. */
function paramsKey(p: AnalysisParams): string {
  return JSON.stringify([
    p.date,
    p.venue,
    p.raceNumber,
    p.formData,
    p.useSaved,
    p.bankroll,
    p.kellyFraction,
    p.minEdge,
    [...p.ignoreRecords].sort(),
  ]);
}

function createLimiter(max: number): Limiter {
  let active = 0;
  const waiting: (() => void)[] = [];

  return async <R>(task: () => Promise<R>): Promise<R> => {
    if (active < max) active++;
    else await new Promise<void>((resolve) => waiting.push(resolve)); // slot is handed over on release
    try {
      return await task();
    } finally {
      const next = waiting.shift();
      if (next) next();
      else active--;
    }
  };
}
