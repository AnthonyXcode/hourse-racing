// Lazily-created singleton: race store + run log + 2-hourly fetch scheduler (on the momentum DB).
import { momentum } from "../momentum/service";
import { raceStore, type RaceStore } from "./raceStore";
import { runLog, type RunLog } from "./runLog";
import { createScheduler, type Scheduler, type Trigger } from "./scheduler";
import { runFetch, type FetchDeps } from "./fetchJobs";
import { discoverMeetings, openCardsSession, openResultsSession } from "./parent";

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
    };
    const scheduler = createScheduler({ run: (t: Trigger) => runFetch(deps, t), lastSuccess: () => runs.lastSuccess() });
    inst = { store, runs, deps, scheduler };
  }
  return inst;
}

