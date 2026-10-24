#!/usr/bin/env tsx
/**
 * Owner alert: always appends to marketing/logs/alerts.log; also sends a Telegram DM from the bot
 * when TELEGRAM_BOT_TOKEN and TELEGRAM_ALERT_CHAT_ID are set (the owner must /start the bot once).
 * Alerts are private DMs, so they are sent in dry-run mode too; --dry-run or MARKETING_ALERTS=0 disables sending.
 *
 * Usage: npx tsx marketing/scripts/alert.ts --message "marketing-raceday race-1400: publish failed"
 */
import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { LOG_DIR, loadEnv, parseArgs } from "./lib/env.js";
import { requestJson } from "./lib/http.js";
import { telegramApi } from "./channels/telegram.js";

async function main(): Promise<number> {
  const argv = process.argv.slice(2);
  const { flags, opts } = parseArgs(argv);
  const message = opts.message;
  if (!message) { console.error('usage: alert.ts --message "<text>"'); return 2; }
  loadEnv();
  mkdirSync(LOG_DIR, { recursive: true });
  appendFileSync(path.join(LOG_DIR, "alerts.log"), `[${new Date().toISOString()}] ${message}\n`);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_ALERT_CHAT_ID;
  if (flags.has("dry-run") || process.env.MARKETING_ALERTS === "0" || !token || !chat) {
    console.log(`[alert] logged only: ${message}`);
    return 0;
  }
  await requestJson(telegramApi(token, "sendMessage"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text: `Post Time marketing: ${message}`, disable_notification: false }),
  }, { label: "alert", attempts: 3 });
  console.log("[alert] sent");
  return 0;
}

main().then((c) => process.exit(c), (e) => { console.error(`[alert] ${(e as Error).message}`); process.exit(1); });
