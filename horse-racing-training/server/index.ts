import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { api } from "./routes";
import { momentum } from "./momentum/service";
import { names } from "./names/service";
import { dataApi } from "./data/routes";
import { dataService } from "./data/service";
import { seo } from "./seo";
import { loadConfig, assertProductionConfig } from "./members/config";
import { members } from "./members/service";
import { membersRouter } from "./members/routes";
import { apiErrorHandler } from "./apiErrors";

// Membership: refuse to boot in production with dev OTP / Turnstile settings (docs/membership/PRD.md §5.12).
assertProductionConfig(loadConfig());

const app = express();
// Client IP for per-IP rate limits behind nginx/Cloudflare: set TRUST_PROXY (e.g. 1). Unset = trust nothing.
if (process.env.TRUST_PROXY) {
  const tp = process.env.TRUST_PROXY;
  app.set("trust proxy", /^\d+$/.test(tp) ? Number(tp) : tp === "true" ? true : tp === "false" ? false : tp);
}
app.use(express.json());
app.use(seo);
app.use("/api/data", dataApi);
app.use("/api", membersRouter(members()));
app.use("/api", api);
app.use("/api", apiErrorHandler); // after every /api router: malformed/oversized JSON etc. → JSON errors

// Serve the built SPA in production (npm run build → dist/).
const dist = fileURLToPath(new URL("../dist", import.meta.url));
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => {
  console.log(`[post-time] API on http://localhost:${PORT}`);
  if (process.env.MOMENTUM_POLLER !== "0") momentum().poller.start(Number(process.env.MOMENTUM_INTERVAL_S) || 10);
  // Chinese names: shortly after boot and then daily, trim old records (keep 5 per code), seed English
  // and queue everything missing or older than the TTL (throttled, 1 page/s).
  if (process.env.NAMES_REFRESH !== "0") {
    const maintain = () => {
      try {
        const n = names();
        const removed = n.store.prune(5);
        if (removed) console.log(`[names] pruned ${removed} old records`);
        n.refresher.sweep();
      } catch (e) {
        console.error("[names] sweep failed:", e);
      }
    };
    setTimeout(maintain, 5_000);
    setInterval(maintain, 24 * 60 * 60_000).unref();
  }
  // Racecards + odds + results: every 5 min from 12:00 to 00:00 HKT (catch-up run on boot if the last one is stale).
  // Opt-in for now (DATA_FETCH=1): it drives Playwright scrapes of HKJC.
  if (process.env.DATA_FETCH === "1") dataService().scheduler.start();
});
