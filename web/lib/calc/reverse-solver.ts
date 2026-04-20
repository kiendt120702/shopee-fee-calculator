import { calcScenario } from "./scenario";
import type { CalcInput, ScenarioOptions } from "./types";

export interface ReverseInput {
  base: Omit<CalcInput, "giaBan">;
  targetLnPercent: number;
  scenario: ScenarioOptions;
  minMultiplier?: number;
  maxMultiplier?: number;
  tolerance?: number;
  maxIter?: number;
}

export interface ReverseResult {
  giaBan: number;
  achievedLnPercent: number;
  iterations: number;
}

export function solveGiaBan(input: ReverseInput): ReverseResult | null {
  const min = input.base.giaNhap * (input.minMultiplier ?? 1);
  const max = input.base.giaNhap * (input.maxMultiplier ?? 20);
  const tol = input.tolerance ?? 0.0001;
  const maxIter = input.maxIter ?? 60;

  const ratioAt = (gb: number) => {
    const r = calcScenario({ ...input.base, giaBan: gb }, input.scenario);
    return r.loiNhuanTrenDoanhThu;
  };

  let lo = min;
  let hi = max;
  const ratioHi = ratioAt(hi);
  if (ratioHi < input.targetLnPercent) return null;

  for (let i = 0; i < maxIter; i++) {
    const mid = (lo + hi) / 2;
    const ratio = ratioAt(mid);
    if (Math.abs(ratio - input.targetLnPercent) < tol) {
      return { giaBan: Math.round(mid), achievedLnPercent: ratio, iterations: i + 1 };
    }
    if (ratio < input.targetLnPercent) lo = mid;
    else hi = mid;
  }
  const finalGb = Math.round((lo + hi) / 2);
  return { giaBan: finalGb, achievedLnPercent: ratioAt(finalGb), iterations: maxIter };
}
