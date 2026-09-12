/**
 * Runs a slow analysis behind a JSON file cache (stale-while-revalidate).
 *
 *   cache hit  → return the cached file right away, re-run in the background and
 *                overwrite the file when it finishes
 *   cache miss → run, save, then return
 *
 * A cached file produced with different params counts as a miss and is overwritten.
 * One service per endpoint; give them the same `limiter` so they share one concurrency cap.
 */

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export interface CachedAnalysis<P> {
  params: P;
  generatedAt: string;
  result: unknown;
}

export interface AnalysisResponse<P> extends CachedAnalysis<P> {
  /** "hit" = served from the cache file; a background refresh has been started */
  cache: "hit" | "miss";
}

export type Limiter = <R>(task: () => Promise<R>) => Promise<R>;

export interface AnalysisServiceOptions<P> {
  runner: (params: P) => Promise<unknown>;
  cacheDir: string;
  /** Cache file name inside cacheDir. Params are already validated, so they are safe in a path. */
  fileName: (params: P) => string;
  /** Concurrency cap shared across services. Default: a private one allowing a single run. */
  limiter?: Limiter;
  onRefreshError?: (error: unknown, params: P) => void;
}

export class AnalysisService<P extends object> {
  private readonly runner: (params: P) => Promise<unknown>;
  private readonly cacheDir: string;
  private readonly fileName: (params: P) => string;
  private readonly limit: Limiter;
  private readonly onRefreshError: (error: unknown, params: P) => void;
  private readonly inFlight = new Map<string, Promise<CachedAnalysis<P>>>();

  constructor(options: AnalysisServiceOptions<P>) {
    this.runner = options.runner;
    this.cacheDir = options.cacheDir;
    this.fileName = options.fileName;
    this.limit = options.limiter ?? createLimiter(1);
    this.onRefreshError =
      options.onRefreshError ??
      ((error, params) =>
        console.error(
          `[analysis] background refresh failed for ${this.fileName(params)}:`,
          error instanceof Error ? error.message : error
        ));
  }

  async getAnalysis(params: P): Promise<AnalysisResponse<P>> {
    const key = stableStringify(params);
    const cached = await this.readCache(params);
    if (cached && stableStringify(cached.params) === key) {
      // Serve the cached copy now; the refresh overwrites the file for later callers
      if (!this.inFlight.has(key)) {
        this.run(params, key).catch((error: unknown) => this.onRefreshError(error, params));
      }
      return { ...cached, cache: "hit" };
    }
    return { ...(await this.run(params, key)), cache: "miss" };
  }

  /** Resolves once no analysis is running (tests, shutdown). */
  async idle(): Promise<void> {
    while (this.inFlight.size > 0) {
      await Promise.allSettled(this.inFlight.values());
    }
  }

  cachePath(params: P): string {
    return path.join(this.cacheDir, this.fileName(params));
  }

  /** Runs the analysis and saves it; joins an identical run that is already in flight. */
  private run(params: P, key: string): Promise<CachedAnalysis<P>> {
    const existing = this.inFlight.get(key);
    if (existing) return existing;

    const promise = this.limit(async () => {
      const result = await this.runner(params);
      const entry: CachedAnalysis<P> = { params, generatedAt: new Date().toISOString(), result };
      await this.writeCache(entry);
      return entry;
    }).finally(() => this.inFlight.delete(key));

    this.inFlight.set(key, promise);
    return promise;
  }

  private async readCache(params: P): Promise<CachedAnalysis<P> | null> {
    try {
      const parsed = JSON.parse(await readFile(this.cachePath(params), "utf8")) as Partial<CachedAnalysis<P>>;
      return typeof parsed.params === "object" && parsed.params !== null && "result" in parsed
        ? (parsed as CachedAnalysis<P>)
        : null;
    } catch {
      return null; // missing or unreadable → miss; the next run overwrites it
    }
  }

  private async writeCache(entry: CachedAnalysis<P>): Promise<void> {
    const file = this.cachePath(entry.params);
    const tmp = `${file}.${randomUUID()}.tmp`;
    await mkdir(this.cacheDir, { recursive: true });
    // Write-then-rename so a reader never sees a half-written file
    await writeFile(tmp, JSON.stringify(entry, null, 2));
    await rename(tmp, file);
  }
}

/** JSON with object keys sorted, so equal params give the same string whatever their key order. */
export function stableStringify(value: unknown): string {
  return JSON.stringify(value, (_key, v: unknown) =>
    v !== null && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v as Record<string, unknown>).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        )
      : v
  );
}

export function createLimiter(max: number): Limiter {
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
