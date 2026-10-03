import { describe, it, expect, afterEach } from "vitest";
import { harness, result, trio, T0, type Harness } from "../credits/testHarness";
import { adminProductionProblems, adminWarnings, loadAdminConfig } from "./config";
import express from "express";
import type { AddressInfo } from "node:net";
import { csvCell, csvRow, effectiveRole, maskEmail, maskIp, maskPhone, maskTelegram, purgeAccessLog, writeAudit } from "./core";
import { scrubText, scrubValue } from "./scrub";
import { adminPageHeaders } from "../adminPages";

const OWNER = "+85291110000";
const MIN = 60_000;
let h: Harness | null = null;
afterEach(() => {
  h?.close();
  h = null;
});
const uuid = () => crypto.randomUUID();
const w = (_cookie: string, extra: Record<string, string> = {}) => ({ "Idempotency-Key": uuid(), ...extra });

/** Owner (verified), an admin (verified) and a plain user. */
async function cast(env: Record<string, string> = {}) {
  h = await harness({ OWNER_PHONE: "9111 0000", ...env });
  const owner = await h.login(OWNER);
  const admin = await h.login("+85292220000");
  const user = await h.login("+85293330000");
  h.db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(admin.user.id);
  expect((await h.adminVerify(owner)).status).toBe(200);
  expect((await h.adminVerify(admin)).status).toBe(200);
  return { owner, admin, user };
}

describe("config and roles", () => {
  it("owner comes from OWNER_PHONE (normalised); production requires a valid one; dev warns", () => {
    expect(loadAdminConfig({ OWNER_PHONE: "9123-4567" }).ownerPhone).toBe("+85291234567");
    expect(adminProductionProblems(loadAdminConfig({ NODE_ENV: "production" }))[0]).toMatch(/OWNER_PHONE must be set/);
    expect(adminProductionProblems(loadAdminConfig({ NODE_ENV: "production", OWNER_PHONE: "21234567" }))[0]).toMatch(/not a valid/);
    expect(adminProductionProblems(loadAdminConfig({ NODE_ENV: "production", OWNER_PHONE: "garbage" }))[0]).toMatch(/not a valid/);
    expect(adminProductionProblems(loadAdminConfig({ NODE_ENV: "production", OWNER_PHONE: "+852 9123 4567" }))).toEqual([]);
    expect(adminWarnings(loadAdminConfig({}))[0]).toMatch(/nobody is owner/);
    const cfg = { ownerPhone: "+85291234567" };
    expect(effectiveRole({ phone_e164: "+85291234567", role: "user" }, cfg)).toBe("owner");
    expect(effectiveRole({ phone_e164: "+85291234568", role: "admin" }, cfg)).toBe("admin");
    expect(effectiveRole({ phone_e164: "+85291234567", role: "user" }, { ownerPhone: null })).toBe("user");
  });

  it("the owner's stored role stays 'user'; the owner can't be demoted; nobody changes their own role", async () => {
    const { owner, admin } = await cast();
    expect((await h!.call("GET", "/admin/me", undefined, owner.cookie)).body.role).toBe("owner");
    expect(h!.db.prepare("SELECT role FROM users WHERE id = ?").get(owner.user.id)).toEqual({ role: "user" });
    const r = await h!.call("POST", `/admin/users/${owner.user.id}/role`, { role: "admin", reason: "try to promote the owner" }, owner.cookie, w(owner.cookie));
    expect(r.body.error.code).toBe("cannot_change_owner");
    const viaCli = h!.adminActions({ source: "cli", operator: "ops", userId: null, role: "operator" }).setRole({ userId: owner.user.id, role: "admin", reason: "cli attempt on owner" });
    expect(viaCli).toMatchObject({ ok: false, code: "cannot_change_owner" });
    const self = h!.adminActions({ source: "panel", operator: "admin:0000", userId: admin.user.id, role: "admin" }).setRole({ userId: admin.user.id, role: "user", reason: "demote myself please" });
    expect(self).toMatchObject({ ok: false, code: "cannot_change_self" });
    // /api/me: role only for staff.
    expect((await h!.call("GET", "/me", undefined, owner.cookie)).body.user.role).toBeUndefined(); // harness hooks don't add it
  });
});

describe("route walker (fail closed)", () => {
  it("every /api/admin route: guest 401, user 403, admin 403 owner_only on owner routes", async () => {
    const { admin, user } = await cast();
    const routes = h!.admin.routes;
    expect(routes.length).toBeGreaterThan(25);
    for (const rt of routes) {
      const path = rt.path.replace(":id", "x").replace(":dataset", "users");
      const body = rt.method === "post" ? { reason: "walker check" } : undefined;
      const g = await h!.call(rt.method.toUpperCase(), `/admin${path}`, body, undefined, { "Idempotency-Key": uuid() });
      expect([rt.method, rt.path, g.status, g.body.error?.code]).toEqual([rt.method, rt.path, 401, "unauthorized"]);
      const u = await h!.call(rt.method.toUpperCase(), `/admin${path}`, body, user.cookie, { "Idempotency-Key": uuid() });
      expect([rt.method, rt.path, u.status, u.body.error?.code]).toEqual([rt.method, rt.path, 403, "forbidden"]);
      if (rt.min === "owner") {
        const a = await h!.call(rt.method.toUpperCase(), `/admin${path}`, body, admin.cookie, { "Idempotency-Key": uuid() });
        expect([rt.method, rt.path, a.status, a.body.error?.code]).toEqual([rt.method, rt.path, 403, "owner_only"]);
      }
    }
    // Every write is owner-only; every route declared a role.
    expect(routes.filter((r) => r.write).every((r) => r.min === "owner")).toBe(true);
    expect(routes.every((r) => r.min === "admin" || r.min === "owner")).toBe(true);
  });

  it("an admin session needs its own OTP; it expires after 1 h idle and 12 h total", async () => {
    h = await harness({ OWNER_PHONE: "9111 0000" });
    const owner = await h.login(OWNER);
    expect((await h.call("GET", "/admin/dashboard", undefined, owner.cookie)).body.error.code).toBe("admin_reauth_required");
    expect((await h.call("GET", "/admin/me", undefined, owner.cookie)).body.adminSessionExpiresAt).toBeNull();
    await h.adminVerify(owner);
    expect((await h.call("GET", "/admin/dashboard", undefined, owner.cookie)).status).toBe(200);
    h.setNow(T0 + 61 * MIN); // idle > 1 h
    expect((await h.call("GET", "/admin/dashboard", undefined, owner.cookie)).body.error.code).toBe("admin_reauth_required");
    await h.adminVerify(owner);
    for (let i = 1; i <= 14; i++) {
      h.setNow(T0 + 61 * MIN + i * 55 * MIN); // active every 55 min (13 × 55 = 11.9 h, 14 × 55 = 12.8 h)…
      const r = await h.call("GET", "/admin/dashboard", undefined, owner.cookie);
      if (i < 14) expect(r.status).toBe(200);
      else expect(r.body.error.code).toBe("admin_reauth_required"); // …but 12 h after verification it ends anyway
    }
  });

  it("a login from the last 5 minutes counts as the admin confirmation (no second SMS); older ones don't", async () => {
    h = await harness({ OWNER_PHONE: "9111 0000" });
    const owner = await h.login(OWNER);
    const created = (h.db.prepare("SELECT created_at FROM sessions").get() as { created_at: number }).created_at;
    h.setNow(created + 2 * MIN);
    expect((await h.call("GET", "/admin/dashboard", undefined, owner.cookie)).status).toBe(200);
    const again = await h.login(OWNER); // new session
    h.setNow(Date.now() + 10 * MIN);
    expect((await h.call("GET", "/admin/dashboard", undefined, again.cookie)).body.error.code).toBe("admin_reauth_required");
  });

  it("a revoked admin loses access on the very next request", async () => {
    const { owner, admin } = await cast();
    expect((await h!.call("GET", "/admin/dashboard", undefined, admin.cookie)).status).toBe(200);
    const r = await h!.call("POST", `/admin/users/${admin.user.id}/role`, { role: "user", reason: "no longer staff", expected: { role: "admin" } }, owner.cookie, w(owner.cookie));
    expect(r.status).toBe(200);
    expect((await h!.call("GET", "/admin/dashboard", undefined, admin.cookie)).body.error.code).toBe("forbidden");
    // …and a newly promoted one gets in without logging in again (after the panel's own OTP).
    const p = await h!.call("POST", `/admin/users/${admin.user.id}/role`, { role: "admin", reason: "back on staff", expected: { role: "user" } }, owner.cookie, w(owner.cookie));
    expect(p.status).toBe(200);
    expect((await h!.call("GET", "/admin/me", undefined, admin.cookie)).body.role).toBe("admin");
  });
});

describe("masking and access log", () => {
  it("admin JSON never contains a full phone or email; the owner reveals one user (logged)", async () => {
    const { owner, admin, user } = await cast();
    await h!.call("PATCH", "/me", { email: "secret.person@example.com", telegram: "@secretname", description: "my private note" }, user.cookie);
    for (const url of ["/admin/users", `/admin/users/${user.user.id}`, "/admin/audit", "/admin/dashboard", "/admin/bets", "/admin/ledger"]) {
      for (const who of [admin, owner]) {
        const raw = JSON.stringify((await h!.call("GET", url, undefined, who.cookie)).body);
        expect(raw, url).not.toContain("93330000");
        expect(raw, url).not.toContain("secret.person@example.com");
        expect(raw, url).not.toContain("secretname");
      }
    }
    const det = (await h!.call("GET", `/admin/users/${user.user.id}`, undefined, admin.cookie)).body;
    expect(det).toMatchObject({ phone: "+852 •••• 0000", email: "s•••@example.com", telegram: "@se•••" });
    expect(det.description).toBeUndefined(); // free text: owner only
    expect((await h!.call("GET", `/admin/users/${user.user.id}`, undefined, owner.cookie)).body.description).toBe("my private note");
    expect((await h!.call("GET", `/admin/users/${user.user.id}/contact`, undefined, admin.cookie)).body.error.code).toBe("owner_only");
    const rev = (await h!.call("GET", `/admin/users/${user.user.id}/contact`, undefined, owner.cookie)).body;
    // The reveal carries a wall-clock deadline (the UI re-masks against it even in a throttled background tab).
    expect(rev).toEqual({ phone: "+85293330000", email: "secret.person@example.com", whatsapp: null, telegram: "@secretname", expiresInSec: 60, expiresAt: new Date(h!.c.clock() + 60_000).toISOString() });
    const log = h!.db.prepare("SELECT kind, target_id, actor_role FROM admin_access_log ORDER BY id").all() as { kind: string; target_id: string; actor_role: string }[];
    expect(log.map((l) => l.kind)).toEqual(expect.arrayContaining(["user_detail", "contact_reveal"]));
    expect(log.find((l) => l.kind === "contact_reveal")).toMatchObject({ target_id: user.user.id, actor_role: "owner" });
    // A tab view and an export are logged too; the log itself holds no contact values.
    await h!.call("GET", `/admin/users/${user.user.id}/ledger`, undefined, admin.cookie);
    await (await h!.raw("GET", "/admin/export/users", owner.cookie)).text();
    const kinds = (h!.db.prepare("SELECT kind FROM admin_access_log").all() as { kind: string }[]).map((x) => x.kind);
    expect(kinds).toEqual(expect.arrayContaining(["user_tab", "export"]));
    expect(JSON.stringify(h!.db.prepare("SELECT * FROM admin_access_log").all())).not.toContain("93330000");
  });

  it("full-number search is owner only (admins fall back to last 4); masks", () => {
    expect(maskPhone("+85291234567")).toBe("+852 •••• 4567");
    expect(maskPhone("+447911123456")).toBe("+44 •••• 3456");
    expect(maskEmail("tony@example.com")).toBe("t•••@example.com");
    expect(maskTelegram("tonychan")).toBe("@to•••");
    expect(maskIp("203.0.113.42")).toBe("203.0.113.x");
  });

  it("search: last 4 for everyone; full number for the owner (logged)", async () => {
    const { owner, admin, user } = await cast();
    const q = async (who: { cookie: string }, s: string) => (await h!.call("GET", `/admin/users?q=${encodeURIComponent(s)}`, undefined, who.cookie)).body.items.map((i: { id: string }) => i.id);
    expect(await q(admin, "0000")).toEqual(expect.arrayContaining([user.user.id, owner.user.id]));
    expect(await q(owner, "9333 0000")).toEqual([user.user.id]);
    expect((h!.db.prepare("SELECT COUNT(*) n FROM admin_access_log WHERE kind = 'search_full_phone'").get() as { n: number }).n).toBe(1);
    expect((await h!.call("GET", "/admin/users?sort=phone:desc", undefined, owner.cookie)).body.error.code).toBe("invalid_filter");
    expect((await h!.call("GET", "/admin/users?limit=1000", undefined, owner.cookie)).body.limit).toBe(100);
  });
});

describe("owner writes", () => {
  it("adjust: audit row in the same transaction; can't go below 0 (refused + audited); max 100,000", async () => {
    const { owner, user } = await cast();
    const ok = await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 500, reason: "goodwill payout delay", expected: { balance: 1000 } }, owner.cookie, w(owner.cookie));
    expect(ok.body).toMatchObject({ balance: 1500 });
    const a = h!.db.prepare("SELECT * FROM admin_audit WHERE id = ?").get(ok.body.auditId) as Record<string, unknown>;
    expect(a).toMatchObject({ source: "panel", actor_role: "owner", action: "credit_adjust", target_id: user.user.id, outcome: "ok", operator: "owner:0000" });
    expect(JSON.parse(String(a.after))).toMatchObject({ balance: 1500 });
    const low = await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: -1501, reason: "too much taken off", expected: { balance: 1500 } }, owner.cookie, w(owner.cookie));
    expect(low.body.error).toMatchObject({ code: "insufficient_credits" });
    expect(h!.db.prepare("SELECT outcome FROM admin_audit WHERE id = ?").get(low.body.error.auditId)).toEqual({ outcome: "refused" });
    expect((await h!.call("GET", "/credits", undefined, user.cookie)).body.balance).toBe(1500);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 100_001, reason: "too big an adjustment" }, owner.cookie, w(owner.cookie))).body.error.code).toBe("invalid_amount");
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 1.5, reason: "fractional amount" }, owner.cookie, w(owner.cookie))).body.error.code).toBe("invalid_amount");
    // Stale state: the balance changed since the dialog opened.
    const stale = await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 10, reason: "stale check", expected: { balance: 1000 } }, owner.cookie, w(owner.cookie));
    expect(stale.body.error).toMatchObject({ code: "stale_state", current: { balance: 1500 } });
    // Self-adjust is allowed and tagged.
    const self = await h!.call("POST", `/admin/users/${owner.user.id}/credits`, { amount: 5, reason: "testing self" }, owner.cookie, w(owner.cookie));
    expect(h!.db.prepare("SELECT self FROM admin_audit WHERE id = ?").get(self.body.auditId)).toEqual({ self: 1 });
  });

  it("idempotency: same key + body → one change, same response; same key + different body → 409", async () => {
    const { owner, user } = await cast();
    const key = { "Idempotency-Key": uuid() };
    const body = { amount: 100, reason: "double click test" };
    const [a, b] = await Promise.all([1, 2].map(() => h!.call("POST", `/admin/users/${user.user.id}/credits`, body, owner.cookie, key)));
    expect(a).toEqual(b);
    expect((await h!.call("GET", "/credits", undefined, user.cookie)).body.balance).toBe(1100);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { ...body, amount: 200 }, owner.cookie, key)).body.error.code).toBe("idempotency_conflict");
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, body, owner.cookie)).body.error.code).toBe("idempotency_key_required");
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 100 }, owner.cookie, w(owner.cookie))).body.error.code).toBe("reason_required");
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, body, owner.cookie, w(owner.cookie, { Origin: "https://evil.example" }))).body.error.code).toBe("bad_origin");
  });

  it("step-up: role change, adjust ≥ 1,000 and void meeting need an OTP from the last 5 minutes", async () => {
    const { owner, user } = await cast();
    h!.setNow(T0 + 6 * MIN); // the entry OTP no longer counts as step-up (still a valid admin session)
    const big = { amount: 1000, reason: "large goodwill" };
    const r1 = await h!.call("POST", `/admin/users/${user.user.id}/credits`, big, owner.cookie, w(owner.cookie));
    expect(r1.body.error).toMatchObject({ code: "step_up_required", action: "credit_adjust" });
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 999, reason: "small enough" }, owner.cookie, w(owner.cookie))).status).toBe(200);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/role`, { role: "admin", reason: "promote to staff" }, owner.cookie, w(owner.cookie))).body.error.code).toBe("step_up_required");
    expect((await h!.call("POST", "/admin/races/void", { date: "2026-10-05", venue: "ST", reason: "typhoon signal 8" }, owner.cookie, w(owner.cookie))).body.error.code).toBe("step_up_required");
    expect((await h!.call("GET", "/admin/export/users?full=1", undefined, owner.cookie)).body.error.code).toBe("step_up_required");
    await h!.adminVerify(owner); // step-up
    const key = w(owner.cookie);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, big, owner.cookie, key)).status).toBe(200);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, big, owner.cookie, key)).status).toBe(200); // replay, no 2nd change
    expect((await h!.call("GET", "/credits", undefined, user.cookie)).body.balance).toBe(1000 + 999 + 1000);
  });

  it("void: preview writes nothing; resulted races are skipped unless includeResulted (step-up)", async () => {
    const { owner, user } = await cast();
    await h!.call("POST", "/me/declarations", { kind: "adult_18", confirm: true }, user.cookie);
    await h!.call("POST", "/live-bets", { items: [trio(2, [1, 2, 3], 10), trio(3, [1, 2, 3], 10)] }, user.cookie, { "Idempotency-Key": uuid() });
    h!.results.push(result(1, [[1, 1], [2, 2], [3, 3]], { trioDividend: 100 }));
    const pv = await h!.call("POST", "/admin/races/void/preview", { date: "2026-10-05", venue: "ST" }, owner.cookie);
    expect(pv.body).toEqual({ races: [2, 3], skipped: [1], bets: 2, users: 1, refundTotal: 20 });
    expect(h!.db.prepare("SELECT COUNT(*) n FROM admin_audit WHERE action LIKE 'void%'").get()).toEqual({ n: 0 });
    const v = await h!.call("POST", "/admin/races/void", { date: "2026-10-05", venue: "ST", reason: "typhoon signal 8" }, owner.cookie, w(owner.cookie));
    expect(v.body).toMatchObject({ voided: [2, 3], skipped: [1], settled: 2 });
    expect((await h!.call("GET", "/credits", undefined, user.cookie)).body.balance).toBe(1000);
    h!.setNow(T0 + 6 * MIN);
    const inc = await h!.call("POST", "/admin/races/void", { date: "2026-10-05", venue: "ST", raceNo: 1, includeResulted: true, reason: "result amended" }, owner.cookie, w(owner.cookie));
    expect(inc.body.error).toMatchObject({ code: "step_up_required", action: "void_include_resulted" });
  });

  it("resolve: failures are audited too; flag is transactional with its audit row", async () => {
    const { owner, user } = await cast();
    const r = await h!.call("POST", "/admin/live-bets/nope/resolve", { action: "settle", reason: "try resolve" }, owner.cookie, w(owner.cookie));
    expect(r.body.error.code).toBe("bet_not_pending");
    expect(h!.db.prepare("SELECT action, outcome FROM admin_audit WHERE id = ?").get(r.body.error.auditId)).toEqual({ action: "bet_resolve", outcome: "refused" });
    const f = await h!.call("POST", `/admin/users/${user.user.id}/flag`, { flagged: true, reason: "card dispute", expected: { flagged: false } }, owner.cookie, w(owner.cookie));
    expect(f.status).toBe(200);
    expect((await h!.call("GET", "/credits", undefined, user.cookie)).body.flagged).toBe(true);
    // Audit insert failing → the flag change rolls back too.
    h!.db.exec("CREATE TRIGGER fail_audit BEFORE INSERT ON admin_audit BEGIN SELECT RAISE(ABORT, 'audit down'); END;");
    expect(() => h!.adminActions({ source: "cli", operator: "ops", userId: null, role: "operator" }).setFlag({ userId: user.user.id, flagged: false, reason: "should roll back" })).toThrow(/audit down/);
    expect((await h!.call("GET", "/credits", undefined, user.cookie)).body.flagged).toBe(true);
  });
});

describe("audit + access log storage", () => {
  it("audit rows can't be updated or deleted; access-log rows only after 12 months", async () => {
    h = await harness();
    const id = writeAudit(h.db, { source: "system", operator: "system", actorUserId: null, actorRole: "system", action: "test", targetType: "system", targetId: null, reason: "test row" });
    expect(() => h!.db.prepare("UPDATE admin_audit SET reason = 'x' WHERE id = ?").run(id)).toThrow(/append-only/);
    expect(() => h!.db.prepare("DELETE FROM admin_audit WHERE id = ?").run(id)).toThrow(/append-only/);
    const ins = h.db.prepare("INSERT INTO admin_access_log (actor_user_id, actor_role, kind, created_at) VALUES ('a', 'owner', 'export', ?)");
    ins.run(new Date(Date.now() - 400 * 86_400_000).toISOString());
    ins.run(new Date().toISOString());
    expect(() => h!.db.prepare("DELETE FROM admin_access_log").run()).toThrow(/12 months/);
    expect(() => h!.db.prepare("UPDATE admin_access_log SET detail = 'x'").run()).toThrow(/append-only/);
    expect(purgeAccessLog(h.db, 365)).toBe(1);
    expect(h.db.prepare("SELECT COUNT(*) n FROM admin_access_log").get()).toEqual({ n: 1 });
  });

  it("CSV cells starting with = + - @ (or tab/CR) are neutralised; numbers stay numbers", async () => {
    expect(csvCell("=HYPERLINK(\"http://x\")")).toBe(`"'=HYPERLINK(""http://x"")"`);
    expect(csvCell("+1")).toBe("\"'+1\"");
    expect(csvCell("+1+1")).toBe("\"'+1+1\"");
    expect(csvCell("+852 9123 4567")).toBe("+852 9123 4567"); // phones are data: no stray apostrophe
    expect(csvCell("+852 •••• 4567")).toBe("+852 •••• 4567");
    expect(csvCell("+85291234567")).toBe("+85291234567");
    expect(csvCell("+852 9123 4567+A1")).toBe("\"'+852 9123 4567+A1\"");
    expect(csvCell("@SUM(A1)")).toBe("\"'@SUM(A1)\"");
    expect(csvCell("-2+3")).toBe("\"'-2+3\"");
    expect(csvCell("\tx")).toBe("\"'\tx\"");
    expect(csvCell(-200)).toBe("-200");
    expect(csvCell("plain, text")).toBe('"plain, text"');
    expect(csvRow(["a", null, 3])).toBe("a,,3\r\n");
  });

  it("export is owner only, masked by default, and the file escapes formulas", async () => {
    const { owner, user } = await cast();
    await h!.call("PATCH", "/me", { displayName: "=HYPERLINK(1)" }, user.cookie);
    const res = await h!.raw("GET", "/admin/export/users", owner.cookie);
    expect(res.headers.get("content-type")).toMatch(/text\/csv/);
    const text = await res.text();
    expect(text).toContain("'=HYPERLINK(1)");
    expect(text).not.toContain("+85293330000");
    expect(text).toContain("+852 •••• 0000");
  });
});

describe("reconcile and headers", () => {
  it("admins can run reconcile (rate-limited); responses are no-store + noindex", async () => {
    const { admin } = await cast();
    const r = await h!.raw("POST", "/admin/reconcile", admin.cookie, {});
    expect(r.headers.get("x-robots-tag")).toMatch(/noindex/);
    expect(r.headers.get("cache-control")).toBe("no-store");
    expect(await r.json()).toMatchObject({ ok: true, issues: [] });
    expect((await h!.call("POST", "/admin/reconcile", {}, admin.cookie)).body.error.code).toBe("rate_limited");
    expect((await h!.call("GET", "/admin/system", undefined, admin.cookie)).body).toMatchObject({ stripeMode: "none", lastReconcile: { value: { ok: true } } });
  });
});

describe("QA round (docs/admin/QA-REPORT.md AD-01…AD-08)", () => {
  it("AD-01: the scrubber masks phones (E.164, HK 8-digit ± 852, spaced/dashed), emails, IPs and contact-named fields", () => {
    for (const p of ["+85291234567", "+852 9123 4567", "852-9123-4567", "91234567", "9123 4567", "9123-4567", "+44 7700 900123"]) {
      const out = scrubText(`call ${p} now`);
      expect(out, p).not.toMatch(/\d{5,}|\d{4}[\s-]\d{4}/);
      expect(out, p).toMatch(/•••• \d{4} now$/);
    }
    expect(scrubText("mail a.b@example.com")).toBe("mail a•••@example.com");
    expect(scrubText("from 203.0.113.42")).toBe("from 203.0.113.x");
    expect(scrubText("bet #12345678-ab, 1000 credits, R7, 2026-10-05")).toBe("bet #12345678-ab, 1000 credits, R7, 2026-10-05"); // ids/dates untouched
    expect(scrubValue({ opt: { phone: "91110005", amount: "500" }, whatsapp: "+85291110006", telegram: "@someone", email: "x.y@example.com", n: 3 })).toEqual({
      opt: { phone: "+852 •••• 0005", amount: "500" },
      whatsapp: "+852 •••• 0006",
      telegram: maskTelegram("someone"),
      email: "x•••@example.com",
      n: 3,
    });
  });

  it("AD-01: a legacy audit row with a raw phone/email/IP reaches neither admin nor owner (JSON or CSV); new rows are stored scrubbed", async () => {
    const { owner, admin } = await cast();
    h!.db
      .prepare("INSERT INTO admin_audit (operator, command, args, before, after, reason, created_at, ip) VALUES (?, 'adjust', ?, NULL, ?, ?, '2026-10-01T00:00:00.000Z', '203.0.113.42')")
      .run(
        "qa 9111 0005",
        JSON.stringify({ pos: [], opt: { phone: "91110005", amount: "500", user: "+852 9111-0006" } }),
        JSON.stringify({ email: "leak.person@example.com", note: "whatsapp +85291110008" }),
        "asked by 9111-0007 / leak.person@example.com from 203.0.113.42"
      );
    const leaks = ["91110005", "9111 0005", "91110006", "9111-0006", "9111-0007", "91110008", "leak.person@example.com", "203.0.113.42"];
    for (const who of [admin, owner]) {
      const json = JSON.stringify((await h!.call("GET", "/admin/audit", undefined, who.cookie)).body);
      for (const l of leaks) expect(json, l).not.toContain(l);
      expect(json).toContain("•••• 0005");
    }
    const csv = await (await h!.raw("GET", "/admin/export/audit", owner.cookie)).text();
    expect(csv).toContain("adjust");
    for (const l of leaks) expect(csv, l).not.toContain(l);
    // New rows (panel or CLI) never store contact data in the first place.
    writeAudit(h!.db, { source: "cli", operator: "ops", actorUserId: null, actorRole: "operator", action: "credit_adjust", targetType: "user", targetId: "u1", args: { phone: "+85291110009" }, reason: "per call from 9111 0009" });
    const stored = JSON.stringify(h!.db.prepare("SELECT args, reason FROM admin_audit ORDER BY id DESC LIMIT 1").get());
    expect(stored).not.toContain("91110009");
    expect(stored).not.toContain("9111 0009");
    // Error bodies are scrubbed too.
    const e = await h!.call("GET", "/admin/users/91110005", undefined, admin.cookie);
    expect(JSON.stringify(e.body)).not.toContain("91110005");
  });

  it("login shortcut: only counts if the member was already staff when that session was created", async () => {
    h = await harness({ OWNER_PHONE: "9111 0000" });
    const m = await h.login("+85292220001");
    const created = (h.db.prepare("SELECT created_at FROM sessions WHERE user_id = ?").get(m.user.id) as { created_at: number }).created_at;
    // Promoted after logging in → no shortcut: the panel asks for its own SMS code.
    expect(h.adminActions({ source: "cli", operator: "ops", userId: null, role: "operator" }).setRole({ userId: m.user.id, role: "admin", reason: "joining the staff" }).ok).toBe(true);
    h.db.prepare("UPDATE users SET role_updated_at = ? WHERE id = ?").run(new Date(created + 1000).toISOString(), m.user.id);
    h.setNow(created + 2 * MIN);
    expect((await h.call("GET", "/admin/dashboard", undefined, m.cookie)).body.error.code).toBe("admin_reauth_required");
    // A login after the promotion does count (no second SMS right after the login one).
    const again = await h.login("+85292220001");
    const c2 = (h.db.prepare("SELECT created_at FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1").get(m.user.id) as { created_at: number }).created_at;
    h.db.prepare("UPDATE users SET role_updated_at = ? WHERE id = ?").run(new Date(c2 - 1000).toISOString(), m.user.id);
    h.setNow(c2 + 2 * MIN);
    expect((await h.call("GET", "/admin/dashboard", undefined, again.cookie)).status).toBe(200);
  });

  it("AD-02: every /admin page path (deep links + SPA fallback) gets noindex and anti-framing headers", async () => {
    const app = express();
    app.use(adminPageHeaders);
    app.use(express.static("/nonexistent-dir"));
    app.get("*", (_req, res) => res.type("html").send("<!doctype html><title>spa</title>"));
    const server = app.listen(0);
    await new Promise((r) => server.once("listening", r));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    try {
      for (const p of ["/admin", "/admin/", "/admin/users", "/admin/users/123", "/admin/held", "/admin/system?x=1", "/ADMIN/Users/123"]) {
        const r = await fetch(base + p);
        expect([p, r.status, r.headers.get("x-frame-options"), r.headers.get("content-security-policy"), r.headers.get("x-robots-tag")]).toEqual([p, 200, "DENY", "frame-ancestors 'none'", "noindex, nofollow"]);
      }
      for (const p of ["/", "/administrator", "/races/admin"]) expect((await fetch(base + p)).headers.get("x-frame-options"), p).toBeNull();
    } finally {
      server.close();
    }
  });

  it("AD-03: background polls (X-Admin-Background: 1) don't extend the idle timer; user requests do", async () => {
    const { owner } = await cast();
    const bg = { "X-Admin-Background": "1" };
    const seen = () => (h!.db.prepare("SELECT admin_seen_at FROM sessions WHERE user_id = ?").get(owner.user.id) as { admin_seen_at: number }).admin_seen_at;
    const before = seen();
    for (let m = 10; m <= 59; m += 7) {
      h!.setNow(T0 + m * MIN);
      const r = await h!.call("GET", "/admin/dashboard", undefined, owner.cookie, bg);
      expect([m, r.status, r.body.error?.code]).toEqual([m, 200, undefined]);
    }
    expect(seen()).toBe(before);
    h!.setNow(T0 + 61 * MIN);
    expect((await h!.call("GET", "/admin/dashboard", undefined, owner.cookie, bg)).body.error.code).toBe("admin_reauth_required");
    // Same pattern without the header keeps the session alive.
    await h!.adminVerify(owner);
    const t1 = seen();
    h!.setNow(T0 + 61 * MIN + 30 * MIN);
    expect((await h!.call("GET", "/admin/dashboard", undefined, owner.cookie)).status).toBe(200);
    expect(seen()).toBeGreaterThan(t1);
    h!.setNow(T0 + 61 * MIN + 80 * MIN);
    expect((await h!.call("GET", "/admin/dashboard", undefined, owner.cookie)).status).toBe(200);
  });

  it("AD-08: unknown paths look like real ones until staff; bad race number is a 404 refusal; reason 10–200; refusals audited", async () => {
    const { owner, admin, user } = await cast();
    expect((await h!.call("GET", "/admin/no-such-thing")).status).toBe(401);
    expect((await h!.call("GET", "/admin/no-such-thing", undefined, user.cookie)).status).toBe(403);
    expect((await h!.call("GET", "/admin/no-such-thing", undefined, admin.cookie)).body.error.code).toBe("not_found");

    const refusedCount = () => (h!.db.prepare("SELECT COUNT(*) n FROM admin_audit WHERE outcome = 'refused'").get() as { n: number }).n;
    expect((await h!.call("POST", "/admin/races/void/preview", { date: "2026-10-05", venue: "ST", raceNo: 99 }, owner.cookie)).body.error.code).toBe("not_found");
    const v = await h!.call("POST", "/admin/races/void", { date: "2026-10-05", venue: "ST", raceNo: 99, reason: "wrong race number" }, owner.cookie, w(owner.cookie));
    expect([v.status, v.body.error.code]).toEqual([404, "not_found"]);
    expect(h!.db.prepare("SELECT action, outcome FROM admin_audit WHERE action LIKE 'void%' ORDER BY id DESC").all()).toEqual([{ action: "void_race", outcome: "refused" }]);

    const adj = (reason: string) => h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 5, reason }, owner.cookie, w(owner.cookie));
    expect((await adj("123456789")).body.error.code).toBe("reason_required");
    expect((await adj("x".repeat(201))).body.error.code).toBe("reason_required");
    expect((await adj("1234567890")).status).toBe(200);
    expect((await adj("y".repeat(200))).status).toBe(200);

    const r0 = refusedCount();
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 1.5, reason: "fractional amount" }, owner.cookie, w(owner.cookie))).body.error.code).toBe("invalid_amount");
    h!.setNow(T0 + 6 * MIN);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/role`, { role: "admin", reason: "promote to staff" }, owner.cookie, w(owner.cookie))).body.error.code).toBe("step_up_required");
    expect(refusedCount()).toBe(r0 + 2);
    const last = h!.db.prepare("SELECT action, outcome, after, target_id FROM admin_audit ORDER BY id DESC LIMIT 2").all() as { action: string; outcome: string; after: string; target_id: string }[];
    expect(last.map((r) => [r.action, r.outcome, JSON.parse(r.after).code, r.target_id])).toEqual([
      ["role_change", "refused", "step_up_required", user.user.id],
      ["credit_adjust", "refused", "invalid_amount", user.user.id],
    ]);
  });
});

describe("QA retest (AD-09…AD-11)", () => {
  it("AD-10: the scrubber catches every format QA reported (and leaves ids, dates and picks alone)", () => {
    const masked: [string, string][] = [
      ["call phone_91234567 now", "call phone_•••• 4567 now"],
      ["51234567x", "•••• 4567x"],
      ["9123.4567", "•••• 4567"],
      ["9 1 2 3 4 5 6 7", "•••• 4567"],
      ["9  1  2  3  4567", "•••• 4567"],
      ["６１２３４５６７", "•••• 4567"],
      ["９１２３ ４５６７", "•••• 4567"],
      ["operator 91234567", "operator •••• 4567"],
      ["+85291234567 mid-sentence", "•••• 4567 mid-sentence"],
      ["852-9123-4567", "•••• 4567"],
      ["tel:91234567", "tel:•••• 4567"],
      ["+44 7700 900123", "•••• 0123"],
      ["0085291234567", "•••• 4567"],
      ["9123 4567 1000 credits", "•••• 4567 1000 credits"],
      ["2001:db8:85a3::8a2e:370:7334", "2001:db8:…"],
      ["from ::1 and 2001:db8::1", "from ::… and 2001:db8:…"],
      ["203.0.113.42", "203.0.113.x"],
      ["x@y.com", "x•••@y.com"],
    ];
    for (const [i, o] of masked) expect(scrubText(i), i).toBe(o);
    expect(scrubText("(852) 9123 4567")).not.toMatch(/9123/);
    for (const keep of [
      "2026-10-05T04:01:00.000Z 20261005 12:34:56",
      "user 3f2a9b1c-4123-4567-9123-456789012345",
      "/avatars/a91234567b0000000000000000000000.webp",
      "cs_test_a1B91234567xyzABC pi_3N91234567abcdEF",
      "R1 膽 4  腳 5,6,7,8  |  R2 腳 9,10",
      "Chrome/120.0.6099.109 Safari/537.36",
      "1000 credits, R7, bet 1-2-3",
    ])
      expect(scrubText(keep), keep).toBe(keep);
    // Known limitation (documented in scrub.ts): a number split across separate fields isn't recognised.
    expect(scrubValue({ cc: "852", rest: "9123", tail: "4567" })).toEqual({ cc: "852", rest: "9123", tail: "4567" });
    // Contact-named fields: masked whatever they hold; already-masked and non-numbers kept.
    expect(scrubValue({ phone: "+852 •••• 4567", whatsapp: "same", mobile: "９１２３４５６７" })).toEqual({ phone: "+852 •••• 4567", whatsapp: "same", mobile: "+852 •••• 4567" });
  });

  it("AD-09: no admin GET route or CSV export returns a ledger reason, flag reason or other free text with contact data", async () => {
    const { owner, admin, user } = await cast();
    const dirty = "call phone_98765432 or ９８７６５４３２ or 9876 5432 leaky.person@example.com";
    // Legacy-style rows written before the fix (verbatim), plus new writes through the panel.
    h!.c.ledger.post({ userId: user.user.id, kind: "admin_adjust", amount: 10, idemKey: "legacy-1", refType: "admin", actor: "ops 98765432", note: JSON.stringify({ reason: dirty }) });
    h!.db.prepare("UPDATE wallets SET flagged = 1, flag_reason = ? WHERE user_id = ?").run(dirty, user.user.id);
    await h!.call("PATCH", "/me", { description: dirty }, user.cookie);
    expect((await h!.call("POST", `/admin/users/${user.user.id}/credits`, { amount: 5, reason: dirty }, owner.cookie, w(owner.cookie))).status).toBe(200);
    // Ledger notes are stored scrubbed from now on.
    const note = (h!.db.prepare("SELECT note FROM credit_ledger WHERE user_id = ? ORDER BY id DESC LIMIT 1").get(user.user.id) as { note: string }).note;
    expect(note).not.toMatch(/98765432|9876 5432|leaky\.person/);

    const leaks = ["98765432", "9876 5432", "９８７６５４３２", "leaky.person@example.com", "93330000"];
    const clean = (where: string, text: string) => {
      for (const l of leaks) expect(text, `${where} contains ${l}`).not.toContain(l);
    };
    let checked = 0;
    for (const rt of h!.admin.routes) {
      if (rt.write) continue;
      if (rt.path === "/users/:id/contact") continue; // the owner's explicit reveal: the one exception (logged)
      const datasets = rt.path.includes(":dataset") ? ["users", "bets", "ledger", "purchases", "audit"] : [""];
      for (const ds of datasets) {
        const path = `/admin${rt.path.replace(":id", user.user.id).replace(":dataset", ds)}`;
        for (const who of rt.min === "owner" ? [owner] : [admin, owner]) {
          if (rt.path.startsWith("/export")) {
            const res = await h!.raw("GET", path, who.cookie);
            expect([path, res.status]).toEqual([path, 200]);
            clean(path, await res.text());
          } else {
            const r = rt.method === "get" ? await h!.call("GET", path, undefined, who.cookie) : await h!.call("POST", path, {}, who.cookie);
            clean(`${rt.method} ${path}`, JSON.stringify(r.body));
          }
          checked++;
        }
      }
    }
    expect(checked).toBeGreaterThan(20);
    // The reveal itself still returns the real contact details (that's its job).
    expect((await h!.call("GET", `/admin/users/${user.user.id}/contact`, undefined, owner.cookie)).body.phone).toBe("+85293330000");
  });

  it("AD-11: the 10–200 reason rule lives in actions (CLI and panel alike); stored reasons are scrubbed", async () => {
    const { user } = await cast();
    const cli = h!.adminActions({ source: "cli", operator: "ops", userId: null, role: "operator" });
    for (const reason of ["short", "   padded   ", "z".repeat(201)])
      expect(cli.adjust({ userId: user.user.id, amount: 5, reason }), reason).toMatchObject({ ok: false, status: 400, code: "reason_required", extra: { min: 10, max: 200 } });
    expect(cli.setFlag({ userId: user.user.id, flagged: true, reason: "nope" })).toMatchObject({ code: "reason_required" });
    expect(cli.setRole({ userId: user.user.id, role: "admin", reason: "nope" })).toMatchObject({ code: "reason_required" });
    expect(cli.voidRaces({ date: "2026-10-05", venue: "ST", raceNo: 1, reason: "nope" })).toMatchObject({ code: "reason_required" });
    expect(cli.resolveBet({ betId: "x", action: "void", reason: "nope" })).toMatchObject({ code: "reason_required" });
    const ok = cli.setFlag({ userId: user.user.id, flagged: true, reason: "  chargeback from 9876 5432  " });
    expect(ok.ok).toBe(true);
    expect(h!.db.prepare("SELECT flag_reason FROM wallets WHERE user_id = ?").get(user.user.id)).toEqual({ flag_reason: "chargeback from •••• 5432" });
  });
});
