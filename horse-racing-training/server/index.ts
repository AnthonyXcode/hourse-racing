import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { api } from "./routes";
import { momentum } from "./momentum/service";

const app = express();
app.use(express.json());
app.use("/api", api);

// Serve the built SPA in production (npm run build → dist/).
const dist = fileURLToPath(new URL("../dist", import.meta.url));
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => {
  console.log(`[bet-trainer] API on http://localhost:${PORT}`);
  if (process.env.MOMENTUM_POLLER !== "0") momentum().poller.start(Number(process.env.MOMENTUM_INTERVAL_S) || 30);
});
