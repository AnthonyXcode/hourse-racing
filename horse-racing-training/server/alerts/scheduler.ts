// 5★ pick alerts: the per-minute sweep. For each meeting today (HK) with post times it sends, once per
// member (the UNIQUE log key makes it idempotent across sweeps and restarts):
//   PRE  from 30 min before the first race until the first race — never later (missed → logged 'skipped');
//   POST from 30 min after the last race, once every result is stored — given up 3 h after that.
// No SMS between 23:30 and 08:00 HK, except a POST that is still due. Sends are rate-limited.
import type { MembersDB } from "../members/db";
import type { PreRaceAnalysis } from "../../shared/analyzer/model";
import type { RaceResult } from "../../shared/types";
import type { AlertsConfig } from "./config";
import type { SmsSender } from "./sender";
import { fiveStarPicks, postText, preText, type AlertLang, type FiveStarPick, type FiveStarResult } from "./content";

const MIN = 60_000;
export const PRE_LEAD_MS = 30 * MIN;
export const POST_DELAY_MS = 30 * MIN;
export const POST_GIVE_UP_MS = 3 * 60 * MIN;

export interface ScheduledRace {
  raceNo: number;
  /** Post time, epoch ms (null = unknown). */
  post: number | null;
  voided: boolean;
}
export interface AlertDeps {
  db: MembersDB;
  cfg: Pick<AlertsConfig, "appOrigin" | "perSecond">;
  sender: SmsSender;
  now: () => number;
  /** Meetings on an HK date (YYYY-MM-DD) with their race schedule. */
  meetings: (date: string) => { venue: string; races: ScheduledRace[] }[];
  /** Pre-race analyses of these races (date YYYY-MM-DD). */
  analyses: (date: string, venue: string, raceNos: number[]) => Promise<PreRaceAnalysis[]>;
  /** Stored results of a meeting (date YYYY-MM-DD), or null. */
  results: (date: string, venue: string) => RaceResult[] | null;
  sleep?: (ms: number) => Promise<void>;
  log?: (line: string) => void;
}

const HK = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" });
const hkDay = (ms: number) => HK.format(new Date(ms));
const hkMinutes = (ms: number) => {
  const [h, m] = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Hong_Kong", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(ms)).split(":").map(Number);
  return (h! % 24) * 60 + m!;
};
/** 23:30–08:00 HK: no PRE (a POST that is due still goes). */
export const isQuietHours = (ms: number) => {
  const m = hkMinutes(ms);
  return m >= 23 * 60 + 30 || m < 8 * 60;
};
const settled = (r: RaceResult | undefined) => !!r && r.finishOrder.length > 0 && r.winDividend != null;

interface Member {
  id: string;
  phone_e164: string | null;
  alerts_lang: string | null;
}
export interface SweepStats {
  sent: number;
  failed: number;
  skipped: number;
}

export function alertSweeper(d: AlertDeps) {
  const sleep = d.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const log = d.log ?? console.log;
  const iso = () => new Date(d.now()).toISOString();
  const logRow = (userId: string, date: string, venue: string, kind: "pre" | "post", status: "pending" | "skipped", error: string | null = null) =>
    d.db.prepare("INSERT OR IGNORE INTO sms_alert_log (user_id, date, venue, kind, status, error, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(userId, date, venue, kind, status, error, iso()).changes === 1;
  const hasRow = (userId: string, date: string, venue: string, kind: "pre" | "post") =>
    d.db.prepare("SELECT status FROM sms_alert_log WHERE user_id = ? AND date = ? AND venue = ? AND kind = ?").get(userId, date, venue, kind) as { status: string } | undefined;

  /** The meeting's 5★ races, chosen once (before the first race) and kept for the results SMS. */
  async function picksFor(date: string, venue: string, raceNos: number[]): Promise<FiveStarPick[]> {
    const row = d.db.prepare("SELECT picks FROM sms_alert_meeting WHERE date = ? AND venue = ?").get(date, venue) as { picks: string } | undefined;
    if (row) return JSON.parse(row.picks) as FiveStarPick[];
    const picks = fiveStarPicks(await d.analyses(date, venue, raceNos));
    d.db.prepare("INSERT OR IGNORE INTO sms_alert_meeting (date, venue, picks, created_at) VALUES (?, ?, ?, ?)").run(date, venue, JSON.stringify(picks), iso());
    return picks;
  }
  const storedPicks = (date: string, venue: string) => {
    const row = d.db.prepare("SELECT picks FROM sms_alert_meeting WHERE date = ? AND venue = ?").get(date, venue) as { picks: string } | undefined;
    return row ? (JSON.parse(row.picks) as FiveStarPick[]) : null;
  };

  let gap = false;
  async function send(stats: SweepStats, u: Member, date: string, venue: string, kind: "pre" | "post", body: string) {
    if (!logRow(u.id, date, venue, kind, "pending")) return; // already sent / claimed: never twice
    if (gap) await sleep(Math.ceil(1000 / d.cfg.perSecond));
    gap = true;
    try {
      const r = await d.sender.send(u.phone_e164!, body);
      d.db.prepare("UPDATE sms_alert_log SET status = 'sent', provider_id = ? WHERE user_id = ? AND date = ? AND venue = ? AND kind = ?").run(r.id, u.id, date, venue, kind);
      stats.sent++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      d.db.prepare("UPDATE sms_alert_log SET status = 'failed', error = ? WHERE user_id = ? AND date = ? AND venue = ? AND kind = ?").run(msg.slice(0, 300), u.id, date, venue, kind);
      log(`[sms] ${kind} ${date} ${venue} failed: ${msg}`);
      stats.failed++;
    }
  }
  const skip = (stats: SweepStats, u: Member, date: string, venue: string, kind: "pre" | "post", why: string) => {
    if (logRow(u.id, date, venue, kind, "skipped", why)) stats.skipped++;
  };

  return async function sweep(): Promise<SweepStats> {
    const stats: SweepStats = { sent: 0, failed: 0, skipped: 0 };
    gap = false;
    const t = d.now();
    const users = d.db.prepare("SELECT id, phone_e164, alerts_lang FROM users WHERE alerts_5star = 1").all() as Member[];
    if (!users.length) return stats;
    const lang = (u: Member): AlertLang => (u.alerts_lang === "en" ? "en" : "zh-HK");
    // Yesterday too: a night meeting's POST can fall after midnight.
    for (const date of [...new Set([hkDay(t - 24 * 60 * MIN), hkDay(t)])]) {
      for (const m of d.meetings(date)) {
        const live = m.races.filter((r) => !r.voided && r.post != null);
        if (!live.length) continue;
        const first = Math.min(...live.map((r) => r.post!));
        const last = Math.max(...live.map((r) => r.post!));
        const ref = { date, venue: m.venue, firstPost: first };
        const members = users.filter((u) => !!u.phone_e164);

        // PRE: [first − 30 min, first). Clamped: never after the first race.
        if (t >= first - PRE_LEAD_MS) {
          const todo = members.filter((u) => !hasRow(u.id, date, m.venue, "pre"));
          if (todo.length) {
            if (t >= first) for (const u of todo) skip(stats, u, date, m.venue, "pre", "missed: first race already started");
            else if (!isQuietHours(t)) {
              const picks = await picksFor(date, m.venue, live.map((r) => r.raceNo));
              const texts = new Map<AlertLang, string>();
              for (const u of todo) {
                const l = lang(u);
                if (!texts.has(l)) texts.set(l, preText(l, ref, picks, d.cfg.appOrigin));
                await send(stats, u, date, m.venue, "pre", texts.get(l)!);
              }
            }
          }
        }

        // POST: from last + 30 min once all results are stored; give up after 3 h. Only after a PRE that was sent.
        if (t >= last + POST_DELAY_MS) {
          const todo = members.filter((u) => hasRow(u.id, date, m.venue, "pre")?.status === "sent" && !hasRow(u.id, date, m.venue, "post"));
          if (!todo.length) continue;
          const picks = storedPicks(date, m.venue) ?? [];
          if (!picks.length) {
            for (const u of todo) skip(stats, u, date, m.venue, "post", "no 5-star races");
            continue;
          }
          const results = d.results(date, m.venue) ?? [];
          const done = live.every((r) => settled(results.find((x) => x.raceNumber === r.raceNo)));
          if (!done) {
            if (t >= last + POST_DELAY_MS + POST_GIVE_UP_MS) for (const u of todo) skip(stats, u, date, m.venue, "post", "results not stored in time");
            continue;
          }
          const rows: FiveStarResult[] = picks.map((p) => {
            const fin = results.find((x) => x.raceNumber === p.raceNo)?.finishOrder.find((f) => f.horseNumber === p.num)?.finishPosition ?? 0;
            return { ...p, fin: fin > 0 ? fin : null, placed: fin >= 1 && fin <= 3 };
          });
          const texts = new Map<AlertLang, string>();
          for (const u of todo) {
            const l = lang(u);
            if (!texts.has(l)) texts.set(l, postText(l, ref, rows, d.cfg.appOrigin));
            await send(stats, u, date, m.venue, "post", texts.get(l)!);
          }
        }
      }
    }
    if (stats.sent || stats.failed) log(`[sms] alerts sweep: ${stats.sent} sent, ${stats.failed} failed, ${stats.skipped} skipped`);
    return stats;
  };
}
