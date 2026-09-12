import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RaceNotFoundError } from "../../pipeline/raceAnalysis.js";
import { createApp } from "../app.js";
import { analysisCacheFile, type AnalysisParams } from "../routes/analyses.js";
import { AnalysisService } from "../services/analysisService.js";

const KEY = "k".repeat(64);
const VALID = { date: "2026-09-09", venue: "HV", race: 7 };

let dir: string;
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "analyses-route-"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

function setup(runner: (params: AnalysisParams) => Promise<unknown>) {
  const service = new AnalysisService<AnalysisParams>({
    runner,
    cacheDir: dir,
    fileName: analysisCacheFile,
    onRefreshError: () => {},
  });
  const app = createApp({ apiKeys: [KEY], version: "test", analysisService: service });
  const post = (body: object) => request(app).post("/v1/analyses").set("x-api-key", KEY).send(body);
  return { app, service, post };
}

describe("POST /v1/analyses", () => {
  it("requires an API key", async () => {
    const runner = vi.fn(async () => ({}));
    const { app } = setup(runner);
    const res = await request(app).post("/v1/analyses").send(VALID);
    expect(res.status).toBe(401);
    expect(runner).not.toHaveBeenCalled();
  });

  it("fills in defaults, normalises the venue and returns the result", async () => {
    const runner = vi.fn(async () => ({ ok: true }));
    const { post, service } = setup(runner);

    const res = await post(VALID);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ cache: "miss", result: { ok: true } });
    expect(typeof res.body.generatedAt).toBe("string");
    expect(runner).toHaveBeenCalledWith({
      date: "2026-09-09",
      venue: "Happy Valley",
      raceNumber: 7,
      formData: "venue",
      useSaved: false,
      bankroll: 10000,
      kellyFraction: 0.25,
      minEdge: 5,
      ignoreRecords: [],
    });
    await service.idle();
  });

  it("passes through every option", async () => {
    const runner = vi.fn(async () => ({}));
    const { post } = setup(runner);
    const body = {
      date: "2026-09-06",
      venue: "Sha Tin",
      race: 1,
      formData: "all",
      useSaved: true,
      bankroll: 20000,
      kellyFraction: 0.35,
      minEdge: 15,
      ignoreRecords: ["20260315", "HV"],
    };

    const res = await post(body);

    expect(res.status).toBe(200);
    expect(runner).toHaveBeenCalledWith({
      date: "2026-09-06",
      venue: "Sha Tin",
      raceNumber: 1,
      formData: "all",
      useSaved: true,
      bankroll: 20000,
      kellyFraction: 0.35,
      minEdge: 15,
      ignoreRecords: ["20260315", "HV"],
    });
  });

  it("serves a repeat request from the cache", async () => {
    const runner = vi.fn(async () => ({ ok: true }));
    const { post, service } = setup(runner);
    await post(VALID);

    const res = await post({ ...VALID, venue: "happy valley" });
    await service.idle();

    expect(res.body.cache).toBe("hit");
    expect(runner).toHaveBeenCalledTimes(2); // miss + background refresh
  });

  it("treats ignoreRecords as a set when matching the cache", async () => {
    const runner = vi.fn(async () => ({}));
    const { post, service } = setup(runner);
    await post({ ...VALID, ignoreRecords: ["HV", "20260315"] });

    const res = await post({ ...VALID, ignoreRecords: ["20260315", "HV", "HV"] });
    await service.idle();

    expect(res.body.cache).toBe("hit");
    expect(res.body.params.ignoreRecords).toEqual(["20260315", "HV"]);
  });

  it.each([
    ["missing fields", {}, ["date", "venue", "race"]],
    ["a non-ISO date", { ...VALID, date: "09/09/2026" }, ["date"]],
    ["an impossible date", { ...VALID, date: "2026-02-30" }, ["date"]],
    ["an unknown venue", { ...VALID, venue: "Kranji" }, ["venue"]],
    ["race 0", { ...VALID, race: 0 }, ["race"]],
    ["race as a string", { ...VALID, race: "7" }, ["race"]],
    ["a fractional race", { ...VALID, race: 7.5 }, ["race"]],
    ["kellyFraction above 1", { ...VALID, kellyFraction: 1.5 }, ["kellyFraction"]],
    ["an invalid formData", { ...VALID, formData: "HV" }, ["formData"]],
    ["an unsafe ignoreRecords entry", { ...VALID, ignoreRecords: ["../x"] }, ["ignoreRecords.0"]],
  ])("rejects %s with 400", async (_name, body, paths) => {
    const runner = vi.fn(async () => ({}));
    const { post } = setup(runner);

    const res = await post(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
    expect(res.body.details.map((d: { path: string }) => d.path)).toEqual(expect.arrayContaining(paths));
    expect(runner).not.toHaveBeenCalled();
  });

  it("rejects unknown fields", async () => {
    const { post } = setup(vi.fn(async () => ({})));
    const res = await post({ ...VALID, bankRoll: 5000 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_request");
  });

  it("rejects a non-JSON body", async () => {
    const { app } = setup(vi.fn(async () => ({})));
    const res = await request(app).post("/v1/analyses").set("x-api-key", KEY).type("form").send("date=2026-09-09");
    expect(res.status).toBe(400);
  });

  it("returns 404 when the race card cannot be found", async () => {
    const { post } = setup(async () => {
      throw new RaceNotFoundError("No saved race card found for Race 7");
    });

    const res = await post(VALID);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "race_not_found", message: "No saved race card found for Race 7" });
  });

  it("returns 500 without details when the analysis crashes", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const { post } = setup(async () => {
      throw new Error("chromium exploded");
    });

    const res = await post(VALID);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "internal_error" });
    consoleError.mockRestore();
  });

  it("is not mounted without an analysis service", async () => {
    const app = createApp({ apiKeys: [KEY], version: "test" });
    const res = await request(app).post("/v1/analyses").set("x-api-key", KEY).send(VALID);
    expect(res.status).toBe(404);
  });
});
