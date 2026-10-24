/**
 * Composer drivers for facebook.com, instagram.com and threads.com on a personal account.
 *
 * These sites change their markup often and have no stable test ids, so every step looks for accessible roles and
 * labels in English and Traditional Chinese, and fails with a clear message (plus a screenshot, see runComposer).
 * When a site changes, fix the matching regex here and check with browser-rehearse.ts (fills, never posts).
 */
import type { Locator, Page } from "playwright";
import type { Post } from "../channels/types.js";
import { Ambiguous, NotLoggedIn, loggedOut, pause, type Composer } from "./session.js";

/** Local image paths (browser upload needs files, not URLs). */
function files(post: Post): string[] {
  return post.images.map((i) => {
    if (!i.localPath) throw new Error(`browser upload needs a local image file, got URL ${i.url}`);
    return i.localPath;
  });
}

/** First visible match among candidates, or throw `what` after `timeout` ms. */
async function first(what: string, candidates: Locator[], timeout = 15_000): Promise<Locator> {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    for (const c of candidates) {
      const l = c.first();
      if (await l.isVisible().catch(() => false)) return l;
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`could not find ${what}`);
}

/** Type like a paste (one input event per line), so emoji and CJK survive. */
async function typeText(page: Page, box: Locator, text: string) {
  await box.click();
  await pause(page, 300);
  const lines = text.split("\n");
  for (const [i, line] of lines.entries()) {
    if (line) await page.keyboard.insertText(line);
    if (i < lines.length - 1) await page.keyboard.press("Shift+Enter");
  }
  await pause(page);
}

const btn = (scope: Page | Locator, name: RegExp) => scope.getByRole("button", { name });

// ---- Facebook (personal profile, posts to your own timeline with the composer's current audience) ----
export const facebookWeb: Composer = async (page, post, { submit }) => {
  await page.goto("https://www.facebook.com/", { waitUntil: "domcontentloaded" });
  await pause(page, 2500);
  if (await loggedOut(page)) throw new NotLoggedIn("facebook: not logged in (run browser-login.ts)");

  const open = await first("Facebook composer (\"What's on your mind?\")", [
    btn(page, /what's on your mind|在想(什麼|甚麼|些什麼)/i),
    page.getByText(/what's on your mind|在想(什麼|甚麼|些什麼)/i),
  ]);
  await open.click();
  const dialog = page.getByRole("dialog").filter({ has: page.getByRole("textbox") }).last();
  // One-off interstitials before the composer ("Review audience" → Continue → pick the default audience);
  // afterwards Facebook may drop back to the feed, so reopen the composer.
  for (let i = 0; i < 6 && !(await dialog.isVisible().catch(() => false)); i++) {
    if (i === 3) {
      await page.keyboard.press("Escape").catch(() => {});
      await pause(page);
      await open.click().catch(() => {});
      continue;
    }
    await pause(page, 1200);
    const pub = page.getByRole("radio", { name: /public|公開/i }).first();
    if (await pub.isVisible().catch(() => false)) {
      await pub.click();
      await pause(page, 400);
      const ok = btn(page, /^(done|save|set as default|完成|儲存|設為預設)$/i).last();
      if (await ok.isVisible().catch(() => false)) await ok.click();
      continue;
    }
    const cont = btn(page, /^(continue|next|got it|ok|繼續|下一步|知道了|確定)$/i).last();
    if (await cont.isVisible().catch(() => false)) await cont.click();
  }
  await dialog.waitFor({ timeout: 15_000 });

  // Audience: promotion posts must be Public. The composer remembers the last choice, so this is usually a no-op.
  const isPublic = () => dialog.getByText(/^(public|公開)$/i).first().isVisible().catch(() => false);
  if (!(await isPublic())) {
    const audience = await first("audience button", [dialog.getByRole("button", { name: /privacy|私隱|隱私|sharing with|分享對象|friends|朋友|only me|只限自己|custom|自訂/i })], 8_000);
    await audience.click();
    await pause(page);
    await (await first("Public audience option", [page.getByRole("radio", { name: /public|公開/i }), page.getByText(/^(public|公開)$/i)])).click();
    await pause(page, 400);
    const done = btn(page, /^(done|save|完成|儲存)$/i).last();
    if (await done.isVisible().catch(() => false)) await done.click();
    await pause(page);
    if (!(await isPublic())) throw new Error("facebook: could not set the audience to Public");
  }

  if (post.images.length) {
    const photo = await first("Photo/video button", [btn(dialog, /photo\/video|相片\/影片|相片／影片|照片\/影片/i), dialog.getByLabel(/photo\/video|相片\/影片|照片\/影片/i)]);
    const chooser = page.waitForEvent("filechooser", { timeout: 10_000 }).catch(() => null);
    await photo.click();
    const fc = await chooser;
    if (fc) await fc.setFiles(files(post));
    else await dialog.locator('input[type="file"]').first().setInputFiles(files(post));
    await pause(page, 2500);
    // The photo preview must show up, or the post would go out as text only.
    await first("photo attached (\"Remove post attachment\")", [btn(dialog, /remove post attachment|edit photos|移除.*附件|編輯相片|編輯照片/i)], 20_000)
      .catch(() => { throw new Error("facebook: photo preview did not appear after attaching the image"); });
  }

  await typeText(page, await first("post text box", [dialog.getByRole("textbox")]), post.text);
  if (!submit) return { id: "rehearsal" };

  // Newer composers go Next → Post; older ones Post directly.
  const next = btn(dialog, /^(next|下一步)$/i).first();
  if (await next.isVisible().catch(() => false)) {
    await next.click();
    await pause(page, 1500);
  }
  // Facebook keeps a second, empty dialog in the DOM: search the composer itself, then any dialog.
  const postBtn = await first("Post button", [btn(dialog, /^(post|發佈|發布|發帖|分享)$/i), btn(page.getByRole("dialog"), /^(post|發佈|發布|發帖|分享)$/i)]);
  await postBtn.click();
  try {
    await dialog.waitFor({ state: "hidden", timeout: 90_000 });
  } catch {
    throw new Ambiguous("facebook: clicked Post but the composer did not close; check your profile before retrying");
  }
  await pause(page, 3000);
  return { id: "facebook-web", url: "https://www.facebook.com/me" };
};

// ---- Instagram (feed post; at least one image) ----
export const instagramWeb: Composer = async (page, post, { submit }) => {
  if (!post.images.length) throw new Error("instagram needs an image");
  await page.goto("https://www.instagram.com/", { waitUntil: "domcontentloaded" });
  await pause(page, 2500);
  if (await loggedOut(page)) throw new NotLoggedIn("instagram: not logged in (run browser-login.ts)");

  const create = await first("Instagram Create / New post", [
    page.locator('svg[aria-label="New post"], svg[aria-label="新貼文"], svg[aria-label="新帖子"], svg[aria-label="建立"], svg[aria-label="Create"]'),
    page.getByRole("link", { name: /^(create|new post|建立|新貼文|新帖子)$/i }),
  ]);
  await create.click();
  await pause(page);
  // Some versions open a small menu: Post / Live / Ad.
  const postItem = page.getByRole("link", { name: /^(post|貼文|帖子)$/i }).or(page.getByText(/^(post|貼文|帖子)$/i)).first();
  if (await postItem.isVisible().catch(() => false)) await postItem.click();

  const dialog = page.getByRole("dialog").last();
  await dialog.waitFor({ timeout: 15_000 });
  await dialog.locator('input[type="file"]').first().setInputFiles(files(post));
  await pause(page, 2500);

  for (let i = 0; i < 2; i++) {
    const next = await first("Next button", [page.getByRole("button", { name: /^(next|下一步)$/i }), page.getByText(/^(next|下一步)$/i)]);
    await next.click();
    await pause(page, 1500);
  }
  const caption = await first("caption box", [
    page.getByRole("textbox", { name: /caption|說明|文字/i }),
    page.getByRole("dialog").last().getByRole("textbox"),
  ]);
  await typeText(page, caption, post.text);
  if (!submit) return { id: "rehearsal" };

  const share = await first("Share button", [page.getByRole("button", { name: /^(share|分享)$/i }), page.getByText(/^(share|分享)$/i)]);
  await share.click();
  try {
    await page.getByText(/your post has been shared|post shared|已分享你的(貼文|帖子)|你的(貼文|帖子)已(分享|發佈)/i).first().waitFor({ timeout: 120_000 });
  } catch {
    throw new Ambiguous("instagram: clicked Share but saw no confirmation; check your profile before retrying");
  }
  await page.keyboard.press("Escape").catch(() => {});
  return { id: "instagram-web", url: "https://www.instagram.com/" };
};

// ---- Threads (text, up to 10 images in the web composer) ----
export const threadsWeb: Composer = async (page, post, { submit }) => {
  await page.goto("https://www.threads.com/", { waitUntil: "domcontentloaded" });
  await pause(page, 2500);
  if (await loggedOut(page)) throw new NotLoggedIn("threads: not logged in (run browser-login.ts)");

  const open = await first("Threads composer (\"What's new?\")", [
    page.getByText(/what's new\?|有什麼新鮮事|有甚麼新鮮事|有什麼新消息/i),
    page.locator('svg[aria-label="Create"], svg[aria-label="建立"], svg[aria-label="新增"]'),
  ]);
  await open.click();
  const dialog = page.getByRole("dialog").filter({ has: page.getByRole("textbox") }).last();
  await dialog.waitFor({ timeout: 15_000 }).catch(async () => {
    if (await loggedOut(page)) throw new NotLoggedIn("threads: not logged in (run browser-login.ts)");
    throw new Error("threads: composer dialog did not open");
  });

  // Threads has one real tag per post, the topic (「社群或主題」 / "Add a topic"): use the post's first #tag.
  // Typed #tags stay plain text, so the topic is set through its own field and picked from the suggestions.
  const topic = post.text.match(/(?<![\w&/])#([\p{L}\p{N}_]+)/u)?.[1];
  if (topic) await setThreadsTopic(page, dialog, topic);

  await typeText(page, await first("post text box", [dialog.getByRole("textbox")]), post.text);
  if (post.images.length) {
    await dialog.locator('input[type="file"]').first().setInputFiles(files(post));
    await pause(page, 2500);
  }
  if (!submit) return { id: "rehearsal" };

  const postBtn = await first("Post button", [btn(dialog, /^(post|發佈|發布|發文)$/i), dialog.getByText(/^(post|發佈|發布|發文)$/i)]);
  await postBtn.click();
  try {
    await dialog.waitFor({ state: "hidden", timeout: 90_000 });
  } catch {
    throw new Ambiguous("threads: clicked Post but the composer did not close; check your profile before retrying");
  }
  await pause(page, 3000);
  return { id: "threads-web", url: "https://www.threads.com/" };
};

/** Fill Threads' topic field and choose the matching suggestion (or create it). */
async function setThreadsTopic(page: Page, dialog: Locator, topic: string) {
  const field = await first("Threads topic field (「社群或主題」)", [
    dialog.getByPlaceholder(/社群或主題|新增主題|add a topic|community or topic|topic/i),
    page.getByPlaceholder(/社群或主題|新增主題|add a topic|community or topic/i),
  ], 8_000);
  await field.click();
  await pause(page);
  await page.keyboard.insertText(topic);
  await pause(page, 1500);
  // Exact suggestion first, else the first option in the list.
  const option = await first(`topic suggestion "${topic}"`, [
    page.getByRole("option", { name: new RegExp(`^#?${topic}\\b`, "i") }),
    page.getByRole("option"),
    page.getByRole("menuitem"),
  ], 8_000);
  await option.click();
  await pause(page);
}

/**
 * Rehearsal clean-up: close the open composer and refuse to keep a draft, so rehearsals leave nothing behind.
 * Returns false when the site didn't confirm (the caller logs it; a leftover draft is harmless).
 */
export async function discardComposer(page: Page): Promise<boolean> {
  const close = await first("composer close / cancel", [
    page.getByRole("button", { name: /^(取消|cancel)$/i }),
    page.getByRole("button", { name: /close composer|close|關閉/i }),
    page.locator('svg[aria-label="Close"], svg[aria-label="關閉"]'),
  ], 5_000).catch(() => null);
  if (!close) return false;
  await close.click();
  await pause(page, 800);
  // "Save as draft?" / "Discard post?" prompt: always the non-saving choice.
  const no = await first("discard choice", [
    page.getByRole("button", { name: /^(don't save|do not save|discard|delete|不要儲存|不儲存|捨棄|刪除|放棄)$/i }),
    page.getByText(/^(don't save|discard|不要儲存|不儲存|捨棄|放棄)$/i),
  ], 5_000).catch(() => null);
  if (no) {
    await no.click();
    await pause(page, 800);
  }
  // Done only when no composer (a dialog with a text box) is left open.
  const left = page.getByRole("dialog").filter({ has: page.getByRole("textbox") });
  for (let i = 0; i < 10 && (await left.first().isVisible().catch(() => false)); i++) await pause(page, 300);
  return !(await left.first().isVisible().catch(() => false));
}

export const COMPOSERS = { facebook: facebookWeb, instagram: instagramWeb, threads: threadsWeb } as const;
