/**
 * Request-body building blocks shared by the /v1 routes.
 */

import { isValid, parse } from "date-fns";
import type { Request, Response } from "express";
import { z } from "zod";
import { venueCode } from "../../pipeline/raceAnalysis.js";
import type { Venue } from "../../types/index.js";

const VENUE_ALIASES: Record<string, Venue> = {
  st: "Sha Tin",
  "sha tin": "Sha Tin",
  hv: "Happy Valley",
  "happy valley": "Happy Valley",
};

export const isoDateField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")
  .refine((value) => isValid(parse(value, "yyyy-MM-dd", new Date())), "not a valid calendar date");

/** "ST", "HV", "Sha Tin" or "Happy Valley" (any case) → Venue */
export const venueField = z.string().transform((value, ctx) => {
  const venue = VENUE_ALIASES[value.trim().toLowerCase()];
  if (!venue) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'must be "ST", "HV", "Sha Tin" or "Happy Valley"' });
    return z.NEVER;
  }
  return venue;
});

/** Same aliases as venueField, as a racecard code */
export const venueCodeField = venueField.transform((venue) => venueCode(venue));

/** Sorted and de-duplicated, so list order never changes the cache key */
export function sortedUnique<T extends string | number>(values: readonly T[]): T[] {
  return [...new Set(values)].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/** Racing months, "8" or "08" → sorted unique "MM" strings; empty = all months */
export const monthListField = z
  .array(z.string().regex(/^(0?[1-9]|1[0-2])$/, "must be a month 1-12"))
  .max(12)
  .default([])
  .transform((months) => sortedUnique(months.map((m) => m.padStart(2, "0"))));

/** Validates req.body; on failure responds 400 and returns undefined. */
export function parseBody<S extends z.ZodTypeAny>(schema: S, req: Request, res: Response): z.output<S> | undefined {
  const parsed = schema.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({
      error: "invalid_request",
      details: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    });
    return undefined;
  }
  return parsed.data;
}
