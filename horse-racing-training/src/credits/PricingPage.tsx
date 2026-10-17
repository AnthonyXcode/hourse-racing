// Pricing page, ?tab=pricing: the credit plans (shared/credits/plans.ts) for anyone, signed in or not.
// Buying happens on the Credits page, which handles sign-in, the age check and the daily cap.
import { useTranslation } from "react-i18next";
import { PLANS } from "../../shared/credits/plans";
import { MIN_LIVE_UNIT } from "../../shared/credits/rules";
import { useFmt } from "../i18n/useLanguage";
import { Display, btn, btnPrimary, cx, page, sectionBody, sectionHead } from "../kit";

export function PricingPage({ onBuy, onPractice }: { onBuy: () => void; onPractice: () => void }) {
  const { t } = useTranslation("credits");
  const fmt = useFmt();
  return (
    <div className={page}>
      <Display sub={t("pricing.sub")}>{t("pricing.title")}</Display>

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {PLANS.map((p) => (
          <li
            key={p.id}
            className={cx(
              "flex flex-col gap-3 rounded-card bg-surface p-5 shadow-card",
              p.badge === "popular" ? "ring-2 ring-navy-700" : "ring-1 ring-line"
            )}
          >
            <div className="flex min-h-6 items-center justify-between gap-2">
              <span className="text-[13px] text-ink-muted">{t("pricing.plan", { price: p.priceHkd })}</span>
              {p.badge && <span className="rounded-full bg-navy-700 px-2 text-[11px] font-medium text-white">{t(p.badge === "best" ? "plan.best" : "plan.popular")}</span>}
            </div>
            <div>
              <span className="text-[32px] leading-tight font-semibold text-navy-900 tabular-nums">HK${p.priceHkd}</span>
            </div>
            <div>
              <span className="block text-[17px] font-medium text-ink tabular-nums">{t("unit", { n: fmt.num(p.credits) })}</span>
              <span className="block text-[13px] text-ink-muted tabular-nums">{t("plan.perHkd", { n: fmt.num(Math.round((p.credits / p.priceHkd) * 10) / 10) })}</span>
              <span className={cx("block text-[13px]", p.bonusPct > 0 ? "text-navy-700" : "text-transparent")} aria-hidden={p.bonusPct === 0 || undefined}>
                {p.bonusPct > 0 ? t("plan.bonus", { pct: p.bonusPct }) : "·"}
              </span>
            </div>
            <button type="button" className={cx(p.badge === "popular" ? btnPrimary : btn, "mt-auto w-full")} onClick={onBuy}>
              {t("pricing.choose")}
            </button>
          </li>
        ))}
      </ul>

      <section className="mt-8">
        <h2 className={sectionHead}>{t("pricing.howTitle")}</h2>
        <ul className={cx(sectionBody, "flex list-disc flex-col gap-2 py-4 pr-[13px] pl-8 text-[15px] leading-normal text-ink")}>
          <li>{t("pricing.how.practice")}</li>
          <li>{t("pricing.how.rate", { min: MIN_LIVE_UNIT })}</li>
          <li>{t("pricing.how.noCash")}</li>
          <li>{t("pricing.how.stripe")}</li>
        </ul>
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={cx(btnPrimary, "sm:min-w-48")} onClick={onBuy}>
          {t("buy.cta")}
        </button>
        <button type="button" className={btn} onClick={onPractice}>
          {t("pricing.practice")}
        </button>
      </div>
    </div>
  );
}
