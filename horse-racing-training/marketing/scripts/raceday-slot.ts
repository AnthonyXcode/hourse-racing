#!/usr/bin/env tsx
/**
 * Which race-day posting slot (if any) is due right now? Reads real post times from the app's
 * public API (/api/days, /api/meeting/YYYYMMDD/ST|HV -> raceInfo[].postTime) and applies the
 * slot formula from marketing/PLAN.md §5.2 (R1 = first post time, RL = last post time):
 *
 *   pre-meeting   R1 - 90 min
 *   mid-meeting   pre + 3h   (only if before RL)
 *   late-meeting  pre + 6h   (only if before RL)
 *   post-meeting  RL + 40 min
 *   mid/late is dropped if it falls within 45 min of post-meeting.
 *
 * A slot is "due" from its time for DUE_WINDOW minutes (post-meeting: until RL + 90, so the skill
 * can wait for final dividends). The cron wrapper runs every 5 minutes and asks this script.
 * Between 00:00 and 02:59 yesterday's meeting is checked too (a late HV post-meeting slot).
 *
 * Usage: npx tsx marketing/scripts/raceday-slot.ts [--date YYYY-MM-DD] [--at HH:MM] [--json] [--list]
 * Exit: 0 = a slot is due (prints "<date> <slot-id>"), 1 = nothing due / no meeting, 2 = error.
 */
import { SITE_URL, hkNow, parseArgs } from "./lib/env.js";
import { requestJson } from "./lib/http.js";

export type SlotId = "pre-meeting" | "mid-meeting" | "late-meeting" | "post-meeting";
export interface Slot { id: SlotId; at: number; until: number } // minutes since that day's HK midnight

interface Day { date: string; venue: string }
interface Meeting { raceInfo?: { raceNumber: number; postTime?: string | null }[] }

const DUE_WINDOW = 30;

const hhmm = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}${m >= 1440 ? " (+1d)" : ""}`;

/** Minutes since HK midnight of `date` for an ISO time with offset. */
function minutesOn(date: string, iso: string): number {
  const t = hkNow(new Date(iso));
  return (t.date === date ? 0 : 1440) + t.hour * 60 + t.minute;
}

export function computeSlots(r1: number, rl: number): Slot[] {
  const post: Slot = { id: "post-meeting", at: rl + 40, until: rl + 90 };
  const pre = r1 - 90;
  const slots: Slot[] = [{ id: "pre-meeting", at: pre, until: pre + DUE_WINDOW }];
  for (const [id, at] of [["mid-meeting", pre + 180], ["late-meeting", pre + 360]] as const) {
    if (at < rl && post.at - at >= 45) slots.push({ id, at, until: at + DUE_WINDOW });
  }
  slots.push(post);
  return slots;
}

async function slotsFor(date: string): Promise<{ venue: string; r1: string; rl: string; slots: Slot[] } | null> {
  const ymd = date.replaceAll("-", "");
  const days = await requestJson<Day[]>(`${SITE_URL()}/api/days`, {}, { label: "api/days", attempts: 3 });
  const day = days.find((d) => d.date === ymd);
  if (!day) return null;
  const meeting = await requestJson<Meeting>(`${SITE_URL()}/api/meeting/${ymd}/${day.venue}`, {}, { label: "api/meeting", attempts: 3 });
  const times = (meeting.raceInfo ?? []).map((r) => r.postTime).filter((t): t is string => Boolean(t)).sort();
  if (!times.length) throw new Error(`no postTime in /api/meeting/${ymd}/${day.venue}`);
  const r1 = times[0], rl = times[times.length - 1];
  return { venue: day.venue, r1, rl, slots: computeSlots(minutesOn(date, r1), minutesOn(date, rl)) };
}

function shiftDate(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00+08:00`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function main(): Promise<number> {
  const { flags, opts } = parseArgs(process.argv.slice(2));
  const now = hkNow();
  const today = opts.date ?? now.date;
  const [h, m] = (opts.at ?? `${now.hour}:${now.minute}`).split(":").map(Number);
  const nowMin = h * 60 + m;

  // Today's meeting, plus yesterday's in the small hours (its post-meeting slot may run past midnight).
  const candidates: { date: string; offset: number }[] = [{ date: today, offset: 0 }];
  if (nowMin < 180) candidates.push({ date: shiftDate(today, -1), offset: 1440 });

  for (const c of candidates) {
    const info = await slotsFor(c.date);
    if (!info) continue;
    const t = nowMin + c.offset;
    const due = info.slots.find((s) => t >= s.at && t < s.until);
    const out = {
      date: c.date, venue: info.venue, firstPost: info.r1, lastPost: info.rl, now: hhmm(nowMin),
      due: due?.id ?? null, dueAt: due ? hhmm(due.at) : null,
      slots: info.slots.map((s) => ({ id: s.id, at: hhmm(s.at), until: hhmm(s.until) })),
    };
    if (flags.has("list") && c.offset === 0) { console.log(out.slots.map((s) => `${s.id.padEnd(13)} ${s.at} - ${s.until}`).join("\n")); return 0; }
    if (due) { console.log(flags.has("json") ? JSON.stringify(out) : `${c.date} ${due.id}`); return 0; }
    if (c.offset === 0 && flags.has("json")) console.log(JSON.stringify(out));
    else if (c.offset === 0) console.log(`nothing due at ${hhmm(nowMin)} (slots: ${out.slots.map((s) => `${s.id} ${s.at}`).join(", ")})`);
  }
  if (flags.has("list")) console.log(`no meeting on ${today}`);
  return 1;
}

const isDirectRun = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "");
if (isDirectRun) {
  main().then((c) => process.exit(c), (e) => { console.error(`[raceday-slot] ${(e as Error).message}`); process.exit(2); });
}
