// Browser notification when today's next race passes the "Suggestions as of" cut-off: the picks are
// final then, so the viewer can act on them. Client-side only (no push server), so a tab of the site has
// to be open; checked on an interval rather than with one timer per race, so a changed cut-off or a
// delayed post time is picked up on the next tick. Opt-in per browser.
import { useEffect, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import { DEFAULT_CUTOFF, isCutoff, type DaySummaryRace } from "../../shared/momentum/model";
import { CUTOFF_KEY, cutoffLabel } from "./cutoff";
import { cx } from "../kit";
import { Switch } from "../Switch";

const KEY = "momentum.notify";
const TICK_MS = 15_000;
const DAY_REFRESH_MS = 5 * 60_000;
/** Background tabs throttle timers to about once a minute; don't notify for a cut-off older than this. */
const GRACE_MS = 3 * 60_000;

const supported = () => typeof window !== "undefined" && "Notification" in window;
const hkToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date());

// --- opt-in store (shared by the toggle and the watcher) ---
const listeners = new Set<() => void>();
function readEnabled() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
let enabled = readEnabled();
function setEnabled(v: boolean) {
  enabled = v;
  try {
    localStorage.setItem(KEY, v ? "1" : "0");
  } catch {
    // storage blocked: on for this visit only
  }
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const useEnabled = () => useSyncExternalStore(subscribe, () => enabled && supported() && Notification.permission === "granted");

/** The cut-off the Momentum page last stored (minutes from post, − = before). */
export function storedCutoff(): number {
  try {
    const v = Number(localStorage.getItem(CUTOFF_KEY));
    return isCutoff(v) ? v : DEFAULT_CUTOFF;
  } catch {
    return DEFAULT_CUTOFF;
  }
}

/**
 * Liquid-glass switch (Settings page); asks for permission on first switch-on. Hidden where notifications
 * aren't available. While pressed the knob swells into a clear lens; it springs across on release.
 */
export function NotifyToggle({ className }: { className?: string }) {
  const { t } = useTranslation(["momentum", "common"]);
  const on = useEnabled();
  if (!supported()) return null;
  const denied = Notification.permission === "denied";
  const toggle = async () => {
    if (on) return setEnabled(false);
    const p = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
    setEnabled(p === "granted");
  };
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      {denied && <span className="text-xs text-bad">{t("notify.denied")}</span>}
      <Switch checked={on} disabled={denied} label={t("notify.label")} onChange={() => void toggle()} />
    </span>
  );
}

/** Mounted once (App): fires one notification per race of today's meeting as its cut-off passes. */
export function useCutoffNotifications() {
  const { t } = useTranslation(["momentum", "common"]);
  const on = useEnabled();

  useEffect(() => {
    if (!on) return;
    let live = true;
    const date = hkToday();
    let races: { raceId: string; raceNo: number; postTime: string }[] = [];
    let loadedAt = 0;
    // Races already past their cut-off when watching starts don't fire (seeded on the first load).
    const done = new Set<string>();
    let seeded = false;

    const loadDay = async () => {
      const day = await api.momentumDay(date);
      loadedAt = Date.now();
      races = day.races.filter((r) => r.post_time).map((r) => ({ raceId: r.race_id, raceNo: r.race_no, postTime: r.post_time! }));
    };

    const notify = async (race: (typeof races)[number], cutoff: number) => {
      let r: DaySummaryRace | undefined;
      try {
        r = (await api.momentumSummary(date, cutoff)).races.find((x) => x.raceId === race.raceId);
      } catch {
        // still notify, without the picks
      }
      if (!live) return;
      const lines = [
        r?.picks.length ? t("notify.combined", { picks: r.picks.map((p) => `${p.horseNo}${p.both ? "★" : p.marketOnly ? "↑" : ""}`).join(" ") }) : "",
        r?.place.length ? t("notify.place", { picks: r.place.map((p) => p.horseNo).join(" ") }) : "",
      ].filter(Boolean);
      const n = new Notification(t("notify.title", { n: race.raceNo, when: cutoffLabel(t, cutoff) }), {
        body: lines.join("\n") || t("notify.noPicks"),
        tag: `cutoff-${race.raceId}`, // one per race, even across tabs
        icon: "/logo-128.png",
      });
      n.onclick = () => {
        window.focus();
        const url = new URL(window.location.href);
        url.search = new URLSearchParams({ tab: "momentum", day: date, race: String(race.raceNo), cutoff: String(cutoff) }).toString();
        window.location.href = url.href;
        n.close();
      };
    };

    const tick = async () => {
      try {
        if (!loadedAt || Date.now() - loadedAt > DAY_REFRESH_MS) await loadDay();
      } catch {
        return; // try again next tick
      }
      if (!live) return;
      const cutoff = storedCutoff();
      const now = Date.now();
      for (const race of races) {
        const at = Date.parse(race.postTime) + cutoff * 60_000;
        if (now < at || done.has(race.raceId)) continue;
        done.add(race.raceId);
        if (seeded && now - at < GRACE_MS) void notify(race, cutoff);
      }
      seeded = true;
    };

    void tick();
    const timer = setInterval(tick, TICK_MS);
    return () => {
      live = false;
      clearInterval(timer);
    };
  }, [on, t]);
}
