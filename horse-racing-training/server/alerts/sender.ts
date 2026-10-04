// SMS senders for the 5★ alerts. Mock (dev default) only logs, with the phone masked; Twilio uses the
// Programmable Messaging REST API with plain fetch (no SDK).
import type { AlertsConfig } from "./config";

export interface SmsSender {
  readonly name: "mock" | "twilio";
  /** Send one SMS; resolves with the provider's message id, rejects with a readable error. */
  send(to: string, body: string): Promise<{ id: string }>;
}

/** +85291234567 → +852****4567 (logs never hold a full number). */
export const maskForLog = (phone: string) => phone.replace(/^(\+\d{3})\d+(\d{4})$/, "$1****$2");

export function mockSender(log: (line: string) => void = console.log): SmsSender {
  let n = 0;
  return {
    name: "mock",
    async send(to, body) {
      log(`[sms:mock] ${maskForLog(to)} ${body}`);
      return { id: `mock-${++n}` };
    },
  };
}

export function twilioSender(c: AlertsConfig["twilio"], fetchFn: typeof fetch = fetch): SmsSender {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(c.accountSid)}/Messages.json`;
  const auth = `Basic ${Buffer.from(`${c.accountSid}:${c.authToken}`).toString("base64")}`;
  return {
    name: "twilio",
    async send(to, body) {
      const form = new URLSearchParams({ To: to, Body: body });
      if (c.messagingServiceSid) form.set("MessagingServiceSid", c.messagingServiceSid);
      else form.set("From", c.from);
      const r = await fetchFn(url, { method: "POST", headers: { Authorization: auth, "Content-Type": "application/x-www-form-urlencoded" }, body: form });
      const j = (await r.json().catch(() => ({}))) as { sid?: string; code?: number; message?: string };
      if (!r.ok || !j.sid) throw new Error(`twilio ${r.status}${j.code ? ` ${j.code}` : ""}: ${j.message ?? "send failed"}`);
      return { id: j.sid };
    },
  };
}

export const senderFor = (c: AlertsConfig, log?: (line: string) => void): SmsSender => (c.provider === "twilio" ? twilioSender(c.twilio) : mockSender(log));
