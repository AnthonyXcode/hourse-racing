import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../app.js";
import { batchCacheFile, type BatchAnalysisParams } from "../routes/batchAnalyses.js";
import { AnalysisService } from "../services/analysisService.js";

const KEY = "k".repeat(64);
const VALID = { date: "2026-09-09", venue: "HV" };

let dir: string;
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "batch-route-"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

function setup(runner: (params: BatchAnalysisParams) => Promise<unknown>) {
  const service = new AnalysisService<BatchAnalysisParams>({
    runner,
    cacheDir: dir,
    fileName: batchCacheFile,
    onRefreshError: () => {},
  });
  const app = createApp({ apiKeys: [KEY], version: "test", batchAnalysisService: service });
  const post = (body: object) => request(app).post("/v1/batch-analyses").set("x-api-key", KEY).send(body);
  return { app, service, post };
}

describe("POST /v1/batch-analyses", () => {
  it("requires an API key", async () => {
    const runner = vi.fn(async () => ({}));
    const { app } = setup(runner);
    const res = await request(app).post("/v1/batch-analyses").send(VALID);
    expect(res.status).toBe(401);
    expect(runner).not.toHaveBeenCalled();
  });

  it("fills in the CLI defaults", async () => {
    const runner = vi.fn(async () => ({ races: [] }));
    const { post } = setup(runner);

    const res = await post(VALID);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ cache: "miss", result: { races: [] } });
    expect(runner).toHaveBeenCalledWith({
      date: "2026-09-09",
      venue: "Happy Valley",
      firstRace: 1,
      lastRace: 11,
      formData: "venue",
      useSaved: false,
      backtestMonths: [],
    });
  });

  it("saves batch-<venue>-<date>-R<first>-<last>.json and serves repeats from it", async () => {
    const runner = vi.fn(async () => ({}));
    const { post, service } = setup(runner);
    const body = { ...VALID, firstRace: 1, lastRace: 9, formData: "all", useSaved: true, backtestMonths: ["9", "08"] };

    await post(body);
    const repeat = await post({ ...body, backtestMonths: ["08", "09"] });
    await service.idle();

    expect(await readdir(dir)).toEqual(["batch-HV-2026-09-09-R1-9.json"]);
    expect(repeat.body.cache).toBe("hit");
    expect(repeat.body.params.backtestMonths).toEqual(["08", "09"]);
  });

  it("allows a single race", async () => {
    const runner = vi.fn(async () => ({}));
    const { post } = setup(runner);
    const res = await post({ ...VALID, firstRace: 5, lastRace: 5 });
    expect(res.status).toBe(200);
  });

  it.each([
    ["missing date and venue", {}, ["date", "venue"]],
    ["lastRace before firstRace", { ...VALID, firstRace: 5, lastRace: 3 }, ["lastRace"]],
    ["race 15", { ...VALID, lastRace: 15 }, ["lastRace"]],
    ["an invalid month", { ...VALID, backtestMonths: ["0"] }, ["backtestMonths.0"]],
    ["an unknown field", { ...VALID, races: "1-9" }, [""]],
  ])("rejects %s with 400", async (_name, body, paths) => {
    const runner = vi.fn(async () => ({}));
    const { post } = setup(runner);

    const res = await post(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
    expect(res.body.details.map((d: { path: string }) => d.path)).toEqual(expect.arrayContaining(paths));
    expect(runner).not.toHaveBeenCalled();
  });
});
