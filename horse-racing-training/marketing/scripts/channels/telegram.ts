/**
 * Telegram channel via the Bot API (bot is an admin of the channel with "Post messages").
 *   text:  POST /bot<token>/sendMessage  chat_id=@channel text parse_mode?
 *   photo: POST /bot<token>/sendPhoto    chat_id photo=<url | multipart> caption parse_mode?
 * Limits: text 4096, caption 1024 (after entity parsing). Photo by URL <= 5 MB, upload <= 10 MB.
 * Docs: https://core.telegram.org/bots/api#sendmessage  https://core.telegram.org/bots/api#sendphoto
 */
import { requireEnv } from "../lib/env.js";
import { fileBlob } from "../lib/image.js";
import { requestJson } from "../lib/http.js";
import { finalStep, type Adapter, type Post } from "./types.js";

interface TgMessage { message_id: number }

export function telegramApi(token: string, method: string): string {
  return `https://api.telegram.org/bot${token}/${method}`;
}

export const telegram: Adapter = {
  channel: "telegram",
  requiredEnv: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHANNEL"],

  validate(post) {
    const errs: string[] = [];
    const len = [...post.text].length;
    if (post.images.length === 0 && len > 4096) errs.push(`telegram text ${len} > 4096`);
    if (post.images.length > 0 && len > 1024) errs.push(`telegram photo caption ${len} > 1024`);
    if (post.images.length > 1) errs.push("telegram adapter sends one photo; pass a single image");
    return errs;
  },

  plan(post) {
    const img = post.images[0];
    const pm = post.parseMode ? ` parse_mode=${post.parseMode}` : "";
    return img
      ? [`POST api.telegram.org/bot***/sendPhoto chat_id={TELEGRAM_CHANNEL} photo=${img.url ?? `multipart ${img.localPath}`} caption=<${[...post.text].length} chars>${pm}`]
      : [`POST api.telegram.org/bot***/sendMessage chat_id={TELEGRAM_CHANNEL} text=<${[...post.text].length} chars>${pm}`];
  },

  async publish(post: Post) {
    const env = requireEnv(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHANNEL"] as const);
    const img = post.images[0];
    let msg: TgMessage;
    if (!img) {
      msg = (await finalStep(requestJson<{ result: TgMessage }>(telegramApi(env.TELEGRAM_BOT_TOKEN, "sendMessage"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHANNEL, text: post.text, parse_mode: post.parseMode }),
      }, { label: "telegram sendMessage" }))).result;
    } else if (img.url) {
      msg = (await finalStep(requestJson<{ result: TgMessage }>(telegramApi(env.TELEGRAM_BOT_TOKEN, "sendPhoto"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHANNEL, photo: img.url, caption: post.text, parse_mode: post.parseMode }),
      }, { label: "telegram sendPhoto" }))).result;
    } else {
      const fd = new FormData();
      fd.set("chat_id", env.TELEGRAM_CHANNEL);
      fd.set("caption", post.text);
      if (post.parseMode) fd.set("parse_mode", post.parseMode);
      fd.set("photo", fileBlob(img.localPath!), "image.jpg");
      msg = (await finalStep(requestJson<{ result: TgMessage }>(telegramApi(env.TELEGRAM_BOT_TOKEN, "sendPhoto"), { method: "POST", body: fd }, { label: "telegram sendPhoto" }))).result;
    }
    const ch = env.TELEGRAM_CHANNEL.startsWith("@") ? env.TELEGRAM_CHANNEL.slice(1) : undefined;
    return { id: String(msg.message_id), url: ch ? `https://t.me/${ch}/${msg.message_id}` : undefined };
  },
};
