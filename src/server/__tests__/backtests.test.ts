import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../app.js";
import { backtestCacheFile, type BacktestParams } from "../routes/backtests.js";
import { AnalysisService } from "../services/analysisService.js";

const KEY = "k".repeat(64);
const URL_PATH = "/v1/backtests/differentiation";

const DEFAULTS: BacktestParams = {
  sparseMax: 3,
  closeMax: 4,
  avgDiffMin: 14,
  gapMin: 0,
  oddsMax: 0,
  ratingChangeMin: -1,
  months: [],
  venue: null,
  surface: null,
  ignoreClasses: [],
  ignoreDistances: [],
  maxRating: 0,
  maxAvgDiff: 0,
  mcMin: 0,
  minTripRuns: 0,
  form: "all",
  ignoreAfter: null,
};

let dir: string;
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "backtests-route-"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

function setup(runner: (params: BacktestParams) => Promise<unknown>) {
  const service = new AnalysisService<BacktestParams>({
    runner,
    cacheDir: dir,
    fileName: backtestCacheFile,
    onRefreshError: () => {},
  });
  const app = createApp({ apiKeys: [KEY], version: "test", backtestService: service });
  const post = (body: object) => request(app).post(URL_PATH).set("x-api-key", KEY).send(body);
  return { app, service, post };
}

describe("POST /v1/backtests/differentiation", () => {
  it("requires an API key", async () => {
    const runner = vi.fn(async () => ({}));
    const { app } = setup(runner);
    const res = await request(app).post(URL_PATH).send({});
    expect(res.status).toBe(401);
    expect(runner).not.toHaveBeenCalled();
  });

  it("uses the CLI defaults for an empty body", async () => {
    const runner = vi.fn(async () => ({ report: true }));
    const { post } = setup(runner);

    const res = await post({});

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ cache: "miss", params: DEFAULTS, result: { report: true } });
    expect(runner).toHaveBeenCalledWith(DEFAULTS);
  });

  it("normalises venue, months, classes and distances", async () => {
    const runner = vi.fn(async () => ({}));
    const { post } = setup(runner);

    await post({
      venue: "Happy Valley",
      surface: "Turf",
      months: ["9", "08", "09"],
      ignoreClasses: ["griffin", " 4 Year Olds"],
      ignoreDistances: [1650, 1000, 1650],
      ratingChangeMin: null,
      oddsMax: 6.5,
      form: "HV",
      ignoreAfter: "2026-09-01",
    });

    expect(runner).toHaveBeenCalledWith({
      ...DEFAULTS,
      venue: "HV",
      surface: "Turf",
      months: ["08", "09"],
      ignoreClasses: ["4 YEAR OLDS", "GRIFFIN"],
      ignoreDistances: [1000, 1650],
      ratingChangeMin: null,
      oddsMax: 6.5,
      form: "HV",
      ignoreAfter: "2026-09-01",
    });
  });

  it("caches per option set and ignores list order", async () => {
    const runner = vi.fn(async () => ({}));
    const { post, service } = setup(runner);

    await post({ months: ["08", "09"], venue: "HV" });
    const repeat = await post({ months: ["09", "8"], venue: "hv" });
    await post({ months: ["08", "09"], venue: "ST" });
    await service.idle();

    expect(repeat.body.cache).toBe("hit");
    const files = await readdir(dir);
    expect(files).toHaveLength(2);
    for (const file of files) expect(file).toMatch(/^backtest-differentiation-[0-9a-f]{12}\.json$/);
  });

  it.each([
    ["a negative sparseMax", { sparseMax: -1 }, ["sparseMax"]],
    ["a fractional closeMax", { closeMax: 2.5 }, ["closeMax"]],
    ["month 13", { months: ["13"] }, ["months.0"]],
    ["an unknown surface", { surface: "Dirt" }, ["surface"]],
    ["an unknown venue", { venue: "Kranji" }, ["venue"]],
    ["a lower-case form", { form: "hv" }, ["form"]],
    ["an impossible ignoreAfter", { ignoreAfter: "2026-02-30" }, ["ignoreAfter"]],
    ["an unknown field", { sparse: 3 }, [""]],
  ])("rejects %s with 400", async (_name, body, paths) => {
    const runner = vi.fn(async () => ({}));
    const { post } = setup(runner);

    const res = await post(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
    expect(res.body.details.map((d: { path: string }) => d.path)).toEqual(expect.arrayContaining(paths));
    expect(runner).not.toHaveBeenCalled();
  });

  it("returns 500 without details when the backtest crashes", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const { post } = setup(async () => {
      throw new Error("ENOENT data/racecards");
    });

    const res = await post({});

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "internal_error" });
    consoleError.mockRestore();
  });
});
