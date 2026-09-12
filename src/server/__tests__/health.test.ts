import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { loadEnv } from "../config/env.js";

const KEY_A = "a".repeat(64);
const KEY_B = "b".repeat(64);
const app = createApp({ apiKeys: [KEY_A, KEY_B], version: "test-version" });

describe("API key auth", () => {
  it("rejects a request with no key", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "unauthorized" });
    expect(res.headers["www-authenticate"]).toContain("Bearer");
  });

  it("rejects a wrong key", async () => {
    const res = await request(app).get("/health").set("x-api-key", "c".repeat(64));
    expect(res.status).toBe(401);
  });

  it("rejects a wrong-length key without throwing", async () => {
    const res = await request(app).get("/health").set("x-api-key", "short");
    expect(res.status).toBe(401);
  });

  it("rejects a key passed in the query string", async () => {
    const res = await request(app).get(`/health?api_key=${KEY_A}`);
    expect(res.status).toBe(401);
  });

  it("rejects a malformed Authorization header", async () => {
    const res = await request(app).get("/health").set("Authorization", `Basic ${KEY_A}`);
    expect(res.status).toBe(401);
  });

  it("accepts a valid x-api-key header", async () => {
    const res = await request(app).get("/health").set("x-api-key", KEY_A);
    expect(res.status).toBe(200);
  });

  it("accepts a valid Bearer token", async () => {
    const res = await request(app).get("/health").set("Authorization", `Bearer ${KEY_A}`);
    expect(res.status).toBe(200);
  });

  it("accepts any key in the list", async () => {
    const res = await request(app).get("/health").set("x-api-key", KEY_B);
    expect(res.status).toBe(200);
  });

  it("checks auth before routing, so unknown routes without a key return 401", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.status).toBe(401);
  });

  it("refuses to build an app with no keys", () => {
    expect(() => createApp({ apiKeys: [] })).toThrow();
  });
});

describe("GET /health", () => {
  it("returns status, uptime, timestamp and version", async () => {
    const res = await request(app).get("/health").set("x-api-key", KEY_A);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "ok", version: "test-version" });
    expect(typeof res.body.uptime).toBe("number");
    expect(Number.isNaN(Date.parse(res.body.timestamp))).toBe(false);
  });

  it("defaults version to package.json", async () => {
    const res = await request(createApp({ apiKeys: [KEY_A] }))
      .get("/health")
      .set("x-api-key", KEY_A);
    expect(res.body.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("does not advertise Express", async () => {
    const res = await request(app).get("/health").set("x-api-key", KEY_A);
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});

describe("error handling", () => {
  it("returns JSON 404 for unknown routes with a valid key", async () => {
    const res = await request(app).get("/does-not-exist").set("x-api-key", KEY_A);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "not_found" });
  });

  it("returns JSON 400 for malformed JSON bodies", async () => {
    const res = await request(app)
      .post("/health")
      .set("x-api-key", KEY_A)
      .set("Content-Type", "application/json")
      .send("{not json");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("request_error");
  });
});

describe("loadEnv", () => {
  it("parses a comma-separated key list and defaults", () => {
    const env = loadEnv({ API_KEYS: ` ${KEY_A} , ${KEY_B} ,` });
    expect(env.API_KEYS).toEqual([KEY_A, KEY_B]);
    expect(env.PORT).toBe(3000);
    expect(env.NODE_ENV).toBe("development");
  });

  it("coerces PORT", () => {
    expect(loadEnv({ API_KEYS: KEY_A, PORT: "8080" }).PORT).toBe(8080);
  });

  it("throws when API_KEYS is missing", () => {
    expect(() => loadEnv({})).toThrow(/API_KEYS/);
  });

  it("throws when API_KEYS is empty", () => {
    expect(() => loadEnv({ API_KEYS: " , " })).toThrow(/at least one key/);
  });

  it("throws when a key is too short", () => {
    expect(() => loadEnv({ API_KEYS: `${KEY_A},short` })).toThrow(/at least 32 characters/);
  });
});
