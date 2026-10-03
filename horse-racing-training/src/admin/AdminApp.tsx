// /admin shell (docs/admin/DESIGN-SPEC.md §1, §11): lazy-loaded by main.tsx only on /admin paths.
// Gate: guest → login sheet; member without a staff role → "no access"; staff → "confirm it's you" OTP, then
// the panel. Mid-session re-auth and step-up OTPs open as dialogs OVER the page, so typed input is kept.
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AuthProvider, useAuth } from "../members/auth";
import { Avatar, useDialog } from "../members/ui";
import { LangSwitch } from "../i18n/useLanguage";
import { btn, btnPrimary, cx, modalBgTop, modalNarrow, panel, tabBadge } from "../kit";
import { maskPhoneUi } from "../../shared/validation";
import { ApiError, adminCall, setAdminHooks } from "./api";
import { useA } from "./i18n";
import { navItem, roleBadge } from "./kit";
import { AdminCtx, OtpDialog, OtpForm, type AdminMe } from "./ui";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Pages = {
  users: lazy(() => import("./pages/Users").then((m) => ({ default: m.UsersPage }))),
  user: lazy(() => import("./pages/Users").then((m) => ({ default: m.UserDetailPage }))),
  bets: lazy(() => import("./pages/Bets").then((m) => ({ default: m.BetsPage }))),
  held: lazy(() => import("./pages/Bets").then((m) => ({ default: m.HeldPage }))),
  races: lazy(() => import("./pages/Bets").then((m) => ({ default: m.RacesPage }))),
  ledger: lazy(() => import("./pages/Money").then((m) => ({ default: m.LedgerPage }))),
  purchases: lazy(() => import("./pages/Money").then((m) => ({ default: m.PurchasesPage }))),
  audit: lazy(() => import("./pages/Logs").then((m) => ({ default: m.AuditPage }))),
  access: lazy(() => import("./pages/Logs").then((m) => ({ default: m.AccessPage }))),
  system: lazy(() => import("./pages/Logs").then((m) => ({ default: m.SystemPage }))),
};

type NavKey = "dashboard" | "users" | "bets" | "held" | "ledger" | "purchases" | "races" | "audit" | "access" | "system";
const NAV: [NavKey, string, boolean][] = [
  ["dashboard", "/admin", false],
  ["users", "/admin/users", false],
  ["bets", "/admin/bets", false],
  ["held", "/admin/held", false],
  ["ledger", "/admin/ledger", false],
  ["purchases", "/admin/purchases", false],
  ["races", "/admin/races", false],
  ["audit", "/admin/audit", false],
  ["access", "/admin/access", true], // owner only
  ["system", "/admin/system", false],
];

export default function AdminApp() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}

function useNoIndex(title: string) {
  useEffect(() => {
    let m = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!m) document.head.appendChild((m = Object.assign(document.createElement("meta"), { name: "robots" })));
    m.content = "noindex, nofollow";
    document.title = `[Admin] ${title}`;
  }, [title]);
}

function Gate() {
  const t = useA();
  const auth = useAuth();
  const [me, setMe] = useState<AdminMe | null | "forbidden" | "error">(null);
  const loadMe = useCallback(() => {
    adminCall<AdminMe>("GET", "/me")
      .then(setMe)
      .catch((e) => setMe(e instanceof ApiError && e.status === 403 ? "forbidden" : e instanceof ApiError && e.status === 401 ? null : "error"));
  }, []);
  useEffect(() => {
    if (auth.user) loadMe();
    else setMe(null);
  }, [auth.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useNoIndex(t("brand"));

  if (auth.user === undefined) return <Center>{t("loading")}</Center>;
  if (auth.user === null) return <GuestPage />;
  if (me === "forbidden") return <Denied />;
  if (me === "error") return <Center>{t("err.load")}</Center>;
  if (!me) return <Center>{t("loading")}</Center>;
  if (!me.adminSessionExpiresAt)
    return (
      <Center>
        <h1 className="mb-3 text-[17px] font-medium text-navy-900">{t("confirm.title")}</h1>
        <OtpForm last4={me.phoneLast4} onDone={loadMe} />
      </Center>
    );
  return <Shell me={me} reload={loadMe} onForbidden={() => setMe("forbidden")} />;
}

function Center({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas p-4">
      <div className={cx(panel, "w-full max-w-[400px] text-center")}>
        <img src="/logo-128.png" alt="" className="mx-auto mb-3 size-12" />
        {children}
      </div>
    </main>
  );
}

function GuestPage() {
  const t = useA();
  const { openLogin, loginOpen } = useAuth();
  useEffect(() => {
    openLogin({ source: "header" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Center>
      <h1 className="text-[17px] font-medium text-navy-900">{t("guest.title")}</h1>
      {!loginOpen && (
        <button type="button" className={cx(btnPrimary, "mt-4")} onClick={() => openLogin({ source: "header" })}>
          {t("guest.login")}
        </button>
      )}
    </Center>
  );
}

function Denied() {
  const t = useA();
  const { user, logout } = useAuth();
  return (
    <Center>
      <h1 className="text-[17px] font-medium text-navy-900">{t("denied.title")}</h1>
      {user && <p className="mt-2 text-[13px] text-ink-muted">{t("denied.signedIn", { name: user.displayName, phone: maskPhoneUi(user.phone) })}</p>}
      <p className="mt-1 text-[13px] text-ink-muted">{t("denied.help")}</p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <a className={btnPrimary} href="/">
          {t("denied.back")}
        </a>
        <button type="button" className="cursor-pointer text-[15px] text-link hover:underline" onClick={() => void logout()}>
          {t("denied.logout")}
        </button>
      </div>
    </Center>
  );
}

/** Path + query state with pushState (real /admin/* URLs). */
function useRoute() {
  const [loc, setLoc] = useState(() => ({ path: window.location.pathname, search: window.location.search }));
  useEffect(() => {
    const on = () => setLoc({ path: window.location.pathname, search: window.location.search });
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, []);
  const navigate = (to: string, opts: { replace?: boolean } = {}) => {
    const u = new URL(to, window.location.origin);
    const lang = new URLSearchParams(window.location.search).get("language");
    if (lang && !u.searchParams.has("language")) u.searchParams.set("language", lang);
    window.history[opts.replace ? "replaceState" : "pushState"](null, "", u.pathname + u.search);
    setLoc({ path: u.pathname, search: u.search });
    if (!opts.replace) window.scrollTo(0, 0);
  };
  const setQuery = (patch: Record<string, string | null>) => {
    const q = new URLSearchParams(loc.search);
    for (const [k, v] of Object.entries(patch)) v === null ? q.delete(k) : q.set(k, v);
    const s = q.toString();
    navigate(`${loc.path}${s ? `?${s}` : ""}`, { replace: true });
  };
  return { path: loc.path.replace(/\/+$/, "") || "/admin", query: new URLSearchParams(loc.search), navigate, setQuery };
}

function Shell({ me, reload, onForbidden }: { me: AdminMe; reload: () => void; onForbidden: () => void }) {
  const t = useA();
  const auth = useAuth();
  const { i18n, t: tc } = useTranslation();
  const route = useRoute();
  const [version, setVersion] = useState(0);
  const [menu, setMenu] = useState(false);
  // Re-auth / step-up dialogs (promises resolved by OtpDialog).
  const [otp, setOtp] = useState<{ kind: "reauth" | "stepup"; resolve: (ok: boolean) => void } | null>(null);
  const lastActivity = useRef(Date.now());
  const [nowTick, setNowTick] = useState(Date.now());
  const absolute = me.adminAbsoluteExpiresAt ? Date.parse(me.adminAbsoluteExpiresAt) : Infinity;
  const idleMs = me.idleMs ?? 3_600_000;

  useEffect(() => {
    const ask = (kind: "reauth" | "stepup") => new Promise<boolean>((resolve) => setOtp({ kind, resolve }));
    setAdminHooks({
      reauth: () => ask("reauth").then((ok) => (ok ? undefined : Promise.reject(new ApiError(401, "admin_reauth_required")))),
      onForbidden,
      onGuest: () => auth.setUser(null),
      onActivity: () => (lastActivity.current = Date.now()),
    });
    const x = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(x);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const expiresAt = Math.min(absolute, lastActivity.current + idleMs);
  const left = expiresAt - nowTick;
  const expired = left <= 0;
  useEffect(() => {
    if (expired && !otp) setOtp({ kind: "reauth", resolve: () => {} });
  }, [expired]); // eslint-disable-line react-hooks/exhaustive-deps

  const ctx = useMemo(
    () => ({
      me,
      isOwner: me.role === "owner",
      stepUp: () => new Promise<boolean>((resolve) => setOtp({ kind: "stepup", resolve })),
      path: route.path,
      query: route.query,
      navigate: route.navigate,
      setQuery: route.setQuery,
      toast: auth.toast,
      version,
      bump: () => setVersion((v) => v + 1),
    }),
    [me, route.path, route.query.toString(), version, i18n.language] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const seg = route.path.split("/").filter(Boolean); // ["admin", "users", ":id"]
  const page = seg[1] ?? "dashboard";
  const navKey: NavKey = (NAV.find(([k]) => k === page)?.[0] ?? "dashboard") as NavKey;
  const nav = NAV.filter(([, , ownerOnly]) => !ownerOnly || me.role === "owner");
  let content: ReactNode;
  if (page === "dashboard" || seg.length === 1) content = <Dashboard />;
  else if (page === "users" && seg[2]) content = <Pages.user id={seg[2]} />;
  else if (page in Pages && page !== "user") {
    const P = Pages[page as keyof typeof Pages] as React.ComponentType<{ id?: string }>;
    content = page === "access" && me.role !== "owner" ? <p>{t("err.forbidden")}</p> : <P />;
  } else content = <Dashboard />;

  const navList = (onPick?: () => void) => (
    <nav aria-label={t("brand")} className="flex flex-col">
      {nav.map(([k, href]) => (
        <a
          key={k}
          href={href}
          className={navItem(navKey === k)}
          aria-current={navKey === k ? "page" : undefined}
          aria-label={k === "held" && me.heldCount ? t("nav.heldAria", { n: me.heldCount }) : undefined}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.button !== 0) return;
            e.preventDefault();
            onPick?.();
            route.navigate(href);
          }}
        >
          {t(`nav.${k}`)}
          {k === "held" && me.heldCount > 0 && <span className={tabBadge(true)}>{me.heldCount}</span>}
        </a>
      ))}
    </nav>
  );
  const stripeChip = (
    <a href="/admin/system" className={cx("inline-flex h-6 items-center rounded-full px-2.5 text-[13px] font-medium", me.stripeMode === "live" ? "bg-navy-900 text-white" : "bg-sky-100 text-navy-900")}>
      {t(`stripe.${me.stripeMode}`)}
    </a>
  );

  return (
    <AdminCtx.Provider value={ctx}>
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[90] focus:bg-surface focus:p-2">
        {t("nav.skip")}
      </a>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[220px] flex-col bg-navy-900 text-white lg:flex">
        <div className="flex h-14 items-center gap-2 px-[13px]">
          <img src="/logo-128.png" alt="" className="size-7" />
          <div className="leading-tight">
            <div className="text-[15px] font-bold">{tc("appName")}</div>
            <div className="text-[11px] text-white/75">{t("brand")}</div>
          </div>
        </div>
        {navList()}
        <a href="/" className="mt-auto flex h-11 items-center px-[13px] text-[15px] text-white/75 hover:text-white">
          ← {t("nav.backToApp")}
        </a>
      </aside>
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-12 items-center gap-3 border-b border-line bg-surface px-4 shadow-card lg:ml-[220px] lg:h-14 lg:px-6">
        <button type="button" className="-ml-2 inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full hover:bg-sky-50 lg:hidden" aria-label={t("nav.open")} aria-expanded={menu} onClick={() => setMenu(true)}>
          ☰
        </button>
        <img src="/logo-128.png" alt="" className="size-6 flex-none lg:hidden" />
        {/* Phones: the title truncates so the badges never push the page wider than the viewport. */}
        <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-navy-900 lg:hidden">{t("brand")}</span>
        <nav aria-label={t("nav.breadcrumb")} className="hidden min-w-0 truncate text-[13px] lg:block">
          <a href="/admin" className="text-link hover:underline" onClick={(e) => (e.preventDefault(), route.navigate("/admin"))}>
            {t("brand")}
          </a>
          {navKey !== "dashboard" && (
            <>
              {" › "}
              <span className="font-medium text-ink-strong">{t(`nav.${navKey}`)}</span>
            </>
          )}
        </nav>
        <div className="ml-auto flex flex-none items-center gap-2 whitespace-nowrap sm:gap-3">
          <span className="hidden sm:inline">{stripeChip}</span>
          <span className={roleBadge(me.role)}>{t(me.role === "owner" ? "role.owner" : "role.admin")}</span>
          <LangSwitch className="hidden sm:inline-flex" />
          {auth.user && <Avatar name={auth.user.displayName} src={auth.user.avatarUrl} size="size-7" ring />}
        </div>
      </header>
      {menu && <MenuSheet onClose={() => setMenu(false)}>{navList(() => setMenu(false))}<div className="flex items-center gap-3 p-[13px]">{stripeChip}<LangSwitch /></div></MenuSheet>}
      <main id="admin-main" className="min-h-dvh bg-canvas px-4 py-4 lg:pl-[calc(220px+24px)] lg:pr-6 lg:py-6">
        <div className="mx-auto max-w-[1280px]">
          <Suspense fallback={<p className="p-6 text-ink-muted">{t("loading")}</p>}>{content}</Suspense>
        </div>
      </main>
      {!expired && left < 2 * 60_000 && !otp && <IdleDialog left={left} onStay={() => void adminCall("GET", "/me").then(reload).catch(() => {})} onLogout={() => void auth.logout()} />}
      {otp && (
        <OtpDialog
          title={otp.kind === "stepup" ? t("confirm.title") : t("session.expiredTitle")}
          last4={me.phoneLast4}
          stepUp={otp.kind === "stepup"}
          onDone={() => {
            otp.resolve(true);
            setOtp(null);
            lastActivity.current = Date.now();
            reload();
          }}
          onCancel={otp.kind === "stepup" ? () => (otp.resolve(false), setOtp(null)) : undefined}
          onLogout={otp.kind === "reauth" ? () => void auth.logout() : undefined}
        />
      )}
    </AdminCtx.Provider>
  );
}

function MenuSheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const t = useA();
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={t("brand")} className="absolute inset-x-0 bottom-0 rounded-t-sheet bg-navy-900 pb-[env(safe-area-inset-bottom)] text-white motion-safe:animate-[sheet-up_250ms_ease-out]">
        <button type="button" className="flex h-6 w-full cursor-pointer items-center justify-center" aria-label={t("nav.close")} onClick={onClose}>
          <span className="h-1 w-10 rounded-full bg-white/40" />
        </button>
        {children}
      </div>
    </div>
  );
}

function IdleDialog({ left, onStay, onLogout }: { left: number; onStay: () => void; onLogout: () => void }) {
  const t = useA();
  const ref = useRef<HTMLDivElement>(null);
  const stay = useRef<HTMLButtonElement>(null);
  useDialog(ref, onStay, stay);
  const s = Math.max(0, Math.ceil(left / 1000));
  return (
    <div className={cx(modalBgTop, "z-[75]")}>
      <div ref={ref} className={modalNarrow} role="alertdialog" aria-modal="true" aria-labelledby="idle-title">
        <h2 id="idle-title" className="text-[17px] font-medium text-navy-900">
          {t("session.idleTitle")}
        </h2>
        <p className="mt-2 text-[15px] text-ink tabular-nums" aria-live={s === 120 || s === 30 ? "polite" : "off"}>
          {t("session.idleBody", { time: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` })}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" className={btn} onClick={onLogout}>
            {t("denied.logout")}
          </button>
          <button ref={stay} type="button" className={btnPrimary} onClick={onStay}>
            {t("session.stay")}
          </button>
        </div>
      </div>
    </div>
  );
}

