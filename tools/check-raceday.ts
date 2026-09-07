#!/usr/bin/env tsx
/**
 * Check whether a given date is a HKJC race day (Sha Tin / Happy Valley).
 *
 * Source: HKJC fixture calendar (server-rendered, no Playwright needed)
 *   https://racing.hkjc.com/en-us/local/information/fixture?calyear=YYYY&calmonth=MM
 *
 * Usage:
 *   npx tsx tools/check-raceday.ts                     # today (Asia/Hong_Kong)
 *   npx tsx tools/check-raceday.ts --date=2026-09-09
 *   npx tsx tools/check-raceday.ts --json
 */

const FIXTURE_URL = "https://racing.hkjc.com/en-us/local/information/fixture";

export interface Meeting {
  date: string; // YYYY-MM-DD
  venue: "ST" | "HV" | "CH";
  session: "D" | "N" | "T" | "?"; // Day / Night / Twilight
  raceCount: number;
}

export interface RaceDayCheck {
  date: string;
  isRaceDay: boolean;
  venue: "ST" | "HV" | "CH" | null;
  session: string | null;
  raceCount: number;
  nextMeeting: Meeting | null;
  monthMeetings: Meeting[];
  checkedAt: string;
}

/** Today's date in Hong Kong time, as YYYY-MM-DD. */
export function hkToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function fetchMonth(year: number, month: number): Promise<string> {
  const url = `${FIXTURE_URL}?calyear=${year}&calmonth=${String(month).padStart(2, "0")}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Fixture fetch failed: HTTP ${res.status} (${url})`);
  const html = await res.text();
  if (!/\d{1,2}\/\d{4}/.test(html)) throw new Error(`Unexpected fixture page shape (${url})`);
  return html;
}

/**
 * Parse one month's fixture calendar.
 *
 * Grid cells run in order across a 7-column table. Leading cells belong to the
 * previous month and trailing cells to the next, so cells are only attributed to
 * `year`/`month` once day 1 has been seen and before the day number resets.
 */
export function parseMonth(html: string, year: number, month: number): Meeting[] {
  const tableStart = html.indexOf('class="fixture_tab"');
  const scope = tableStart >= 0 ? html.slice(tableStart) : html;

  // Every day cell, in grid order. Race days carry class="calendar" and a body.
  const cellRe = /<td([^>]*)>([\s\S]*?)<\/td>/g;
  const meetings: Meeting[] = [];
  let seenFirst = false;
  let prevDay = 0;
  let inMonth = false;
  let match: RegExpExecArray | null;

  while ((match = cellRe.exec(scope)) !== null) {
    const attrs = match[1];
    const body = match[2];

    // Weekday header cells (Sun..Sat) hold no digits.
    const dayMatch = body.match(/>\s*(\d{1,2})\s*<\/span>/) || body.match(/^\s*(\d{1,2})\s*$/);
    if (!dayMatch) continue;
    const day = parseInt(dayMatch[1], 10);
    if (!Number.isFinite(day) || day < 1 || day > 31) continue;

    if (!seenFirst) {
      // Leading cells are the tail of the previous month until day 1 shows up.
      if (day === 1) {
        seenFirst = true;
        inMonth = true;
      } else {
        prevDay = day;
        continue;
      }
    } else if (day < prevDay) {
      // Day number went backwards after the month ran out: now in the next month.
      inMonth = false;
    }
    prevDay = day;
    if (!inMonth) continue;

    if (!/class="[^"]*\bcalendar\b/.test(attrs)) continue; // not a meeting day

    const venueMatch = body.match(/alt="(ST|HV|CH)"/);
    if (!venueMatch) continue;
    const sessionMatch = body.match(/alt="(D|N|T)"/);

    // Each race line reads like `1200(2)` — distance(number of races at it).
    let raceCount = 0;
    for (const r of body.matchAll(/(\d{3,4})\s*\((\d+)\)/g)) {
      raceCount += parseInt(r[2], 10);
    }

    meetings.push({
      date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      venue: venueMatch[1] as Meeting["venue"],
      session: (sessionMatch?.[1] as Meeting["session"]) ?? "?",
      raceCount,
    });
  }

  return meetings;
}

export async function checkRaceDay(date: string): Promise<RaceDayCheck> {
  const [year, month] = date.split("-").map(Number);
  const monthMeetings = parseMonth(await fetchMonth(year, month), year, month);

  const today = monthMeetings.find((m) => m.date === date) ?? null;

  // Next meeting: later this month, else the first one next month.
  let nextMeeting = monthMeetings.find((m) => m.date > date) ?? null;
  if (!nextMeeting) {
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    try {
      nextMeeting = parseMonth(await fetchMonth(nextYear, nextMonth), nextYear, nextMonth)[0] ?? null;
    } catch {
      nextMeeting = null;
    }
  }

  return {
    date,
    isRaceDay: today !== null,
    venue: today?.venue ?? null,
    session: today?.session ?? null,
    raceCount: today?.raceCount ?? 0,
    nextMeeting,
    monthMeetings,
    checkedAt: new Date().toISOString(),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dateArg = args.find((a) => a.startsWith("--date="))?.split("=")[1];
  const asJson = args.includes("--json");
  const date = dateArg ?? hkToday();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error(`Invalid --date: ${date} (expected YYYY-MM-DD)`);
    process.exit(2);
  }

  const result = await checkRaceDay(date);

  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
  } else if (result.isRaceDay) {
    const venueName = result.venue === "ST" ? "Sha Tin" : result.venue === "HV" ? "Happy Valley" : "Conghua";
    console.log(`RACE DAY: ${result.date} @ ${venueName} (${result.venue}) — ${result.raceCount} races, session ${result.session}`);
  } else {
    console.log(`No racing on ${result.date}.`);
    if (result.nextMeeting) {
      console.log(`Next meeting: ${result.nextMeeting.date} @ ${result.nextMeeting.venue} (${result.nextMeeting.raceCount} races)`);
    }
  }

  // Exit code doubles as a shell-friendly signal: 0 = race day, 1 = no racing.
  process.exit(result.isRaceDay ? 0 : 1);
}

const isDirectRun = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "");
if (isDirectRun) {
  main().catch((err) => {
    console.error(`[ERROR] ${err instanceof Error ? err.message : String(err)}`);
    process.exit(2);
  });
}
