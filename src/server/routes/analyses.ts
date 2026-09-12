/**
 * POST /v1/analyses — race analysis (the tools/analyze-race.ts pipeline) as JSON.
 * Synchronous: a cache miss waits for the full run (live scraping can take minutes).
 */

import { isValid, parse } from "date-fns";
import { Router } from "express";
import { z } from "zod";
import { RaceNotFoundError } from "../../pipeline/raceAnalysis.js";
import { DEFAULT_BETTING_CONFIG, type Venue } from "../../types/index.js";
import type { AnalysisParams, AnalysisService } from "../services/analysisService.js";

const VENUE_ALIASES: Record<string, Venue> = {
  st: "Sha Tin",
  "sha tin": "Sha Tin",
  hv: "Happy Valley",
  "happy valley": "Happy Valley",
};

const AnalysisRequestSchema = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")
      .refine((value) => isValid(parse(value, "yyyy-MM-dd", new Date())), "not a valid calendar date"),
    venue: z.string().transform((value, ctx) => {
      const venue = VENUE_ALIASES[value.trim().toLowerCase()];
      if (!venue) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'must be "ST", "HV", "Sha Tin" or "Happy Valley"' });
        return z.NEVER;
      }
      return venue;
    }),
    race: z.number().int().min(1).max(14),
    formData: z.enum(["all", "venue"]).default("venue"),
    useSaved: z.boolean().default(false),
    bankroll: z.number().positive().max(100_000_000).default(DEFAULT_BETTING_CONFIG.bankroll),
    kellyFraction: z.number().gt(0).max(1).default(DEFAULT_BETTING_CONFIG.kellyFraction),
    minEdge: z.number().min(0).max(1000).default(DEFAULT_BETTING_CONFIG.minEdgeThreshold),
    // Substrings matched against historical file names, e.g. "20260315" or "HV"
    ignoreRecords: z.array(z.string().regex(/^[A-Za-z0-9_-]{1,40}$/)).max(50).default([]),
  })
  .strict();

export function analysesRouter(service: AnalysisService): Router {
  const router = Router();

  router.post("/", async (req, res) => {
    const parsed = AnalysisRequestSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({
        error: "invalid_request",
        details: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      });
      return;
    }

    const { race, ...options } = parsed.data;
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
