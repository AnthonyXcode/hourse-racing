// /api/data/* — racecard/results fetch status.
import { Router } from "express";
import { dataService } from "./service";

export const dataApi = Router();

/** GET /api/data/status → { running, nextRun, runs: last 10 fetch runs } */
dataApi.get("/status", (_req, res) => {
  const { scheduler, runs } = dataService();
  res.json({ running: scheduler.running, nextRun: scheduler.nextRun?.toISOString() ?? null, runs: runs.recent(10) });
});
