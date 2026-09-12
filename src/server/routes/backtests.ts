/**
 * POST /v1/backtests/differentiation — tools/backtest-differentiation.ts as JSON.
 * Every field is optional; defaults match the CLI.
 */

import { createHash } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { stableStringify, type AnalysisService } from "../services/analysisService.js";
import { isoDateField, monthListField, parseBody, sortedUnique, venueCodeField } from "./schemas.js";

/** Validated request options with all defaults filled in (CLI flag in brackets). */
export interface BacktestParams {
  /** Skip if more runners than this have sparse form [--sparse] */
  sparseMax: number;
  /** Skip if more horses than this are within 8 points of the top-rated [--close] */
  closeMax: number;
  /** Skip if the field's average rating gap is below this [--avgdiff] */
  avgDiffMin: number;
  /** Skip if #1 − #2 rating gap is below this [--gap] */
  gapMin: number;
  /** Skip if the top pick's win odds exceed this; 0 = off [--odds] */
  oddsMax: number;
  /** Skip if the top pick's Rtg+/- is at or below this; null = off [--ratingchange] */
  ratingChangeMin: number | null;
  /** "MM" months; empty = all [--months] */
  months: string[];
  venue: "ST" | "HV" | null;
  surface: "Turf" | "AWT" | null;
  /** Upper-case class names [--ignore-class] */
  ignoreClasses: string[];
  /** Metres [--ignore-distance] */
  ignoreDistances: number[];
  /** 0 = off [--max-rating] */
  maxRating: number;
  /** 0 = off [--max-avgdiff] */
  maxAvgDiff: number;
  form: "all" | "ST" | "HV";
  /** YYYY-MM-DD; drop races on or after this day [--ignore-after] */
  ignoreAfter: string | null;
}

/** backtest-differentiation-<hash of params>.json */
export function backtestCacheFile(params: BacktestParams): string {
  const hash = createHash("sha256").update(stableStringify(params)).digest("hex").slice(0, 12);
  return `backtest-differentiation-${hash}.json`;
}

const count = (max: number) => z.number().int().min(0).max(max);

const BacktestRequestSchema = z
  .object({
    sparseMax: count(99).default(3),
    closeMax: count(99).default(4),
    avgDiffMin: count(999).default(14),
    gapMin: count(999).default(0),
    oddsMax: z.number().min(0).max(1000).default(0),
    ratingChangeMin: z.number().int().min(-99).max(99).nullable().default(-1),
    months: monthListField,
    venue: venueCodeField.nullable().default(null),
    surface: z.enum(["Turf", "AWT"]).nullable().default(null),
    ignoreClasses: z
      .array(z.string().trim().min(1).max(40))
      .max(20)
      .default([])
      .transform((classes) => sortedUnique(classes.map((c) => c.toUpperCase()))),
    ignoreDistances: z
      .array(z.number().int().min(800).max(3000))
      .max(20)
      .default([])
      .transform((distances) => sortedUnique(distances)),
    maxRating: count(999).default(0),
    maxAvgDiff: count(999).default(0),
    form: z.enum(["all", "ST", "HV"]).default("all"),
    ignoreAfter: isoDateField.nullable().default(null),
  })
  .strict();

export function backtestsRouter(service: AnalysisService<BacktestParams>): Router {
  const router = Router();

  router.post("/differentiation", async (req, res) => {
    const params: BacktestParams | undefined = parseBody(BacktestRequestSchema, req, res);
    if (!params) return;
    res.json(await service.getAnalysis(params));
  });

  return router;
}
