import { common as enCommon } from "./locales/en/common";
import { bet as enBet } from "./locales/en/bet";
import { history as enHistory } from "./locales/en/history";
import { analyzer as enAnalyzer } from "./locales/en/analyzer";
import { momentum as enMomentum } from "./locales/en/momentum";
import { legal as enLegal } from "./locales/en/legal";
import { common as zhCommon } from "./locales/zh-HK/common";
import { bet as zhBet } from "./locales/zh-HK/bet";
import { history as zhHistory } from "./locales/zh-HK/history";
import { analyzer as zhAnalyzer } from "./locales/zh-HK/analyzer";
import { momentum as zhMomentum } from "./locales/zh-HK/momentum";
import { legal as zhLegal } from "./locales/zh-HK/legal";

export const en = { common: enCommon, bet: enBet, history: enHistory, analyzer: enAnalyzer, momentum: enMomentum, legal: enLegal } as const;
export const zhHK = { common: zhCommon, bet: zhBet, history: zhHistory, analyzer: zhAnalyzer, momentum: zhMomentum, legal: zhLegal };
export const NAMESPACES = Object.keys(en) as (keyof typeof en)[];
