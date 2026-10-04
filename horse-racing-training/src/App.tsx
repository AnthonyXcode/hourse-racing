import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_VIEW, VIEWS, readView, type View } from "./views";
import { HomePage } from "./home/HomePage";

const MemberProfilePage = lazy(() => import("./home/MemberProfile").then((m) => ({ default: m.MemberProfilePage })));
const BotProfilePage = lazy(() => import("./home/BotProfile").then((m) => ({ default: m.BotProfilePage })));
import { api } from "./api";
import { BET_TYPES, countCombos } from "../shared/betEngine/index";
import type { MeetingRef, RaceCard, BetTypeId, BetSelection, HistoryEntry, RaceStatus } from "../shared/types";
import { RaceCardTable, PoolMenu, StakeBar, ResultModal, ResultPanel, HistoryPage, emptyPicks, legSummary, usePoolName, ymd, type HistoryFilter, type PickCol, type Picks, type Pool } from "./ui";
import { BetSlip } from "./BetSlip";
import { MIN_UNIT, scaleResult, type SettledBet, type SlipItem } from "./slip";
import type { RaceResult } from "../shared/types";
import { AnalyzerPage } from "./analyzer/AnalyzerPage";
import { MomentumPage } from "./momentum/MomentumPage";
import { SettingsPage } from "./SettingsPage";
import { useTranslation } from "react-i18next";
import { useGlossary } from "./i18n/glossary";
import { LangSwitch, useFmt, useLanguage } from "./i18n/useLanguage";
import { track } from "./analytics";
import { Footer, LEGAL_VIEWS, LegalDoc, SiteMap } from "./LegalPages";
import { PicksBanner } from "./momentum/PicksBanner";
import { useCutoffNotifications } from "./momentum/notify";
import { RaceAnalysisPanel } from "./RaceAnalysisPanel";
import { useSeo } from "./seo";
import { Display, btnPill, chipBtn, container, control, cx, errorBox, modeBadge, noticeBanner, panel, pill, pillRow, tabBadge } from "./kit";
import { CreditsProvider, useCredits } from "./credits/CreditsProvider";
import { CreditChip } from "./credits/CreditChip";
import { CreditsPage } from "./credits/CreditsPage";
import { SwitchModeDialog, WelcomeDialog } from "./credits/dialogs";
import { loadSavedSlip, saveSlip, useLiveSlip } from "./credits/useLiveSlip";
import type { MeetingWithLive } from "./credits/api";
import { AuthProvider, useAuth } from "./members/auth";
import { AccountEntry } from "./members/AccountMenu";
import { AccountPage } from "./members/AccountPage";
import { LoginEmptyState, SaveBanner } from "./members/GuestPrompts";
import { memberApi } from "./members/api";
import { errorText } from "./members/ui";

/** Publish the sticky header's height as --header-h so other sticky bars can sit just below it. */
function useHeaderHeightVar() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const publish = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return ref;
}

/** false until `v` is first true, then true for good. */
function useOnceTrue(v: boolean): boolean {
  const [seen, setSeen] = useState(v);
  if (v && !seen) setSeen(true);
  return seen || v;
}

/** How often the bet page re-polls the meeting list while visible. */
const DAYS_REFRESH_MS = 5 * 60_000;
/** Home has no tab: the logo + name at the top left leads there. */
const TABS = [
  ["bet", "nav.bet"],
  ["history", "nav.history"],
  ["win-place", "nav.winPlace"],
  ["trio", "nav.trio"],
  ["momentum", "nav.momentum"],
  ["settings", "nav.settings"],
] as const satisfies readonly (readonly [View, `nav.${string}`])[];
/** Primary tab: HKJC-style block, navy when active. */
const navBtn = (on: boolean) =>
  on
    ? "inline-flex h-10 flex-none cursor-pointer items-center bg-navy-700 px-4 text-[15px] font-medium whitespace-nowrap text-white"
    : "inline-flex h-10 flex-none cursor-pointer items-center px-4 text-[15px] whitespace-nowrap text-ink transition-colors hover:bg-sky-50";
/** Last meeting picked on this device (per DESIGN-SPEC §1b). */
const MEETING_KEY = "pt:meeting";
const readSaved = () => {
  try {
    return localStorage.getItem(MEETING_KEY) ?? "";
  } catch {
    return "";
  }
};
/** Upcoming (Live) group = any race not settled/void yet; Past (Practice) = all settled. */
const isUpcoming = (m: MeetingRef) => (m.mode ? m.mode !== "practice" : !m.hasResults);
/** mm:ss or h:mm:ss */
const clockText = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
};

/** Bets a guest settled this visit, uploaded if they log in from the save prompt (PRD §2.7). */
const GUEST_PENDING_MAX = 20;

/** A race picked as a DT/TT leg but not the one being edited. */
const pickedLeg =
  "inline-flex size-8 flex-none cursor-pointer items-center justify-center rounded-full bg-sky-150 text-[15px] font-medium text-navy-900 ring-2 ring-navy-700";

/** The public profile shown by ?tab=member&id=… (opaque public id). */
const readProfileId = () => new URLSearchParams(window.location.search).get("id") ?? "";

/**
 * Current tab, mirrored to ?tab= so a copied link reopens it. Each switch is a history entry, so back/forward
 * step between tabs (and between member profiles: ?tab=member&id=…).
 */
/** Member / bot page state besides the id: ?range=day|30d (&date=YYYY-MM-DD) for bot pages. */
const MEMBER_PARAMS = ["range", "date"] as const;
const readMemberParams = () => {
  const q = new URLSearchParams(window.location.search);
  return Object.fromEntries(MEMBER_PARAMS.flatMap((k) => (q.get(k) ? [[k, q.get(k)!]] : []))) as Partial<Record<(typeof MEMBER_PARAMS)[number], string>>;
};

function useViewParam(): [View, (v: View, id?: string, extra?: Partial<Record<(typeof MEMBER_PARAMS)[number], string>>) => void, string, Partial<Record<(typeof MEMBER_PARAMS)[number], string>>] {
  const [state, setState] = useState(() => ({ view: readView(), id: readProfileId(), extra: readMemberParams() }));
  useEffect(() => {
    const onPop = () => setState({ view: readView(), id: readProfileId(), extra: readMemberParams() });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const setView = (v: View, id = "", extra: Partial<Record<(typeof MEMBER_PARAMS)[number], string>> = {}) => {
    if (v === state.view && id === state.id && MEMBER_PARAMS.every((k) => (extra[k] ?? "") === (state.extra[k] ?? ""))) return;
    const url = new URL(window.location.href);
    if (v === DEFAULT_VIEW) url.searchParams.delete("tab");
    else url.searchParams.set("tab", v);
    if (v !== "momentum") for (const k of ["day", "race", "cutoff"]) url.searchParams.delete(k); // Momentum-only state
    if (v === "member" && id) url.searchParams.set("id", id);
    else url.searchParams.delete("id"); // member-only state
    for (const k of MEMBER_PARAMS) {
      const val = v === "member" ? extra[k] : undefined;
      if (val) url.searchParams.set(k, val);
      else url.searchParams.delete(k);
    }
    window.history.pushState(null, "", url);
    setState({ view: v, id, extra: v === "member" ? extra : {} });
  };
  return [state.view, setView, state.id, state.extra];
}

export default function App() {
  return (
    <AuthProvider>
      <CreditsProvider>
        <AppBody />
      </CreditsProvider>
    </AuthProvider>
  );
}

function AppBody() {
  const [days, setDays] = useState<MeetingRef[]>([]);
  const [meetingKey, setMeetingKey] = useState<string>(""); // "date_venue"
  const [meeting, setMeeting] = useState<MeetingWithLive | null>(null);
  const [activeRace, setActiveRace] = useState(1);
  const [pool, setPool] = useState<Pool>("wp");
  const [cards, setCards] = useState<Record<number, RaceCard>>({});
  const [picks, setPicks] = useState<Record<number, Picks>>({});
  const [editRace, setEditRace] = useState(1);
  const [dtLegs, setDtLegs] = useState<number[]>([]); // chosen leg races for DT/TT
  const [unit, setUnit] = useState(MIN_UNIT);
  const [slip, setSlip] = useState<SlipItem[]>(loadSavedSlip);
  const [settled, setSettled] = useState<SettledBet[] | null>(null);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation(["common", "bet", "account", "history", "credits"]);
  const credits = useCredits();
  const { t: ta } = useTranslation("account");
  const auth = useAuth();
  const { user } = auth;
  /** Guest bets settled since the page loaded (newest last, at most 20). */
  const guestPending = useRef<HistoryEntry[]>([]);
  useCutoffNotifications();
  const g = useGlossary();
  const poolName = usePoolName();
  const { lang } = useLanguage();
  const fmt = useFmt();
  const [view, setViewRaw, profileId, profileParams] = useViewParam();
  /** Switch tabs, asking first if the account page has unsaved edits. */
  const setView = (v: View) => (v === view ? undefined : auth.guard(() => setViewRaw(v)));
  /** Open a leaderboard member's public profile (?tab=member&id=…). */
  const openProfile = (id: string, extra?: { range?: string; date?: string }) => auth.guard(() => setViewRaw("member", id, extra));
  useSeo(view);
  const headerRef = useHeaderHeightVar();
  /** For links that carry a view name as a string (footer, site map). */
  const selectView = (v: string) => {
    const known = VIEWS.find((x) => x === v);
    if (known) setView(known);
  };
  /** null until the member's history has loaded. */
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);
  const analyzerOpened = useOnceTrue(view === "win-place" || view === "trio");

  // Load the meeting list and open the last racing day (newest meeting on or before today, HK time).
  // Re-poll while the tab is visible and on returning to it: the server fetches new racecards/results
  // every 5 min, so a tab left open would otherwise never see them.
  useEffect(() => {
    let live = true;
    let first = true;
    const load = () =>
      api
        .days()
        .then((ds) => {
          if (!live) return;
          setDays(ds);
        })
        .catch((e) => first && setError(String(e))) // background refresh failures stay quiet
        .finally(() => (first = false));
    load();
    const onShow = () => document.visibilityState === "visible" && load();
    const timer = setInterval(onShow, DAYS_REFRESH_MS);
    document.addEventListener("visibilitychange", onShow);
    return () => {
      live = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onShow);
    };
  }, []);

  // Default meeting once the list and the session are known: the device's last choice; else a member with
  // LIVE on gets the next upcoming meeting; guests (or LIVE off) get the newest past meeting, as before.
  useEffect(() => {
    if (meetingKey || !days.length || user === undefined) return;
    const saved = readSaved();
    if (saved && days.some((m) => `${m.date}_${m.venue}` === saved) && (credits.liveBetting || !isUpcoming(days.find((m) => `${m.date}_${m.venue}` === saved)!))) return setMeetingKey(saved);
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date()).replaceAll("-", "");
    const upcoming = days.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
    const pick =
      (user && credits.liveBetting && upcoming[0]) ||
      days.find((m) => !isUpcoming(m) && m.date <= today) ||
      days.find((m) => m.date <= today) ||
      days[days.length - 1]; // newest first; else the earliest upcoming
    if (pick) setMeetingKey(`${pick.date}_${pick.venue}`);
  }, [days, user, credits.liveBetting, meetingKey]);
  const chooseMeeting = (k: string) => {
    setMeetingKey(k);
    try {
      localStorage.setItem(MEETING_KEY, k);
    } catch {
      /* per-device convenience only */
    }
  };

  // Opening History clears the "new results" badge.
  useEffect(() => {
    if (view === "history") credits.markSettledSeen();
    if (view !== "history") setHistoryFilter(undefined);
  }, [view, credits.unseenSettled]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh a member's history whenever the History tab is opened (or they log in on it).
  // Guests have no history; a 401 means the session ended, so drop to guest state.
  const memberId = user?.id;
  useEffect(() => {
    setHistory(null);
    if (view !== "history" || !memberId) return;
    memberApi
      .history()
      .then(setHistory)
      .catch((e) => auth.handleAuthError(e) || setError(errorText(ta, e)));
  }, [view, memberId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [date, venue] = meetingKey ? meetingKey.split("_") : ["", ""];

  // When a meeting is picked: load detail, reset to R1, clear picks.
  useEffect(() => {
    if (!date || !venue) return;
    setPicks({});
    setCards({});
    api
      .meeting(date, venue)
      .then((m) => {
        const lm = m as MeetingWithLive;
        setMeeting(lm);
        if (lm.serverNow) setClockOffset(Date.parse(lm.serverNow) - Date.now());
        // Live meeting: open on the next race still open, else the first race.
        const next = lm.raceInfo?.find((r) => r.status === "open")?.raceNumber;
        setActiveRace(next ?? m.races[0] ?? 1);
        setEditRace(next ?? m.races[0] ?? 1);
      })
      .catch((e) => setError(String(e)));
  }, [meetingKey]);

  // ---- LIVE: per-race status on the server clock ----
  const [clockOffset, setClockOffset] = useState(0);
  const [nowTick, setNowTick] = useState(Date.now());
  const serverNow = nowTick + clockOffset;
  const liveMeeting = !!meeting && meeting.date === date && !!meeting.mode && meeting.mode !== "practice";
  useEffect(() => {
    if (!liveMeeting) return;
    const tick = setInterval(() => setNowTick(Date.now()), 1000);
    // Pick up status changes (results in, schedule moved, kill switch) about once a minute.
    const refresh = setInterval(() => {
      if (document.visibilityState !== "visible" || !date || !venue) return;
      api
        .meeting(date, venue)
        .then((m) => {
          const lm = m as MeetingWithLive;
          setMeeting(lm);
          if (lm.serverNow) setClockOffset(Date.parse(lm.serverNow) - Date.now());
        })
        .catch(() => {});
    }, 60_000);
    return () => {
      clearInterval(tick);
      clearInterval(refresh);
    };
  }, [liveMeeting, date, venue]);
  /** Status of a race now. The server decides; the client only closes a race early for display at post time. */
  const raceStatusOf = (rn: number): RaceStatus => {
    const r = meeting?.raceInfo?.find((x) => x.raceNumber === rn);
    if (!r) return liveMeeting ? "unavailable" : "settled";
    if (r.status === "open" && r.postTime && serverNow >= Date.parse(r.postTime)) return "closed";
    return r.status;
  };
  const postTimeOf = (d: string, rn: number) => (meeting && meeting.date === d ? (meeting.raceInfo?.find((x) => x.raceNumber === rn)?.postTime ?? null) : null);
  useEffect(() => {
    if (meeting?.mode) track("mode_view", { mode: liveMeeting ? "live" : "practice" });
  }, [meetingKey, liveMeeting]); // eslint-disable-line react-hooks/exhaustive-deps

  // A refresh changed the open meeting (results posted, races added): reload its detail and cards
  // (cards pick up final odds from results), keeping the user's picks.
  const openRef = days.find((m) => m.date === date && m.venue === venue);
  const openSig = openRef ? `${openRef.races.join(",")}|${openRef.hasResults}` : "";
  useEffect(() => {
    if (!meeting || meeting.date !== date || meeting.venue !== venue) return; // still loading this meeting
    if (!openSig || openSig === `${meeting.races.join(",")}|${meeting.hasResults}`) return;
    api
      .meeting(date, venue)
      .then((m) => {
        setMeeting(m);
        setCards({});
      })
      .catch((e) => setError(String(e)));
  }, [openSig]); // eslint-disable-line react-hooks/exhaustive-deps

  /** The engine bet type behind the pool page (Win/Place settles as Win and/or Place). */
  const betType: BetTypeId = pool === "wp" ? "win" : pool;
  const legCount = BET_TYPES[betType].legRaces; // 1, 2 (DT), or 3 (TT)

  // LIVE offers only the meeting's designated DT/TT legs (known before results); practice keeps any legs.
  const dtPools = (liveMeeting ? meeting?.liveDoubleTrioPools : meeting?.doubleTrioPools) ?? [];
  const ttPools = (liveMeeting ? meeting?.liveTripleTrioPools : meeting?.tripleTrioPools) ?? [];
  const officialPools = betType === "doubleTrio" ? dtPools : betType === "tripleTrio" ? ttPools : [];

  // Default the DT/TT leg races to the first designated pool when switching in.
  useEffect(() => {
    if (!meeting) return;
    if (betType === "doubleTrio") setDtLegs(dtPools[0] ?? []);
    else if (betType === "tripleTrio") setDtLegs(ttPools[0] ?? []);
  }, [betType, meeting]); // eslint-disable-line react-hooks/exhaustive-deps

  // Which races this bet type collects picks in.
  const legRaces = useMemo<number[]>(() => {
    if (!meeting) return [];
    if (legCount > 1) return [...dtLegs].sort((a, b) => a - b);
    return [activeRace];
  }, [legCount, dtLegs, activeRace, meeting]);

  // Toggle a race in/out of the DT/TT leg set (max legCount).
  function toggleLeg(rn: number) {
    setDtLegs((prev) =>
      prev.includes(rn) ? prev.filter((x) => x !== rn) : prev.length < legCount ? [...prev, rn] : prev
    );
    setEditRace(rn);
  }

  // Keep editRace inside the current leg set.
  useEffect(() => {
    if (legRaces.length && !legRaces.includes(editRace)) setEditRace(legRaces[0]!);
  }, [legRaces, editRace]);

  // Lazy-load the card for whatever race we're editing.
  useEffect(() => {
    if (!date || !venue || !editRace || cards[editRace]) return;
    api
      .race(date, venue, editRace)
      .then((c) => setCards((p) => ({ ...p, [editRace]: c })))
      .catch((e) => setError(String(e)));
  }, [date, venue, editRace, cards]);

  const bankerEnabled = pool !== "wp" && BET_TYPES[betType].banker;
  const bankerMax = BET_TYPES[betType].depth - 1;

  // Tick / untick a box. Banker and Select are exclusive for a horse; Win and Place are independent.
  function toggle(rn: number, col: PickCol, horse: number) {
    setPicks((prev) => {
      const p = { ...(prev[rn] ?? emptyPicks()) };
      const on = p[col].includes(horse);
      p[col] = on ? p[col].filter((h) => h !== horse) : [...p[col], horse];
      if (!on && col === "bankers") p.legs = p.legs.filter((h) => h !== horse);
      if (!on && col === "legs") p.bankers = p.bankers.filter((h) => h !== horse);
      return { ...prev, [rn]: p };
    });
  }

  // Field: every runner in a column (bankers stay bankers).
  function field(rn: number, col: PickCol, on: boolean) {
    const runners = (cards[rn]?.entries ?? []).filter((e) => !e.isScratched).map((e) => e.horseNumber);
    setPicks((prev) => {
      const p = { ...(prev[rn] ?? emptyPicks()) };
      p[col] = on ? runners.filter((h) => col !== "legs" || !p.bankers.includes(h)) : [];
      return { ...prev, [rn]: p };
    });
  }

  // The bets the current ticks make. Win/Place can make two; other pools one.
  // Engine counts combos from legs excluding bankers, so keep them disjoint; pools without
  // bankers fold any banker ticks back into legs.
  const selections = useMemo<BetSelection[]>(() => {
    if (pool === "wp") {
      const p = picks[activeRace] ?? emptyPicks();
      return (["win", "place"] as const)
        .filter((c) => p[c].length)
        .map((c) => ({ type: c, raceLegs: [{ raceNumber: activeRace, bankers: [], legs: p[c] }] }));
    }
    const raceLegs = legRaces.map((rn) => {
      const p = picks[rn] ?? emptyPicks();
      return bankerEnabled ? { raceNumber: rn, bankers: p.bankers, legs: p.legs } : { raceNumber: rn, bankers: [], legs: [...p.bankers, ...p.legs] };
    });
    return [{ type: betType, raceLegs }];
  }, [pool, legRaces, picks, betType, bankerEnabled, activeRace]);

  const combos = selections.reduce((s, sel) => s + countCombos(sel), 0);
  // Practice meeting: as before (needs results). Live meeting: every leg race open → LIVE; else view-only.
  const legStatuses = (pool === "wp" ? [activeRace] : legRaces).map(raceStatusOf);
  const betMode: "practice" | "live" | "view" = !liveMeeting ? "practice" : legStatuses.length && legStatuses.every((s) => s === "open") && credits.liveBetting ? "live" : "view";
  const canAdd = betMode === "practice" ? (meeting?.hasResults ?? false) : betMode === "live";
  const viewStatus = legStatuses.find((s) => s !== "open") ?? (credits.liveBetting ? "open" : "unavailable");
  const slipMode: "practice" | "live" | null = slip.length ? (slip[0]!.mode ?? "practice") : null;
  const slipTotal = slip.reduce((s, it) => s + it.cost, 0);
  const [switchAsk, setSwitchAsk] = useState<SlipItem[] | null>(null);
  const liveSlip = useLiveSlip(slip, (f) => setSlip(f), postTimeOf);
  useEffect(() => saveSlip(slip), [slip]);
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter | undefined>();
  const goBuy = () => {
    saveSlip(slip);
    setView("credits");
  };

  // Stake calculator → bet slip; clear the ticks that went in.
  function addToSlip() {
    if (!date || !venue) return;
    const items = selections
      .map((sel): SlipItem | null => {
        const n = countCombos(sel);
        return n
          ? { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, date, venue: venue as MeetingRef["venue"], betType: sel.type, selection: sel, unit, combos: n, cost: n * unit }
          : null;
      })
      .filter((x): x is SlipItem => x !== null);
    if (!items.length) return;
    const mode = betMode === "live" ? "live" : "practice";
    for (const it of items) it.mode = mode;
    if (mode === "live" && !user) {
      auth.openLogin({ source: "header" }); // ticks are kept; Add again after logging in
      return;
    }
    liveSlip.clearReceipt();
    if (slipMode && slipMode !== mode) {
      setSwitchAsk(items); // a slip holds one mode only
      return;
    }
    setSlip((s) => [...s, ...items]);
    setPicks((prev) => {
      const next = { ...prev };
      for (const rn of pool === "wp" ? [activeRace] : legRaces) delete next[rn];
      return next;
    });
  }

  // Place bet → Confirm: LIVE slips are placed on the server (credits, settle later); practice slips settle
  // each bet now, record it in history, and show the outcome.
  async function confirmSlip() {
    if (slipMode === "live") return liveSlip.place();
    setError("");
    const done: SettledBet[] = [];
    for (const item of slip) {
      try {
        const r = scaleResult(await api.settle({ date: item.date, venue: item.venue, selection: item.selection }), item.unit);
        done.push({ item, result: r });
        track("practice_bet", { bet_type: item.betType, combos: item.combos, hit: r.hit, member: !!user });
        const multi = r.legResults.length > 1;
        const resultStr = r.legResults
          .map((lr) => {
            const top4 = lr.finishers.slice(0, 4).map((f) => f.horseNumber).join("-");
            return multi ? `R${lr.raceNumber}:${top4}` : top4;
          })
          .join("  ");
        const entry: HistoryEntry = {
          id: item.id,
          ts: new Date().toISOString(),
          date: item.date,
          venue: item.venue,
          betType: item.betType,
          betLabel: BET_TYPES[item.betType].label,
          picks: item.selection.raceLegs.map((l) => `R${l.raceNumber} ${legSummary(l)}`).join("  |  "),
          result: resultStr,
          combos: item.combos,
          cost: r.cost,
          hit: r.hit,
          payout: r.payout,
          net: r.net,
          poolDividendText: r.poolDividendText,
        };
        if (user) {
          memberApi.addHistory(entry).catch((e) => auth.handleAuthError(e) || setError(t("account:err.historySave")));
        } else {
          guestPending.current = [...guestPending.current, entry].slice(-GUEST_PENDING_MAX); // nothing is sent for guests
        }
      } catch (e) {
        setError(String(e));
        break; // keep this and later bets on the slip
      }
    }
    const ids = new Set(done.map((d) => d.item.id));
    setSlip((s) => s.filter((it) => !ids.has(it.id)));
    if (done.length) setSettled(done);
  }

  /** Header menu / account page Log out: back to the bet page if they were on their account. */
  function logout() {
    void auth.logout();
    if (view === "account") setViewRaw(DEFAULT_VIEW);
  }

  /** Result-modal banner: log in, then save this visit's guest bets once and close the modal. */
  function loginToSave() {
    auth.openLogin({
      source: "save_prompt",
      onLoggedIn: async () => {
        const pending = guestPending.current;
        guestPending.current = [];
        setSettled(null);
        if (!pending.length) return;
        try {
          await memberApi.addHistoryBatch(pending);
          return t("account:toast.savedBets", { count: pending.length });
        } catch (e) {
          setError(t("account:err.historySave"));
          return undefined;
        }
      },
    });
  }

  const card = cards[editRace];
  const rp = picks[editRace] ?? emptyPicks();

  /** Display-only leg summary ("膽 1,2  腳 3" / "B 1,2  L 3"); history keeps legSummary's stored format. */
  const legLabel = (leg: { bankers: number[]; legs: number[] } | undefined) => {
    if (!leg) return "—";
    const parts = [
      leg.bankers.length ? `${t("role.bankerShort")} ${leg.bankers.join(",")}` : "",
      leg.legs.length ? `${t("role.legShort")} ${leg.legs.join(",")}` : "",
    ].filter(Boolean);
    return parts.join("  ") || "—";
  };

  const upcomingDays = days.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date) || a.venue.localeCompare(b.venue));
  const pastDays = days.filter((m) => !isUpcoming(m));

  // Status line under the race chips (live meetings): next race / countdown / all closed.
  const openRaces = (meeting?.raceInfo ?? []).filter((r) => raceStatusOf(r.raceNumber) === "open" && r.postTime);
  const nextRace = openRaces[0];
  const nextIn = nextRace ? Math.max(0, Math.floor((Date.parse(nextRace.postTime!) - serverNow) / 1000)) : 0;
  const hkTime = (iso: string) => fmt.date(iso, { hour: "2-digit", minute: "2-digit", hour12: false });
  const statusLine = !liveMeeting || !credits.liveBetting
    ? null
    : !nextRace
      ? { text: t("credits:race.allClosed"), cls: "text-ink-muted" }
      : nextIn > 3600
        ? { text: t("credits:race.nextAt", { n: nextRace.raceNumber, time: hkTime(nextRace.postTime!) }), cls: "text-ink" }
        : { text: t("credits:race.closesIn", { n: nextRace.raceNumber, time: clockText(nextIn) }), cls: "font-medium text-navy-900 tabular-nums" };
  // Announce the countdown only at 10 min, 1 min and closed (never every second).
  const announce = !nextRace ? (liveMeeting ? t("credits:race.allClosed") : "") : nextIn <= 60 ? t("credits:race.closesIn", { n: nextRace.raceNumber, time: "1:00" }) : nextIn <= 600 ? t("credits:race.closesIn", { n: nextRace.raceNumber, time: "10:00" }) : "";
  const blockedNote =
    betMode !== "view" ? null : viewStatus === "closed" ? t("credits:race.closedNote") : viewStatus === "unavailable" || viewStatus === "open" ? t("credits:race.unavailable") : t("credits:race.viewOnly");

  const meetingSelect = (
    <select id="bDay" className={cx(control, "w-full sm:w-auto sm:min-w-[300px]")} value={meetingKey} disabled={!days.length} onChange={(e) => chooseMeeting(e.target.value)}>
      {!meetingKey && <option value="">{days.length ? t("bet:selectDay") : t("state.loading")}</option>}
      {/* Mode is a property of the meeting (DESIGN-SPEC D1): upcoming = Live, past = Practice. */}
      {upcomingDays.length > 0 && (
        <optgroup label={credits.liveBetting ? t("credits:picker.live") : t("credits:picker.livePaused")}>
          {upcomingDays.map((m) => (
            <option key={`${m.date}_${m.venue}`} value={`${m.date}_${m.venue}`} disabled={!credits.liveBetting && `${m.date}_${m.venue}` !== meetingKey}>
              {t("bet:dayOption", { date: fmt.date(ymd(m.date)), venue: g.venue(m.venue), races: t("races", { count: m.races.length }) })}
              {m.mode === "closed" ? ` ${t("credits:picker.awaitingResults")}` : ""}
            </option>
          ))}
        </optgroup>
      )}
      <optgroup label={t("credits:picker.practice")}>
        {pastDays.map((m) => (
          <option key={`${m.date}_${m.venue}`} value={`${m.date}_${m.venue}`}>
            {t("bet:dayOption", { date: fmt.date(ymd(m.date)), venue: g.venue(m.venue), races: t("races", { count: m.races.length }) })}
            {m.hasResults ? "" : t("bet:noResultsSuffix")}
          </option>
        ))}
      </optgroup>
    </select>
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <header ref={headerRef} className="sticky top-0 z-40 shadow-card">
        {/* Navy top bar: our own logo + name (not HKJC's), language, credits, account. */}
        <div className="bg-navy-900 text-white">
          <div className={cx(container, "flex h-12 items-center gap-3")}>
            <h1 className="flex-none text-lg leading-none font-bold">
              <a
                href={lang === "en" ? "/?language=en" : "/"}
                className="-ml-1 flex min-h-11 items-center gap-2 rounded-control px-1 text-white no-underline hover:opacity-90"
                aria-current={view === "home" ? "page" : undefined}
                aria-label={t("nav.homeLink", { name: t("appName") })}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // new tab / window: let the browser do it
                  e.preventDefault();
                  setView("home");
                }}
              >
                <img src="/logo-128.png" alt="" width={32} height={32} className="size-8 flex-none" />
                {t("appName")}
              </a>
            </h1>
            <LangSwitch className="ml-auto" />
            <CreditChip onOpen={() => setView("credits")} />
            <AccountEntry current={view} onNavigate={setViewRaw} onLogout={logout} />
          </div>
        </div>
        {/* Primary tabs: navy block marks the current one; scrolls sideways on phones. */}
        <div className="border-b border-edge bg-surface">
          <nav aria-label={t("nav.sections")} className={cx(container, "flex overflow-x-auto")}>
            {TABS.map(([v, key]) => (
              <button
                key={v}
                className={navBtn(view === v)}
                aria-current={view === v ? "page" : undefined}
                aria-label={v === "history" && credits.unseenSettled ? t("credits:history.tabBadge", { n: credits.unseenSettled }) : undefined}
                onClick={() => setView(v)}
              >
                {t(key)}
                {v === "history" && credits.unseenSettled > 0 && <span className={tabBadge(view === v)}>{credits.unseenSettled}</span>}
              </button>
            ))}
          </nav>
        </div>
        {/* Featured Combined picks (next race, else the last one): slim strip inside the sticky header, so
            --header-h covers it. Every app tab; not on legal pages. */}
        {!(LEGAL_VIEWS as readonly string[]).includes(view) && <PicksBanner onSelect={selectView} linked={view !== "momentum"} />}
      </header>

      <main className={cx(container, "flex-1 pb-12", view === "bet" && "pb-24 lg:pb-12")}>
        {error && <div className={errorBox}>{error}</div>}

        {/* Analyzer performance. Stays mounted once opened so the range, filters
            and loaded analysis survive switching to other tabs and back. */}
        {analyzerOpened && (
          <div hidden={view !== "win-place" && view !== "trio"}>
            <AnalyzerPage tab={view === "trio" ? "trio" : "win-place"} />
          </div>
        )}

        {view === "home" && (
          <HomePage
            onNavigate={(v) => selectView(v)}
            onUpcoming={() => {
              const next = upcomingDays[0];
              if (next) chooseMeeting(`${next.date}_${next.venue}`);
              setView("bet");
            }}
            onOpenProfile={openProfile}
          />
        )}
        {view === "member" && (
          <Suspense fallback={<div className={cx(panel, "mt-6 text-center text-ink-muted")}>{t("account:loading")}</div>}>
            {profileId.startsWith("bot-") ? (
              <BotProfilePage
                key={`${profileId}_${profileParams.range ?? ""}_${profileParams.date ?? ""}`}
                alias={profileId.slice(4)}
                range={profileParams.range === "day" ? "day" : "30d"}
                date={profileParams.date}
                onRange={(range, date) => setViewRaw("member", profileId, { range, ...(date ? { date } : {}) })}
                onBack={() => (window.history.length > 1 ? window.history.back() : setView("home"))}
              />
            ) : (
              <MemberProfilePage key={profileId} publicId={profileId} onBack={() => (window.history.length > 1 ? window.history.back() : setView("home"))} />
            )}
          </Suspense>
        )}
        {view === "momentum" && <MomentumPage />}
        {view === "settings" && <SettingsPage />}

        {view === "history" &&
          (user === null ? (
            <div className="mt-2">
              <Display sub={t("history:sub")}>{t("history:title")}</Display>
              <LoginEmptyState title={t("account:guest.historyTitle")} onLogin={() => auth.openLogin({ source: "history" })} />
            </div>
          ) : user && history ? (
            <HistoryPage
              key={historyFilter ?? "default"}
              initialFilter={historyFilter}
              shareName={user?.displayName}
              entries={history}
              onDelete={(id) => memberApi.deleteHistory(id).then(setHistory).catch((e) => auth.handleAuthError(e) || setError(errorText(ta, e)))}
              onClear={() =>
                memberApi
                  .clearHistory()
                  .then(setHistory)
                  .catch((e) => {
                    if (!auth.handleAuthError(e)) throw e; // dialog shows the error
                  })
              }
            />
          ) : (
            <div className={cx(panel, "mt-6 text-center text-ink-muted")}>{t("account:loading")}</div>
          ))}

        {view === "account" && <AccountPage onLogout={logout} onDeleted={() => setViewRaw(DEFAULT_VIEW)} />}
        {view === "credits" && (
          <CreditsPage
            onOpenHistory={() => {
              setHistoryFilter("pending");
              setView("history");
            }}
            savedSlip={slip.some((i) => i.mode === "live")}
            onBackToSlip={() => setView("bet")}
          />
        )}

        {view === "bet" && !credits.liveBetting && upcomingDays.length > 0 && (
          <div className={cx(noticeBanner, "mt-4")} role="status">
            <span aria-hidden="true" className="mt-0.5 inline-flex size-4 flex-none items-center justify-center bg-ink-strong text-[11px] font-bold text-gold">
              !
            </span>
            {t("credits:killswitch.banner")}
          </div>
        )}
        {view === "bet" && (
          // HKJC layout: pool menu · race card · bet slip (one column on phones, slip as a bottom bar).
          <div className="mt-4 grid items-start gap-3 lg:grid-cols-[160px_minmax(0,1fr)_260px]">
            <div className="hidden lg:block">
              <PoolMenu variant="side" value={pool} onChange={setPool} dtAvailable={dtPools.length > 0} ttAvailable={ttPools.length > 0} />
            </div>

            <div className="min-w-0">
              {/* Page head: pool + meeting, then meeting picker and race chips. */}
              <div className="overflow-hidden rounded-card bg-surface shadow-card">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 bg-navy-700 px-[13px] py-2 text-white">
                  <h2 className="flex items-center gap-2 text-[15px] font-medium">
                    {poolName(pool)}
                    {meeting && (
                      <span className={modeBadge(liveMeeting ? "live" : "practice", "navy")}>
                        {liveMeeting && <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-strong" />}
                        <span className="sr-only">, </span>
                        {t(liveMeeting ? "credits:mode.live" : "credits:mode.practice")}
                      </span>
                    )}
                  </h2>
                  <span className="text-[13px] text-white/85">
                    {meeting
                      ? t("bet:subMeeting", { date: fmt.date(ymd(meeting.date)), venue: g.venue(meeting.venue), races: t("races", { count: meeting.races.length }) })
                      : t("bet:subEmpty")}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 px-[13px] py-2.5 sm:flex-row sm:items-center sm:gap-4">
                  <label htmlFor="bDay" className="sr-only">
                    {t("bet:racingDay")}
                  </label>
                  {meetingSelect}
                  {meeting && legCount === 1 && (
                    <nav aria-label={t("bet:racesNav")} className={cx("-mx-[13px] flex gap-2 overflow-x-auto px-[13px] sm:mx-0 sm:px-0", liveMeeting ? "pt-2" : "pt-0.5")}>
                      {meeting.races.map((rn) => {
                        const on = rn === activeRace;
                        const surface = cards[rn]?.surface;
                        // Live meeting: races that can't take LIVE bets stay selectable for viewing, faded with a lock
                        // (or a "Void" tag for a voided race).
                        const st = liveMeeting ? raceStatusOf(rn) : null;
                        const locked = !!st && st !== "open";
                        const isVoid = st === "void";
                        return (
                          <span key={rn} className={cx("relative flex-none border-b-[3px] pb-1", on ? (surface === "AWT" ? "border-awt" : "border-turf") : "border-transparent")}>
                            <button
                              className={cx(chipBtn(on), locked && !on && "opacity-40")}
                              aria-current={on ? "true" : undefined}
                              aria-label={
                                isVoid
                                  ? t("credits:race.chipVoid", { n: rn })
                                  : st === "settled"
                                    ? t("credits:race.chipFinished", { n: rn })
                                    : locked
                                      ? t("credits:race.chipClosed", { n: rn })
                                      : t("common:race", { n: rn })
                              }
                              onClick={() => {
                                setActiveRace(rn);
                                setEditRace(rn);
                              }}
                            >
                              {rn}
                            </button>
                            {isVoid && (
                              <span aria-hidden="true" className="pointer-events-none absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-surface px-1 text-[10px] leading-3.5 font-medium whitespace-nowrap text-bad ring-1 ring-line">
                                {t("credits:race.void")}
                              </span>
                            )}
                            {locked && !isVoid && (
                              <span aria-hidden="true" className="pointer-events-none absolute -top-1 -right-1 inline-flex size-3.5 items-center justify-center rounded-full bg-surface ring-1 ring-line">
                                <svg viewBox="0 0 12 12" className="size-2.5 fill-ink-muted">
                                  <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
                                  <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" className="fill-none stroke-ink-muted" strokeWidth="1.2" />
                                </svg>
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </nav>
                  )}
                </div>
                {statusLine && (
                  <p className={cx("px-[13px] pb-2.5 text-[13px]", statusLine.cls)}>
                    {statusLine.text}
                    <span className="sr-only" aria-live="polite">
                      {announce}
                    </span>
                  </p>
                )}
                {!credits.liveBetting && upcomingDays.length === 0 ? null : credits.liveBetting && upcomingDays.length === 0 ? (
                  <p className="px-[13px] pb-2.5 text-[13px] text-ink-muted">{t("credits:picker.noUpcoming")}</p>
                ) : null}
                {user && (credits.summary?.pending.count ?? 0) > 0 && (
                  <button
                    type="button"
                    className="mx-[13px] mb-2.5 cursor-pointer text-[13px] text-link hover:underline"
                    onClick={() => {
                      setHistoryFilter("pending");
                      setView("history");
                    }}
                  >
                    {t("credits:history.pendingLink", { count: credits.summary!.pending.count })}
                  </button>
                )}
              </div>

              <div className="lg:hidden">
                <PoolMenu variant="row" value={pool} onChange={setPool} dtAvailable={dtPools.length > 0} ttAvailable={ttPools.length > 0} />
              </div>

              {meeting && (
                <>
                  {/* Multi-race leg chooser */}
                  {legCount > 1 && (
                    <div className={cx(panel, "mt-3 flex flex-col gap-4")}>
                      {officialPools.length > 0 && (
                        <div>
                          <div className="mb-2 text-[13px] text-ink">{t("bet:pools", { type: g.betType(betType) })}</div>
                          <div className={pillRow}>
                            {officialPools.map((op) => {
                              const active = [...dtLegs].sort((a, b) => a - b).join() === [...op].sort((a, b) => a - b).join();
                              return (
                                <button
                                  key={op.join()}
                                  className={cx(pill(active), "flex-none")}
                                  aria-pressed={active}
                                  onClick={() => {
                                    setDtLegs(op);
                                    setEditRace(op[0]!);
                                  }}
                                >
                                  {op.map((rn) => t("raceShort", { n: rn })).join(" · ")}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {!liveMeeting && (
                      <div>
                        <div className="mb-2 text-[13px] text-ink">{t("bet:pickAny", { n: legCount, picked: dtLegs.length })}</div>
                        <div className="flex flex-wrap gap-2">
                          {meeting.races.map((rn) => {
                            const picked = dtLegs.includes(rn);
                            const isEdit = rn === editRace && picked;
                            return (
                              <button
                                key={rn}
                                className={isEdit ? chipBtn(true) : picked ? pickedLeg : chipBtn(false)}
                                aria-pressed={picked}
                                aria-label={t("common:race", { n: rn })}
                                disabled={!picked && dtLegs.length >= legCount}
                                onClick={() => toggleLeg(rn)}
                              >
                                {rn}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      )}
                      {!liveMeeting && <p className="text-xs text-ink-muted">{t("bet:customNote")}</p>}
                    </div>
                  )}

                  {/* Edit which leg's picks you're entering. */}
                  {legCount > 1 && legRaces.length > 0 && (
                    <div className="mt-3">
                      <div className="mb-2 text-[13px] text-ink">{t("bet:editing")}</div>
                      <div className={pillRow}>
                        {legRaces.map((rn) => (
                          <button key={rn} className={cx(pill(rn === editRace), "flex-none")} aria-pressed={rn === editRace} onClick={() => setEditRace(rn)}>
                            {t("raceShort", { n: rn })}
                            <em className={cx("not-italic", rn === editRace ? "text-white/75" : "text-ink-muted")}>
                              {legLabel(selections[0]?.raceLegs.find((l) => l.raceNumber === rn))}
                            </em>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {card ? (
                    <RaceCardTable
                      card={card}
                      pool={pool}
                      picks={rp}
                      onToggle={(col, h) => toggle(editRace, col, h)}
                      onField={(col, on) => field(editRace, col, on)}
                      bankerEnabled={bankerEnabled}
                      bankerMax={bankerMax}
                      readOnly={betMode === "view"}
                      head={
                        <>
                        {liveMeeting && raceStatusOf(editRace) === "closed" && (
                          <span className="inline-flex h-7 items-center rounded-full bg-white/15 px-2.5 text-[13px] text-white">🔒 {t("credits:race.closed")}</span>
                        )}
                        <button
                          className={btnPill}
                          disabled={!meeting.hasResults}
                          title={meeting.hasResults ? "" : t("bet:noResultsMeeting")}
                          onClick={() => date && venue && api.result(date, venue, editRace).then(setRaceResult).catch((e) => setError(String(e)))}
                        >
                          {t("bet:showResult", { race: t("raceShort", { n: editRace }) })}
                        </button>
                        </>
                      }
                    />
                  ) : (
                    <div className={cx(panel, "mt-3 text-center text-ink-muted")}>{t("bet:loadingRace", { n: editRace })}</div>
                  )}

                  <StakeBar
                    combos={combos}
                    unit={unit}
                    onUnit={setUnit}
                    onAdd={addToSlip}
                    canAdd={canAdd}
                    live={
                      liveMeeting
                        ? {
                            balance: user ? (credits.balance ?? 0) : null,
                            slipTotal: slipMode === "live" ? slipTotal : 0,
                            blockedNote,
                            onLogin: () => auth.openLogin({ source: "header" }),
                            onBuy: goBuy,
                          }
                        : undefined
                    }
                  />
                  {!liveMeeting && !meeting.hasResults && <p className="mt-3 text-[13px] text-warn">{t("bet:settlementDisabled")}</p>}

                  {date && venue && <RaceAnalysisPanel date={date} venue={venue} raceNo={editRace} />}
                </>
              )}
            </div>

            <BetSlip
              items={slip}
              onRemove={(id) => setSlip((s) => s.filter((it) => it.id !== id))}
              onClear={() => setSlip([])}
              onConfirm={confirmSlip}
              liveContext={liveMeeting}
              live={
                slipMode === "live" || liveSlip.receipt
                  ? {
                      balance: credits.balance,
                      error: liveSlip.error,
                      closedIds: liveSlip.closedIds,
                      receipt: liveSlip.receipt,
                      onBuy: goBuy,
                      onRemoveClosed: liveSlip.removeClosed,
                      onReceiptDone: liveSlip.clearReceipt,
                      onViewBets: () => {
                        liveSlip.clearReceipt();
                        setHistoryFilter("pending");
                        setView("history");
                      },
                    }
                  : undefined
              }
            />
          </div>
        )}

        {(view === "privacy" || view === "terms" || view === "sales" || view === "legal") && <LegalDoc view={view} />}
        {view === "sitemap" && <SiteMap tools={TABS.map(([v, key]) => [v, t(key)])} onSelect={selectView} />}
      </main>

      <Footer onSelect={selectView} />

      {switchAsk && slipMode && (
        <SwitchModeDialog
          mode={slipMode}
          onCancel={() => setSwitchAsk(null)}
          onConfirm={() => {
            setSlip(switchAsk);
            setSwitchAsk(null);
          }}
        />
      )}
      {credits.welcomeOpen && (
        <WelcomeDialog
          amount={credits.signupBonus}
          livePaused={!credits.liveBetting}
          onClose={credits.dismissWelcome}
          onCta={() => {
            credits.dismissWelcome();
            const next = upcomingDays[0];
            if (next) chooseMeeting(`${next.date}_${next.venue}`);
            setView("bet");
          }}
        />
      )}
      {settled && (
        <ResultModal
          bets={settled}
          onClose={() => setSettled(null)}
          banner={user === null ? <SaveBanner onLogin={loginToSave} /> : undefined}
        />
      )}
      {raceResult && <ResultPanel result={raceResult} onClose={() => setRaceResult(null)} />}
    </div>
  );
}
