#!/usr/bin/env tsx
/**
 * One-time (and after any logout / security check): open the marketing Chrome profile so the owner can log into
 * Facebook, Instagram and Threads by hand. Close the window when done; then it reports which sites are logged in.
 *
 *   npx tsx marketing/scripts/browser-login.ts            # open all three
 *   npx tsx marketing/scripts/browser-login.ts --check    # no window interaction: just report login state
 */
import { loadEnv, parseArgs } from "./lib/env.js";
import { HOME, WEB_CHANNELS, loggedOut, openContext, type WebChannel } from "./browser/session.js";
import type { BrowserContext } from "playwright";

/** True when the site shows a logged-in page (no login form / redirect). */
async function loggedIn(ctx: BrowserContext, c: WebChannel): Promise<boolean> {
  const page = await ctx.newPage();
  try {
    await page.goto(HOME[c], { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(6000);
    return !(await loggedOut(page));
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  loadEnv();
  const { flags } = parseArgs(process.argv.slice(2));
  if (!flags.has("check")) {
    const ctx = await openContext({ headless: false });
    for (const c of WEB_CHANNELS) await (await ctx.newPage()).goto(HOME[c]);
    await ctx.pages()[0]?.close().catch(() => {}); // the blank start tab
    console.log("Log into Facebook, Instagram and Threads in the Chrome window (tick 'remember this browser' / 'save login').");
    console.log("Close the window when you're done.");
    await new Promise<void>((resolve) => ctx.on("close", () => resolve()));
  }
  const ctx = await openContext({ headless: true });
  let ok = true;
  for (const c of WEB_CHANNELS) {
    const yes = await loggedIn(ctx, c);
    ok &&= yes;
    console.log(`${c.padEnd(10)} ${yes ? "logged in" : "NOT logged in"}`);
  }
  await ctx.close();
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(2);
});
