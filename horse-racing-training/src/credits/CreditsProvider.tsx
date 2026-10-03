// Credits state for the whole app: balance, feature flags, the 18+ gate, the one-time welcome dialog and
// "your live bets settled" notices. Lives inside AuthProvider.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { CreditsSummary } from "../../shared/types";
import { track } from "../analytics";
import { useFmt } from "../i18n/useLanguage";
import { useAuth } from "../members/auth";
import { creditsApi } from "./api";
import { AgeDialog } from "./dialogs";

interface CreditsCtx {
  /** undefined while loading, null for guests. */
  summary: CreditsSummary | null | undefined;
  balance: number | null;
  liveBetting: boolean;
  purchases: boolean;
  signupBonus: number;
  termsVersion: string;
  refresh: () => Promise<CreditsSummary | null>;
  setBalance: (n: number) => void;
  /** Resolves true once the member has declared 18+ (asks with a dialog if needed). */
  ensureAdult: (context: "bet" | "purchase") => Promise<boolean>;
  /** Live bets settled since last seen (History tab badge). */
  unseenSettled: number;
  markSettledSeen: () => void;
  welcomeOpen: boolean;
  dismissWelcome: () => void;
}

const Ctx = createContext<CreditsCtx | null>(null);
export function useCredits(): CreditsCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCredits outside CreditsProvider");
  return c;
}

export function CreditsProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation("credits");
  const fmt = useFmt();
  const auth = useAuth();
  const { user, config } = auth;
  const [summary, setSummary] = useState<CreditsSummary | null | undefined>(undefined);
  const [ageAsk, setAgeAsk] = useState<{ resolve: (ok: boolean) => void; context: "bet" | "purchase" } | null>(null);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const toastedSettled = useRef(0);

  const refresh = useCallback(async () => {
    if (!user) {
      setSummary(null);
      return null;
    }
    try {
      // Listing pending bets first lets the server settle anything whose results are in (at most once a minute).
      await creditsApi.liveBets("pending").catch(() => undefined);
      const s = await creditsApi.summary();
      setSummary(s);
      return s;
    } catch (e) {
      auth.handleAuthError(e);
      setSummary((old) => (old === undefined ? null : old));
      return null;
    }
  }, [user, auth]);

  // Load on login / logout, on returning to the tab, and every 2 min while bets are pending.
  const userId = user?.id;
  useEffect(() => {
    setWelcomeDismissed(false);
    toastedSettled.current = 0;
    if (user === undefined) return;
    void refresh();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!userId) return;
    const onShow = () => document.visibilityState === "visible" && void refresh();
    document.addEventListener("visibilitychange", onShow);
    const timer = setInterval(() => (summary?.pending.count ?? 0) > 0 && onShow(), 120_000);
    return () => {
      document.removeEventListener("visibilitychange", onShow);
      clearInterval(timer);
    };
  }, [userId, refresh, summary?.pending.count]);

  // One summary toast per batch of newly settled live bets (5 s: it carries information).
  const unseen = summary?.unseenSettled.count ?? 0;
  useEffect(() => {
    if (!summary || unseen === 0 || unseen === toastedSettled.current) return;
    toastedSettled.current = unseen;
    const net = summary.unseenSettled.net;
    auth.toast(t("toast.settled", { count: unseen, net: `${net > 0 ? "+" : net < 0 ? "−" : ""}${fmt.num(Math.abs(net))}` }), 5000);
  }, [unseen]); // eslint-disable-line react-hooks/exhaustive-deps

  const ensureAdult = useCallback(
    (context: "bet" | "purchase") =>
      user?.adultDeclaredAt ? Promise.resolve(true) : new Promise<boolean>((resolve) => setAgeAsk({ resolve, context })),
    [user]
  );

  const welcomeOpen = !!summary?.welcome && !welcomeDismissed && !auth.loginOpen;
  useEffect(() => {
    if (welcomeOpen) track("signup_bonus_seen", { cohort: user && Date.now() - Date.parse(user.createdAt) < 10 * 60_000 ? "new" : "existing" });
  }, [welcomeOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo<CreditsCtx>(
    () => ({
      summary,
      balance: summary ? summary.balance : null,
      liveBetting: !!config?.features?.liveBetting,
      purchases: !!config?.features?.purchases,
      signupBonus: config?.credits?.signupBonus ?? 1000,
      termsVersion: config?.credits?.termsVersion ?? "",
      refresh,
      setBalance: (n) => setSummary((s) => (s ? { ...s, balance: n } : s)),
      ensureAdult,
      unseenSettled: unseen,
      markSettledSeen: () => {
        if (!unseen) return;
        setSummary((s) => (s ? { ...s, unseenSettled: { count: 0, net: 0 } } : s));
        toastedSettled.current = 0;
        void creditsApi.seen("settled").catch(() => {});
      },
      welcomeOpen,
      dismissWelcome: () => {
        setWelcomeDismissed(true);
        setSummary((s) => (s ? { ...s, welcome: false } : s));
        void creditsApi.seen("welcome").catch(() => {});
      },
    }),
    [summary, config, refresh, ensureAdult, unseen, welcomeOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {ageAsk && (
        <AgeDialog
          onCancel={() => {
            ageAsk.resolve(false);
            setAgeAsk(null);
          }}
          onConfirm={async () => {
            const r = await creditsApi.declare(config?.credits?.termsVersion ?? "");
            auth.setUser(r.user);
            track("age_declared", { context: ageAsk.context });
            ageAsk.resolve(true);
            setAgeAsk(null);
          }}
        />
      )}
    </Ctx.Provider>
  );
}
