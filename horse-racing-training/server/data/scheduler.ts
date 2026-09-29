// When racecards/odds/results are fetched: every 5 minutes from 12:00 to 24:00 Hong Kong time
// (12:00, 12:05 … 23:55 and the 00:00 run that closes the window). Runs never overlap: a tick that
// fires while a slow run (full racecard scrape) is still going is skipped. What each tick actually
// scrapes is decided by the planners in ./fetchJobs.ts — most ticks are a few cheap requests.
// Hong Kong has no DST, so HKT is always UTC+8 and the slot maths is plain arithmetic.

const HKT_MS = 8 * 3_600_000;
const HOUR = 3_600_000;
/** Minutes between ticks. */
export const TICK_MIN = 5;
/** First tick of the day, HKT hour. */
export const WINDOW_START_HOUR = 12;
/** Minimum age of the last successful run before a startup catch-up run. */
export const CATCH_UP_MS = TICK_MIN * 60_000;

/** The next slot strictly after `now` (a run at exactly 12:00 schedules 12:05). */
export function nextSlot(now: Date): Date {
  const hk = now.getTime() + HKT_MS; // HKT wall clock expressed as a UTC timestamp
  const step = TICK_MIN * 60_000;
  const slot = (Math.floor(hk / step) + 1) * step;
  const dayStart = Math.floor(slot / (24 * HOUR)) * 24 * HOUR;
  const hour = (slot - dayStart) / HOUR;
  // 00:00 closes the previous day's window; anything else before 12:00 waits for 12:00.
  const at = slot === dayStart || hour >= WINDOW_START_HOUR ? slot : dayStart + WINDOW_START_HOUR * HOUR;
  return new Date(at - HKT_MS);
}

/** True from 12:00 until midnight HKT — the hours the schedule covers. */
export function inWindow(now: Date): boolean {
  const hour = new Date(now.getTime() + HKT_MS).getUTCHours();
  return hour >= WINDOW_START_HOUR;
}

export type Trigger = "schedule" | "startup" | "manual";

export interface SchedulerDeps {
  /** Does one fetch run; rejections are logged, never thrown out of the scheduler. */
  run(trigger: Trigger): Promise<unknown>;
  /** Finish time of the last successful run, if any. */
  lastSuccess(): Date | null;
  now?: () => Date;
  setTimer?: (fn: () => void, ms: number) => { unref?: () => void } | unknown;
  clearTimer?: (t: unknown) => void;
  log?: (msg: string) => void;
}

export function createScheduler(deps: SchedulerDeps) {
  const now = deps.now ?? (() => new Date());
  const setTimer = deps.setTimer ?? ((fn, ms) => setTimeout(fn, ms));
  const clearTimer = deps.clearTimer ?? ((t) => clearTimeout(t as ReturnType<typeof setTimeout>));
  const log = deps.log ?? ((m) => console.log(`[data] ${m}`));
  let timer: unknown = null;
  let running: Promise<unknown> | null = null;
  let next: Date | null = null;

  /** Runs unless one is already in progress (then resolves to null and skips). */
  function runExclusive(trigger: Trigger): Promise<unknown> | null {
    if (running) {
      log(`${trigger} run skipped: previous run still in progress`);
      return null;
    }
    running = deps
      .run(trigger)
      .catch((e) => log(`${trigger} run failed: ${e instanceof Error ? e.message : e}`))
      .finally(() => (running = null));
    return running;
  }

  function arm() {
    next = nextSlot(now());
    const t = setTimer(() => {
      runExclusive("schedule");
      arm();
    }, Math.max(0, next.getTime() - now().getTime()));
    (t as { unref?: () => void })?.unref?.();
    timer = t;
  }

  return {
    start() {
      const last = deps.lastSuccess();
      if (inWindow(now()) && (!last || now().getTime() - last.getTime() > CATCH_UP_MS)) runExclusive("startup");
      arm();
      log(`next fetch at ${next!.toISOString()}`);
    },
    stop() {
      if (timer) clearTimer(timer);
      timer = null;
      next = null;
    },
    runExclusive,
    get running() {
      return running !== null;
    },
    get nextRun() {
      return next;
    },
  };
}
export type Scheduler = ReturnType<typeof createScheduler>;
