import { describe, it, expect } from "vitest";
import { solveGiaBan } from "../reverse-solver";
import { calcScenario } from "../scenario";
import { DEFAULTS_MALL } from "../shared";
import type { CalcInput } from "../types";

describe("Reverse solver", () => {
  it("solves giaBan that achieves target LN%", () => {
    const base: Omit<CalcInput, "giaBan"> = {
      giaNhap: 50000,
      phiCoDinh: 0.126,
      ...DEFAULTS_MALL,
    };
    const result = solveGiaBan({
      base,
      targetLnPercent: 0.2,
      scenario: { hasVoucherXtra: false, hasPiShip: true },
    });
    expect(result).not.toBeNull();
    if (!result) return;
    const verify = calcScenario(
      { ...base, giaBan: result.giaBan },
      { hasVoucherXtra: false, hasPiShip: true }
    );
    expect(Math.abs(verify.loiNhuanTrenDoanhThu - 0.2)).toBeLessThan(0.005);
  });

  it("returns null when target unreachable", () => {
    const base: Omit<CalcInput, "giaBan"> = {
      giaNhap: 50000,
      phiCoDinh: 0.126,
      ...DEFAULTS_MALL,
    };
    const result = solveGiaBan({
      base,
      targetLnPercent: 0.95,
      scenario: { hasVoucherXtra: false, hasPiShip: true },
    });
    expect(result).toBeNull();
  });
});
