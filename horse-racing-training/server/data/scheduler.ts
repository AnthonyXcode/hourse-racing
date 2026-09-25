// When racecards/results are fetched: every 2 hours from 08:00 to 24:00 Hong Kong time, i.e.
// 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00 and 00:00 HKT. Runs never overlap.
// Hong Kong has no DST, so HKT is always UTC+8 and the slot maths is plain arithmetic.

const HKT_MS = 8 * 3_600_000;
const HOUR = 3_600_000;
/** Slot hours in HKT, ascending. 0 = the midnight run that closes the window. */
export const SLOT_HOURS = [0, 8, 10, 12, 14, 16, 18, 20, 22] as const;
/** Minimum age of the last successful run before a startup catch-up run. */
export const CATCH_UP_MS = 2 * HOUR;

/** The next slot strictly after `now` (a run at exactly 10:00 schedules 12:00). */
export function nextSlot(now: Date): Date {
  const hk = now.getTime() + HKT_MS; // HKT wall clock expressed as a UTC timestamp
  const dayStart = Math.floor(hk / (24 * HOUR)) * 24 * HOUR;
  for (const dayOffset of [0, 1]) {
    for (const h of SLOT_HOURS) {
      const slot = dayStart + dayOffset * 24 * HOUR + h * HOUR;
      if (slot > hk) return new Date(slot - HKT_MS);
    }
  }
  throw new Error("unreachable"); // tomorrow 00:00 is always after now
}

/** True from 08:00 until midnight HKT — the hours the schedule covers. */
export function inWindow(now: Date): boolean {
  const hour = new Date(now.getTime() + HKT_MS).getUTCHours();
  return hour >= 8;
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
