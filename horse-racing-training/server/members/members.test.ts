import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import type { AddressInfo } from "net";
import type { Server } from "http";
import { mkdtempSync, readdirSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import sharp from "sharp";
import { openMembersDb, purgeStale, type MembersDB } from "./db";
import { rateLimiter, sendRules, checkRules } from "./rateLimit";
import { hashToken, parseCookies, sessionStore } from "./sessions";
import { mockOtp, otpChallenges, twilioOtp } from "./otp";
import { verifyTurnstile } from "./turnstile";
import { historyStore, parseEntry, HISTORY_CAP } from "./history";
import { userStore } from "./users";
import { loadConfig, productionProblems, assertProductionConfig, TURNSTILE_TEST_SECRET, TURNSTILE_TEST_SITE_KEY } from "./config";
import { multipartFile, processAvatar, sniffImage } from "./avatar";
import { createMembers } from "./service";
import { membersRouter } from "./routes";
import { apiErrorHandler } from "../apiErrors";
import type { HistoryEntry } from "../../shared/types";

const PHONE = "+85291234567";
const MIN = 60_000;

const entry = (id: string, ts = "2026-10-03T10:00:00.000Z"): HistoryEntry => ({
  id,
  ts,
  date: "20260927",
  venue: "ST",
  betType: "trio",
  betLabel: "Trio",
  picks: "R1 腳 1,2,3",
  result: "1-2-3-4",
  combos: 1,
  cost: 10,
  hit: true,
  payout: 120,
  net: 110,
  poolDividendText: "$120",
});

let db: MembersDB;
beforeEach(() => {
  db = openMembersDb(":memory:");
});

describe("rate limiter", () => {
  const rules = sendRules({ phoneHour: 5, phoneDay: 10, ipHour: 20 });

  it("1 send per phone per 60 s, with retryAfter", () => {
    const rl = rateLimiter(db);
    const t0 = 1_000_000_000;
    expect(rl.retryAfter("send", rules, { phone: PHONE, ip: "1.1.1.1" }, t0)).toBe(0);
    rl.record("send", { phone: PHONE, ip: "1.1.1.1" }, t0);
    expect(rl.retryAfter("send", rules, { phone: PHONE, ip: "1.1.1.1" }, t0 + 20_000)).toBe(40);
    expect(rl.retryAfter("send", rules, { phone: PHONE, ip: "1.1.1.1" }, t0 + MIN + 1)).toBe(0);
    // A different phone from the same IP is fine.
    expect(rl.retryAfter("send", rules, { phone: "+85291234568", ip: "1.1.1.1" }, t0 + 1000)).toBe(0);
  });

  it("5 per hour, 10 per day per phone", () => {
    const rl = rateLimiter(db);
    const t0 = 1_000_000_000;
    for (let i = 0; i < 5; i++) rl.record("send", { phone: PHONE, ip: `ip${i}` }, t0 + i * 2 * MIN);
    const now = t0 + 10 * MIN;
    expect(rl.retryAfter("send", rules, { phone: PHONE, ip: "x" }, now)).toBe((t0 + 60 * MIN - now) / 1000); // 6th in the hour waits for the 1st to expire
    for (let i = 5; i < 10; i++) rl.record("send", { phone: PHONE, ip: `ip${i}` }, t0 + 2 * 60 * MIN + i * 2 * MIN);
    const later = t0 + 4 * 60 * MIN;
    expect(rl.retryAfter("send", rules, { phone: PHONE, ip: "x" }, later)).toBeGreaterThan(19 * 3600); // 11th in 24 h
  });

  it("20 sends per IP per hour across phones; 30 checks per IP per hour", () => {
    const rl = rateLimiter(db);
    const t0 = 1_000_000_000;
    for (let i = 0; i < 20; i++) rl.record("send", { phone: `+8529${String(1000000 + i)}`, ip: "9.9.9.9" }, t0 + i * 1000);
    expect(rl.retryAfter("send", rules, { phone: "+85299999999", ip: "9.9.9.9" }, t0 + 30_000)).toBeGreaterThan(0);
    expect(rl.retryAfter("send", rules, { phone: "+85299999999", ip: "8.8.8.8" }, t0 + 30_000)).toBe(0);
    for (let i = 0; i < 30; i++) rl.record("check", { phone: PHONE, ip: "7.7.7.7" }, t0 + i);
    expect(rl.retryAfter("check", checkRules, { phone: PHONE, ip: "7.7.7.7" }, t0 + 100)).toBeGreaterThan(0);
  });

  it("purge drops rows older than 24 h", () => {
    const rl = rateLimiter(db);
    const now = Date.now();
    rl.record("send", { phone: PHONE, ip: "a" }, now - 25 * 60 * MIN);
    rl.record("send", { phone: PHONE, ip: "a" }, now - MIN);
    purgeStale(db, now);
    expect((db.prepare("SELECT COUNT(*) n FROM rate_events").get() as { n: number }).n).toBe(1);
  });
});

describe("sessions", () => {
  it("stores only the SHA-256 of the token", () => {
    const users = userStore(db);
    const { user } = users.login(PHONE, "en");
    const s = sessionStore(db, 30);
    const token = s.create(user.id, "UA");
    const row = db.prepare("SELECT token_hash FROM sessions").get() as { token_hash: string };
    expect(row.token_hash).toBe(hashToken(token));
    expect(row.token_hash).not.toBe(token);
    expect(Buffer.from(token, "base64url")).toHaveLength(32);
    expect(s.lookup(token)).toEqual({ userId: user.id, refreshed: false });
    expect(s.lookup("random-garbage")).toBeNull();
  });

  it("expires after the TTL and deletes the row; slides at most once a day", () => {
    const users = userStore(db);
    const { user } = users.login(PHONE, "en");
    let now = 1_700_000_000_000;
    const s = sessionStore(db, 30, () => now);
    const token = s.create(user.id);
    const DAY = 24 * 60 * MIN;
    const exp = () => (db.prepare("SELECT expires_at FROM sessions").get() as { expires_at: number }).expires_at;
    const first = exp();
    now += 12 * 60 * MIN;
    expect(s.lookup(token)?.refreshed).toBe(false);
    expect(exp()).toBe(first); // no write within 24 h
    now += 13 * 60 * MIN; // 25 h after creation
    expect(s.lookup(token)?.refreshed).toBe(true);
    expect(exp()).toBe(now + 30 * DAY);
    now += 31 * DAY;
    expect(s.lookup(token)).toBeNull();
    expect(db.prepare("SELECT COUNT(*) n FROM sessions").get()).toEqual({ n: 0 });
  });

  it("destroy logs out; account deletion cascades every session", () => {
    const users = userStore(db);
    const { user } = users.login(PHONE, "en");
    const s = sessionStore(db, 30);
    const a = s.create(user.id);
    const b = s.create(user.id);
    s.destroy(a);
    expect(s.lookup(a)).toBeNull();
    expect(s.lookup(b)).not.toBeNull();
    users.remove(user.id);
    expect(s.lookup(b)).toBeNull();
  });

  it("parses cookies", () => {
    expect(parseCookies("a=1; pt_session=abc%2B; b=2")).toEqual({ a: "1", pt_session: "abc+", b: "2" });
    expect(parseCookies(undefined)).toEqual({});
  });
});

describe("mock OTP flow", () => {
  function setup() {
    const lines: string[] = [];
    let now = 1_700_000_000_000;
    const provider = mockOtp({ log: (l) => lines.push(l), now: () => now });
    const otp = otpChallenges(db, provider, () => now);
    const lastCode = () => /code=(\d{6})/.exec(lines.at(-1) ?? "")?.[1] ?? "";
    return { otp, lines, lastCode, advance: (ms: number) => (now += ms) };
  }

  it("start → wrong → right; logs a masked phone", async () => {
    const { otp, lines, lastCode } = setup();
    await otp.start(PHONE, "zh-HK");
    expect(lines[0]).toMatch(/^\[otp:mock\] \+852\*\*\*\*4567 code=\d{6}$/);
    const code = lastCode();
    const wrong = code === "000000" ? "111111" : "000000";
    expect(await otp.check(PHONE, wrong)).toEqual({ ok: false, code: "invalid_code", attemptsLeft: 4 });
    expect(await otp.check(PHONE, code)).toEqual({ ok: true, locale: "zh-HK" });
    expect(await otp.check(PHONE, code)).toEqual({ ok: false, code: "code_expired" }); // single use
  });

  it("5 wrong attempts kill the code, even the right one fails afterwards", async () => {
    const { otp, lastCode } = setup();
    await otp.start(PHONE, "en");
    const code = lastCode();
    const wrong = code === "000000" ? "111111" : "000000";
    for (let i = 4; i >= 1; i--) expect(await otp.check(PHONE, wrong)).toEqual({ ok: false, code: "invalid_code", attemptsLeft: i });
    expect(await otp.check(PHONE, wrong)).toEqual({ ok: false, code: "too_many_attempts" });
    expect(await otp.check(PHONE, code)).toEqual({ ok: false, code: "code_expired" });
  });

  it("expires after 10 minutes; a new start replaces the old code", async () => {
    const { otp, lastCode, advance } = setup();
    await otp.start(PHONE, "en");
    const old = lastCode();
    advance(10 * MIN + 1);
    expect(await otp.check(PHONE, old)).toEqual({ ok: false, code: "code_expired" });
    await otp.start(PHONE, "en");
    const fresh = lastCode();
    if (fresh !== old) expect(await otp.check(PHONE, old)).toMatchObject({ code: "invalid_code" });
    expect(await otp.check(PHONE, fresh)).toEqual({ ok: true, locale: "en" });
  });

  it("no challenge → code_expired; malformed code counts as wrong", async () => {
    const { otp } = setup();
    expect(await otp.check(PHONE, "123456")).toEqual({ ok: false, code: "code_expired" });
    await otp.start(PHONE, "en");
    expect(await otp.check(PHONE, "12345")).toEqual({ ok: false, code: "invalid_code", attemptsLeft: 4 });
  });

  it("twilio provider calls Verify with form bodies and maps statuses", async () => {
    const calls: { url: string; body: string; auth: string }[] = [];
    const fetchImpl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), body: String(init?.body), auth: String((init?.headers as Record<string, string>).Authorization) });
      if (String(url).endsWith("/Verifications")) return new Response("{}", { status: 201 });
      return new Response(JSON.stringify({ status: String(init?.body).includes("Code=123456") ? "approved" : "pending" }), { status: 200 });
    }) as unknown as typeof fetch;
    const p = twilioOtp({ accountSid: "AC_test", authToken: "tok", serviceSid: "VA_test" }, fetchImpl);
    await p.start(PHONE, "zh-HK");
    expect(calls[0]!.url).toBe("https://verify.twilio.com/v2/Services/VA_test/Verifications");
    expect(calls[0]!.body).toContain("Channel=sms");
    expect(calls[0]!.body).toContain("Locale=zh-hk");
    expect(calls[0]!.auth).toBe("Basic " + Buffer.from("AC_test:tok").toString("base64"));
    expect(await p.check(PHONE, "123456")).toBe("approved");
    expect(await p.check(PHONE, "654321")).toBe("wrong");
  });
});

describe("turnstile", () => {
  const ok = (success: boolean) => vi.fn(async () => new Response(JSON.stringify({ success }), { status: 200 })) as unknown as typeof fetch;

  it("passes the secret, token and remote IP to siteverify", async () => {
    const f = ok(true);
    expect(await verifyTurnstile("sec", "tok", "1.2.3.4", f)).toBe(true);
    const [url, init] = (f as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0]!;
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    const body = new URLSearchParams(String(init.body));
    expect(Object.fromEntries(body)).toEqual({ secret: "sec", response: "tok", remoteip: "1.2.3.4" });
  });

  it("fails closed", async () => {
    expect(await verifyTurnstile("sec", "tok", undefined, ok(false))).toBe(false);
    expect(await verifyTurnstile("sec", "", undefined, ok(true))).toBe(false);
    expect(await verifyTurnstile("sec", undefined, undefined, ok(true))).toBe(false);
    const boom = vi.fn(async () => {
      throw new Error("network");
    }) as unknown as typeof fetch;
    expect(await verifyTurnstile("sec", "tok", undefined, boom)).toBe(false);
    const http500 = vi.fn(async () => new Response("", { status: 500 })) as unknown as typeof fetch;
    expect(await verifyTurnstile("sec", "tok", undefined, http500)).toBe(false);
  });
});

describe("history store", () => {
  it("scopes every operation to its owner", () => {
    const users = userStore(db);
    const a = users.login("+85291111111", "en").user.id;
    const b = users.login("+85292222222", "en").user.id;
    const h = historyStore(db);
    h.add(a, [entry("same-id"), entry("a2")]);
    h.add(b, [entry("same-id")]); // the same client id is fine for another member
    expect(h.list(a).map((e) => e.id).sort()).toEqual(["a2", "same-id"]);
    expect(h.list(b).map((e) => e.id)).toEqual(["same-id"]);
    h.remove(b, "a2"); // B can't delete A's entry
    expect(h.list(a)).toHaveLength(2);
    h.remove(b, "same-id");
    expect(h.list(a)).toHaveLength(2);
    h.clear(b);
    expect(h.list(a)).toHaveLength(2);
  });

  it("duplicate ids are no-ops; newest first; keeps the newest 1,000", () => {
    const users = userStore(db);
    const a = users.login(PHONE, "en").user.id;
    const h = historyStore(db);
    h.add(a, [entry("x", "2026-10-01T00:00:00Z")]);
    h.add(a, [{ ...entry("x", "2026-10-01T00:00:00Z"), cost: 999 }]);
    expect(h.list(a)).toHaveLength(1);
    expect(h.list(a)[0]!.cost).toBe(10);
    const many = Array.from({ length: HISTORY_CAP }, (_, i) => entry(`e${i}`, new Date(Date.UTC(2026, 9, 2, 0, 0, i)).toISOString()));
    for (let i = 0; i < many.length; i += 100) h.add(a, many.slice(i, i + 100));
    const list = h.list(a);
    expect(list).toHaveLength(HISTORY_CAP);
    expect(list.find((e) => e.id === "x")).toBeUndefined(); // the oldest went
    expect(list[0]!.id).toBe(`e${HISTORY_CAP - 1}`);
  });

  it("validates and cleans entries", () => {
    expect(parseEntry({ ...entry("ok"), userId: "someone-else" })).toEqual(entry("ok"));
    expect(parseEntry({ ...entry("bad"), venue: "XX" })).toBeNull();
    expect(parseEntry({ ...entry("bad"), betType: "lottery" })).toBeNull();
    expect(parseEntry({ ...entry("bad"), picks: "x".repeat(9000) })).toBeNull();
    expect(parseEntry(null)).toBeNull();
  });
});

describe("production guard", () => {
  const prod = (extra: Record<string, string>) => loadConfig({ NODE_ENV: "production", ...extra });
  const real = {
    OTP_PROVIDER: "twilio",
    TWILIO_ACCOUNT_SID: "ACxxxxxxxx",
    TWILIO_AUTH_TOKEN: "x",
    TWILIO_VERIFY_SERVICE_SID: "VAxxxxxxxx",
    TURNSTILE_SITE_KEY: "0x4AAAAAAAreal",
    TURNSTILE_SECRET_KEY: "0x4AAAAAAArealsecret",
  };

  it("dev defaults: mock OTP + Turnstile test keys, no problems", () => {
    const c = loadConfig({});
    expect(c.otpProvider).toBe("mock");
    expect(c.turnstile).toEqual({ siteKey: TURNSTILE_TEST_SITE_KEY, secretKey: TURNSTILE_TEST_SECRET });
    expect(productionProblems(c)).toEqual([]);
  });

  it("refuses mock OTP, test keys and missing Twilio vars in production", () => {
    expect(productionProblems(prod(real))).toEqual([]);
    expect(() => assertProductionConfig(prod(real))).not.toThrow();
    expect(productionProblems(prod({ ...real, OTP_PROVIDER: "mock" })).join()).toMatch(/OTP_PROVIDER/);
    expect(productionProblems(prod({ ...real, TURNSTILE_SITE_KEY: TURNSTILE_TEST_SITE_KEY })).join()).toMatch(/TURNSTILE_SITE_KEY/);
    expect(productionProblems(prod({ ...real, TURNSTILE_SECRET_KEY: "2x0000000000000000000000000000000AA" })).join()).toMatch(/TURNSTILE_SECRET_KEY/);
    expect(productionProblems(prod({ ...real, TWILIO_AUTH_TOKEN: "" })).join()).toMatch(/TWILIO_AUTH_TOKEN/);
    expect(productionProblems(prod({})).length).toBeGreaterThan(0); // nothing configured
    expect(() => assertProductionConfig(prod({ ...real, OTP_PROVIDER: "mock" }))).toThrow(/refusing to start/);
  });
});

describe("avatar", () => {
  it("sniffs magic bytes, not names", async () => {
    const png = await sharp({ create: { width: 4, height: 4, channels: 3, background: "#fff" } }).png().toBuffer();
    expect(sniffImage(png)).toBe("png");
    expect(sniffImage(Buffer.from("%PDF-1.7 ..."))).toBeNull();
    expect(sniffImage(Buffer.from("<svg xmlns='http://www.w3.org/2000/svg'/>"))).toBeNull();
    expect(sniffImage(Buffer.from("GIF89a......"))).toBeNull();
  });

  it("re-encodes to a 256×256 WebP without metadata; rejects > 4096 px", async () => {
    const jpg = await sharp({ create: { width: 600, height: 300, channels: 3, background: "#123" } })
      .jpeg()
      .withMetadata({ exif: { IFD0: { Copyright: "secret" } } })
      .toBuffer();
    const out = await processAvatar(jpg);
    const meta = await sharp(out).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(["webp", 256, 256]);
    expect(meta.exif).toBeUndefined();
    const huge = await sharp({ create: { width: 5000, height: 10, channels: 3, background: "#000" } }).png().toBuffer();
    await expect(processAvatar(huge)).rejects.toMatchObject({ code: "unsupported_type" });
  });

  it("parses one multipart file field", () => {
    const body = Buffer.concat([
      Buffer.from('--XYZ\r\nContent-Disposition: form-data; name="other"\r\n\r\nhello\r\n'),
      Buffer.from('--XYZ\r\nContent-Disposition: form-data; name="avatar"; filename="a.png"\r\nContent-Type: image/png\r\n\r\n'),
      Buffer.from([1, 2, 3, 13, 10, 4]),
      Buffer.from("\r\n--XYZ--\r\n"),
    ]);
    expect([...multipartFile(body, "multipart/form-data; boundary=XYZ", "avatar")!]).toEqual([1, 2, 3, 13, 10, 4]);
    expect(multipartFile(body, "multipart/form-data", "avatar")).toBeNull();
  });
});

// ---- HTTP: the real router on an ephemeral port ----
describe("members API", () => {
  let server: Server;
  let base: string;
  let lines: string[];
  let avatarDir: string;
  let deps: ReturnType<typeof createMembers>;

  beforeEach(async () => {
    lines = [];
    avatarDir = mkdtempSync(path.join(tmpdir(), "pt-avatars-"));
    const cfg = { ...loadConfig({}), avatarDir };
    const turnstileFetch = (async (_u: unknown, init?: RequestInit) =>
      new Response(JSON.stringify({ success: new URLSearchParams(String(init?.body)).get("response") === "good" }))) as typeof fetch;
    deps = createMembers(cfg, { db, provider: mockOtp({ log: (l) => lines.push(l) }), fetch: turnstileFetch, log: () => {} });
    // Same wiring as server/index.ts: app-level JSON parser, members router, other /api routes, JSON error handler.
    const app = express();
    app.use(express.json());
    app.use("/api", membersRouter(deps));
    app.post("/api/echo", (req, res) => res.json(req.body)); // stands in for the public non-member routes
    app.use("/api", apiErrorHandler);
    server = app.listen(0);
    await new Promise((r) => server.once("listening", r));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;
  });
  afterEach(() => {
    server.close();
    rmSync(avatarDir, { recursive: true, force: true });
  });

  const call = async (method: string, url: string, body?: unknown, cookie?: string, headers: Record<string, string> = {}) => {
    const r = await fetch(base + url, {
      method,
      headers: { ...(body !== undefined ? { "Content-Type": "application/json" } : {}), ...(cookie ? { Cookie: cookie } : {}), ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return { status: r.status, body: await r.json(), setCookie: r.headers.get("set-cookie") };
  };

  async function login(phone: string) {
    const s = await call("POST", "/auth/otp/start", { phone, turnstileToken: "good", locale: "en" });
    expect(s.status).toBe(200);
    const code = /code=(\d{6})/.exec(lines.at(-1)!)![1];
    const c = await call("POST", "/auth/otp/check", { phone, code });
    expect(c.status).toBe(200);
    const cookie = c.setCookie!.split(";")[0]!;
    return { cookie, ...c.body };
  }

  it("start: same body for new and known numbers; Turnstile before rate limits; cooldown", async () => {
    const bad = await call("POST", "/auth/otp/start", { phone: "91234567", turnstileToken: "bad" });
    expect(bad).toMatchObject({ status: 400, body: { error: { code: "turnstile_failed" } } });
    expect(db.prepare("SELECT COUNT(*) n FROM rate_events").get()).toEqual({ n: 0 });
    expect(lines).toHaveLength(0);

    expect((await call("POST", "/auth/otp/start", { phone: "2123 4567", turnstileToken: "good" })).body.error.code).toBe("invalid_phone");

    const a = await call("POST", "/auth/otp/start", { phone: "9123 4567", turnstileToken: "good" });
    expect(a.body).toEqual({ ok: true, phone: "+85291234567", resendIn: 60, expiresIn: 600 });
    const again = await call("POST", "/auth/otp/start", { phone: "91234567", turnstileToken: "good" });
    expect(again.status).toBe(429);
    expect(again.body.error.code).toBe("rate_limited");
    expect(again.body.error.retryAfter).toBeGreaterThan(0);

    await login("+85298887777"); // registered now
    deps.limiter.forgetPhone("+85298887777");
    const known = await call("POST", "/auth/otp/start", { phone: "98887777", turnstileToken: "good" });
    expect(known.status).toBe(200);
    expect(known.body).toEqual({ ok: true, phone: "+85298887777", resendIn: 60, expiresIn: 600 });
  });

  it("login sets an HttpOnly cookie; isNew only on first login; logout kills the session", async () => {
    const first = await login("+85291234567");
    expect(first.isNew).toBe(true);
    expect(first.user.displayName).toBe("Member 4567");
    const raw = (await call("GET", "/me", undefined, first.cookie)).body;
    expect(raw.user.phone).toBe("+85291234567");
    expect((await call("GET", "/me")).body).toEqual({ user: null });

    const out = await call("POST", "/auth/logout", undefined, first.cookie);
    expect(out.setCookie).toMatch(/Max-Age=0/);
    expect((await call("GET", "/history", undefined, first.cookie)).status).toBe(401);

    deps.limiter.forgetPhone("+85291234567");
    const second = await login("+85291234567");
    expect(second.isNew).toBe(false);
  });

  it("history is scoped to the session; body user ids are ignored", async () => {
    const a = await login("+85291111111");
    const b = await login("+85292222222");
    expect((await call("POST", "/history", { ...entry("a1"), userId: b.user.id }, a.cookie)).status).toBe(200);
    expect((await call("POST", "/history", { entries: [entry("b1"), entry("b2")] }, b.cookie)).body).toHaveLength(2);
    expect((await call("GET", "/history", undefined, a.cookie)).body.map((e: HistoryEntry) => e.id)).toEqual(["a1"]);
    expect((await call("DELETE", "/history/a1", undefined, b.cookie)).body).toHaveLength(2); // unknown for B → no-op
    expect((await call("GET", "/history", undefined, a.cookie)).body).toHaveLength(1);
    expect((await call("DELETE", "/history", undefined, b.cookie)).body).toEqual([]);
    expect((await call("GET", "/history", undefined, a.cookie)).body).toHaveLength(1);
    expect((await call("GET", "/history")).status).toBe(401);
    expect((await call("POST", "/history", { ...entry("x"), venue: "XX" }, a.cookie)).body.error.code).toBe("invalid_entry");
  });

  it("rejects a foreign Origin on state-changing requests", async () => {
    const a = await login("+85291111111");
    const r = await call("PATCH", "/me", { displayName: "Hacker" }, a.cookie, { Origin: "https://evil.example" });
    expect(r).toMatchObject({ status: 403, body: { error: { code: "bad_origin" } } });
    const ok = await call("PATCH", "/me", { displayName: "Tony" }, a.cookie, { Origin: "http://localhost:5173" });
    expect(ok.body.user.displayName).toBe("Tony");
  });

  it("QA-01: the Origin guard can't be skipped by path case or a trailing slash", async () => {
    const a = await login("+85291111111");
    await call("POST", "/history", entry("keep"), a.cookie);
    const evil = { Origin: "https://evil.example" };
    const attempts: [string, string, unknown?][] = [
      ["PATCH", "/Me", { displayName: "pwned" }],
      ["PATCH", "/ME/", { displayName: "pwned" }],
      ["DELETE", "/Me", { confirm: "DELETE" }],
      ["DELETE", "/ME", { confirm: "DELETE" }],
      ["DELETE", "/History"],
      ["DELETE", "/HISTORY/keep"],
      ["POST", "/History", entry("evil")],
      ["POST", "/Auth/logout"],
      ["POST", "/AUTH/OTP/START", { phone: "91234567", turnstileToken: "good" }],
      ["POST", "/Auth/Otp/Check", { phone: "91234567", code: "123456" }],
      ["DELETE", "/Me/Avatar"],
      ["POST", "/ME/AVATAR"],
    ];
    for (const [method, url, body] of attempts) {
      const r = await call(method, url, body, a.cookie, evil);
      expect([method, url, r.status, r.body.error?.code]).toEqual([method, url, 403, "bad_origin"]);
    }
    // Nothing changed: still logged in, same name, history intact, no SMS sent.
    const me = await call("GET", "/me", undefined, a.cookie);
    expect(me.body.user.displayName).toBe("Member 1111");
    expect((await call("GET", "/history", undefined, a.cookie)).body.map((e: HistoryEntry) => e.id)).toEqual(["keep"]);
    // JSON-only applies on mixed-case paths too.
    const plain = await fetch(base + "/Auth/Logout", { method: "POST", headers: { "Content-Type": "text/plain", Cookie: a.cookie }, body: "x" });
    expect(plain.status).toBe(415);
    expect((await call("GET", "/me", undefined, a.cookie)).body.user).not.toBeNull();
    // Public, non-member POST routes are not affected by the guard.
    expect((await call("POST", "/echo", { a: 1 }, undefined, evil)).body).toEqual({ a: 1 });
  });

  it("QA-04: malformed or oversized JSON gets a JSON error, not an HTML page", async () => {
    for (const url of ["/me", "/history", "/echo"]) {
      const r = await fetch(base + url, { method: url === "/me" ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: "{bad" });
      expect([url, r.status, r.headers.get("content-type")?.startsWith("application/json"), await r.json()]).toEqual([url, 400, true, { error: { code: "bad_request" } }]);
    }
    const big = await fetch(base + "/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ x: "y".repeat(200_000) }) });
    expect([big.status, await big.json()]).toEqual([413, { error: { code: "bad_request" } }]);
  });

  it("profile patch validates per field; delete wipes everything", async () => {
    const a = await login("+85291111111");
    const bad = await call("PATCH", "/me", { telegram: "ab" }, a.cookie);
    expect(bad.body.error).toEqual({ code: "validation_error", field: "telegram", detail: "invalid_telegram" });
    const ok = await call("PATCH", "/me", { telegram: "@my_name", whatsappSameAsLogin: true, email: "A@B.COM" }, a.cookie);
    expect(ok.body.user).toMatchObject({ telegram: "my_name", whatsapp: "+85291111111", email: "a@b.com" });

    // avatar upload, then account deletion removes the file
    const png = await sharp({ create: { width: 300, height: 200, channels: 3, background: "#0a0" } }).png().toBuffer();
    const form = new FormData();
    form.append("avatar", new Blob([png], { type: "image/png" }), "me.png");
    const up = await fetch(base + "/me/avatar", { method: "POST", body: form, headers: { Cookie: a.cookie } });
    const upBody = await up.json();
    expect(upBody.user.avatarUrl).toMatch(/^\/api\/avatars\/[a-f0-9]{32}\.webp$/);
    expect(readdirSync(avatarDir)).toHaveLength(1);
    const img = await fetch(base + upBody.user.avatarUrl.replace("/api", ""));
    expect(img.headers.get("content-type")).toBe("image/webp");
    expect(img.headers.get("x-content-type-options")).toBe("nosniff");
    expect((await fetch(base + "/avatars/..%2Fmembers.sqlite")).status).toBe(404);

    const fake = new FormData();
    fake.append("avatar", new Blob([Buffer.from("%PDF-1.4 not an image")], { type: "image/png" }), "x.png");
    const rej = await fetch(base + "/me/avatar", { method: "POST", body: fake, headers: { Cookie: a.cookie } });
    expect(rej.status).toBe(400);

    expect((await call("DELETE", "/me", {}, a.cookie)).body.error.code).toBe("confirm_required");
    expect((await call("DELETE", "/me", { confirm: "DELETE" }, a.cookie)).body).toEqual({ ok: true });
    expect(readdirSync(avatarDir)).toHaveLength(0);
    expect((await call("GET", "/me", undefined, a.cookie)).body).toEqual({ user: null });
    expect(db.prepare("SELECT COUNT(*) n FROM sessions").get()).toEqual({ n: 0 });
  });
});
