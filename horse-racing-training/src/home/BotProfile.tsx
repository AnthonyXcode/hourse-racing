// A strategy bot's page (?tab=member&id=bot-<alias>&range=day|30d[&date=]), opened from either Home board.
// Lazy chunk. Shows the bot's strategy (described here from the alias; the API never sends it), the same
// numbers as its board row for that window, and every bet behind them, settled on real results.
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { BotHorse, BotProfile, BotProfileBet, BotRange } from "../../shared/types";
import { btn, cx, errorBox, sectionBody, sectionHead, seg, segBtn, statusChip, table, tablePadTight } from "../kit";
import { pc, signed as signedAscii } from "../analyzer/format";
import { useFmt } from "../i18n/useLanguage";
import { Name } from "../i18n/names";
import { HomeApiError, homeApi } from "./api";

/** Signed %, with a real minus sign (matches the credit figures). */
const signed = (v: number) => signedAscii(v).replace("-", "−");
type Alias = "comet" | "thunder" | "jade" | "phoenix" | "typhoon" | "harbour" | "dragon";
/** Rows shown before "Show more". */
const PAGE = 100;

export function BotProfilePage({
  alias,
  range,
  date,
  onRange,
  onBack,
}: {
  alias: string;
  range: BotRange;
  date?: string;
  onRange: (range: BotRange, date?: string) => void;
  onBack: () => void;
}) {
  const { t } = useTranslation(["home", "common"]);
  const fmt = useFmt();
  const [p, setP] = useState<BotProfile | null>(null);
  const [err, setErr] = useState<"not_found" | "error" | null>(null);
  const [shown, setShown] = useState(PAGE);
  useEffect(() => {
    const ac = new AbortController();
    homeApi
      .bot(alias, range, date, ac.signal)
      .then(setP)
      .catch((e) => {
        if ((e as Error).name === "AbortError") return;
        setErr(e instanceof HomeApiError && e.status === 404 ? "not_found" : "error");
      });
    return () => ac.abort();
  }, [alias, range, date]);

  const name = t(`bots.${alias as Alias}.name`, { defaultValue: alias });
  const day = (iso: string, year = false) => fmt.date(`${iso}T12:00:00+08:00`, year ? { day: "numeric", month: "short", year: "numeric" } : { weekday: "short", day: "numeric", month: "short" });
  const back = (
    <button type="button" className="inline-flex min-h-11 cursor-pointer items-center gap-1 text-[15px] text-link hover:underline" onClick={onBack}>
      ← {t("profile.back")}
    </button>
  );
  if (err)
    return (
      <div className="mt-4">
        {back}
        <p className={cx(err === "error" ? errorBox : "rounded-card bg-surface p-6 text-center text-ink-muted shadow-card")} role={err === "error" ? "alert" : undefined}>
          {err === "not_found" ? t("botPage.notFound") : t("botPage.error")}
        </p>
      </div>
    );
  if (!p)
    return (
      <div className="mt-4" aria-busy="true">
        {back}
        <div className="h-28 rounded-card bg-surface-2 motion-safe:animate-pulse" />
      </div>
    );

  const windowLabel = range === "day" ? t("botPage.dayWindow", { date: day(p.from) }) : t("botPage.window30", { from: day(p.from, false), to: day(p.to, true) });
  const tone = (v: number) => (v >= 0 ? "text-good" : "text-bad");
  const credits = (v: number) => fmt.num(v, { maximumFractionDigits: 1 });
  const stat = (label: string, value: string, cls = "") => (
    <div className="min-w-0 rounded-card border border-line px-[13px] py-2">
      <div className="text-[13px] text-ink-muted">{label}</div>
      <div className={cx("mt-1 text-[19px] font-medium tabular-nums", cls || "text-navy-900")}>{value}</div>
    </div>
  );
  const rows = p.records.slice(0, shown);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>{back}</div>
      <section className="flex flex-col gap-3 rounded-card bg-surface px-[13px] py-3 shadow-card sm:px-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex size-14 flex-none items-center justify-center rounded-full bg-sky-100 text-[28px]" role="img" aria-label={t("board.botAvatar")}>
            🤖
          </span>
          <div className="min-w-0 flex-1 basis-40">
            <h2 className="flex flex-wrap items-center gap-2 text-[19px] font-medium text-navy-900">
              {name}
              <span className="rounded-full bg-slate px-2 py-px text-[11px] font-medium text-white">{t("board.bot")}</span>
            </h2>
            <p className="text-[13px] text-ink-muted">{windowLabel}</p>
          </div>
          <div className={seg} role="group" aria-label={t("botPage.rangeLabel")}>
            {(["day", "30d"] as const).map((r) => (
              <button key={r} type="button" className={cx(segBtn(range === r), "min-h-11 px-3")} aria-pressed={range === r} onClick={() => r !== range && onRange(r)}>
                {r === "day" ? t("botPage.day") : t("botPage.days30")}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-card bg-sky-50 px-[13px] py-2.5 text-[15px] leading-normal text-ink">
          <span className="font-medium text-navy-900">{t("botPage.strategy")}: </span>
          {t(`bots.${alias as Alias}.strategy`, { defaultValue: "" })}
        </div>
      </section>

      <section aria-labelledby="bot-stats">
        <h3 id="bot-stats" className={sectionHead}>
          {t("botPage.stats")}
        </h3>
        <div className={cx(sectionBody, "grid grid-cols-2 gap-3 p-[13px] sm:grid-cols-3 sm:p-4 lg:grid-cols-6")}>
          {stat(t("board.bets"), fmt.num(p.bets))}
          {stat(t("board.hit"), pc(p.hitRate))}
          {stat(t("board.staked"), credits(p.staked))}
          {stat(t("board.returned"), credits(p.returned))}
          {stat(t("board.net"), (p.net > 0 ? "+" : p.net < 0 ? "−" : "") + credits(Math.abs(p.net)), tone(p.net))}
          {stat(t("board.roi"), signed(p.roi), tone(p.roi))}
        </div>
      </section>

      <section aria-labelledby="bot-bets">
        <h3 id="bot-bets" className={sectionHead}>
          {t("botPage.bets")}
        </h3>
        <div className={sectionBody}>
          {p.records.length === 0 ? (
            <p className="p-6 text-center text-ink-muted">{t("botPage.none")}</p>
          ) : (
            <>
              {/* Phones: one card per bet. */}
              <ul className="flex flex-col md:hidden">
                {rows.map((b, i) => (
                  <li key={i} className="border-t border-line px-[13px] py-2.5 first:border-t-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[13px] text-ink-muted">{`${day(b.date)} · ${t(`common:venue.${b.venue === "HV" ? "HV" : "ST"}`)} · R${b.raceNo}`}</div>
                        <div className="text-[15px] font-medium text-navy-900">
                          {t(`botPage.pools.${b.pool}`)}
                          {b.pool === "TRIO" && <span className="ml-1 text-[13px] font-normal text-ink-muted">· {t("botPage.combos", { count: b.combos })}</span>}
                        </div>
                      </div>
                      <span className={cx(statusChip(b.status === "won" ? "won" : "lost"), "flex-none")}>{b.status === "won" ? t("botPage.won") : t("botPage.lost")}</span>
                    </div>
                    <Selection b={b} />
                    <div className="mt-1.5 text-[13px]">
                      <span className="text-ink-muted">{t("botPage.top3")}</span>
                      <Top3 b={b} />
                    </div>
                    <div className="mt-1 flex gap-4 text-[13px] tabular-nums">
                      <span className="text-ink-muted">
                        {t("botPage.stake")} <span className="text-ink">{credits(b.stake)}</span>
                      </span>
                      <span className="text-ink-muted">
                        {t("botPage.returned")} <span className={b.returned > 0 ? "font-medium text-good" : "text-ink"}>{credits(b.returned)}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {/* ≥ md: table. */}
              <div className="hidden overflow-x-auto md:block">
                <table className={cx(table, tablePadTight, "text-[14px]")}>
                  <thead>
                    <tr>
                      <th scope="col" className="text-left!">
                        {t("botPage.date")}
                      </th>
                      <th scope="col" className="text-left!">
                        {t("botPage.race")}
                      </th>
                      <th scope="col" className="text-left!">
                        {t("botPage.pool")}
                      </th>
                      <th scope="col" className="text-left!">
                        {t("botPage.selection")}
                      </th>
                      <th scope="col">{t("botPage.stake")}</th>
                      <th scope="col">{t("botPage.returned")}</th>
                      <th scope="col" className="text-center!">
                        {t("botPage.result")}
                      </th>
                      <th scope="col" className="text-left!">
                        {t("botPage.top3")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((b, i) => (
                      <tr key={i}>
                        <td className="text-left!">{day(b.date)}</td>
                        <td className="text-left!">
                          {t(`common:venue.${b.venue === "HV" ? "HV" : "ST"}`)} R{b.raceNo}
                        </td>
                        <td className="text-left!">
                          {t(`botPage.pools.${b.pool}`)}
                          {b.pool === "TRIO" && <span className="block text-[12px] text-ink-muted">{t("botPage.combos", { count: b.combos })}</span>}
                        </td>
                        <td className="min-w-[200px] text-left! whitespace-normal!">
                          <Selection b={b} />
                        </td>
                        <td className="tabular-nums">{credits(b.stake)}</td>
                        <td className={cx("tabular-nums", b.returned > 0 && "font-medium text-good")}>{credits(b.returned)}</td>
                        <td className="text-center!">
                          <span className={statusChip(b.status === "won" ? "won" : "lost")}>{b.status === "won" ? t("botPage.won") : t("botPage.lost")}</span>
                        </td>
                        <td className="min-w-[180px] text-left! text-[13px] whitespace-normal!">
                          <Top3 b={b} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {p.records.length > shown && (
                <div className="border-t border-line px-[13px] py-2 text-center">
                  <button type="button" className={cx(btn, "h-11")} onClick={() => setShown((n) => n + PAGE)}>
                    {t("botPage.showMore", { n: fmt.num(p.records.length - shown) })}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <p className="text-[13px] text-ink-muted">{t("botPage.note")}</p>
      <div>
        <button type="button" className={cx(btn, "h-11")} onClick={onBack}>
          {t("profile.back")}
        </button>
      </div>
    </div>
  );
}

/** "3 VIVACIOUS WIN", with the Chinese name in 繁 mode when the horse code is known. */
const HorseText = ({ h }: { h: BotHorse }) =>
  h.name ? (
    <>
      {h.num} {h.code ? <Name kind="horse" code={h.code} en={h.name} /> : h.name}
    </>
  ) : (
    <>#{h.num}</>
  );

/** Backed horses: number + name; Trio marks bankers (B / 膽) and legs (L / 腳). */
function Selection({ b }: { b: BotProfileBet }) {
  const { t } = useTranslation("home");
  const banker = new Set(b.bankers);
  return (
    <ul className="mt-1 flex flex-wrap gap-1.5 text-[13px]">
      {b.selection.map((h) => (
        <li key={h.num} className={cx("inline-flex items-center gap-1 rounded-xs px-1.5 py-0.5", banker.has(h.num) ? "bg-banker ring-1 ring-banker-bd" : "bg-sky-50")} title={h.code ?? undefined}>
          {b.pool === "TRIO" && <span className="text-[11px] font-medium text-ink-muted">{banker.has(h.num) ? t("botPage.banker") : t("botPage.leg")}</span>}
          <span className="text-navy-900"><HorseText h={h} /></span>
        </li>
      ))}
    </ul>
  );
}

/** The actual first three; horses the bot backed are highlighted. */
function Top3({ b }: { b: BotProfileBet }) {
  const { t } = useTranslation("home");
  const backed = new Set(b.selection.map((h) => h.num));
  return (
    <ol className="flex flex-col">
      {b.top3.map((h) => (
        <li key={`${h.pos}-${h.num}`} className={cx(backed.has(h.num) ? "font-medium text-navy-900" : "text-ink")} title={h.code ?? undefined}>
          {h.pos}. <HorseText h={h} />
          {backed.has(h.num) && <span className="sr-only"> ({t("botPage.picked")})</span>}
          {backed.has(h.num) && <span aria-hidden="true"> ✓</span>}
        </li>
      ))}
    </ol>
  );
}
