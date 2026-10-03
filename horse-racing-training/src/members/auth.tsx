// Member session state for the whole app: who is logged in, the login modal, toasts, and the
// unsaved-changes guard used by the account page.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { Member, PublicConfig } from "../../shared/types";
import { track } from "../analytics";
import { btn, modalBgTop, modalNarrow } from "../kit";
import { isUnauthorized, memberApi } from "./api";
import { LoginModal } from "./LoginModal";
import { Toast, useDialog } from "./ui";

export type LoginSource = "header" | "history" | "save_prompt";
export interface LoginRequest {
  source: LoginSource;
  /** Runs once the code is verified. A returned string replaces the "Logged in as …" toast. */
  onLoggedIn?: (user: Member, isNew: boolean) => Promise<string | void> | string | void;
}

interface Auth {
  /** undefined while the session is being checked at boot, null for guests. */
  user: Member | null | undefined;
  config: PublicConfig | null;
  setUser: (u: Member | null) => void;
  openLogin: (req: LoginRequest) => void;
  logout: () => Promise<void>;
  /** Bottom toast; 3 s by default (settlement summaries use 5 s). */
  toast: (message: string, ms?: number) => void;
  /** The login sheet is open (other dialogs wait for it). */
  loginOpen: boolean;
  /** For member API errors: a 401 means the session ended, so drop to guest state. True when handled. */
  handleAuthError: (e: unknown) => boolean;
  /** The account page reports unsaved edits here. */
  setDirty: (dirty: boolean) => void;
  /** Run `action` now, or after the user confirms discarding unsaved edits. */
  guard: (action: () => void) => void;
}

const Ctx = createContext<Auth | null>(null);

export function useAuth(): Auth {
  const a = useContext(Ctx);
  if (!a) throw new Error("useAuth outside AuthProvider");
  return a;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation("account");
  const [user, setUserState] = useState<Member | null | undefined>(undefined);
  const [config, setConfig] = useState<PublicConfig | null>(null);
  const [login, setLogin] = useState<LoginRequest | null>(null);
  const [toastMsg, setToastMsg] = useState<{ text: string; id: number; raised: boolean; ms: number } | null>(null);
  const dirty = useRef(false);
  const [leaving, setLeaving] = useState<(() => void) | null>(null);

  useEffect(() => {
    memberApi
      .me()
      .then((r) => setUserState(r.user))
      .catch(() => setUserState(null)); // offline at boot: behave as a guest
    memberApi.config().then(setConfig).catch(() => {});
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const id = setTimeout(() => setToastMsg(null), toastMsg.ms);
    return () => clearTimeout(id);
  }, [toastMsg]);

  // On the bet tab the phone slip bar sits at the bottom: lift the toast above it.
  const toast = useCallback((text: string, ms = 3000) => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    setToastMsg({ text, id: Date.now(), raised: !tab || tab === "bet", ms });
  }, []);
  const setUser = useCallback((u: Member | null) => setUserState(u), []);
  const handleAuthError = useCallback((e: unknown) => {
    if (!isUnauthorized(e)) return false;
    setUserState(null);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await memberApi.logout().catch(() => {}); // idempotent; clear local state either way
    dirty.current = false;
    setUserState(null);
    track("logout");
    toast(t("toast.loggedOut"));
  }, [t, toast]);

  const guard = useCallback((action: () => void) => {
    if (dirty.current) setLeaving(() => action);
    else action();
  }, []);

  const value = useMemo<Auth>(
    () => ({
      user,
      config,
      setUser,
      openLogin: (req) => {
        if (!config) memberApi.config().then(setConfig).catch(() => {});
        setLogin(req);
      },
      logout,
      toast,
      loginOpen: login !== null,
      handleAuthError,
      setDirty: (d) => (dirty.current = d),
      guard,
    }),
    [user, config, setUser, logout, toast, handleAuthError, guard, login]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {login && (
        <LoginModal
          config={config}
          onClose={() => setLogin(null)}
          onVerified={async (u, isNew) => {
            setUserState(u);
            track(isNew ? "signup_success" : "login_success", { source: login.source });
            return (await Promise.resolve(login.onLoggedIn?.(u, isNew)).catch(() => undefined)) || undefined;
          }}
          onDone={(u, message) => {
            setLogin(null);
            setUserState(u);
            toast(message ?? t("toast.loggedIn", { name: u.displayName }));
          }}
        />
      )}
      {leaving && (
        <LeaveDialog
          onStay={() => setLeaving(null)}
          onDiscard={() => {
            const go = leaving;
            dirty.current = false;
            setLeaving(null);
            go();
          }}
        />
      )}
      {toastMsg && <Toast key={toastMsg.id} message={toastMsg.text} raised={toastMsg.raised} />}
    </Ctx.Provider>
  );
}

function LeaveDialog({ onStay, onDiscard }: { onStay: () => void; onDiscard: () => void }) {
  const { t } = useTranslation("account");
  const ref = useRef<HTMLDivElement>(null);
  const stay = useRef<HTMLButtonElement>(null);
  useDialog(ref, onStay, stay);
  return (
    <div className={modalBgTop} onClick={onStay}>
      <div ref={ref} className={modalNarrow} role="alertdialog" aria-modal="true" aria-labelledby="leave-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="leave-title" className="text-[15px] font-medium text-navy-900 sm:text-[17px]">
          {t("leave.title")}
        </h2>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button ref={stay} className={btn} onClick={onStay}>
            {t("leave.stay")}
          </button>
          <button className="h-11 cursor-pointer text-[15px] font-medium text-bad hover:underline" onClick={onDiscard}>
            {t("leave.discard")}
          </button>
        </div>
      </div>
    </div>
  );
}
