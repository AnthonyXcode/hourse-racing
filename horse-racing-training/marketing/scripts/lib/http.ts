/**
 * fetch + JSON with retries (exponential backoff + jitter) on network errors, HTTP 5xx and 429.
 * Honours Retry-After headers and Telegram's parameters.retry_after.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number, // 0 = network error
    readonly body: unknown,
    /** True when the request may have taken effect (5xx/network on a write). Used for idempotency. */
    public ambiguous = false,
  ) {
    super(message);
  }
}

export interface RetryOptions {
  attempts?: number; // total tries, default 4
  baseMs?: number; // default 2000 -> 2s, 4s, 8s
  label?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Strip tokens from URLs before they reach logs or error messages. */
export function redact(s: string): string {
  return s
    .replace(/(access_token|client_secret|fb_exchange_token)=[^&\s"]+/g, "$1=***")
    .replace(/\/bot\d+:[A-Za-z0-9_-]+\//g, "/bot***/");
}

function retryAfterMs(res: Response, body: unknown): number | undefined {
  const h = res.headers.get("retry-after");
  if (h && /^\d+$/.test(h)) return Number(h) * 1000;
  const p = (body as { parameters?: { retry_after?: number } } | null)?.parameters?.retry_after;
  return typeof p === "number" ? p * 1000 : undefined;
}

export async function requestJson<T = unknown>(url: string, init: RequestInit = {}, opts: RetryOptions = {}): Promise<T> {
  const attempts = opts.attempts ?? 4;
  const baseMs = opts.baseMs ?? 2000;
  let last: ApiError | undefined;
  for (let i = 1; i <= attempts; i++) {
    let res: Response;
    try {
      res = await fetch(url, { ...init, signal: AbortSignal.timeout(60_000) });
    } catch (err) {
      last = new ApiError(`${opts.label ?? "request"}: network error: ${(err as Error).message}`, 0, null, true);
      if (i < attempts) { await sleep(baseMs * 2 ** (i - 1) + Math.random() * 500); continue; }
      throw last;
    }
    const text = await res.text();
    let body: unknown = text;
    try { body = text ? JSON.parse(text) : null; } catch { /* keep text */ }
    if (res.ok) {
      // Telegram reports some failures as 200 + ok:false; Graph never does.
      if (body && typeof body === "object" && (body as { ok?: boolean }).ok === false) {
        throw new ApiError(`${opts.label ?? "request"}: ${JSON.stringify(body).slice(0, 300)}`, res.status, body);
      }
      return body as T;
    }
    const retryable = res.status === 429 || res.status >= 500;
    last = new ApiError(
      redact(`${opts.label ?? "request"}: HTTP ${res.status}: ${typeof body === "string" ? body.slice(0, 300) : JSON.stringify(body).slice(0, 300)}`),
      res.status, body, res.status >= 500,
    );
    if (!retryable || i === attempts) throw last;
    const wait = Math.min(retryAfterMs(res, body) ?? baseMs * 2 ** (i - 1) + Math.random() * 500, 120_000);
    console.error(`[retry] ${opts.label ?? "request"} HTTP ${res.status}; attempt ${i}/${attempts}, waiting ${Math.round(wait / 1000)}s`);
    await sleep(wait);
  }
  throw last ?? new ApiError("unreachable", 0, null);
}

/** Form-encoded body for Graph/Threads POSTs (keeps tokens out of the URL). */
export function form(params: Record<string, string | undefined>): URLSearchParams {
  const f = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined) f.set(k, v);
  return f;
}

/** Poll until done() returns true, every intervalMs, up to timeoutMs. */
export async function pollUntil(check: () => Promise<boolean>, intervalMs: number, timeoutMs: number, label: string): Promise<void> {
  const start = Date.now();
  for (;;) {
    if (await check()) return;
    if (Date.now() - start > timeoutMs) throw new ApiError(`${label}: not ready after ${Math.round(timeoutMs / 1000)}s`, 0, null);
    await sleep(intervalMs);
  }
}
