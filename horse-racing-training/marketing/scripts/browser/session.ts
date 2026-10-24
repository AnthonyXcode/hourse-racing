/**
 * Browser publishing for personal accounts (no API): Playwright drives the installed Google Chrome on a dedicated
 * profile, marketing/.browser-profile (gitignored), that the owner logs into once with browser-login.ts.
 *
 * Env:
 *   BROWSER_CHANNELS   comma list of channels to publish through the browser (e.g. facebook,instagram,threads)
 *   BROWSER_HEADLESS   1 = no window (Meta is likelier to challenge a headless browser; default shows the window)
 *   BROWSER_SLOWMO_MS  delay between actions (default 120)
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium, type BrowserContext, type Page } from "playwright";
import { LOG_DIR, MKT_DIR } from "../lib/env.js";
import type { Channel, Post, PublishResult } from "../channels/types.js";

export const PROFILE_DIR = path.join(MKT_DIR, ".browser-profile");
export const SHOT_DIR = path.join(LOG_DIR, "browser");

export type WebChannel = Exclude<Channel, "telegram">;
export const WEB_CHANNELS: readonly WebChannel[] = ["facebook", "instagram", "threads"];
export const HOME: Record<WebChannel, string> = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  threads: "https://www.threads.com/",
};

/** Channels the owner switched to browser publishing. */
export function browserChannels(): Set<Channel> {
  return new Set(
    (process.env.BROWSER_CHANNELS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s): s is WebChannel => (WEB_CHANNELS as readonly string[]).includes(s))
  );
}

export class NotLoggedIn extends Error {}

/** Thrown after the final "Post" click when success can't be confirmed: the post may be live, so never auto-retry. */
export class Ambiguous extends Error {
  readonly ambiguous = true;
}

export async function openContext(opts: { headless?: boolean } = {}): Promise<BrowserContext> {
  mkdirSync(PROFILE_DIR, { recursive: true });
  return chromium.launchPersistentContext(PROFILE_DIR, {
    channel: "chrome",
    headless: opts.headless ?? process.env.BROWSER_HEADLESS === "1",
    slowMo: Number(process.env.BROWSER_SLOWMO_MS ?? 120),
    viewport: { width: 1280, height: 900 },
    locale: "zh-HK",
    timezoneId: "Asia/Hong_Kong",
    args: ["--disable-blink-features=AutomationControlled"],
  });
}

/** A screenshot for the owner to inspect (rehearsals, failures). Returns its path. */
export async function shot(page: Page, name: string): Promise<string> {
  mkdirSync(SHOT_DIR, { recursive: true });
  const file = path.join(SHOT_DIR, `${new Date().toISOString().replace(/[:.]/g, "-")}-${name}.png`);
  await page.screenshot({ path: file }).catch(() => {});
  return file;
}

/**
 * Logged-out signs (checked after the page settles): a login URL, any visible password box (Facebook and Instagram
 * login forms), or Threads' "Continue with Instagram" / "Log in" buttons.
 */
export async function loggedOut(page: Page): Promise<boolean> {
  if (/\/(login|checkpoint)|accounts\/login/.test(page.url())) return true;
  if (await page.locator('input[type="password"]').first().isVisible().catch(() => false)) return true;
  const gate = page.getByRole("button", { name: /continue with instagram|使用 instagram 帳戶繼續|^log in$|^登入$/i }).first();
  return gate.isVisible().catch(() => false);
}

/** Short human-ish pause. */
export const pause = (page: Page, ms = 600) => page.waitForTimeout(ms + Math.round(Math.random() * ms * 0.5));

/** One site's composer: fill text + images, then click the final button only when `submit`. */
export type Composer = (page: Page, post: Post, opts: { submit: boolean }) => Promise<PublishResult>;

/** Run one composer in a fresh tab; on failure, keep a screenshot and add its path to the error. */
export async function runComposer(
  channel: WebChannel,
  compose: Composer,
  post: Post,
  opts: { submit: boolean; context?: BrowserContext; discard?: (page: Page) => Promise<boolean> }
): Promise<PublishResult & { screenshot?: string; discarded?: boolean }> {
  const ctx = opts.context ?? (await openContext());
  const page = await ctx.newPage();
  try {
    const r = await compose(page, post, opts);
    const screenshot = opts.submit ? undefined : await shot(page, `rehearse-${channel}`);
    const discarded = !opts.submit && opts.discard ? await opts.discard(page).catch(() => false) : undefined;
    return { ...r, screenshot, discarded };
  } catch (e) {
    const file = await shot(page, `failed-${channel}`);
    (e as Error).message += ` (screenshot: ${path.relative(MKT_DIR, file)})`;
    throw e;
  } finally {
    await page.close().catch(() => {});
    if (!opts.context) await ctx.close().catch(() => {});
  }
}
