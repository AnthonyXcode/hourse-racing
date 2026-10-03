// Cloudflare Turnstile server-side check (PRD §5.1).
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** True only when Cloudflare says the token is valid. Missing token, network errors and timeouts → false. */
export async function verifyTurnstile(
  secret: string,
  token: unknown,
  remoteip: string | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<boolean> {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (remoteip) form.set("remoteip", remoteip);
  try {
    const r = await fetchImpl(SITEVERIFY, { method: "POST", body: form, signal: AbortSignal.timeout(10_000) });
    if (!r.ok) return false;
    const body = (await r.json()) as { success?: unknown };
    return body.success === true;
  } catch {
    return false;
  }
}
