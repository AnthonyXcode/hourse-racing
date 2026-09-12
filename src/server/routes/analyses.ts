/**
 * POST /v1/analyses — race analysis (the tools/analyze-race.ts pipeline) as JSON.
 * Synchronous: a cache miss waits for the full run (live scraping can take minutes).
 */

import { Router } from "express";
import { z } from "zod";
import { RaceNotFoundError, venueCode } from "../../pipeline/raceAnalysis.js";
import { DEFAULT_BETTING_CONFIG, type Venue } from "../../types/index.js";
import type { AnalysisService } from "../services/analysisService.js";
import { isoDateField, parseBody, sortedUnique, venueField } from "./schemas.js";

/** Validated request options with all defaults filled in. */
export interface AnalysisParams {
  /** YYYY-MM-DD */
  date: string;
  venue: Venue;
  raceNumber: number;
  formData: "all" | "venue";
  useSaved: boolean;
  bankroll: number;
  kellyFraction: number;
  minEdge: number;
  ignoreRecords: string[];
}

/** <ST|HV>-<YYYY-MM-DD>-<race>.json */
export function analysisCacheFile(params: AnalysisParams): string {
  return `${venueCode(params.venue)}-${params.date}-${params.raceNumber}.json`;
}

const AnalysisRequestSchema = z
  .object({
    date: isoDateField,
    venue: venueField,
    race: z.number().int().min(1).max(14),
    formData: z.enum(["all", "venue"]).default("venue"),
    useSaved: z.boolean().default(false),
    bankroll: z.number().positive().max(100_000_000).default(DEFAULT_BETTING_CONFIG.bankroll),
    kellyFraction: z.number().gt(0).max(1).default(DEFAULT_BETTING_CONFIG.kellyFraction),
    minEdge: z.number().min(0).max(1000).default(DEFAULT_BETTING_CONFIG.minEdgeThreshold),
    // Substrings matched against historical file names, e.g. "20260315" or "HV"
    ignoreRecords: z
      .array(z.string().regex(/^[A-Za-z0-9_-]{1,40}$/))
      .max(50)
      .default([])
      .transform((records) => sortedUnique(records)),
  })
  .strict();

export function analysesRouter(service: AnalysisService<AnalysisParams>): Router {
  const router = Router();

  router.post("/", async (req, res) => {
    const body = parseBody(AnalysisRequestSchema, req, res);
    if (!body) return;

    const { race, ...options } = body;
    const params: AnalysisParams = { ...options, raceNumber: race };

    try {
      res.json(await service.getAnalysis(params));
    } catch (error) {
      if (error instanceof RaceNotFoundError) {
        res.status(404).json({ error: "race_not_found", message: error.message });
        return;
      }
      throw error; // → errorHandler (500)
    }
  });

  return router;
}
