/**
 * Paths, .env loading and the live/dry-run switch shared by every marketing script.
 * Secrets come only from environment variables; marketing/.env (gitignored) is loaded
 * at startup, and values already set in the real environment win.
 */
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

/** Absolute path of horse-racing-training/marketing. */
export const MKT_DIR = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const ENV_FILE = path.join(MKT_DIR, ".env");
export const PAUSE_FILE = path.join(MKT_DIR, "PAUSE");
export const LOG_DIR = path.join(MKT_DIR, "logs");
export const QUEUE_DIR = path.join(MKT_DIR, "queue");

export const SITE_URL = () => (process.env.MARKETING_SITE_URL || "https://posttimehk.com").replace(/\/$/, "");
export const GRAPH_VERSION = () => process.env.META_GRAPH_VERSION || "v26.0";

/** Parse KEY=VALUE lines (optional quotes, # comments). Kept tiny on purpose: no dependency. */
export function parseEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}

let loaded = false;
export function loadEnv(): void {
  if (loaded) return;
  loaded = true;
  if (!existsSync(ENV_FILE)) return;
  for (const [k, v] of Object.entries(parseEnv(readFileSync(ENV_FILE, "utf8")))) {
    if (v !== "" && process.env[k] === undefined) process.env[k] = v; // blank lines in .env mean "unset"
  }
}

/** Replace (or append) one KEY=VALUE line in marketing/.env, atomically. Used by token refresh. */
export function writeEnvValue(key: string, value: string): void {
  const text = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, "utf8") : "";
  const lines = text.split(/\r?\n/);
  const re = new RegExp(`^(?:export\\s+)?${key}\\s*=`);
  const idx = lines.findIndex((l) => re.test(l.trim()));
  if (idx >= 0) lines[idx] = `${key}=${value}`;
  else lines.splice(lines.length && lines[lines.length - 1] === "" ? lines.length - 1 : lines.length, 0, `${key}=${value}`);
  const tmp = `${ENV_FILE}.tmp`;
  writeFileSync(tmp, lines.join("\n"), { mode: 0o600 });
  renameSync(tmp, ENV_FILE);
  process.env[key] = value;
}

/** Live only when MARKETING_LIVE=1 and no --dry-run flag. Everything else is a dry run. */
export function isLive(argv: string[] = process.argv): boolean {
  return process.env.MARKETING_LIVE === "1" && !argv.includes("--dry-run");
}

export function isPaused(): boolean {
  return existsSync(PAUSE_FILE);
}

export class ConfigError extends Error {}

/** Read required env vars; throws ConfigError naming every missing one. */
export function requireEnv<K extends string>(names: readonly K[]): Record<K, string> {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) throw new ConfigError(`missing env: ${missing.join(", ")} (set them in marketing/.env)`);
  return Object.fromEntries(names.map((n) => [n, process.env[n] as string])) as Record<K, string>;
}

/** Today's date in Hong Kong as YYYY-MM-DD, and the current HK hour (0-23). */
export function hkNow(d = new Date()): { date: string; hour: number; minute: number } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(d).map((p) => [p.type, p.value]),
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour), minute: Number(parts.minute) };
}

/** Minimal --flag value / --flag parser. */
export function parseArgs(argv: string[]): { flags: Set<string>; opts: Record<string, string> } {
  const flags = new Set<string>();
  const opts: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const eq = a.indexOf("=");
    if (eq > 0) { opts[a.slice(2, eq)] = a.slice(eq + 1); continue; }
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) { opts[a.slice(2)] = next; i++; }
    else flags.add(a.slice(2));
  }
  return { flags, opts };
}
