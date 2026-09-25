// Background collector: while a race is within WINDOW of its post time, snapshot
// WIN/PLA odds every INTERVAL. After HKJC posts the result, store finishing positions.
import type { HkjcClient } from "./hkjcClient";
import { raceId, type Repo } from "./db";

export interface PollerOptions {
  client: HkjcClient;
  repo: Repo;
  now?: () => Date;
  windowSecs?: number; // start polling this long before post time
  graceSecs?: number; // keep polling this long after post time (late off / final odds)
  meetingRefreshSecs?: number;
  log?: (msg: string) => void;
}

const VENUES = ["HV", "ST"] as const;
const FINISHED = new Set(["RESULT", "ABANDONED", "VOID"]);

/** Today's date in Hong Kong time, as YYYY-MM-DD. */
export function hkDate(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(d);
}

/** Whether an HKJC post time (ISO) falls on HK date `date`; unparseable → false. */
function runsOn(postTime: string, date: string): boolean {
  const t = new Date(postTime);
  return !Number.isNaN(t.getTime()) && hkDate(t) === date;
}

export function createPoller(opts: PollerOptions) {
  const { client, repo } = opts;
  const now = opts.now ?? (() => new Date());
  const windowSecs = opts.windowSecs ?? 30 * 60;
  const graceSecs = opts.graceSecs ?? 5 * 60;
  const meetingRefreshSecs = opts.meetingRefreshSecs ?? 60;
  const log = opts.log ?? ((m: string) => console.log(`[momentum] ${m}`));

  let inFlight = false;
  let lastMeetingFetch = 0;
  let venue: { date: string; code: string | null } = { date: "", code: null };
  const state = { lastTickAt: null as string | null, lastError: null as string | null, polling: [] as string[] };

  async function refreshMeeting(date: string) {
    if (venue.date !== date) venue = { date, code: null };
    // Unknown venue: probe both (at most every 10 min). Known: refresh every meetingRefreshSecs.
    const every = venue.code ? meetingRefreshSecs : 600;
    if (now().getTime() - lastMeetingFetch < every * 1000) return;
    lastMeetingFetch = now().getTime();
    for (const code of venue.code ? [venue.code] : VENUES) {
      // On a non-race day HKJC answers with the *next* meeting; keep only races that run on `date`.
      const races = (await client.meeting(date, code)).filter((r) => runsOn(r.postTime, date));
      if (!races.length) continue;
      venue.code = code;
      for (const r of races)
        repo.upsertRace({
          race_id: raceId(date, code, r.raceNo),
          date,
          venue: code,
          race_no: r.raceNo,
          post_time: r.postTime,
          hkjc_status: r.status,
        });
      break;
    }
  }

  async function settle(date: string) {
    const pending = repo.racesOn(date).filter((r) => r.status !== "settled" && r.hkjc_status && FINISHED.has(r.hkjc_status));
    if (!pending.length) return;
    const runners = await client.runners(date, pending[0]!.venue);
    for (const race of pending) {
      const rs = runners.filter((r) => r.raceNo === race.race_no);
      // HKJC first publishes only the top 4 (marked "Ran"); the rest stay "Declared"
      // until the full order is out. Wait for it, or every other runner looks unplaced.
      const complete = rs.some((r) => r.finalPosition != null) && !rs.some((r) => r.status === "Declared");
      if (!complete && race.hkjc_status === "RESULT") {
        // Store the placings published so far so the UI can show them now; settle once complete.
        const placed = rs.filter((r) => r.finalPosition != null);
        if (placed.length && repo.results(race.race_id).length < placed.length)
          repo.upsertResults(race.race_id, placed.map((r) => ({ horseNo: r.horseNo, finishPos: r.finalPosition, sp: r.winOdds })));
        continue;
      }
      repo.upsertRunners(race.race_id, rs);
      repo.upsertResults(
        race.race_id,
        rs.map((r) => ({ horseNo: r.horseNo, finishPos: r.finalPosition, sp: r.winOdds }))
      );
      repo.setStatus(race.race_id, "settled");
      log(`settled ${race.race_id} (${repo.snapshotCount(race.race_id)} snapshots)`);
    }
  }

  /** Official dividends for races with a result that we don't have a Trio dividend for yet. */
  async function fetchDividends(date: string) {
    const pending = repo.racesOn(date).filter((r) => r.hkjc_status === "RESULT" && !repo.dividends(r.race_id).some((d) => d.pool === "TRI"));
    if (!pending.length) return;
    const all = await client.dividends(date, pending[0]!.venue);
    for (const race of pending) {
      const ds = all.filter((d) => d.raceNo === race.race_no);
      if (!ds.length) continue; // not paid out yet
      repo.upsertDividends(race.race_id, ds);
      log(`dividends ${race.race_id}: TRI ${ds.filter((d) => d.pool === "TRI").map((d) => `${d.comb} $${d.div}`).join(", ") || "–"}`);
    }
  }

  async function tick() {
    if (inFlight) return;
    inFlight = true;
    try {
      const t = now();
      const date = hkDate(t);
      await refreshMeeting(date);

      const active = repo.racesOn(date).filter((r) => {
        const secs = (Date.parse(r.post_time) - t.getTime()) / 1000;
        return r.status === "scheduled" && !FINISHED.has(r.hkjc_status ?? "") && secs <= windowSecs && secs > -graceSecs;
      });
      state.polling = active.map((r) => r.race_id);

      for (const race of active) {
        if (repo.snapshotCount(race.race_id) === 0) {
          const rs = (await client.runners(date, race.venue)).filter((r) => r.raceNo === race.race_no);
          repo.upsertRunners(race.race_id, rs);
          log(`start polling ${race.race_id} (post ${race.post_time})`);
        }
        const queriedAt = now();
        const o = await client.odds(race.date, race.venue, race.race_no);
        const respondedAt = now();
        if (!o.win.size) continue;
        const horses = [...new Set([...o.win.keys(), ...o.pla.keys()])].sort((a, b) => a - b);
        repo.insertSnapshot(
          race.race_id,
          { queriedAt: queriedAt.toISOString(), respondedAt: respondedAt.toISOString(), hkjcUpdatedAt: o.hkjcUpdatedAt },
          Math.round((Date.parse(race.post_time) - queriedAt.getTime()) / 1000),
          o.winPool,
          o.plaPool,
          horses.map((h) => ({ horseNo: h, win: o.win.get(h) ?? null, pla: o.pla.get(h) ?? null }))
        );
      }

      // Races past the grace window that never got a RESULT status: close them.
      for (const r of repo.racesOn(date))
        if (r.status === "scheduled" && (Date.parse(r.post_time) - t.getTime()) / 1000 <= -graceSecs)
          repo.setStatus(r.race_id, "closed");

      await settle(date);
      await fetchDividends(date);
      state.lastError = null;
    } catch (e) {
      state.lastError = String(e);
      log(`tick failed: ${state.lastError}`);
    } finally {
      state.lastTickAt = now().toISOString();
      inFlight = false;
    }
  }

  let timer: NodeJS.Timeout | null = null;
  return {
    tick,
    state,
    start(intervalSecs = 30) {
      if (timer) return;
      void tick();
      timer = setInterval(() => void tick(), intervalSecs * 1000);
      log(`poller started (every ${intervalSecs}s, window ${windowSecs / 60} min)`);
    },
    stop() {
      if (timer) clearInterval(timer);
      timer = null;
    },
  };
}

export type Poller = ReturnType<typeof createPoller>;
