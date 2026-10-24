#!/usr/bin/env tsx
/**
 * Token upkeep. Network calls only when MARKETING_LIVE=1, or with --online (read-only checks during setup).
 *
 *   npx tsx marketing/scripts/refresh-tokens.ts            # refresh the Threads long-lived token, then --check
 *   npx tsx marketing/scripts/refresh-tokens.ts --check    # read-only health check of every channel
 *   ... --online                                            # allow network even while MARKETING_LIVE is unset
 *
 * Threads long-lived tokens last 60 days; GET /refresh_access_token?grant_type=th_refresh_token
 * (token must be >= 24h old and unexpired) returns a fresh 60-day token, written back to marketing/.env.
 * The Facebook Page token derived from a long-lived user token does not expire (until password
 * change / role removal / app de-auth), and Instagram uses that same Page token. Telegram bot tokens never expire.
 * Exit: 0 = all good, 1 = something failed or a token expires within 14 days (cron alerts on this).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { GRAPH_VERSION, LOG_DIR, isLive, loadEnv, parseArgs, writeEnvValue } from "./lib/env.js";
import { requestJson } from "./lib/http.js";
import { telegramApi } from "./channels/telegram.js";

const STATE = path.join(LOG_DIR, "tokens.json");
const WARN_DAYS = 14;
type State = Record<string, { checkedAt?: string; refreshedAt?: string; expiresAt?: string | null; ok?: boolean; detail?: string }>;

const readState = (): State => (existsSync(STATE) ? (JSON.parse(readFileSync(STATE, "utf8")) as State) : {});
const saveState = (s: State) => { mkdirSync(LOG_DIR, { recursive: true }); writeFileSync(STATE, JSON.stringify(s, null, 2)); };
const threadsBase = () => (process.env.THREADS_API_BASE || "https://graph.threads.com/v1.0").replace(/\/$/, "");
const q = (t: string) => encodeURIComponent(t);

async function refreshThreads(state: State): Promise<string | null> {
  const token = process.env.THREADS_TOKEN;
  if (!token) return "threads: THREADS_TOKEN not set";
  const root = threadsBase().replace(/\/v[\d.]+$/, "");
  const r = await requestJson<{ access_token: string; expires_in: number }>(
    `${root}/refresh_access_token?grant_type=th_refresh_token&access_token=${q(token)}`, {}, { label: "threads refresh" });
  writeEnvValue("THREADS_TOKEN", r.access_token);
  state.threads = { ...state.threads, refreshedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + r.expires_in * 1000).toISOString() };
  console.log(`[tokens] threads refreshed; expires ${state.threads.expiresAt}`);
  return null;
}

async function check(state: State): Promise<string[]> {
  const problems: string[] = [];
  const env = process.env;
  const g = `https://graph.facebook.com/${GRAPH_VERSION()}`;
  const probe = async (name: string, fn: () => Promise<string>) => {
    try {
      const detail = await fn();
      state[name] = { ...state[name], checkedAt: new Date().toISOString(), ok: true, detail };
      console.log(`[tokens] ${name}: ok (${detail})`);
    } catch (e) {
      state[name] = { ...state[name], checkedAt: new Date().toISOString(), ok: false, detail: (e as Error).message };
      problems.push(`${name}: ${(e as Error).message}`);
    }
  };

  await probe("facebook", async () => {
    if (!env.FB_PAGE_ID || !env.FB_PAGE_TOKEN) throw new Error("FB_PAGE_ID/FB_PAGE_TOKEN not set");
    const p = await requestJson<{ name: string }>(`${g}/${env.FB_PAGE_ID}?fields=id,name&access_token=${q(env.FB_PAGE_TOKEN)}`, {}, { attempts: 2 });
    if (env.META_APP_ID && env.META_APP_SECRET) {
      const d = await requestJson<{ data: { is_valid: boolean; expires_at: number; scopes?: string[] } }>(
        `${g}/debug_token?input_token=${q(env.FB_PAGE_TOKEN)}&access_token=${q(`${env.META_APP_ID}|${env.META_APP_SECRET}`)}`, {}, { attempts: 2 });
      if (!d.data.is_valid) throw new Error("page token invalid");
      for (const s of ["pages_manage_posts", "instagram_content_publish"]) if (!d.data.scopes?.includes(s)) throw new Error(`page token lacks ${s}`);
      state.facebook = { ...state.facebook, expiresAt: d.data.expires_at ? new Date(d.data.expires_at * 1000).toISOString() : null };
    }
    return p.name;
  });
  await probe("instagram", async () => {
    const token = env.IG_TOKEN || env.FB_PAGE_TOKEN;
    if (!env.IG_USER_ID || !token) throw new Error("IG_USER_ID/FB_PAGE_TOKEN not set");
    const u = await requestJson<{ username: string }>(`${g}/${env.IG_USER_ID}?fields=id,username&access_token=${q(token)}`, {}, { attempts: 2 });
    const lim = await requestJson<{ data?: { quota_usage?: number }[] }>(`${g}/${env.IG_USER_ID}/content_publishing_limit?fields=quota_usage,config&access_token=${q(token)}`, {}, { attempts: 2 });
    return `@${u.username}, ${lim.data?.[0]?.quota_usage ?? "?"} posts in last 24h`;
  });
  await probe("threads", async () => {
    if (!env.THREADS_TOKEN) throw new Error("THREADS_TOKEN not set");
    const u = await requestJson<{ username: string }>(`${threadsBase()}/me?fields=id,username&access_token=${q(env.THREADS_TOKEN)}`, {}, { attempts: 2 });
    return `@${u.username}`;
  });
  await probe("telegram", async () => {
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHANNEL) throw new Error("TELEGRAM_BOT_TOKEN/TELEGRAM_CHANNEL not set");
    const me = await requestJson<{ result: { id: number; username: string } }>(telegramApi(env.TELEGRAM_BOT_TOKEN, "getMe"), {}, { attempts: 2 });
    const m = await requestJson<{ result: { status: string; can_post_messages?: boolean } }>(
      telegramApi(env.TELEGRAM_BOT_TOKEN, `getChatMember?chat_id=${q(env.TELEGRAM_CHANNEL)}&user_id=${me.result.id}`), {}, { attempts: 2 });
    if (m.result.status !== "administrator" && m.result.status !== "creator") throw new Error(`bot is ${m.result.status} in ${env.TELEGRAM_CHANNEL}, not admin`);
    if (m.result.can_post_messages === false) throw new Error("bot admin lacks 'Post messages'");
    return `@${me.result.username} admin of ${env.TELEGRAM_CHANNEL}`;
  });

  for (const [name, s] of Object.entries(state)) {
    if (!s.expiresAt) continue;
    const days = (Date.parse(s.expiresAt) - Date.now()) / 86_400_000;
    if (days < WARN_DAYS) problems.push(`${name}: token expires in ${days.toFixed(1)} days (${s.expiresAt})`);
  }
  return problems;
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2);
  const { flags } = parseArgs(argv);
  loadEnv();
  if (!isLive(argv) && !flags.has("online")) {
    const names = ["FB_PAGE_ID", "FB_PAGE_TOKEN", "IG_USER_ID", "THREADS_USER_ID", "THREADS_TOKEN", "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHANNEL", "TELEGRAM_ALERT_CHAT_ID", "IMAGE_PUBLIC_BASE_URL", "IMAGE_RSYNC_TARGET"];
    console.log("[tokens] dry run (no network). Env present:");
    for (const n of names) console.log(`    ${n.padEnd(24)} ${process.env[n] ? "set" : "MISSING"}`);
    console.log(`    would: ${flags.has("check") ? "" : "GET refresh_access_token (threads), then "}read-only checks of facebook, instagram, threads, telegram`);
    return 0;
  }
  const state = readState();
  const problems: string[] = [];
  if (!flags.has("check")) {
    try { const p = await refreshThreads(state); if (p) problems.push(p); } catch (e) { problems.push(`threads refresh: ${(e as Error).message}`); }
  }
  problems.push(...(await check(state)));
  saveState(state);
  for (const p of problems) console.error(`[tokens] PROBLEM ${p}`);
  return problems.length ? 1 : 0;
}

main().then((c) => process.exit(c), (e) => { console.error(`[tokens] ${(e as Error).message}`); process.exit(1); });
