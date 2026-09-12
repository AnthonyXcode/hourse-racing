import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { analysisCacheFile, type AnalysisParams } from "../routes/analyses.js";
import {
  AnalysisService,
  createLimiter,
  stableStringify,
  type AnalysisServiceOptions,
} from "../services/analysisService.js";

const params: AnalysisParams = {
  date: "2026-09-09",
  venue: "Happy Valley",
  raceNumber: 7,
  formData: "all",
  useSaved: true,
  bankroll: 10000,
  kellyFraction: 0.25,
  minEdge: 5,
  ignoreRecords: [],
};
const CACHE_FILE = "HV-2026-09-09-7.json";

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((res) => (resolve = res));
  return { promise, resolve };
}

let dir: string;
const readCacheFile = async (name = CACHE_FILE) => JSON.parse(await readFile(path.join(dir, name), "utf8"));
const makeService = (options: Omit<AnalysisServiceOptions<AnalysisParams>, "cacheDir" | "fileName">) =>
  new AnalysisService<AnalysisParams>({ ...options, cacheDir: dir, fileName: analysisCacheFile });

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "analysis-cache-"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("AnalysisService", () => {
  it("cache miss: runs the analysis, saves it under fileName(params) and returns it", async () => {
    const runner = vi.fn(async () => ({ run: 1 }));
    const service = makeService({ runner });

    const res = await service.getAnalysis(params);

    expect(res).toMatchObject({ cache: "miss", params, result: { run: 1 } });
    expect(runner).toHaveBeenCalledTimes(1);
    expect(await readdir(dir)).toEqual([CACHE_FILE]); // no temp files left behind
    const saved = await readCacheFile();
    expect(saved).toEqual({ params, generatedAt: res.generatedAt, result: { run: 1 } });
  });

  it("uses ST/HV venue codes in race analysis file names", async () => {
    const service = makeService({ runner: async () => ({}) });
    await service.getAnalysis({ ...params, venue: "Sha Tin", date: "2026-09-06", raceNumber: 1 });
    expect(await readdir(dir)).toEqual(["ST-2026-09-06-1.json"]);
  });

  it("cache hit: returns the cached copy immediately, then refreshes the file in the background", async () => {
    const gate = deferred();
    let calls = 0;
    const runner = vi.fn(async () => {
      calls++;
      if (calls === 2) await gate.promise; // hold the refresh open
      return { run: calls };
    });
    const service = makeService({ runner });
    const first = await service.getAnalysis(params);

    const hit = await service.getAnalysis(params);

    expect(hit).toMatchObject({ cache: "hit", result: { run: 1 }, generatedAt: first.generatedAt });
    expect(runner).toHaveBeenCalledTimes(2); // refresh started…
    expect((await readCacheFile()).result).toEqual({ run: 1 }); // …but not finished

    gate.resolve();
    await service.idle();
    expect((await readCacheFile()).result).toEqual({ run: 2 });
  });

  it("does not start a second refresh while one is running", async () => {
    const gate = deferred();
    let calls = 0;
    const runner = vi.fn(async () => {
      calls++;
      if (calls > 1) await gate.promise;
      return { run: calls };
    });
    const service = makeService({ runner });
    await service.getAnalysis(params);

    await Promise.all([service.getAnalysis(params), service.getAnalysis(params), service.getAnalysis(params)]);

    expect(runner).toHaveBeenCalledTimes(2); // 1 miss + 1 shared refresh
    gate.resolve();
    await service.idle();
  });

  it("concurrent misses share one run", async () => {
    const gate = deferred();
    const runner = vi.fn(async () => {
      await gate.promise;
      return { run: 1 };
    });
    const service = makeService({ runner });

    const pending = [service.getAnalysis(params), service.getAnalysis(params)];
    await vi.waitFor(() => expect(runner).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 20)); // let the second call reach the in-flight check
    gate.resolve();
    const [a, b] = await Promise.all(pending);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(a).toEqual(b);
  });

  it("keeps the old cache when a background refresh fails", async () => {
    let calls = 0;
    const runner = vi.fn(async () => {
      calls++;
      if (calls === 2) throw new Error("scrape failed");
      return { run: calls };
    });
    const onRefreshError = vi.fn();
    const service = makeService({ runner, onRefreshError });
    await service.getAnalysis(params);

    const hit = await service.getAnalysis(params);
    await service.idle();

    expect(hit.result).toEqual({ run: 1 });
    expect(onRefreshError).toHaveBeenCalledTimes(1);
    expect((await readCacheFile()).result).toEqual({ run: 1 });
  });

  it("propagates errors on a cache miss and writes nothing", async () => {
    const service = makeService({
      runner: async () => {
        throw new Error("no race card");
      },
    });
    await expect(service.getAnalysis(params)).rejects.toThrow("no race card");
    expect(await readdir(dir)).toEqual([]);
  });

  it("treats a cache made with different params as a miss and overwrites it", async () => {
    const runner = vi.fn(async (p: AnalysisParams) => ({ bankroll: p.bankroll }));
    const service = makeService({ runner });
    await service.getAnalysis(params);

    const res = await service.getAnalysis({ ...params, bankroll: 50000 });

    expect(res).toMatchObject({ cache: "miss", result: { bankroll: 50000 } });
    expect((await readCacheFile()).params.bankroll).toBe(50000);
  });

  it("matches the cache regardless of key order", async () => {
    const service = makeService({ runner: async () => ({}), onRefreshError: () => {} });
    await service.getAnalysis(params);

    const reordered = Object.fromEntries(Object.entries(params).reverse()) as unknown as AnalysisParams;
    const res = await service.getAnalysis(reordered);

    expect(res.cache).toBe("hit");
    await service.idle();
  });

  it("treats an unreadable cache file as a miss", async () => {
    await writeFile(path.join(dir, CACHE_FILE), "{not json");
    const service = makeService({ runner: async () => ({ run: 1 }) });
    const res = await service.getAnalysis(params);
    expect(res.cache).toBe("miss");
    expect((await readCacheFile()).result).toEqual({ run: 1 });
  });

  it("a shared limiter caps runs across services", async () => {
    const gate = deferred();
    let active = 0;
    let peak = 0;
    const runner = vi.fn(async () => {
      active++;
      peak = Math.max(peak, active);
      await gate.promise;
      active--;
      return {};
    });
    const limiter = createLimiter(1);
    const a = makeService({ runner, limiter });
    const b = makeService({ runner, limiter });

    const pending = [
      a.getAnalysis({ ...params, raceNumber: 1 }),
      b.getAnalysis({ ...params, raceNumber: 2 }),
      a.getAnalysis({ ...params, raceNumber: 3 }),
    ];
    await vi.waitFor(() => expect(runner).toHaveBeenCalledTimes(1));
    gate.resolve();
    await Promise.all(pending);

    expect(runner).toHaveBeenCalledTimes(3);
    expect(peak).toBe(1);
  });
});

describe("stableStringify", () => {
  it("sorts object keys at every level and keeps array order", () => {
    expect(stableStringify({ b: 1, a: { d: [2, 1], c: null } })).toBe('{"a":{"c":null,"d":[2,1]},"b":1}');
  });
});
