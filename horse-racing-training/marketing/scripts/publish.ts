#!/usr/bin/env tsx
/**
 * Post Time marketing publisher. DRY RUN unless MARKETING_LIVE=1 (and no --dry-run flag).
 *
 * One post:
 *   npx tsx marketing/scripts/publish.ts --channel facebook|instagram|threads|telegram \
 *     --text-file <path> [--image <path-or-url>[,<path-or-url>...]] [--slot YYYY-MM-DD/<slot-id>] \
 *     [--parse-mode HTML] [--dry-run] [--force]
 * A whole queue slot (every <channel>.md in the folder):
 *   npx tsx marketing/scripts/publish.ts --queue marketing/queue/2026-10-25/race-1400 [--channel threads] [--dry-run]
 *
 * Kill switch: if marketing/PAUSE exists nothing is published (exit 0).
 * Idempotent per (mode, slot, channel); every outcome is appended to marketing/logs/publish.jsonl.
 * Exit: 0 = all published/dry-run/skipped-duplicate/paused, 1 = some post failed or was invalid, 2 = usage error.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { ConfigError, MKT_DIR, QUEUE_DIR, isLive, isPaused, loadEnv, parseArgs } from "./lib/env.js";
import { parseImageArg, type ImageRef } from "./lib/image.js";
import { appendLog, claim, type Mode } from "./lib/log.js";
import { CHANNELS, type Adapter, type Channel, type Post } from "./channels/types.js";
import { facebook } from "./channels/facebook.js";
import { instagram } from "./channels/instagram.js";
import { threads } from "./channels/threads.js";
import { telegram } from "./channels/telegram.js";
import { webAdapter } from "./channels/web.js";
import { browserChannels } from "./browser/session.js";

const API_ADAPTERS: Record<Channel, Adapter> = { facebook, instagram, threads, telegram };
/** API adapter, or the browser one for channels listed in BROWSER_CHANNELS (personal accounts). Call after loadEnv(). */
const adapterFor = (c: Channel): Adapter => (c !== "telegram" && browserChannels().has(c) ? webAdapter(c, API_ADAPTERS[c]) : API_ADAPTERS[c]);
const MULTI_IMAGE: ReadonlySet<Channel> = new Set(["instagram", "threads"]);
const SLOT_RE = /^\d{4}-\d{2}-\d{2}\/[a-z0-9][a-z0-9-]*$/;
const IMG_EXT = [".jpg", ".jpeg", ".png"];

const USAGE = `usage: publish.ts --channel <${CHANNELS.join("|")}> --text-file <path> [--image <path-or-url>[,...]] [--slot YYYY-MM-DD/<slot>] [--parse-mode HTML] [--dry-run] [--force]
       publish.ts --queue <marketing/queue/YYYY-MM-DD/<slot>> [--channel <c>] [--dry-run] [--force]`;

/** Mechanical guard checks shared by all channels (content rules live in the marketing skill). */
function guard(text: string): string[] {
  const errs: string[] = [];
  if (!text.trim()) errs.push("empty text");
  if (/\{\{|\}\}|\[\[|\]\]|\bTODO\b|\bTBD\b|lorem ipsum|<placeholder>/i.test(text)) errs.push("placeholder left in text");
  // Tags (PLAN §4): at least 5 per post, never the brand (the post already names it).
  const tags = [...text.matchAll(/(?<![\w&/])#([\p{L}\p{N}_]+)/gu)].map((m) => m[1]!);
  if (new Set(tags.map((t) => t.toLowerCase())).size < 5) errs.push(`needs at least 5 hashtags (has ${tags.length})`);
  const brand = tags.filter((t) => /^(開跑前|post_?time(hk)?)$/i.test(t));
  if (brand.length) errs.push(`brand hashtag not allowed: ${brand.map((t) => `#${t}`).join(" ")}`);
  const blockFile = path.join(MKT_DIR, "guard-blocklist.txt"); // optional, one regex per line, owned by content
  if (existsSync(blockFile)) {
    for (const line of readFileSync(blockFile, "utf8").split(/\r?\n/)) {
      const pat = line.trim();
      if (!pat || pat.startsWith("#")) continue;
      if (new RegExp(pat, "iu").test(text)) errs.push(`blocked phrase matched /${pat}/`);
    }
  }
  return errs;
}

function slotFromPath(p: string): string | undefined {
  const rel = path.relative(QUEUE_DIR, path.resolve(p));
  if (rel.startsWith("..")) return undefined;
  const [date, slot] = rel.split(path.sep);
  const key = `${date}/${slot}`;
  return SLOT_RE.test(key) ? key : undefined;
}

function readText(p: string): string {
  return readFileSync(p, "utf8").replace(/^﻿/, "").trim();
}

/** Images for a channel in a queue folder: <channel>[-N].{jpg,png} beats image[-N].{jpg,png}; *.image-url files hold URLs. */
function queueImages(dir: string, channel: Channel): ImageRef[] {
  const files = readdirSync(dir).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const pick = (stem: string): ImageRef[] => {
    const locals = files
      .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()) && new RegExp(`^${stem}(-\\d+)?\\.`, "i").test(f))
      .map((f) => ({ localPath: path.join(dir, f) }));
    const urlFile = [`${stem}.image-url`, `${stem}-url.txt`].map((f) => path.join(dir, f)).find(existsSync);
    const urls = urlFile ? readText(urlFile).split(/\s+/).filter((u) => /^https?:\/\//.test(u)).map((url) => ({ url })) : [];
    return [...locals, ...urls];
  };
  const own = pick(channel);
  const imgs = own.length ? own : pick("image");
  return MULTI_IMAGE.has(channel) ? imgs : imgs.slice(0, 1);
}

function buildPosts(opts: Record<string, string>): Post[] {
  if (opts.queue) {
    const dir = path.resolve(opts.queue);
    const slot = opts.slot ?? slotFromPath(dir);
    if (!slot) throw new ConfigError(`queue dir must be marketing/queue/YYYY-MM-DD/<slot> (got ${dir})`);
    if (!existsSync(dir)) throw new ConfigError(`queue dir not found: ${dir}`);
    const only = opts.channel as Channel | undefined;
    const posts: Post[] = [];
    for (const channel of CHANNELS) {
      if (only && only !== channel) continue;
      const md = path.join(dir, `${channel}.md`);
      const html = channel === "telegram" ? path.join(dir, "telegram.html") : "";
      const file = existsSync(md) ? md : html && existsSync(html) ? html : undefined;
      if (!file) continue;
      posts.push({ channel, slot, text: readText(file), images: queueImages(dir, channel), parseMode: file === html ? "HTML" : undefined });
    }
    if (!posts.length) throw new ConfigError(`no <channel>.md files in ${dir}`);
    return posts;
  }
  const channel = opts.channel as Channel;
  if (!CHANNELS.includes(channel) || !opts["text-file"]) throw new ConfigError(USAGE);
  const textFile = path.resolve(opts["text-file"]);
  if (!existsSync(textFile)) throw new ConfigError(`text file not found: ${textFile}`);
  const slot = opts.slot ?? slotFromPath(path.dirname(textFile));
  if (!slot) throw new ConfigError("--slot YYYY-MM-DD/<slot-id> is required when the text file is not under marketing/queue/<date>/<slot>/");
  const images = (opts.image ?? "").split(",").map((s) => s.trim()).filter(Boolean).map((s) => parseImageArg(s)!);
  const pm = opts["parse-mode"];
  if (pm && pm !== "HTML" && pm !== "MarkdownV2") throw new ConfigError("--parse-mode must be HTML or MarkdownV2");
  return [{ channel, slot, text: readText(textFile), images, parseMode: pm as Post["parseMode"] }];
}

const describeImages = (imgs: ImageRef[]) => imgs.map((i) => i.url ?? path.relative(MKT_DIR, i.localPath!)).join(",") || undefined;

async function main(): Promise<number> {
  const argv = process.argv.slice(2);
  const { flags, opts } = parseArgs(argv);
  if (flags.has("help")) { console.log(USAGE); return 0; }
  loadEnv();
  const mode: Mode = isLive(argv) ? "live" : "dry-run";
  const force = flags.has("force");

  let posts: Post[];
  try { posts = buildPosts(opts); } catch (e) {
    console.error(`[publish] ${(e as Error).message}`);
    return 2;
  }
  for (const p of posts) if (!SLOT_RE.test(p.slot)) { console.error(`[publish] bad slot "${p.slot}" (want YYYY-MM-DD/<slot-id>)`); return 2; }

  if (isPaused()) {
    for (const p of posts) appendLog({ mode, slot: p.slot, channel: p.channel, status: "paused" });
    console.log("[publish] marketing/PAUSE exists: nothing published");
    return 0;
  }

  console.log(`[publish] mode=${mode}${mode === "dry-run" ? " (set MARKETING_LIVE=1 to publish for real)" : ""}`);
  let failures = 0;
  for (const post of posts) {
    const a = adapterFor(post.channel);
    const base = {
      mode, slot: post.slot, channel: post.channel,
      textSha: createHash("sha256").update(post.text).digest("hex").slice(0, 12),
      chars: [...post.text].length, image: describeImages(post.images),
    };
    const problems = [...guard(post.text), ...a.validate(post)];
    if (mode === "live") {
      const missing = a.requiredEnv.filter((k) => !process.env[k] && !(k === "FB_PAGE_TOKEN" && process.env.IG_TOKEN));
      if (missing.length) problems.push(`missing env: ${missing.join(", ")}`);
    }
    if (problems.length) {
      failures++;
      appendLog({ ...base, status: "invalid", error: problems.join("; ") });
      console.error(`[${post.channel}] INVALID ${post.slot}: ${problems.join("; ")}`);
      continue;
    }

    const c = claim(mode, post.slot, post.channel, force);
    if (!c.ok) {
      const dup = c.existing.status === "published";
      if (!dup) failures++;
      appendLog({ ...base, status: dup ? "skipped-duplicate" : "skipped-unknown", postId: c.existing.postId, error: dup ? undefined : `previous attempt ${c.existing.status}${c.existing.ambiguous ? " (may have posted)" : ""}; check the channel, then rerun with --force if it did not post` });
      console.log(`[${post.channel}] ${dup ? "already published" : "previous attempt unresolved (check manually, then --force)"}: ${post.slot}`);
      continue;
    }

    if (mode === "dry-run") {
      c.release({ status: "published", postId: "dry-run" });
      appendLog({ ...base, status: "dry-run" });
      console.log(`[${post.channel}] DRY RUN ${post.slot} (${base.chars} chars${base.image ? `, image ${base.image}` : ""})`);
      for (const step of a.plan(post)) console.log(`    ${step}`);
      continue;
    }

    try {
      const r = await a.publish(post);
      c.release({ status: "published", postId: r.id, url: r.url });
      appendLog({ ...base, status: "published", postId: r.id, url: r.url });
      console.log(`[${post.channel}] published ${post.slot} -> ${r.url ?? r.id}`);
    } catch (e) {
      failures++;
      const ambiguous = Boolean((e as { ambiguous?: boolean }).ambiguous);
      const msg = (e as Error).message;
      c.release({ status: "failed", error: msg, ambiguous });
      appendLog({ ...base, status: "failed", error: msg, ambiguous });
      console.error(`[${post.channel}] FAILED ${post.slot}${ambiguous ? " (may have posted; not retried automatically)" : ""}: ${msg}`);
    }
  }
  return failures ? 1 : 0;
}

main().then((code) => process.exit(code), (e) => {
  console.error(`[publish] ${(e as Error).stack ?? e}`);
  process.exit(e instanceof ConfigError ? 2 : 1);
});
