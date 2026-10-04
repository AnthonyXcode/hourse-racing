// Public member profile (?tab=member&id=<publicId>), opened from the Home leaderboard. Lazy chunk.
// Only what the member opted to share: name, photo, member-since month and settled LIVE-bet results.
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { BetTypeId, LeaderboardProfile, LeaderboardRange } from "../../shared/types";
import { btn, cx, errorBox, sectionBody, sectionHead, seg, segBtn, statusChip, table, tablePadTight } from "../kit";
import { pc, signed as signedAscii } from "../analyzer/format";

/** Signed %, with a real minus sign (matches the credit figures). */
const signed = (v: number) => signedAscii(v).replace("-", "−");
import { useGlossary } from "../i18n/glossary";
import { useFmt } from "../i18n/useLanguage";
import { Avatar } from "../members/ui";
import { HomeApiError, homeApi } from "./api";

export function MemberProfilePage({ publicId, onBack }: { publicId: string; onBack: () => void }) {
  const { t } = useTranslation(["home", "common"]);
  const fmt = useFmt();
  const g = useGlossary();
  const [range, setRange] = useState<LeaderboardRange>("30d");
  const [p, setP] = useState<LeaderboardProfile | null>(null);
  const [err, setErr] = useState<"not_found" | "error" | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    setErr(null);
    homeApi
      .profile(publicId, range, ac.signal)
      .then(setP)
      .catch((e) => {
        if ((e as Error).name === "AbortError") return;
        setErr(e instanceof HomeApiError && e.status === 404 ? "not_found" : "error");
      });
    return () => ac.abort();
  }, [publicId, range]);

  const picks = (s: string) => s.replaceAll("膽", t("common:role.bankerShort")).replaceAll("腳", t("common:role.legShort"));
  const pool = (id: string) => g.betType(id as BetTypeId);
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
          {err === "not_found" ? t("profile.notFound") : t("board.error")}
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

  const tone = (v: number) => (v >= 0 ? "text-good" : "text-bad");
  const stat = (label: string, value: string, cls = "") => (
    <div className="min-w-0 rounded-card border border-line px-[13px] py-2">
      <div className="text-[13px] text-ink-muted">{label}</div>
      <div className={cx("mt-1 text-[19px] font-medium tabular-nums", cls || "text-navy-900")}>{value}</div>
    </div>
  );
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>{back}</div>
      <section className="flex flex-wrap items-center gap-3 rounded-card bg-surface px-[13px] py-3 shadow-card sm:px-4">
        <Avatar name={p.displayName} src={p.avatarUrl} size="size-14" text="text-[20px]" ring />
        <div className="min-w-0 flex-1 basis-40">
          <h2 className="truncate text-[19px] font-medium text-navy-900">{p.displayName}</h2>
          <p className="text-[13px] text-ink-muted">{t("profile.since", { date: fmt.date(`${p.memberSince}-15T12:00:00+08:00`, { month: "long", year: "numeric" }) })}</p>
        </div>
        <div className={seg} role="group" aria-label={t("board.rangeLabel")}>
          {(["30d", "all"] as const).map((r) => (
            <button key={r} type="button" className={cx(segBtn(range === r), "min-h-11 px-3")} aria-pressed={range === r} onClick={() => setRange(r)}>
              {r === "30d" ? t("board.range30") : t("board.rangeAll")}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="pf-stats">
        <h3 id="pf-stats" className={sectionHead}>
          {t("profile.stats")}
        </h3>
        <div className={cx(sectionBody, "grid grid-cols-2 gap-3 p-[13px] sm:grid-cols-4 sm:p-4")}>
          {stat(t("board.bets"), fmt.num(p.bets))}
          {stat(t("board.hit"), pc(p.hitRate))}
          {stat(t("board.staked"), fmt.num(p.staked))}
          {stat(t("board.returned"), fmt.num(p.returned))}
          {stat(t("board.net"), (p.net > 0 ? "+" : p.net < 0 ? "−" : "") + fmt.num(Math.abs(p.net)), tone(p.net))}
          {stat(t("board.roi"), signed(p.roi), tone(p.roi))}
        </div>
      </section>

      {p.bets === 0 ? (
        <p className="rounded-card bg-surface p-6 text-center text-ink-muted shadow-card">{t("profile.noBets")}</p>
      ) : (
        <>
          <section aria-labelledby="pf-pools">
            <h3 id="pf-pools" className={sectionHead}>
              {t("profile.pools")}
            </h3>
            <div className={cx(sectionBody, "overflow-x-auto")}>
              <table className={cx(table, tablePadTight, "text-[15px]")}>
                <thead>
                  <tr>
                    <th scope="col" className="text-left!">
                      {t("profile.pool")}
                    </th>
                    <th scope="col">{t("board.bets")}</th>
                    <th scope="col">{t("profile.hits")}</th>
                    <th scope="col">{t("board.hit")}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.pools.map((r) => (
                    <tr key={r.pool}>
                      <td className="text-left!">{pool(r.pool)}</td>
                      <td className="tabular-nums">{fmt.num(r.bets)}</td>
                      <td className="tabular-nums">{fmt.num(r.hits)}</td>
                      <td className="tabular-nums">{pc((r.hits / r.bets) * 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="pf-recent">
            <h3 id="pf-recent" className={sectionHead}>
              {t("profile.recent")}
            </h3>
            <ul className={cx(sectionBody, "flex flex-col")}>
              {p.recent.map((b, i) => (
                <li key={i} className="flex items-start gap-3 border-t border-line px-[13px] py-2 first:border-t-0 sm:px-4">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-ink-muted">
                      {fmt.date(`${b.date}T12:00:00+08:00`, { day: "numeric", month: "short", year: "numeric" })} · {t(`common:venue.${b.venue === "HV" ? "HV" : "ST"}`)} · {b.races.map((n) => `R${n}`).join("+")}
                    </div>
                    <div className="text-[15px] font-medium text-navy-900">{pool(b.pool)}</div>
                    <div className="text-[13px] break-words text-ink">{picks(b.picks)}</div>
                  </div>
                  <div className="flex-none text-right text-[13px] tabular-nums">
                    <span className={statusChip(b.result === "won" ? "won" : "lost")}>{b.result === "won" ? t("profile.won") : t("profile.lost")}</span>
                    <div className="mt-1 text-ink-muted">
                      {t("profile.stake")} {fmt.num(b.stake)}
                    </div>
                    <div className={b.payout > 0 ? "text-good" : "text-ink-muted"}>
                      {t("profile.payout")} {fmt.num(b.payout)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <p className="text-[13px] text-ink-muted">{t("profile.privacy")}</p>
      <div>
        <button type="button" className={cx(btn, "h-11")} onClick={onBack}>
          {t("profile.back")}
        </button>
      </div>
    </div>
  );
}
