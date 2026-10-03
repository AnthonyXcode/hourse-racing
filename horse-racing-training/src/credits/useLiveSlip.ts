// LIVE slip placement (docs/credits/PRD.md §3.3, DESIGN-SPEC §3b): one Idempotency-Key per slip submit
// (reused only when retrying the same slip after a network error), all-or-nothing errors mapped to copy.
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { track } from "../analytics";
import { useFmt } from "../i18n/useLanguage";
import { ApiError } from "../members/api";
import { useAuth } from "../members/auth";
import type { SlipItem } from "../slip";
import { creditsApi } from "./api";
import { useCredits } from "./CreditsProvider";

const SAVED = "pt:liveSlip";
const bucket = (n: number) => (n < 100 ? "<100" : n < 1000 ? "100–999" : "1k+");
const newKey = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** A live slip kept across the Stripe round trip (sessionStorage; try/catch for private modes). */
export function loadSavedSlip(): SlipItem[] {
  try {
    const v = JSON.parse(sessionStorage.getItem(SAVED) ?? "[]") as SlipItem[];
    return Array.isArray(v) ? v.filter((i) => i && i.mode === "live") : [];
  } catch {
    return [];
  }
}
export function saveSlip(items: SlipItem[]) {
  try {
    if (items.some((i) => i.mode === "live")) sessionStorage.setItem(SAVED, JSON.stringify(items));
    else sessionStorage.removeItem(SAVED);
  } catch {
    /* storage unavailable: the slip just isn't kept */
  }
}

export function useLiveSlip(slip: SlipItem[], setSlip: (f: (s: SlipItem[]) => SlipItem[]) => void, postTimeOf: (date: string, race: number) => string | null) {
  const { t } = useTranslation("credits");
  const fmt = useFmt();
  const auth = useAuth();
  const credits = useCredits();
  const [error, setError] = useState<string | null>(null);
  const [closedIds, setClosedIds] = useState<Set<string>>(new Set());
  const [receipt, setReceipt] = useState<{ count: number; total: number; balance: number } | null>(null);
  const key = useRef<{ sig: string; key: string } | null>(null);

  // Changing the slip clears the last error (but a slip edit never reuses an old idempotency key: see sig).
  useEffect(() => {
    setError(null);
    setClosedIds((c) => (c.size ? new Set([...c].filter((id) => slip.some((i) => i.id === id))) : c));
  }, [slip]);

  async function place(): Promise<void> {
    if (!auth.user) {
      auth.openLogin({ source: "header" });
      return;
    }
    if (!(await credits.ensureAdult("bet"))) return;
    const items = slip.map((it) => ({ date: it.date, venue: it.venue, selection: it.selection, unit: it.unit }));
    const sig = JSON.stringify(items);
    if (key.current?.sig !== sig) key.current = { sig, key: newKey() };
    setError(null);
    try {
      const r = await creditsApi.place(items, key.current.key);
      key.current = null;
      const total = r.bets.reduce((s, b) => s + b.stake, 0);
      setSlip(() => []);
      setReceipt({ count: r.bets.length, total, balance: r.balance });
      credits.setBalance(r.balance);
      auth.toast(t("toast.placed", { count: r.bets.length }));
      track("live_bet_placed", {
        bet_type: r.bets[0]?.betType ?? "",
        items: r.bets.length,
        combos_bucket: bucket(r.bets.reduce((s, b) => s + b.combos, 0)),
        stake_bucket: bucket(total),
      });
      void credits.refresh();
    } catch (e) {
      const code = e instanceof ApiError ? e.code : "server_error";
      if (code !== "network") key.current = null; // a definite answer: the next tap is a new submit
      if (auth.handleAuthError(e)) return;
      track("live_bet_rejected", { code });
      const x = (e instanceof ApiError ? e.extra : {}) as { balance?: number; required?: number; items?: { index: number; code: string; raceNumber?: number; horse?: number }[] };
      const first = x.items?.[0];
      const hhmm = (iso: string | null) => (iso ? fmt.date(iso, { hour: "2-digit", minute: "2-digit", hour12: false }) : "—");
      switch (code) {
        case "insufficient_credits":
          if (x.balance != null) credits.setBalance(x.balance);
          track("insufficient_credits", { shortfall_bucket: bucket((x.required ?? 0) - (x.balance ?? 0)) });
          setError(t("err.balanceChanged", { n: fmt.num(x.balance ?? 0) }));
          break;
        case "race_closed":
        case "race_not_open": {
          const ids = new Set((x.items ?? []).filter((i) => i.code === code).map((i) => slip[i.index]?.id).filter((id): id is string => !!id));
          setClosedIds(ids);
          const item = first ? slip[first.index] : undefined;
          const n = first?.raceNumber ?? 0;
          setError(code === "race_closed" ? t("err.raceClosed", { n, time: hhmm(item ? postTimeOf(item.date, n) : null) }) : t("err.raceNotOpen", { n }));
          break;
        }
        case "feature_disabled":
          setError(t("err.livePaused"));
          break;
        case "scratched_runner":
          setError(t("err.scratched", { horse: first?.horse ?? "?", race: first?.raceNumber ?? "?" }));
          break;
        case "unit_too_small":
          setError(t("err.unitTooSmall"));
          break;
        case "pool_not_designated":
          setError(t("err.notDesignated"));
          break;
        case "stake_too_large":
          setError(t("err.stakeTooLarge"));
          break;
        case "too_many_items":
          setError(t("err.tooMany"));
          break;
        case "account_flagged":
          setError(t("err.flagged"));
          break;
        case "rate_limited":
          setError(t("err.rateLimited"));
          break;
        case "network":
          setError(t("err.network"));
          break;
        case "invalid_selection":
          setError(t("err.invalidSelection"));
          break;
        default:
          setError(t("err.generic"));
      }
    }
  }

  return {
    place,
    error,
    closedIds,
    receipt,
    clearReceipt: () => setReceipt(null),
    removeClosed: () => {
      setSlip((s) => s.filter((i) => !closedIds.has(i.id)));
      setClosedIds(new Set());
      setError(null);
    },
  };
}
