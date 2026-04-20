import { calcScenario } from "./scenario";
import type { CalcInput, CalcResult, ScenarioKey } from "./types";

export function calc(input: CalcInput): CalcResult {
  return {
    khongDk_coPiShip: calcScenario(input, { hasVoucherXtra: false, hasPiShip: true }),
    khongDk_khongPiShip: calcScenario(input, { hasVoucherXtra: false, hasPiShip: false }),
    voucherXtra_coPiShip: calcScenario(input, { hasVoucherXtra: true, hasPiShip: true }),
    voucherXtra_khongPiShip: calcScenario(input, { hasVoucherXtra: true, hasPiShip: false }),
  };
}

export const SCENARIO_LABELS: Record<ScenarioKey, string> = {
  khongDk_coPiShip: "Không ĐK · Có Pi Ship",
  khongDk_khongPiShip: "Không ĐK · Không Pi Ship",
  voucherXtra_coPiShip: "Voucher Xtra · Có Pi Ship",
  voucherXtra_khongPiShip: "Voucher Xtra · Không Pi Ship",
};

export const SCENARIO_KEYS: ScenarioKey[] = [
  "khongDk_coPiShip",
  "khongDk_khongPiShip",
  "voucherXtra_coPiShip",
  "voucherXtra_khongPiShip",
];

export function findBestScenario(result: CalcResult): ScenarioKey {
  let best: ScenarioKey = "khongDk_coPiShip";
  for (const key of SCENARIO_KEYS) {
    if (result[key].loiNhuan > result[best].loiNhuan) best = key;
  }
  return best;
}

export * from "./types";
export * from "./shared";
export { calcScenario } from "./scenario";
