// Admin API client. Every write carries an Idempotency-Key (one per confirm dialog) and is retried with the
// same key after a step-up OTP. 401 admin_reauth_required → the shell asks for the OTP, then this retries.
import { ApiError, call } from "../members/api";

export interface Page<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  [k: string]: unknown;
}

type Hooks = {
  /** Resolve once the admin session is confirmed again (or reject if the user gives up). */
  reauth: () => Promise<void>;
  onForbidden: () => void;
  onGuest: () => void;
  onActivity: () => void;
};
let hooks: Hooks | null = null;
export const setAdminHooks = (h: Hooks) => (hooks = h);

/**
 * `background: true` marks an automatic refresh (polling): it sends `X-Admin-Background: 1` so the server
 * doesn't extend the idle timer, doesn't count as activity here either, and never opens the OTP prompt —
 * only user-initiated requests keep an admin session alive (docs/admin/QA-REPORT.md AD-03).
 */
export async function adminCall<T>(method: string, path: string, body?: unknown, headers?: Record<string, string>, opts: { background?: boolean } = {}): Promise<T> {
  const h = opts.background ? { ...headers, "X-Admin-Background": "1" } : headers;
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await call<T>(method, `/api/admin${path}`, body, h);
      if (!opts.background) hooks?.onActivity();
      return r;
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.code === "admin_reauth_required" && attempt === 0 && hooks && !opts.background) {
          await hooks.reauth();
          continue;
        }
        if (e.status === 401 && e.code === "unauthorized") hooks?.onGuest();
        if (e.status === 403 && e.code === "forbidden") hooks?.onForbidden();
      }
      throw e;
    }
  }
}

export const qs = (params: Record<string, string | number | boolean | null | undefined>) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== "" && v !== false) u.set(k, String(v));
  const s = u.toString();
  return s ? `?${s}` : "";
};

/** Download an owner CSV export (masked unless full). Throws ApiError like adminCall. */
export async function downloadCsv(dataset: string, full: boolean): Promise<void> {
  const res = await fetch(`/api/admin/export/${dataset}${full ? "?full=1" : ""}`, { credentials: "same-origin" });
  if (!res.ok) {
    const e = (await res.json().catch(() => null)) as { error?: { code: string } } | null;
    throw new ApiError(res.status, e?.error?.code ?? "server_error", (e?.error ?? {}) as Record<string, never>);
  }
  const blob = await res.blob();
  const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? `${dataset}.csv`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export { ApiError };
