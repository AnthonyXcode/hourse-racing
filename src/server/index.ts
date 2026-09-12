/**
 * API server entry point.
 *
 *   npm run dev:api     # watch mode via tsx
 *   npm run start:api   # built output
 */

import dotenv from "dotenv";
import { createApp } from "./app.js";
import { loadEnv, type Env } from "./config/env.js";

dotenv.config({ quiet: true });

let env: Env;
try {
  env = loadEnv();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}

const app = createApp({
  apiKeys: env.API_KEYS,
  exposeErrorDetails: env.NODE_ENV !== "production",
});

const server = app.listen(env.PORT, (error) => {
  if (error) {
    console.error(`Failed to start API server: ${error.message}`);
    process.exit(1);
  }
  console.log(`API listening on http://localhost:${env.PORT} (${env.NODE_ENV}, ${env.API_KEYS.length} key(s))`);
});

function shutdown(signal: NodeJS.Signals): void {
  console.log(`${signal} received, shutting down`);
  server.close((err) => {
    if (err) console.error(err);
    process.exit(err ? 1 : 0);
  });
  // Don't hang forever on open keep-alive connections
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
