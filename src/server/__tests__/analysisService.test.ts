import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalysisService, type AnalysisParams } from "../services/analysisService.js";

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

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "analysis-cache-"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("AnalysisService", () => {
  it("cache miss: runs the analysis, saves <venue>-<date>-<race>.json and returns it", async () => {
    const runner = vi.fn(async () => ({ run: 1 }));
    const service = new AnalysisService({ runner, cacheDir: dir });

    const res = await service.getAnalysis(params);

    expect(res).toMatchObject({ cache: "miss", params, result: { run: 1 } });
    expect(runner).toHaveBeenCalledTimes(1);
    expect(await readdir(dir)).toEqual([CACHE_FILE]); // no temp files left behind
    const saved = await readCacheFile();
    expect(saved).toEqual({ params, generatedAt: res.generatedAt, result: { run: 1 } });
  });

  it("uses ST/HV venue codes in file names", async () => {
    const service = new AnalysisService({ runner: async () => ({}), cacheDir: dir });
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
    const service = new AnalysisService({ runner, cacheDir: dir });
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
    const service = new AnalysisService({ runner, cacheDir: dir });
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
    const service = new AnalysisService({ runner, cacheDir: dir });

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
    const service = new AnalysisService({ runner, cacheDir: dir, onRefreshError });
    await service.getAnalysis(params);

    const hit = await service.getAnalysis(params);
    await service.idle();

    expect(hit.result).toEqual({ run: 1 });
    expect(onRefreshError).toHaveBeenCalledTimes(1);
    expect((await readCacheFile()).result).toEqual({ run: 1 });
  });

  it("propagates errors on a cache miss and writes nothing", async () => {
    const service = new AnalysisService({
      runner: async () => {
        throw new Error("no race card");
      },
      cacheDir: dir,
    });
    await expect(service.getAnalysis(params)).rejects.toThrow("no race card");
    expect(await readdir(dir)).toEqual([]);
  });

  it("treats a cache made with different options as a miss and overwrites it", async () => {
    const runner = vi.fn(async (p: AnalysisParams) => ({ bankroll: p.bankroll }));
    const service = new AnalysisService({ runner, cacheDir: dir });
    await service.getAnalysis(params);

    const res = await service.getAnalysis({ ...params, bankroll: 50000 });

    expect(res).toMatchObject({ cache: "miss", result: { bankroll: 50000 } });
    expect((await readCacheFile()).params.bankroll).toBe(50000);
  });

  it("ignores ignoreRecords order when matching the cache", async () => {
    const service = new AnalysisService({ runner: async () => ({}), cacheDir: dir, onRefreshError: () => {} });
    await service.getAnalysis({ ...params, ignoreRecords: ["HV", "20260315"] });
    const res = await service.getAnalysis({ ...params, ignoreRecords: ["20260315", "HV"] });
    expect(res.cache).toBe("hit");
    await service.idle();
  });

  it("treats an unreadable cache file as a miss", async () => {
    await writeFile(path.join(dir, CACHE_FILE), "{not json");
    const service = new AnalysisService({ runner: async () => ({ run: 1 }), cacheDir: dir });
    const res = await service.getAnalysis(params);
    expect(res.cache).toBe("miss");
    expect((await readCacheFile()).result).toEqual({ run: 1 });
  });

  it("runs at most maxConcurrent analyses at once", async () => {
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
    const service = new AnalysisService({ runner, cacheDir: dir, maxConcurrent: 1 });

    const pending = [1, 2, 3].map((raceNumber) => service.getAnalysis({ ...params, raceNumber }));
    await vi.waitFor(() => expect(runner).toHaveBeenCalledTimes(1));
    gate.resolve();
    await Promise.all(pending);

    expect(runner).toHaveBeenCalledTimes(3);
    expect(peak).toBe(1);
  });
});
