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
  clearConfirm: "清除全部 {{n}} 項紀錄？",
  clearBody: "此操作會刪除你帳戶內所有已儲存的模擬投注紀錄，無法復原。",
  clearCancel: "取消",
  clearError: "未能清除紀錄，請再試一次。",
  deleteAria: "刪除於 {{when}} 落注的紀錄",
};
