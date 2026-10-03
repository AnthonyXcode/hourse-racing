// Credits page, ?tab=credits (docs/credits/DESIGN-SPEC.md §4): balance, buy credits (Stripe Checkout),
// checkout return states, and the ledger.
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { LedgerRow } from "../../shared/types";
import { track } from "../analytics";
import { useGlossary } from "../i18n/glossary";
import { useFmt } from "../i18n/useLanguage";
import { Display, btn, btnPrimary, cx, errorBox, figure, noticeBanner, planCard, sectionBody, sectionHead, statusPanel } from "../kit";
import { ApiError } from "../members/api";
import { useAuth } from "../members/auth";
import { LoginEmptyState } from "../members/GuestPrompts";
import { Spinner } from "../members/ui";
import { ymd } from "../slip";
import { creditsApi, type PlanDto } from "./api";
import { useCredits } from "./CreditsProvider";
import { Coin } from "./dialogs";

const KIND: Record<LedgerRow["kind"], string> = {
  signup_bonus: "bonus",
  purchase: "purchase",
  bet_stake: "bet",
  bet_payout: "payout",
  bet_refund: "refund",
  purchase_reversal: "reversal",
  admin_adjust: "adjust",
};

type Return = { kind: "processing" | "success" | "slow" | "cancelled" | "failed"; credits?: number } | null;

/** Read and clear ?checkout=…&session_id=… (once per page load). */
function takeCheckoutParams(): { checkout: string | null; sessionId: string | null } {
  const url = new URL(window.location.href);
  const checkout = url.searchParams.get("checkout");
  const sessionId = url.searchParams.get("session_id");
  if (checkout || sessionId) {
    url.searchParams.delete("checkout");
    url.searchParams.delete("session_id");
    window.history.replaceState(window.history.state, "", url);
  }
  return { checkout, sessionId };
}

export function CreditsPage({ onOpenHistory, savedSlip, onBackToSlip }: { onOpenHistory: () => void; savedSlip: boolean; onBackToSlip: () => void }) {
  const { t } = useTranslation(["credits", "common"]);
  const fmt = useFmt();
  const g = useGlossary();
  const { user, openLogin, setUser } = useAuth();
  const { summary, refresh, purchases, ensureAdult, termsVersion } = useCredits();
  const [ret, setRet] = useState<Return>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<PlanDto[] | null>(null);
  const [plansErr, setPlansErr] = useState(false);
  const [plan, setPlan] = useState<PlanDto["id"]>("hk10");
  const [adult, setAdult] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyErr, setBuyErr] = useState("");
  const [capHit, setCapHit] = useState(false);
  const [more, setMore] = useState<LedgerRow[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [ledgerErr, setLedgerErr] = useState(false);

  // Checkout return: the success URL never grants credits; poll the purchase until the webhook has landed.
  useEffect(() => {
    const { checkout, sessionId } = takeCheckoutParams();
    if (checkout === "cancel") {
      setRet({ kind: "cancelled" });
      track("credits_checkout_cancelled", { plan_id: "unknown" });
      return;
    }
    if (checkout !== "success" || !sessionId) return;
    setRet({ kind: "processing" });
    let stop = false;
    const started = Date.now();
    const poll = async () => {
      if (stop) return;
      try {
        const p = await creditsApi.purchase(sessionId);
        if (p.status === "paid") {
          setRet({ kind: "success", credits: p.credits });
          track("credits_checkout_completed", { plan_id: "unknown" });
          void refresh();
          return;
        }
        if (p.status === "expired") return setRet({ kind: "failed" });
        setRet({ kind: "processing", credits: p.credits });
      } catch {
        /* keep polling */
      }
      const age = Date.now() - started;
      if (age > 120_000) return setRet((r) => (r?.kind === "processing" ? { ...r, kind: "slow" } : r));
      setTimeout(poll, age < 30_000 ? 2000 : 10_000);
    };
    void poll();
    return () => {
      stop = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (ret) panelRef.current?.focus();
  }, [ret?.kind]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || !purchases) return;
    creditsApi
      .plans()
      .then(setPlans)
      .catch(() => setPlansErr(true));
  }, [user?.id, purchases]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setMore([]);
    setCursor(summary?.nextCursor ?? null);
  }, [summary]);

  if (!user)
    return (
      <div className="mt-2">
        <Display sub={t("page.sub")}>{t("page.title")}</Display>
        <div className="mx-auto max-w-[720px]">
          <LoginEmptyState title={t("guest.pageTitle")} onLogin={() => openLogin({ source: "header" })} />
        </div>
      </div>
    );

  const cap = summary?.dailyCapHkd ?? 1000;
  const left = Math.max(0, cap - (summary?.purchasedTodayHkd ?? 0));
  const flagged = !!summary?.flagged;
  const chosen = plans?.find((p) => p.id === plan) ?? null;
  const needAdult = !user.adultDeclaredAt;
  const reached = capHit || (plans != null && plans.every((p) => p.priceHkd > left));

  async function buy() {
    if (!chosen) return;
    setBuyErr("");
    setBuying(true);
    try {
      if (needAdult) {
        if (!adult) return;
        if (!(await ensureAdultInline())) return;
      }
      track("credits_checkout_started", { plan_id: chosen.id });
      const { url } = await creditsApi.checkout(chosen.id);
      window.location.assign(url);
      return; // keep the spinner while the browser leaves
    } catch (e) {
      const code = e instanceof ApiError ? e.code : "";
      if (code === "daily_cap_reached") {
        setCapHit(true);
        track("daily_cap_hit");
      } else
        setBuyErr(
          code === "account_flagged"
            ? t("err.flagged")
            : code === "stripe_unconfigured"
              ? t("err.stripeUnconfigured")
              : code === "feature_disabled"
                ? t("killswitch.buyPaused")
                : code === "rate_limited"
                  ? t("err.rateLimited")
                  : code === "network"
                    ? t("err.network")
                    : t("err.paymentUnavailable")
        );
    }
    setBuying(false);
  }
  /** The inline checkbox is the declaration on this page; it stores the same server flag as the dialog. */
  async function ensureAdultInline() {
    try {
      const r = await creditsApi.declare(termsVersion);
      setUser(r.user);
      track("age_declared", { context: "purchase" });
      return true;
    } catch {
      return ensureAdult("purchase");
    }
  }

  const ledger = [...(summary?.ledger ?? []), ...more];
  const ledgerDetail = (r: LedgerRow) => {
    const ref = r.ref;
    if (ref.type === "bet" && ref.date)
      return `${fmt.date(ymd(ref.date), { month: "numeric", day: "numeric" })} ${ref.venue ? g.venue(ref.venue) : ""} ${(ref.races ?? []).map((n) => t("common:raceShort", { n })).join("+")} ${ref.betType ? g.betType(ref.betType as never) : ""}`.trim();
    if (ref.planId) {
      const p = plans?.find((x) => x.id === ref.planId);
      return p ? t("ledger.plan", { credits: fmt.num(p.credits), price: p.priceHkd }) : "";
    }
    return "";
  };

  return (
    <div className="mt-2">
      <Display sub={t("page.sub")}>{t("page.title")}</Display>
      <div className="mx-auto flex max-w-[720px] flex-col gap-4">
        {!purchases && (
          <div className={noticeBanner} role="status">
            <span aria-hidden="true" className="mt-0.5 inline-flex size-4 flex-none items-center justify-center bg-ink-strong text-[11px] font-bold text-gold">
              !
            </span>
            {t("killswitch.banner")}
          </div>
        )}

        {ret && (
          <div
            ref={panelRef}
            tabIndex={-1}
            role={ret.kind === "failed" ? "alert" : "status"}
            className={ret.kind === "failed" ? cx(errorBox, "my-0") : statusPanel(ret.kind === "success" ? "success" : "info")}
          >
            <div className="flex items-center gap-2">
              {ret.kind === "processing" && <Spinner />}
              <span>
                {ret.kind === "processing"
                  ? t("return.processing")
                  : ret.kind === "success"
                    ? t("return.success", { n: fmt.num(ret.credits ?? 0), bal: fmt.num(summary?.balance ?? 0) })
                    : ret.kind === "slow"
                      ? t("return.slow")
                      : ret.kind === "cancelled"
                        ? t("return.cancelled")
                        : t("return.failed")}
              </span>
            </div>
            {ret.kind === "slow" && (
              <button type="button" className={cx(btn, "mt-2")} onClick={() => window.location.reload()}>
                {t("return.refresh")}
              </button>
            )}
            {ret.kind === "success" && savedSlip && (
              <button type="button" className={cx(btn, "mt-2")} onClick={onBackToSlip}>
                {t("return.backToSlip")}
              </button>
            )}
          </div>
        )}

        <section>
          <h2 className={sectionHead}>{t("balance.title")}</h2>
          <div className={cx(sectionBody, "px-[13px] py-4")}>
            {summary === undefined ? (
              <div className="h-8 w-32 rounded-xs bg-surface-2 motion-safe:animate-pulse" />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Coin size={24} />
                  <span className={cx(figure, "text-[32px] text-navy-900")}>{summary ? fmt.num(summary.balance) : "—"}</span>
                  <span className="ml-auto text-[15px] text-ink">{t("unitWord")}</span>
                </div>
                {ret?.kind === "processing" && ret.credits ? <p className="mt-1 text-[13px] text-ink-muted">{t("return.pendingAmount", { n: fmt.num(ret.credits) })}</p> : null}
                {summary && summary.pending.count > 0 && (
                  <button type="button" className="mt-2 cursor-pointer text-[13px] text-link hover:underline" onClick={onOpenHistory}>
                    {t("balance.pending", { count: summary.pending.count, n: fmt.num(summary.pending.stake) })}
                  </button>
                )}
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className={sectionHead}>{t("buy.title")}</h2>
          <div className={cx(sectionBody, "flex flex-col gap-3 px-[13px] py-4")}>
            {!purchases ? (
              <p className="text-[15px] text-ink">{t("killswitch.buyPaused")}</p>
            ) : flagged ? (
              <div className={cx(errorBox, "my-0")} role="alert">
                {t("err.flagged")}
              </div>
            ) : plansErr ? (
              <div className={cx(errorBox, "my-0")} role="alert">
                {t("err.plans")}
              </div>
            ) : !plans ? (
              [0, 1, 2].map((i) => <div key={i} className="h-14 rounded-card bg-surface-2 motion-safe:animate-pulse" />)
            ) : (
              <>
                {reached && (
                  <div className={statusPanel("info")} role="status">
                    {t("cap.reached", { cap: fmt.num(cap) })}
                  </div>
                )}
                <fieldset className="grid gap-3 sm:grid-cols-3">
                  <legend className="sr-only">{t("buy.plans")}</legend>
                  {plans.map((p) => {
                    const over = p.priceHkd > left || reached;
                    return (
                      <label key={p.id} className={planCard(plan === p.id, over)}>
                        <input type="radio" name="plan" value={p.id} className="peer sr-only" checked={plan === p.id} disabled={over || buying} onChange={() => setPlan(p.id)} />
                        <span aria-hidden="true" className={cx("size-[18px] flex-none rounded-full ring-1 ring-line-strong", plan === p.id && "bg-navy-700 ring-navy-700 ring-offset-2")} />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[17px] font-medium text-navy-900 tabular-nums">{t("unit", { n: fmt.num(p.credits) })}</span>
                            {p.badge && <span className="rounded-full bg-navy-700 px-2 text-[11px] font-medium text-white">{t(p.badge === "best" ? "plan.best" : "plan.popular")}</span>}
                          </span>
                          {p.bonusPct > 0 && <span className="block text-[13px] text-navy-700">{t("plan.bonus", { pct: p.bonusPct })}</span>}
                          {over && !reached && <span className="block text-[13px] text-ink-muted">{t("cap.planOver")}</span>}
                        </span>
                        <span className="text-[15px] font-medium text-ink tabular-nums">HK${p.priceHkd}</span>
                      </label>
                    );
                  })}
                </fieldset>
                {(summary?.purchasedTodayHkd ?? 0) > 0 && !reached && <p className="text-[13px] text-ink-muted">{t("cap.remaining", { left: fmt.num(left) })}</p>}
                <p className="text-[13px] leading-normal text-ink-muted">
                  <Trans t={t} i18nKey="terms" components={{ terms: <a className="text-link hover:underline" href="?tab=terms" target="_blank" rel="noopener" /> }} />
                </p>
                {needAdult && (
                  <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[15px] text-ink">
                    <input type="checkbox" className="size-4 rounded-xs border-line-strong accent-navy-700" checked={adult} onChange={(e) => setAdult(e.target.checked)} />
                    {t("age.checkbox")}
                  </label>
                )}
                {buyErr && (
                  <div className={cx(errorBox, "my-0")} role="alert">
                    {buyErr}
                  </div>
                )}
                <button type="button" className={cx(btnPrimary, "w-full sm:w-auto sm:min-w-60")} disabled={!chosen || reached || buying || (needAdult && !adult) || chosen.priceHkd > left} onClick={() => void buy()}>
                  {buying && <Spinner />}
                  {buying ? t("buy.redirecting") : chosen ? t("buy.button", { credits: fmt.num(chosen.credits), price: chosen.priceHkd }) : t("buy.cta")}
                </button>
                <p className="text-center text-[13px] text-ink-muted sm:text-left">{t("buy.stripe")}</p>
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className={sectionHead}>{t("ledger.title")}</h2>
          <div className={sectionBody}>
            {summary === undefined ? (
              [0, 1, 2].map((i) => <div key={i} className="mx-[13px] my-2 h-10 rounded-xs bg-surface-2 motion-safe:animate-pulse" />)
            ) : !ledger.length ? (
              <p className="px-[13px] py-6 text-center text-[13px] text-ink-muted">{t("ledger.empty")}</p>
            ) : (
              <ul>
                {ledger.map((r) => {
                  const kind = KIND[r.kind];
                  return (
                    <li key={r.id} className="flex min-h-14 gap-3 border-b border-line px-[13px] py-2 last:border-b-0">
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-medium text-ink">{t(`ledger.type.${kind}` as "ledger.type.bonus")}</div>
                        {ledgerDetail(r) && <div className="text-[13px] text-ink">{ledgerDetail(r)}</div>}
                        <div className="text-[13px] text-ink-muted">{fmt.date(r.createdAt, { dateStyle: "medium", timeStyle: "short" })}</div>
                      </div>
                      <div className="text-right">
                        <div className={cx("text-[15px] font-medium tabular-nums", r.amount > 0 ? "text-good" : "text-ink")}>
                          {r.amount > 0 ? "+" : r.amount < 0 ? "−" : ""}
                          {fmt.num(Math.abs(r.amount))}
                        </div>
                        <div className="text-[13px] text-ink-muted tabular-nums">{fmt.num(r.balanceAfter)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {ledgerErr && (
              <div className={cx(errorBox, "mx-[13px]")} role="alert">
                {t("err.generic")}
              </div>
            )}
            {cursor != null && (
              <div className="flex justify-center p-3">
                <button
                  type="button"
                  className={btn}
                  disabled={loadingMore}
                  onClick={async () => {
                    setLoadingMore(true);
                    setLedgerErr(false);
                    try {
                      const s = await creditsApi.summary(cursor);
                      setMore((m) => [...m, ...s.ledger]);
                      setCursor(s.nextCursor);
                    } catch {
                      setLedgerErr(true);
                    }
                    setLoadingMore(false);
                  }}
                >
                  {loadingMore && <Spinner />}
                  {ledgerErr ? t("ledger.retry") : t("ledger.more")}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
