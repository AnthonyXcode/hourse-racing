// 5★ pick SMS alerts: configuration from the environment and the production guard.
//   SMS_ALERTS=0|1        kill switch. Default: on in development (mock sender), OFF in production unless set.
//   SMS_PROVIDER=mock|twilio   default mock in development, twilio in production.
//   TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN (shared with the OTP provider), and one of
//   TWILIO_MESSAGING_SERVICE_SID (preferred: sender pool, HK sender ID) or TWILIO_SMS_FROM.

export interface AlertsConfig {
  production: boolean;
  enabled: boolean;
  provider: "mock" | "twilio";
  twilio: { accountSid: string; authToken: string; messagingServiceSid: string; from: string };
  /** Site origin for the short link in a truncated SMS (first APP_ORIGIN). */
  appOrigin: string;
  /** Sends per second, at most. */
  perSecond: number;
}

export function loadAlertsConfig(env: NodeJS.ProcessEnv = process.env): AlertsConfig {
  const production = env.NODE_ENV === "production";
  const appOrigin = (env.APP_ORIGIN || "http://localhost:5173").split(",")[0]!.trim().replace(/\/$/, "");
  return {
    production,
    enabled: env.SMS_ALERTS === undefined || env.SMS_ALERTS === "" ? !production : env.SMS_ALERTS === "1",
    provider: (env.SMS_PROVIDER || (production ? "twilio" : "mock")) as AlertsConfig["provider"],
    twilio: {
      accountSid: env.TWILIO_ACCOUNT_SID ?? "",
      authToken: env.TWILIO_AUTH_TOKEN ?? "",
      messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID ?? "",
      from: env.TWILIO_SMS_FROM ?? "",
    },
    appOrigin,
    perSecond: 5,
  };
}

/** Problems that must stop a production server from starting (only when alerts are switched on). */
export function alertsProductionProblems(c: AlertsConfig): string[] {
  if (!c.production || !c.enabled) return [];
  const out: string[] = [];
  if (c.provider !== "twilio") out.push(`SMS_PROVIDER must be "twilio" when SMS_ALERTS=1 in production (got "${c.provider}")`);
  if (!c.twilio.accountSid) out.push("TWILIO_ACCOUNT_SID is not set (SMS alerts)");
  if (!c.twilio.authToken) out.push("TWILIO_AUTH_TOKEN is not set (SMS alerts)");
  if (!c.twilio.messagingServiceSid && !c.twilio.from) out.push("TWILIO_MESSAGING_SERVICE_SID or TWILIO_SMS_FROM must be set (SMS alerts)");
  return out;
}
