// The server's clock for anything that decides whether a race is open (docs/credits/PRD.md §2.1).
// DEV_NOW (dev only, refused in production) shifts the clock so it reads DEV_NOW at startup and then keeps
// ticking, so LIVE can be tried against a stored meeting without waiting for race day.

let offsetMs = 0;
let configured = false;

/** Read DEV_NOW once. Throws in production (see config guard), ignores an unparseable value with a warning. */
export function configureClock(env: NodeJS.ProcessEnv = process.env, realNow = Date.now()): void {
  configured = true;
  offsetMs = 0;
  const v = env.DEV_NOW;
  if (!v) return;
  if (env.NODE_ENV === "production") throw new Error("DEV_NOW is not allowed in production");
  const t = Date.parse(v);
  if (Number.isNaN(t)) {
    console.warn(`[clock] ignoring DEV_NOW=${v}: not a date`);
    return;
  }
  offsetMs = t - realNow;
  console.log(`[clock] DEV_NOW active: server time starts at ${new Date(t).toISOString()}`);
}

/** Current server time (epoch ms). */
export function nowMs(): number {
  if (!configured) configureClock();
  return Date.now() + offsetMs;
}
export const now = () => new Date(nowMs());

/** Tests: pin the clock to an exact instant (pass null to go back to real time). */
export function setTestNow(ms: number | null): void {
  configured = true;
  offsetMs = ms == null ? 0 : ms - Date.now();
}

const HK = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" });
/** Hong Kong calendar date (YYYY-MM-DD) of an instant. */
export const hkDay = (ms: number) => HK.format(new Date(ms));
/** Epoch ms of 00:00 Hong Kong time on the HK day containing `ms`. */
export const hkMidnight = (ms: number) => Date.parse(`${hkDay(ms)}T00:00:00+08:00`);
