/**
 * Parse date-range CLI specs and list saved racecard files in range.
 *
 * Supports:
 *   YYYY-MM...YYYY-MM
 *   YYYY-MM-DD...YYYY-MM-DD
 */

import { readdir } from "fs/promises";
import path from "path";
import {
  endOfMonth,
  format,
  parse as parseDate,
  startOfMonth,
} from "date-fns";

export interface YmdRange {
  startYmd: string;
  endYmd: string;
}

export function parseYmdRangeSpec(spec: string): YmdRange {
  const parts = spec.split("...");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(
      `Invalid range "${spec}". Use YYYY-MM...YYYY-MM or YYYY-MM-DD...YYYY-MM-DD`
    );
  }

  const [startStr, endStr] = parts;
  const monthRe = /^\d{4}-\d{2}$/;
  const dayRe = /^\d{4}-\d{2}-\d{2}$/;

  if (monthRe.test(startStr) && monthRe.test(endStr)) {
    const start = startOfMonth(
      parseDate(`${startStr}-01`, "yyyy-MM-dd", new Date())
    );
    const end = endOfMonth(parseDate(`${endStr}-01`, "yyyy-MM-dd", new Date()));
    return {
      startYmd: format(start, "yyyyMMdd"),
      endYmd: format(end, "yyyyMMdd"),
    };
  }

  if (dayRe.test(startStr) && dayRe.test(endStr)) {
    const start = parseDate(startStr, "yyyy-MM-dd", new Date());
    const end = parseDate(endStr, "yyyy-MM-dd", new Date());
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error(`Invalid date range "${spec}"`);
    }
    return {
      startYmd: format(start, "yyyyMMdd"),
      endYmd: format(end, "yyyyMMdd"),
    };
  }

  throw new Error(
    `Invalid range "${spec}". Use YYYY-MM...YYYY-MM or YYYY-MM-DD...YYYY-MM-DD`
  );
}

export function parseRacecardFileYmd(filename: string): string | null {
  const match = filename.match(/^racecard_(\d{8})_(ST|HV)_R\d+\.json$/);
  return match?.[1] ?? null;
}

export async function listRacecardsInYmdRange(
  range: YmdRange,
  raceCardDir?: string
): Promise<string[]> {
  const dir = raceCardDir ?? path.join(process.cwd(), "data", "racecards");
  const files = await readdir(dir);
  return files
    .filter((f) => {
      const ymd = parseRacecardFileYmd(f);
      if (!ymd) return false;
      return ymd >= range.startYmd && ymd <= range.endYmd;
    })
    .sort()
    .map((f) => path.join(dir, f));
}
