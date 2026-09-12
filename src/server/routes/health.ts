import { Router } from "express";

export function healthRouter(version: string): Router {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version,
    });
  });

  return router;
}
