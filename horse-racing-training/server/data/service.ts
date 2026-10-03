// Lazily-created singleton: race store + run log + 5-minute fetch scheduler (on the momentum DB).
import { momentum } from "../momentum/service";
import { raceStore, type RaceStore } from "./raceStore";
import { runLog, type RunLog } from "./runLog";
import { createScheduler, type Scheduler, type Trigger } from "./scheduler";
import { runFetch, type FetchDeps } from "./fetchJobs";
import { discoverMeetings, fetchWinOdds, openCardsSession, openResultsSession } from "./parent";
import { scheduleStore } from "../credits/schedule";
import { meetingPools } from "../momentum/hkjcClient";
import { nowMs } from "../clock";
import { appCredits } from "../credits/instance";

let inst: { store: RaceStore; runs: RunLog; deps: FetchDeps; scheduler: Scheduler } | null = null;

export function dataService() {
  if (!inst) {
    const db = momentum().db;
    const store = raceStore(db);
    const runs = runLog(db);
    runs.closeOrphans(); // this process owns scheduling; nothing can still be running
    const deps: FetchDeps = {
      store,
      runLog: runs,
      discover: discoverMeetings,
      openResults: openResultsSession,
      openCards: () => openCardsSession(store),
      odds: fetchWinOdds,
      // LIVE (docs/credits/PRD.md §2.2): post times from discovery, statuses + designated DT/TT legs from
      // the meeting query, and settlement whenever a meeting's results change.
      onDiscovered: async (upcoming) => {
        const sched = scheduleStore(db, nowMs);
        sched.upsert(upcoming.flatMap((m) => m.races.map((r) => ({ date: m.date, venue: m.venue, raceNo: r.raceNo, postTime: r.postTime }))), "discovery");
        for (const m of upcoming) {
          const info = await meetingPools(m.date, m.venue).catch(() => null);
          if (!info) continue;
          sched.upsert(info.races.map((r) => ({ date: m.date, venue: m.venue, raceNo: r.raceNo, postTime: r.postTime, hkjcStatus: r.status })), "discovery");
          sched.setPools(m.date, m.venue, "DT", info.DT);
          sched.setPools(m.date, m.venue, "TT", info.TT);
        }
      },
      onResults: (m) => {
        const s = appCredits().settle.sweep({ date: m.date.replaceAll("-", ""), venue: m.venue });
        if (s.settled || s.held) console.log(`[credits] settled ${s.settled}, held ${s.held} LIVE bets for ${m.date} ${m.venue}`);
      },
    };
    const scheduler = createScheduler({ run: (t: Trigger) => runFetch(deps, t), lastSuccess: () => runs.lastSuccess() });
    inst = { store, runs, deps, scheduler };
  }
  return inst;
}

