// Membership API client. Errors arrive as `{ error: { code, … } }` and are thrown as ApiError;
// a failed connection is ApiError with code "network".
import type { ApiErrorBody, HistoryEntry, Member, MemberLocale, PublicConfig } from "../../shared/types";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public extra: Omit<ApiErrorBody["error"], "code"> = {}
  ) {
    super(code);
  }
}

export async function call<T>(method: string, url: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
  let r: Response;
  try {
    r = await fetch(url, {
      method,
      credentials: "same-origin",
      headers: { ...(body !== undefined && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...headers },
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "network");
  }
  if (!r.ok) {
    const e = (await r.json().catch(() => null)) as ApiErrorBody | null;
    const { code = r.status === 413 ? "file_too_large" : "server_error", ...extra } = e?.error ?? {};
    throw new ApiError(r.status, code, extra);
  }
  return r.json() as Promise<T>;
}

export const isUnauthorized = (e: unknown) => e instanceof ApiError && e.status === 401;

export const memberApi = {
  config: () => call<PublicConfig>("GET", "/api/config"),
  me: () => call<{ user: Member | null }>("GET", "/api/me"),
  startOtp: (phone: string, turnstileToken: string, locale: MemberLocale) =>
    call<{ ok: true; phone: string; resendIn: number; expiresIn: number }>("POST", "/api/auth/otp/start", { phone, turnstileToken, locale }),
  checkOtp: (phone: string, code: string) => call<{ user: Member; isNew: boolean }>("POST", "/api/auth/otp/check", { phone, code }),
  logout: () => call<{ ok: true }>("POST", "/api/auth/logout"),
  updateMe: (patch: Record<string, string | null | boolean>) => call<{ user: Member }>("PATCH", "/api/me", patch),
  uploadAvatar: (file: Blob) => {
    const form = new FormData();
    form.append("avatar", file, "avatar");
    return call<{ user: Member }>("POST", "/api/me/avatar", form);
  },
  removeAvatar: () => call<{ user: Member }>("DELETE", "/api/me/avatar"),
  deleteAccount: () => call<{ ok: true }>("DELETE", "/api/me", { confirm: "DELETE" }),
  history: () => call<HistoryEntry[]>("GET", "/api/history"),
  addHistory: (e: HistoryEntry) => call<HistoryEntry[]>("POST", "/api/history", e),
  /** Post-login upload of the bets a guest settled this visit (≤ 20). */
  addHistoryBatch: (entries: HistoryEntry[]) => call<HistoryEntry[]>("POST", "/api/history", { entries }),
  deleteHistory: (id: string) => call<HistoryEntry[]>("DELETE", `/api/history/${encodeURIComponent(id)}`),
  clearHistory: () => call<HistoryEntry[]>("DELETE", "/api/history"),
};
