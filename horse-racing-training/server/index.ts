import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { api } from "./routes";
import { momentum } from "./momentum/service";
import { names } from "./names/service";
import { dataApi } from "./data/routes";
import { dataService } from "./data/service";
import { seo } from "./seo";
import { loadConfig, assertProductionConfig } from "./members/config";
import { members } from "./members/service";
import { membersRouter } from "./members/routes";
import { apiErrorHandler } from "./apiErrors";
import { configureClock, hkDay, nowMs } from "./clock";
import { runAnalyzer } from "./analyzer";
import { homeRouter, loadMinBets, loadMinBetsDay } from "./home/routes";
import { homeSummary } from "./home/summary";
import { recordsFor } from "./home/records";
import { botBoard } from "./home/bots";
import { creditsProductionProblems, creditsWarnings, loadCreditsConfig } from "./credits/config";
import { appCredits } from "./credits/instance";
import { creditsRouter, memberHooks, stripeWebhookRouter } from "./credits/routes";
import { reconcile } from "./credits/reconcile";
import { adminProductionProblems, adminWarnings } from "./admin/config";
import { adminConfig, appActions } from "./admin/instance";
import { adminRouter } from "./admin/routes";
import { adminPageHeaders } from "./adminPages";
import { effectiveRole, getStatus, purgeAccessLog, raiseAlert, resolveAlert, setStatus, writeAudit } from "./admin/core";
import { getManifest, races as raceDb } from "./dataIndex";
import { runLog } from "./data/runLog";
import { alertsProductionProblems, loadAlertsConfig } from "./alerts/config";
import { senderFor } from "./alerts/sender";
import { alertSweeper } from "./alerts/scheduler";
import { analyzeCard } from "./analyzer";
import { readResults } from "./dataIndex";

// Membership: refuse to boot in production with dev OTP / Turnstile settings (docs/membership/PRD.md §5.12).
assertProductionConfig(loadConfig());
// 5★ SMS alerts: in production, SMS_ALERTS=1 needs Twilio messaging credentials.
const alertsCfg = loadAlertsConfig();
{
  const p = alertsProductionProblems(alertsCfg);
  if (p.length) throw new Error(`[alerts] refusing to start in production:\n  - ${p.join("\n  - ")}`);
}
// Credits: legal / Stripe gates and DEV_NOW (docs/credits/PRD.md §8.3). DEV_NOW is refused in production.
{
  const cc = loadCreditsConfig();
  const problems = creditsProductionProblems(cc);
  if (problems.length) throw new Error(`[credits] refusing to start:\n  - ${problems.join("\n  - ")}`);
  for (const w of creditsWarnings(cc)) console.warn(`[credits] ${w}`);
  configureClock();
}
// Admin: production needs a valid OWNER_PHONE (docs/admin/PRD.md §2.2); dev without it runs with no owner.
{
  const ac = adminConfig();
  const problems = adminProductionProblems(ac);
  if (problems.length) throw new Error(`[admin] refusing to start:\n  - ${problems.join("\n  - ")}`);
  for (const w of adminWarnings(ac)) console.warn(`[admin] ${w}`);
}
const credits = appCredits();
const memberDeps = members();
{
  const hooks = memberHooks(credits);
  // GET /api/me gains `role` for staff only (normal users get no role field).
  const extend = hooks.extendMember;
  hooks.extendMember = (u) => {
    const role = effectiveRole(u as typeof u & { role?: string }, adminConfig());
    return { ...extend(u), ...(role !== "user" ? { role } : {}) };
  };
  memberDeps.hooks = hooks;
}
// Owner handover: a system audit row the first time the server starts with a different OWNER_PHONE.
{
  const last4 = adminConfig().ownerPhone?.slice(-4) ?? null;
  const prev = getStatus<{ last4: string | null }>(credits.db, "owner_phone");
  if (!prev || prev.value.last4 !== last4) {
    if (prev)
      writeAudit(credits.db, {
        source: "system",
        operator: "system",
        actorUserId: null,
        actorRole: "system",
        action: "owner_changed",
        targetType: "system",
        targetId: null,
        before: { ownerLast4: prev.value.last4 },
        after: { ownerLast4: last4 },
        reason: "OWNER_PHONE changed",
      });
    setStatus(credits.db, "owner_phone", { last4 });
  }
}
const admin = adminRouter({
  members: memberDeps,
  credits,
  cfg: adminConfig(),
  actions: appActions,
  meetings: () => getManifest().map((m) => ({ date: m.date, venue: m.venue, races: m.races })),
  system: () => {
    const runs = runLog(momentum().db).recent(1);
    return { lastFetchRun: runs[0] ?? null, appVersion: process.env.npm_package_version ?? null };
  },
});

const app = express();
// Client IP for per-IP rate limits behind nginx/Cloudflare: set TRUST_PROXY (e.g. 1). Unset = trust nothing.
if (process.env.TRUST_PROXY) {
  const tp = process.env.TRUST_PROXY;
  app.set("trust proxy", /^\d+$/.test(tp) ? Number(tp) : tp === "true" ? true : tp === "false" ? false : tp);
}
// Stripe webhook: raw body (signature check), no Origin guard, no session — mounted BEFORE express.json().
app.use("/api/stripe/webhook", stripeWebhookRouter(credits));
app.use(express.json());
// /admin pages and every /admin/* deep link: never indexed, never framed (the API sets the same on /api/admin).
app.use(adminPageHeaders);
app.use(seo);
app.use("/api/data", dataApi);
app.use("/api/admin", admin);
// Home: public model summary (cached) + opt-in member leaderboard.
{
  const today = () => hkDay(nowMs());
  /** Saved racecard runners (names + codes) for the Home records. */
  const cardRunners = (date: string, venue: string, raceNo: number) =>
    ((raceDb().card({ date, venue: venue as "ST" | "HV", raceNo })?.race as { entries?: { horseNumber: number; horse?: { code?: string; name?: string } }[] } | undefined)?.entries ?? null);
  const summary = homeSummary({ run: runAnalyzer, today });
  const bots = botBoard({ run: runAnalyzer });
  app.use("/api", homeRouter({ db: memberDeps.db, summary,
      records: (date) => recordsFor({ run: runAnalyzer, runners: cardRunners }, date),
      minBets: loadMinBets(), minBetsDay: loadMinBetsDay(), today,
      lastRaceDay: async () => (await summary.get()).days[0] ?? null,
      bots: bots.stats, botRaces: bots.races, runners: cardRunners }));
}
app.use("/api", membersRouter(memberDeps));
app.use("/api", creditsRouter(credits, memberDeps));
app.use("/api", api);
app.use("/api", apiErrorHandler); // after every /api router: malformed/oversized JSON etc. → JSON errors

// Serve the built SPA in production (npm run build → dist/).
const dist = fileURLToPath(new URL("../dist", import.meta.url));
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => {
  console.log(`[post-time] API on http://localhost:${PORT}`);
  if (process.env.MOMENTUM_POLLER !== "0") momentum().poller.start(Number(process.env.MOMENTUM_INTERVAL_S) || 10);
  // Chinese names: shortly after boot and then daily, trim old records (keep 5 per code), seed English
  // and queue everything missing or older than the TTL (throttled, 1 page/s).
  if (process.env.NAMES_REFRESH !== "0") {
    const maintain = () => {
      try {
        const n = names();
        const removed = n.store.prune(5);
        if (removed) console.log(`[names] pruned ${removed} old records`);
        n.refresher.sweep();
      } catch (e) {
        console.error("[names] sweep failed:", e);
      }
    };
    setTimeout(maintain, 5_000);
    setInterval(maintain, 24 * 60 * 60_000).unref();
  }
  // Racecards + odds + results: every 5 min from 12:00 to 00:00 HKT (catch-up run on boot if the last one is stale).
  // Opt-in for now (DATA_FETCH=1): it drives Playwright scrapes of HKJC.
  if (process.env.DATA_FETCH === "1") dataService().scheduler.start();
  // LIVE settlement sweep every 5 min (catches missed result events and restarts; runs even with
  // FUTURE_BETTING=0 so pending bets still settle), plus a daily ledger reconcile.
  const sweep = () => {
    try {
      const s = credits.settle.sweep();
      setStatus(credits.db, "last_settle_sweep", s);
      if (s.settled || s.held || s.failed) console.log(`[credits] sweep: ${s.settled} settled, ${s.held} held, ${s.failed} failed`);
    } catch (e) {
      console.error(`[credits:alert] settlement sweep failed: ${e instanceof Error ? e.message : e}`);
    }
  };
  setTimeout(sweep, 10_000).unref();
  setInterval(sweep, 5 * 60_000).unref();
  const daily = () => {
    const issues = reconcile(credits.db);
    for (const i of issues) console.error(`[credits:alert] reconcile: ${i}`);
    setStatus(credits.db, "last_reconcile", { ok: !issues.length, issues });
    if (issues.length) raiseAlert(credits.db, { key: "reconcile", kind: "reconcile_issue", message: `${issues.length} reconcile issue(s)` });
    else resolveAlert(credits.db, "reconcile");
    // Access log: 12-month retention (audit log: kept indefinitely).
    const purged = purgeAccessLog(credits.db, adminConfig().accessLogDays);
    if (purged) console.log(`[admin] access log: purged ${purged} rows older than ${adminConfig().accessLogDays} days`);
  };
  setTimeout(daily, 30_000).unref();
  setInterval(daily, 24 * 60 * 60_000).unref();
  // 5★ pick SMS alerts: every minute, PRE 30 min before the first race and POST after the results.
  if (alertsCfg.enabled) {
    const sweepAlerts = alertSweeper({
      db: memberDeps.db,
      cfg: alertsCfg,
      sender: senderFor(alertsCfg),
      now: nowMs,
      meetings: (date) =>
        getManifest()
          .filter((m) => m.date === date.replaceAll("-", ""))
          .map((m) => {
            const rows = credits.schedule.forMeeting(date, m.venue);
            return {
              venue: m.venue,
              races: m.races.map((n) => {
                const r = rows.find((x) => x.race_no === n);
                const post = r?.post_time ? Date.parse(r.post_time) : NaN;
                return { raceNo: n, post: Number.isNaN(post) ? null : post, voided: !!r?.voided_at };
              }),
            };
          }),
      analyses: async (date, venue, raceNos) => {
        const out = [];
        for (const n of raceNos) {
          const a = await analyzeCard(date.replaceAll("-", ""), venue as "ST" | "HV", n);
          if (a) out.push(a);
        }
        return out;
      },
      results: (date, venue) => readResults(date.replaceAll("-", ""), venue),
    });
    let busy = false;
    const tick = () => {
      if (busy) return;
      busy = true;
      sweepAlerts()
        .catch((e) => console.error("[sms] alerts sweep failed:", e))
        .finally(() => (busy = false));
    };
    setTimeout(tick, 15_000);
    setInterval(tick, 60_000).unref();
    console.log(`[sms] 5-star alerts on (${alertsCfg.provider})`);
  }
});
