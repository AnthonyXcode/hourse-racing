# Post Time 開跑前 — Social Media Marketing Plan

Owner: marketing strategy · Channels: Facebook Page, Instagram, Threads, Telegram channel · Site: https://posttimehk.com
Scope: this plan covers **what** we post, **when**, in **what voice**, and **what we never post**. Automation (`claude -p` + cron) and data/images are owned by teammates. This plan gives them the rules they implement.

> **Strategic stance in one line:** We sell *practice and transparency*: free practice on past meetings with real dividends, and a model whose hit **and miss** record is public. We do **not** promote LIVE betting or credit purchases until the owner has had legal advice (see §6.4).

---

## 1. Goals & KPIs

Brand-new accounts, no ad spend, organic only. These targets are deliberately modest. Review them at the end of week 4 and week 12.

| KPI | How measured | End of week 4 | End of week 12 |
|---|---|---|---|
| Followers: Facebook Page | Meta Business Suite | 150 | 600 |
| Followers: Instagram | IG Insights | 150 | 500 |
| Followers: Threads | Threads Insights | 200 | 800 |
| Subscribers: Telegram channel | Channel stats | 80 | 400 |
| Link clicks to site | UTM sessions in site analytics | 400 / month | 1,500 / month |
| Sign-ups (SMS-verified members) | Member DB rows with first-touch UTM | 30 | 150 |
| Leaderboard opt-ins | Member setting | 5 | 30 |
| Engagement rate (per post) | (reactions+comments+shares)/reach | ≥ 3% | ≥ 4% |
| Compliance incidents | Takedowns, platform warnings, complaints | **0** | **0** |

**UTM convention** (the automation adds this to every link):
`https://posttimehk.com/?utm_source={fb|ig|threads|tg}&utm_medium=social&utm_campaign={pillar}&utm_content={yyyymmdd-slot}`
- `pillar` ∈ `picks`, `recap`, `learn`, `board`, `feature`, `community`
- Instagram uses one bio link per campaign week: `utm_source=ig&utm_medium=bio&utm_campaign=wk{NN}`

The site must record first-touch UTM at sign-up so sign-ups can be attributed by channel. That is an engineering ask, flagged in §8 week 1.

---

## 2. Audience, Positioning & Voice

### 2.1 Audience
| Segment | Who | What they want from us |
|---|---|---|
| Core | HK racing followers aged 25–55 who already follow form and dividends | Data-backed pre-race views; a way to test ideas without spending money |
| Learners | Newer or casual fans (Happy Valley night crowd, aged 25–35) | Plain-language help with Quinella, Trio, All Up and bankers (膽拖) |
| Data nerds | Spreadsheet and modelling types | Model hit rates, strategy-bot comparisons, honest misses |

Everyone we target is **18+**. We never aim content at students or minors, and we avoid youth slang, school references and cartoon-style mascots.

### 2.2 Positioning
**「落注之前，先練一練」**: the practice ground and the honest scoreboard for HK racing.
- Real meetings and real dividends. Practice is **free**.
- The model shows its record publicly, misses included.
- Strategy robots (彗星, 雷霆, 翡翠, 鳳凰, 颱風, 維港, 金龍) act as baselines: "Can you beat a fixed rule?"
- We are **not** a tipster, a bookmaker or a betting agent, and we are **not** affiliated with any racing operator.

### 2.3 Voice
| | zh-HK (primary) | English (secondary) |
|---|---|---|
| Register | **Light written Cantonese (粵語書面化)** in captions and hooks, e.g. 「今晚跑馬地，模型點睇？」. This is the native register of HK FB, IG and Threads, and it reads human rather than corporate. **Standard written Chinese (書面語)** for disclaimers, rules explanations and anything that resembles a promise. | Plain, friendly, a little dry. Short sentences. |
| Tone | Calm, nerdy, self-deprecating about misses. Like a friend who keeps a spreadsheet. | Same |
| Use | 模型、數據、命中率、練習、模擬、睇法、參考 | model, practice, hit rate, data, "for practice only" |
| Avoid | 貼士王、穩膽、必中、包中、贏大錢、發達、回本、翻身、搏一搏、「跟住買」 | "lock", "sure thing", "guaranteed", "easy money", "beat the bookies", "bet now" |
| Racing terms | Use the standard HK pool names: 獨贏、位置、連贏、位置Q、單T、三T、過關、膽拖 | Win, Place, Quinella, Q-Place, Trio, Tierce, All Up, banker |
| Emoji | At most 2 per post: 🏇 📊 ✅ ❌ 🔔. **No** 💰 🤑 💵 🎰 🔥 | Same |

### 2.4 Bilingual policy per channel
| Channel | Language rule |
|---|---|
| Facebook | zh-HK first, then a 1–2 line English summary under a `—` divider |
| Instagram | Image text in zh-HK, with English only on the cover slide subtitle. Caption: zh-HK, then a short English block |
| Threads | zh-HK only, because of the 500-character limit. One English-only post per week (Sunday) for the English audience |
| Telegram | zh-HK primary, with a one-line English summary at the end |

---

## 3. Content Pillars

Weekly mix: roughly 30% Picks, 25% Recap, 20% Learn, 10% Board, 10% Feature, 5% Community.

Every example below ends with `{DISCLAIMER_SHORT}` or `{DISCLAIMER_FULL}` (see §6.6). Placeholders in `{braces}` are filled from site data. The automation must **never** invent numbers; if data is missing, it skips the post.

### P1. 模型睇法 Model insights (pre-race)
The model's top picks framed as **analysis to practise against**, never as betting advice. Always link to the model's last-3-months record.

> **Ex 1 (FB / Telegram, race day before the first race)**
> 🏇 {date} 沙田日馬・模型首3選出爐
> 第1場 {r1_picks}｜第2場 {r2_picks}｜第3場 {r3_picks}
> 近3個月模型「首3選位置命中率」：{place_rate}（{races} 場）。中唔中，賽後照計俾大家睇。
> 想試吓自己嘅組合？用過往賽事免費模擬 👉 {link}
> — Model's top-3 for Races 1–3 at Sha Tin. Last-3-month place hit rate {place_rate}. Practice free on past meetings.
> {DISCLAIMER_SHORT}

> **Ex 2 (Threads, HV night)**
> 今晚跑馬地 9 場，模型最有信心係第{n}場：{horse_no}號（5星）。
> 不過講明先：5星過去3個月位置命中率係 {fivestar_rate}，即係都有唔中嘅時候。
> 你會點揀？留言講吓 👇
> {DISCLAIMER_SHORT}

> **Ex 3 (IG carousel caption)**
> 今日模型睇法｜Model picks today 📊
> Slide 2–4：每場首3選＋模型信心星級
> Slide 5：模型近3個月真實命中率（有中有唔中）
> 練習連結喺 bio 🔗
> Model's view for today: practice reference, not betting advice.
> {DISCLAIMER_FULL}

### P2. 賽果覆盤 Results recap & honest hit/miss
This is our trust engine. Report misses as prominently as hits. **Never** post a hits-only recap.

> **Ex 1 (all channels, after the last race)**
> 📊 {date} 跑馬地賽後覆盤
> 模型首3選：獨贏 ✅ {w}/{n}　位置 ✅ {p}/{n}
> 最好：第{best_race}場 {horse}號跑第一 ✅
> 最差：第{worst_race}場 首3選全部唔入位 ❌
> 全日逐場紀錄 👉 {link}
> — HV recap: win {w}/{n}, place {p}/{n}. Full race-by-race record on site.
> {DISCLAIMER_SHORT}

> **Ex 2 (Threads, a bad day)**
> 今日模型炒咗 😅 9場只有{p}場首3選入位。
> 唔會收埋：全日紀錄已經放咗上網，連最差嗰幾場都喺度。
> 近3個月整體位置命中率仍然係 {place_rate}。模型唔係神，所以先叫你練習咗先。
> {DISCLAIMER_SHORT}

> **Ex 3 (Telegram, weekly, Monday)**
> 📈 上週模型總結（{week_range}）
> 賽馬日：{m}　場數：{n}
> 首3選獨贏命中：{wr}　位置命中：{pr}　單T（1膽拖2–6）：{trio_hits}/{n}
> 呢啲係已完成賽事嘅過往表現，唔代表之後結果。
> {DISCLAIMER_FULL}

### P3. 彩池教室 Pool education
Evergreen how-to content. These posts carry the lowest compliance risk and get the most saves. Teach the maths and the cost, never "how to win".

> **Ex 1 (IG carousel: 單T係咩？)**
> Slide 1：單T（Trio）＝ 揀中頭三名，唔理次序
> Slide 2：膽拖點計？1膽拖5 ＝ C(5,2) ＝ 10注
> Slide 3：每注$10 → 成本 $100（喺開跑前用積分／模擬計，唔使真錢）
> Slide 4：用上週真實賽果試計：{example_race} 派彩 {dividend}
> Caption：收藏起身，下次唔使再計錯注數 📌 Trio = pick the top 3 in any order. Save this.
> {DISCLAIMER_FULL}

> **Ex 2 (FB: 過關 All Up)**
> 過關（All Up）點運作？3關 3x1 ＝ 三場都要中，上一關派彩會滾落下一關。
> 退出馬點計？單場退款，過關就「以本金滾落下一關」。
> 開跑前個模擬器會照真實規則幫你計，即刻試吓 👉 {link}
> — All Up explained: winnings roll into the next leg; a scratched leg carries the stake forward.
> {DISCLAIMER_SHORT}

> **Ex 3 (Threads)**
> 連贏 vs 位置Q，一句講晒：
> 連贏＝頭兩名（唔理次序）
> 位置Q＝頭三名入面任何兩隻
> 位置Q易中啲，但派彩通常細好多。你平時玩邊樣？
> {DISCLAIMER_SHORT}

### P4. 排行榜 & 機械人 Leaderboard & robot highlights
Frame this as skill and comparison in credits, which have **no cash value**. Never show HK$ amounts. Only feature members who opted in, and use their display name.

> **Ex 1 (FB / IG)**
> 🤖 機械人週報：今週邊個策略最企得住？
> 🥇 {bot_1}（{rule_1}）回報率 {roi_1}
> 🥈 {bot_2}　🥉 {bot_3}
> 最差：{bot_last}，{roi_last}
> 固定規則都有好有唔好。你嘅方法贏唔贏到佢哋？用過往賽事免費試 👉 {link}
> — Weekly robot report: which fixed rule held up best? Practice free.
> {DISCLAIMER_SHORT}

> **Ex 2 (Threads)**
> 「每場買大熱門位置」聽落好穩陣？
> 我哋個機械人「鳳凰」就係咁玩，近30日回報率 {roi}。
> 數據有時同直覺唔一樣。
> {DISCLAIMER_SHORT}

> **Ex 3 (Telegram)**
> 🏆 上個賽馬日排行榜（已公開會員）：第1名 {member}，{bets} 注，命中率 {hit}。
> 排名以積分計，積分冇現金價值。
> {DISCLAIMER_SHORT}

### P5. 產品功能 Product features (free features only)
Promote practice mode, the model page, the per-meeting record, sharing tickets and the bet builder. Do **not** promote LIVE, credits, the 1,000-credit welcome bonus or the pricing page until legal sign-off.

> **Ex 1 (IG / FB)**
> 揀返任何一個過往賽馬日 → 落注 → 即刻用真實派彩對數 ✅❌
> 獨贏、位置、連贏、單T、三T、過關、膽拖，全部有。完全免費，唔使真錢。
> 👉 {link}
> — Pick any past meeting, build any bet, and see it graded against real dividends. Free.
> {DISCLAIMER_SHORT}

> **Ex 2 (Threads)**
> 新功能：模擬注項可以分享成圖片 📸 下次同朋友爭論「如果當日咁買」，直接出圖。
> {DISCLAIMER_SHORT}

### P6. 互動 Community prompts
Prompts must not ask people to bet, how much they bet, or what they won.

> **Ex 1:** 你覺得檔位喺跑馬地有幾重要？1–10 分，留言講 👇
> **Ex 2:** 你第一次學識「膽拖」係幾時？邊個教你？
> **Ex 3 (poll on Telegram/Threads):** 今季你最想睇邊類分析？A 檔位 B 騎師 C 場地 D 負磅

---

## 4. Per-Channel Playbook

| | Facebook Page | Instagram | Threads | Telegram channel |
|---|---|---|---|---|
| Format | Text post with 1 image (1080×1350) or link preview | **Image required**: single 1080×1350 image or a 2–6 slide carousel, plus caption. Stories for race-day slots | Text only, with an optional image. Use a self-reply for the disclaimer if space is tight | Text message with an optional image; supports bold and inline links |
| Length | 300–600 characters (zh), plus a 1–2 line English summary | Caption 150–400 characters. Slide text ≤ 25 characters per line | **≤ 500 characters including the disclaimer**. Aim for ≤ 350 | ≤ 800 characters. Use 1 post per slot, not a burst |
| Hashtags | **≥ 5** at the end | **≥ 5** (5–8) at the end of the caption | **≥ 5** at the end; the first one is used as the Threads topic, so put #香港賽馬 first | **≥ 5** at the end |
| Hashtag set (pick by content) | #香港賽馬 #賽馬 #沙田 / #跑馬地 #賽馬分析 #賽馬數據 #HKRacing #horseracing, plus pool tags when relevant (#單T #過關 #連贏 #位置) | same | same | same |
| Never as a tag | #開跑前 #PostTime (any spelling): the post already names the brand | | | |
| Links | Clickable link in the body, with UTM | **No clickable links.** Write 「連結喺 bio 🔗」. The bio link changes weekly (UTM per week) | 1 link per post at most. Many posts should have no link, because reach is better without | Clickable link with UTM. Disable the link preview for results posts |
| Frequency | Non-race day 1×; race day 4× (§5) | Non-race day 1× feed post; race day 1 feed carousel (pre) + 1 feed recap (post) + Stories at the mid slots | Non-race day 1×; race day 4× | Non-race day 1×; race day 4× |
| Pinned | About + disclaimer post | Highlight "18+ 及免責聲明" | Pinned disclaimer post | Pinned message with the full disclaimer and hotline |
| Profile setup | Category: "App page". Set the Page **age restriction to 18+** (Settings → Page setup → Age restriction; verify the option in the current UI). Bio carries the full disclaimer | Professional account. Bio: 「香港賽馬練習及數據平台｜18+｜非投注建議｜與香港賽馬會無關」 + link. Set a minimum age of 18 if available | Same bio as IG | Description: full disclaimer + 1834 633. Comments: off at launch |

The IG cover template uses brand navy `#122C68` backgrounds with gold `#FECF13` headline accents, follows DESIGN.md typography, and puts the disclaimer strip in the bottom 10% of every slide. **No** horse-racing operator logos, silks of real owners, or race footage or photos we don't hold rights to.

---

## 5. Schedule (all times HKT)

### 5.1 Non-race days: one post per channel at **20:30 HKT**
Why 20:30:
- HK users scroll most in the evening, after commute and dinner (20:00–22:30). That is our audience's leisure window for racing content.
- It falls after the HKJC declares the next card (racecards come out about 2 days before), so Monday and Thursday/Friday posts can preview the coming meeting.
- It avoids the lunchtime noise and stays well clear of 23:00+ when engagement drops.
- All four channels post at the same time, which keeps cron simple. The automation may stagger them by 2–5 minutes (TG → Threads → FB → IG) to avoid rate-limit bursts.

### 5.2 Race-day slot formula (computed from that day's actual card)
The automation reads that day's first post time `R1` and last post time `RL` from the race card. Do not hard-code times.

```
S1 (pre-meeting)  = R1 − 90 min
S2 (mid)          = S1 + 3h        (only if S2 < RL)
S3 (late)         = S1 + 6h        (only if S3 < RL)
S_post (results)  = RL + 40 min    (after official dividends; if dividends are not final, retry every 10 min up to RL + 90 min, then skip)
If S3 (or S2) falls within 45 min of S_post → drop that slot (avoid two posts back-to-back).
```
The 20:30 daily slot is **replaced** on race days.

### 5.3 (a) Sha Tin day meeting: example R1 12:45, RL 17:55 (10 races)
| Slot | HKT | Pillar | What posts |
|---|---|---|---|
| S1 pre-meeting | **11:15** | P1 Picks | Model top-3 for all races (IG carousel; FB/TG full list; Threads: the 1–2 highest-confidence races + link) + the model's last-3-month hit rate |
| S2 mid | **14:15** | P2 mini-recap + P1 | Races 1–3 or 4 so far: model hit/miss (honest) + "races still to come" for the model's picks of the rest of the afternoon. IG: Story only |
| S3 late | **17:15** | P3 Learn / P1 | Short explainer tied to today (e.g. "today's Trio dividends so far: why some are so big") or the feature race preview. IG: Story only. *Dropped if it lands within 45 min of S_post* (17:15 vs 18:35 → kept) |
| S_post results | **18:35** | P2 Recap | Full-day recap: win/place hits out of n, best and worst race, link to the per-meeting record. IG feed post |

Twilight or night meetings at Sha Tin use the same formula: e.g. R1 16:15 / RL 21:30 → 14:45, 17:45, 20:45, 22:10.

### 5.4 (b) Happy Valley Wednesday night: example R1 18:45, RL 22:50 (9 races)
| Slot | HKT | Pillar | What posts |
|---|---|---|---|
| S1 pre-meeting | **17:15** | P1 Picks | Model top-3 for all 9 races + hit rate. Timed for the commute home |
| S2 mid | **20:15** | P2 mini-recap + P1 | Races 1–4 hit/miss + model view for Races 5–9. IG: Story |
| S3 late | *(23:15 → dropped: after RL)* | — | — |
| S_post results | **23:30** | P2 Recap | Full-night recap. IG feed post can wait for **08:30 next morning** (low IG engagement at midnight); FB/Threads/TG post at 23:30 |

HV usually yields 3 slots: S1, S2, S_post. Combined with a 3-hour gap, that satisfies the "every 3 hours during the racing period" brief.

### 5.5 Special cases
- **Meeting abandoned or delayed** (typhoon signal 8, black rainstorm): the automation posts one templated notice — 「{date} 賽事已宣佈取消／押後，模型分析暫停。」 — and cancels the day's remaining slots.
- **Re-run or void race**: the recap must say 「第{n}場賽事無效，不計入命中率」.
- **Off-season (mid-Jul → early Sep)**: 1 post per day at 20:30, Learn/Feature/backtest content only, using the same pillar calendar without P1.
- **Overseas simulcast races**: **do not post** model picks or tips on them (see §6.2 on s.16E). Only HK meetings are in scope.

### 5.6 Weekly pillar calendar (typical week: Wed HV + Sun ST)
| Day | Racing? | 20:30 / race-day slots | Pillar |
|---|---|---|---|
| Mon | No (card for Wed declared) | 20:30 | P2 weekly model summary (from Sun) + Wed card is out |
| Tue | No | 20:30 | P3 Learn (pool of the week) |
| **Wed** | **HV night** | 17:15 / 20:15 / 23:30 | P1 → P2 mini → P2 recap |
| Thu | No | 20:30 | P4 Robot & leaderboard report (from Wed) |
| Fri | No (weekend card declared) | 20:30 | P5 Feature, or P1-lite "card is out: what we'll be watching" (no picks yet) |
| Sat | No (if Sun meeting) | 20:30 | P6 Community prompt / P3 Learn |
| **Sun** | **ST day** | 11:15 / 14:15 / 17:15 / 18:35 | P1 → P2 mini → P3/P1 → P2 recap |

If the meeting is on Saturday, swap the Sat and Sun rows. The automation picks the row from the actual fixture list, not the weekday name.

---

## 6. COMPLIANCE & GUARDRAILS (critical)

> This is a marketer's risk summary, **not legal advice**. Section numbers are from secondary sources (LegCo bill papers); the owner must confirm the current text on e-Legislation and with a HK solicitor.

### 6.1 Hong Kong Gambling Ordinance (Cap. 148): promotion of bookmaking
- **Part IIIA** makes it an offence to **knowingly promote or facilitate bookmaking or betting with a bookmaker** (s.16B). "Promote/facilitate" includes **exhibiting, disseminating or distributing advertisements** and providing services such as **taking bets or handling betting deposits and accounts** (s.16C). When drafted, the penalty was up to HK$5,000,000 and up to 7 years on indictment. Only betting lawfully conducted (i.e. through the HKJC, the sole licensed operator under the Betting Duty Ordinance, Cap. 108) is outside the offence.
- **Implication for us:** every post must make clear that Post Time **takes no money bets, pays no money and is not a bookmaker**. We must never link to, mention or accept sponsorship from any betting operator (offshore or otherwise), and never suggest "place this bet somewhere".
- Sources: [Cap. 148 on HKLII/HKU (structure)](https://oelawhk.lib.hku.hk/items/show/2696); [LegCo Gambling (Amendment) Bill 2000 brief](https://www.legco.gov.hk/yr00-01/english/bc/bc56/general/b10_brf.pdf); [LegCo Legal Service paper LS28](https://www.legco.gov.hk/yr00-01/english/hc/papers/ls-28.pdf); [LegCo Bills Committee paper](https://www.legco.gov.hk/yr00-01/english/bc/bc56/papers/bc56cb2-1856-2e.pdf); official text: [e-Legislation Cap. 148](https://www.elegislation.gov.hk/hk/cap148).

### 6.2 Broadcasting tips (Cap. 148 s.16E)
- s.16E restricts broadcasting, to the public in HK, **forecasts, hints, odds or tips** on horse, pony or dog races **within 12 hours before the race**. It **exempts races with totalisator betting permitted under the Betting Duty Ordinance**, i.e. HKJC races in HK and races approved for simulcast. Penalty as drafted: up to HK$1,000,000 and 7 years.
- **Implication:** pre-race model picks on **HK meetings** appear to fall within the exemption, but a social post may count as a "broadcast". We need **legal confirmation** before P1 posts go live within 12 hours of a race. Until then, S1 picks can be framed as "model analysis on our site" with the picks visible behind the link (owner decision). **Never** post picks or odds for races that are not HKJC pool races.
- Source: [LegCo Bills Committee paper (16E text)](https://www.legco.gov.hk/yr00-01/english/bc/bc56/papers/bc56cb2-1893-1e.pdf).

### 6.3 No HKJC affiliation or implied endorsement
- The HKJC is the sole licensed betting operator. Its name, logo, horse-head mark, "賽馬會", silks graphics and screenshots of its racecards or odds pages are its marks and content.
- **Rules:** no HKJC logo or brand graphics; no "official", 「官方」, 「馬會認可」 or "partner" wording; no screenshots of hkjc.com or the betting app. Use the HKJC name only in the non-affiliation disclaimer and in factual source attribution (「派彩數據來自公開賽果」). Use our own navy/gold palette and our own illustrations. Our navy/gold palette is HKJC-inspired, so keep the **Post Time wordmark prominent** on every image to avoid confusion.
- **Do not repost live odds** (HKJC data terms, and odds are named in s.16E).

### 6.4 The product itself: LIVE betting with paid credits (owner action required)
- In-app copy states 「1 積分 = 即場投注 HK$1 注碼」. Credits are **bought with real money via Stripe**, staked on **upcoming real races**, and paid out in credits, plus there is a 1,000-credit welcome bonus. Credits have no cash value and cannot be withdrawn (per in-app terms). That reduces the risk, but whether the scheme amounts to "gambling", "betting" or "facilitating betting" under Cap. 148 is a **legal question we cannot answer**. The "1 credit = HK$1 stake" framing and the purchase-then-stake-on-live-races loop are the weak points.
- Meta also treats products where **something of monetary value is part of entry or prize** as gambling (needs written permission for ads). If credits can be bought, Meta may treat LIVE as real-money-adjacent even though no prize is cashable.
- **Recommendation:** the owner obtains **HK legal advice before any social post mentions LIVE, credits, buying credits, the welcome bonus, or the pricing page**. Until then, social content promotes **only** free practice, the model record, education and robots, and links go to the home page or practice page, **never** `/credits` or the pricing page. Leaderboard posts say 「以積分計，積分沒有現金價值」.
- Sources: [Meta Ad Standards: Online gambling and games](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/gambling-games/); [Meta: Social casino games](https://transparency.meta.com/policies/ad-standards/content-specific-restrictions/social-casino-games).

### 6.5 Platform rules
| Platform | Rule that matters to us | Our response |
|---|---|---|
| Meta (FB/IG/Threads), **ads** | Online gambling ads need Meta's **written permission** with licensing proof; no targeting of users under 18; simulated gambling with **no** real-money prize may be treated as social-casino-style content, but any monetary-value entry or prize moves it to the gambling policy | **No paid ads or boosts** in this plan. If ads are wanted later, advertise only free practice and education, 18+ targeting, after legal advice. [Meta gambling ad policy](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/gambling-games/) |
| Meta, **organic** | Restricted Goods & Services covers gambling; posts that buy, sell or promote restricted goods get **reduced distribution**; Prohibited Commercial Practices and Fraud policies ban **"guarantee of winning"** offers and deceptive promotion of gambling | No win guarantees, no "buy now", no deceptive framing. Expect some reach suppression on racing content. [Restricted Goods](https://transparency.meta.com/policies/community-standards/restricted-goods-services/), [Prohibited Commercial Practices](https://transparency.meta.com/policies/community-standards/prohibited-commercial-practices/), [Fraud & Scams](https://transparency.meta.com/policies/community-standards/fraud-and-scams/), [Distribution guidelines](https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/content-likely-violating-our-community-standards/) |
| Telegram | ToS bars spam and scams and "activities recognised as illegal in the majority of countries"; Telegram **Ads** bar real-money gambling promotion; Telegram has removed gambling bots and channels in enforcement sweeps | Organic channel only, no Telegram Ads, no bots taking bets. Keep it an information channel. [Telegram ToS](https://telegram.org/tos); [enforcement example](https://sigma.world/news/telegram-shuts-down-tg-casino-over-policy-violations/); [ads misuse study](https://maldita.es/investigaciones/20260630/telegram-ads-media-intitutions-scams-gambling/) |

### 6.6 Required disclaimer snippets
Every post template carries `{DISCLAIMER_SHORT}` (Threads, FB, TG) or `{DISCLAIMER_FULL}` (IG captions, pinned posts, bios, weekly summaries). Every image carries the short line in its footer strip. The hotline is verified: **1834 633**, the Ping Wo Fund gambling counselling hotline, run by four counselling centres and confirmed active in a 2024 LegCo reply ([LCQ21, Dec 2024](https://www.info.gov.hk/gia/general/202412/04/P2024120400189.htm); [2009 release](https://www.info.gov.hk/gia/general/200912/31/P200912310190_print.htm)).

**`{DISCLAIMER_SHORT}`**
> 18+｜模擬練習及數據分析，非投注建議｜與香港賽馬會無關｜過往表現不代表將來｜賭博輔導熱線 1834 633
> 18+ | Practice & analysis only, not betting advice | Not affiliated with HKJC | Gambling help: 1834 633

**`{DISCLAIMER_FULL}`**
> 只供18歲或以上人士。「開跑前」是賽馬模擬練習及數據分析平台，不接受金錢投注，亦不派發金錢；積分沒有現金價值。本平台與香港賽馬會或任何投注機構無任何關係。模型及排行榜數據只屬已完成賽事的過往表現，並非投注建議，亦不保證日後結果。如你或身邊的人受賭博問題困擾，請致電平和基金戒賭輔導熱線 1834 633。
> 18+ only. Post Time is a racing practice and analytics platform. It takes no money bets and pays no money, and credits have no cash value. Not affiliated with The Hong Kong Jockey Club or any betting operator. Model and leaderboard figures reflect past completed races only; they are not betting advice and do not guarantee future results. If gambling is causing problems for you or someone close to you, call the Ping Wo Fund counselling hotline 1834 633.

The short line takes about 120 characters. On Threads, the automation keeps the body ≤ 380 characters, or posts the disclaimer as an immediate self-reply **and** keeps 「18+｜非投注建議」 in the main post.

### 6.7 HARD "NEVER POST" list
The automation must reject any draft that matches these. Keep them as a regex or keyword list (§7).
1. Any claim or implication of certain or guaranteed winning: 必中、穩中、包中、穩膽、穩賺、保證、零風險、sure win, lock, guaranteed, risk-free.
2. Profit or income claims, or money language: 賺錢、發達、回本、翻身、收入、「月入」, HK$ winnings, "make money". Never show HK$ amounts next to model or robot results (dividends in pool-education examples are allowed with a "past result" label).
3. Any call to bet real money, or where to bet: 「去落注」「跟住買」「即刻買」, links to or names of any betting operator or app (including hkjc.com betting pages), and odds-comparison content.
4. LIVE betting, credits, buying credits, pricing, the welcome bonus, Stripe — until legal sign-off (§6.4).
5. HKJC logos or marks, "official / 官方 / 認可 / partner" wording, screenshots of HKJC sites or apps, live odds feeds.
6. Tips or picks on non-HKJC races (overseas races not in HKJC pools, other sports).
7. Content appealing to minors (school, exam, cartoon or anime style, youth slang), or content showing or mentioning anyone under 18.
8. Hits-only recaps, cherry-picked windows, or ROI shown without sample size (n) and period.
9. Chasing losses or urgency framing: 「追返」「最後機會」「唔買就走寶」, countdown pressure to bet.
10. Personal data: member phone numbers, real names of members who have not opted in, or anything other than an opted-in display name and avatar.
11. Comments on jockeys', trainers' or owners' integrity, "inside info", 「內幕」, or race-fixing insinuation (defamation + Meta fraud policy).
12. Gambling with alcohol, debt, loans, credit cards or "borrow to bet" imagery.
13. Fabricated numbers: if any `{placeholder}` lacks source data, **skip the post**. Never estimate.
14. Replies to users' DMs or comments asking for tips or how to bet with money. Use a canned reply: 「我哋只提供模擬練習及數據，唔提供投注建議。」 plus the hotline.

---

## 7. Human-in-the-Loop Safety Gate (short)
Proposal only. The automation teammate owns the mechanics.
1. **Two tiers.** *Tier A (auto-publish):* fully templated posts where Claude only fills placeholders from site data, i.e. results recap, model hit-rate numbers, cancellation notices, evergreen Learn posts from a pre-approved library. *Tier B (queue for human approval):* anything with free-written copy, community replies, new formats, and any first-ever post of a new template.
2. **Pre-publish lint** on every draft: never-post keyword list (§6.7), disclaimer present, character limits, link domain = posttimehk.com only, no `/credits` paths, all numbers traceable to the data payload. Fail → move to queue, don't publish.
3. **Kill switch:** if a file such as `marketing/PAUSE` exists (or an env flag is set), cron publishes nothing, and race-day slots notify the owner instead.
4. **Log every post** (channel, slot, text, data snapshot, post URL) so we can audit and delete quickly.
5. **Weeks 1–2: everything is Tier B.** Promote templates to Tier A only after 5 clean approvals each.

---

## 8. Four-Week Launch Roadmap

| Week | Focus | Deliverables | Exit check |
|---|---|---|---|
| **1: Set up & legal** | Accounts, profiles, compliance | Create FB Page, IG pro account, Threads, TG channel; bios, 18+ settings, pinned disclaimers; brand templates (navy/gold, footer strip); UTM + first-touch sign-up tracking (eng ask); never-post lint list; **owner books legal advice** on §6.2 (s.16E picks) and §6.4 (LIVE/credits). Seed 9 evergreen posts (P3/P5) so profiles aren't empty | All profiles live with disclaimer; lint list passes on 20 test drafts |
| **2: Soft launch, manual gate** | Non-race daily + race days, all Tier B | 1×/day at 20:30; race-day slots per §5; picks via site link if legal advice is pending; personal invites to racing friends and groups (owner shares from their own account) | ≥ 95% of slots posted on time; 0 lint escapes; first 50 followers per channel |
| **3: Rhythm & honesty** | Turn on weekly formats | Monday weekly model summary, Thursday robot report; first "bad day" recap posted openly; promote the recap and Learn templates to Tier A | Engagement ≥ 3%; first 15 sign-ups attributed via UTM |
| **4: Optimise** | Review data and decide next | Compare slot performance (S1 vs S_post; 20:30 vs test 12:30 on 2 non-race days); best-performing pillar gets +1 slot per week; English-only Threads Sunday post trial; written review against the §1 KPIs; legal outcome → decide whether a LIVE content track opens (with its own rules) or stays closed | Week-4 KPI table filled; go/no-go on LIVE content documented |

---

### Appendix: other sources
- Season facts (2026/27: 88 meetings, 41 night, 40 day, 7 twilight; HV 38 night + 1 day; season opener at Sha Tin with first race 12:30 on 6 Sep; season ends 14 Jul 2027): [iRace SG](https://www.irace.com.sg/2026/08/14/88-race-meetings-set-for-hong-kongs-2026-27-racing-season/), [The Standard](https://www.thestandard.com.hk/news/article/342175/Gong-sounds-at-Happy-Valley-as-racings-tourism-boom-rolls-on-to-city-track), [Transport Dept HV arrangements](https://www.info.gov.hk/gia/general/202609/04/P2026090400658p.htm). Exact first and last race times vary per meeting, which is why §5.2 computes slots from each day's card.
- Ping Wo Fund hotline history: [2003 launch](https://www.info.gov.hk/gia/general/200310/14/1014243.htm), [LCQ20 2014](https://www.info.gov.hk/gia/general/201406/18/P201406180472_print.htm).
