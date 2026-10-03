// Race schedule (post times) and per-race status for LIVE betting (docs/credits/PRD.md §2.2–2.4).
// The server's clock decides everything; unknown or stale post times fail closed.
import type { DB } from "../momentum/db";
import type { MeetingMode, RaceInfo, RaceResult, RaceStatus } from "../../shared/types";

const HOUR = 3_600_000;
/** A schedule not refreshed for this long can't open a race. */
export const STALE_MS = 24 * HOUR;
/** HKJC race statuses that mean betting is over. */
const VOID_STATUSES = new Set(["ABANDONED", "VOID", "CANCELLED", "POSTPONED"]);
const CLOSED_STATUSES = new Set(["RESULT", "CLOSED", "STOP_SELL", "STOPSELL", "SELL_STOPPED", "RUNNING", "OFF", "FINAL", "INTERIM", ...VOID_STATUSES]);

export interface ScheduleRow {
  race_id: string;
  date: string; // YYYY-MM-DD
  venue: string;
  race_no: number;
  post_time: string | null;
  hkjc_status: string | null;
  first_seen_at: string;
  updated_at: string;
  closed_at: string | null;
  voided_at: string | null;
  source: string;
}

export interface ScheduleInput {
  date: string; // YYYY-MM-DD
  venue: string;
  raceNo: number;
  postTime: string | null;
  hkjcStatus?: string | null;
}

const iso = (ms: number) => new Date(ms).toISOString();
const raceKey = (date: string, venue: string, raceNo: number) => `${date}-${venue}-${raceNo}`;

export function scheduleStore(db: DB, clock: () => number) {
  const get = db.prepare<[string], ScheduleRow>("SELECT * FROM race_schedule WHERE race_id = ?");
  const ins = db.prepare(
    `INSERT INTO race_schedule (race_id, date, venue, race_no, post_time, hkjc_status, first_seen_at, updated_at, source)
     VALUES (@id, @date, @venue, @raceNo, @postTime, @status, @now, @now, @source)
     ON CONFLICT (race_id) DO UPDATE SET
       post_time = COALESCE(excluded.post_time, post_time),
       hkjc_status = COALESCE(excluded.hkjc_status, hkjc_status),
       updated_at = excluded.updated_at, source = excluded.source`
  );
  const close = db.prepare("UPDATE race_schedule SET closed_at = ? WHERE race_id = ? AND closed_at IS NULL");

  const api = {
    get: (date: string, venue: string, raceNo: number) => get.get(raceKey(date, venue, raceNo)) ?? null,
    forMeeting: (date: string, venue: string) =>
      db.prepare<[string, string], ScheduleRow>("SELECT * FROM race_schedule WHERE date = ? AND venue = ? ORDER BY race_no").all(date, venue),
    /** Record post times / statuses from a source (discovery, poller, dev fixture). Never reopens a closed race. */
    upsert(rows: ScheduleInput[], source: string): void {
      const now = iso(clock());
      db.transaction(() => {
        for (const r of rows)
          ins.run({ id: raceKey(r.date, r.venue, r.raceNo), date: r.date, venue: r.venue, raceNo: r.raceNo, postTime: r.postTime, status: r.hkjcStatus ?? null, now, source });
      })();
      api.closeDue();
    },
    /** Designated DT/TT legs for a meeting (replaces what was stored for that pool type). */
    setPools(date: string, venue: string, pool: "DT" | "TT", legs: number[][]): void {
      const now = iso(clock());
      db.transaction(() => {
        db.prepare("DELETE FROM meeting_pools WHERE date = ? AND venue = ? AND pool = ?").run(date, venue, pool);
        for (const l of legs)
          db.prepare("INSERT OR IGNORE INTO meeting_pools (date, venue, pool, legs, updated_at) VALUES (?, ?, ?, ?, ?)").run(date, venue, pool, JSON.stringify([...l].sort((a, b) => a - b)), now);
      })();
    },
    pools(date: string, venue: string): { DT: number[][]; TT: number[][] } {
      const rows = db.prepare<[string, string], { pool: "DT" | "TT"; legs: string }>("SELECT pool, legs FROM meeting_pools WHERE date = ? AND venue = ?").all(date, venue);
      const out = { DT: [] as number[][], TT: [] as number[][] };
      for (const r of rows) out[r.pool].push(JSON.parse(r.legs) as number[]);
      return out;
    },
    /** Set closed_at (one-way) on every race whose post time has passed or whose HKJC status ended betting. */
    closeDue(): void {
      const now = clock();
      const open = db.prepare<[], ScheduleRow>("SELECT * FROM race_schedule WHERE closed_at IS NULL").all();
      for (const r of open) {
        const past = r.post_time != null && Date.parse(r.post_time) <= now;
        if (past || (r.hkjc_status && CLOSED_STATUSES.has(r.hkjc_status)) || r.voided_at) close.run(iso(now), r.race_id);
      }
    },
    voidRace(date: string, venue: string, raceNo: number): void {
      const now = iso(clock());
      db.prepare(
        `INSERT INTO race_schedule (race_id, date, venue, race_no, first_seen_at, updated_at, closed_at, voided_at, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'operator')
         ON CONFLICT (race_id) DO UPDATE SET voided_at = excluded.voided_at, closed_at = COALESCE(closed_at, excluded.closed_at)`
      ).run(raceKey(date, venue, raceNo), date, venue, raceNo, now, now, now, now);
    },
  };
  return api;
}
export type ScheduleStore = ReturnType<typeof scheduleStore>;

/** A race result complete enough to settle: finish order and a win dividend (§2.3). */
export const hasResult = (r: RaceResult | undefined): r is RaceResult => !!r && r.finishOrder.length > 0 && r.winDividend != null;

/** Status of one race, checked in the PRD's order: void, settled, closed, open, unavailable. */
export function raceStatus(row: ScheduleRow | null, result: RaceResult | undefined, nowMs: number, liveOn: boolean): RaceStatus {
  if (row?.voided_at || (row?.hkjc_status && VOID_STATUSES.has(row.hkjc_status))) return "void";
  if (hasResult(result)) return "settled";
  if (row?.closed_at) return "closed";
  if (!row?.post_time) return "unavailable";
  const post = Date.parse(row.post_time);
  if (Number.isNaN(post)) return "unavailable";
  if (nowMs >= post || (row.hkjc_status && CLOSED_STATUSES.has(row.hkjc_status))) return "closed";
  if (nowMs - Date.parse(row.updated_at) > STALE_MS) return "unavailable";
  return liveOn ? "open" : "unavailable";
}

export interface MeetingStatus {
  mode: MeetingMode;
  raceInfo: RaceInfo[];
  liveDoubleTrioPools: number[][];
  liveTripleTrioPools: number[][];
}

/** Every race's status for a meeting (date YYYY-MM-DD) and the meeting's derived mode. */
export function meetingStatus(
  schedule: ScheduleStore,
  date: string,
  venue: string,
  raceNos: number[],
  results: RaceResult[] | null,
  nowMs: number,
  liveOn: boolean
): MeetingStatus {
  schedule.closeDue();
  const byRace = new Map((results ?? []).map((r) => [r.raceNumber, r]));
  const rows = new Map(schedule.forMeeting(date, venue).map((r) => [r.race_no, r]));
  const raceInfo = raceNos.map((n): RaceInfo => {
    const row = rows.get(n) ?? null;
    const status = raceStatus(row, byRace.get(n), nowMs, liveOn);
    const post = row?.post_time ?? null;
    return { raceNumber: n, postTime: post, status, closesInSec: status === "open" && post ? Math.max(0, Math.floor((Date.parse(post) - nowMs) / 1000)) : null };
  });
  const done = (s: RaceStatus) => s === "settled" || s === "void";
  const mode: MeetingMode = raceInfo.length && raceInfo.every((r) => done(r.status)) ? "practice" : raceInfo.some((r) => r.status === "open") ? "live" : "closed";
  const pools = schedule.pools(date, venue);
  // A multi-race pool is offered only while its first leg is open.
  const openPools = (list: number[][]) => list.filter((legs) => raceInfo.find((r) => r.raceNumber === Math.min(...legs))?.status === "open");
  return { mode, raceInfo, liveDoubleTrioPools: openPools(pools.DT), liveTripleTrioPools: openPools(pools.TT) };
}
