import type { Shape } from "../../shape";
import type { history as En } from "../en/history";

export const history: Shape<typeof En> = {
  title: "投注紀錄",
  sub: "所有已結算的模擬投注，最新的在前。",
  stat: {
    net: "淨盈虧",
    roi: "回報率",
    bets: "投注次數",
    hits: "命中",
    staked: "總投注額",
    returned: "總派彩",
  },
  empty: "尚未有投注紀錄。請到「投注」版面落注。",
  col: {
    placed: "落注時間",
    meeting: "賽馬日",
    bet: "投注",
    picks: "選擇",
    combos: "注數",
    cost: "投注額",
    hit: "命中",
    result: "賽果",
    dividend: "派彩",
    payout: "派彩金額",
    net: "淨額",
    delete: "刪除",
  },
  deleteAria: "刪除於 {{when}} 落注的紀錄",
};
