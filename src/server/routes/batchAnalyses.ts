/**
 * POST /v1/batch-analyses — whole-meeting analysis (the tools/batch-analyze.ts pipeline) as JSON.
 * Synchronous: a cache miss waits for every race (live scraping can take many minutes).
 */

import { Router } from "express";
import { z } from "zod";
import { venueCode } from "../../pipeline/raceAnalysis.js";
import type { Venue } from "../../types/index.js";
import type { AnalysisService } from "../services/analysisService.js";
import { isoDateField, monthListField, parseBody, venueField } from "./schemas.js";

/** Validated request options with all defaults filled in. */
export interface BatchAnalysisParams {
  /** YYYY-MM-DD */
  date: string;
  venue: Venue;
  firstRace: number;
  lastRace: number;
  formData: "all" | "venue";
  useSaved: boolean;
  /** "MM" months for the historical hit-rate pool; empty = all */
  backtestMonths: string[];
}

/** batch-<ST|HV>-<YYYY-MM-DD>-R<first>-<last>.json */
export function batchCacheFile(params: BatchAnalysisParams): string {
  return `batch-${venueCode(params.venue)}-${params.date}-R${params.firstRace}-${params.lastRace}.json`;
}

const raceNumber = z.number().int().min(1).max(14);

const BatchRequestSchema = z
  .object({
    date: isoDateField,
    venue: venueField,
    firstRace: raceNumber.default(1),
    lastRace: raceNumber.default(11),
    formData: z.enum(["all", "venue"]).default("venue"),
    useSaved: z.boolean().default(false),
    backtestMonths: monthListField,
  })
  .strict()
  .refine((body) => body.lastRace >= body.firstRace, { message: "must be >= firstRace", path: ["lastRace"] });

export function batchAnalysesRouter(service: AnalysisService<BatchAnalysisParams>): Router {
  const router = Router();

  router.post("/", async (req, res) => {
    const params: BatchAnalysisParams | undefined = parseBody(BatchRequestSchema, req, res);
    if (!params) return;
    res.json(await service.getAnalysis(params));
  });

  return router;
}
