import { describe, it, expect } from "vitest";
import { calcScenario } from "../scenario";
import { calc, findBestScenario } from "../index";
import { DEFAULTS_MALL, DEFAULTS_THUONG } from "../shared";
import type { CalcInput } from "../types";

const TOL = 1;

function approxEqual(a: number, b: number, tol = TOL) {
  expect(Math.abs(a - b)).toBeLessThanOrEqual(tol);
}

describe("Mall scenario — case 1 (50k/100k, 12.6%)", () => {
  const input: CalcInput = {
    giaNhap: 50000,
    giaBan: 100000,
    phiCoDinh: 0.126,
    ...DEFAULTS_MALL,
  };

  it("KhongDk + Co Pi Ship matches Excel", () => {
    const r = calcScenario(input, { hasVoucherXtra: false, hasPiShip: true });
    approxEqual(r.phiCoDinhVnd, 12600);
    approxEqual(r.phiThanhToanVnd, 5646.5);
    approxEqual(r.phiHaTangVnd, 3000);
    approxEqual(r.phiVoucherXtraVnd, 0);
    approxEqual(r.tongPhiShopee, 21246.5);
    approxEqual(r.phiPiShipVnd, 1620);
    approxEqual(r.phiQcVnd, 10000);
    approxEqual(r.phiThueVnd, 1500);
    approxEqual(r.phiShipHoanVnd, 0);
    approxEqual(r.tongChiPhi, 34366.5);
    approxEqual(r.loiNhuan, 15633.5);
  });

  it("KhongDk + Khong Pi Ship — uses ship hoan", () => {
    const r = calcScenario(input, { hasVoucherXtra: false, hasPiShip: false });
    // phi ship hoan = 50000 * 0.1 / 0.9 = 5555.56
    approxEqual(r.phiShipHoanVnd, 5555.56);
    approxEqual(r.phiPiShipVnd, 0);
    approxEqual(r.tongChiPhi, 21246.5 + 10000 + 1500 + 5555.56);
  });

  it("VoucherXtra adds capped fee (4% of 100k = 4000)", () => {
    const r = calcScenario(input, { hasVoucherXtra: true, hasPiShip: true });
    approxEqual(r.phiVoucherXtraVnd, 4000);
    approxEqual(r.tongPhiShopee, 21246.5 + 4000);
  });

  it("VoucherXtra cap at 50k for very expensive items", () => {
    const big: CalcInput = { ...input, giaBan: 5_000_000 };
    const r = calcScenario(big, { hasVoucherXtra: true, hasPiShip: true });
    approxEqual(r.phiVoucherXtraVnd, 50000);
  });
});

describe("Thuong scenario — no phi ha tang", () => {
  it("phiHaTang must be 0 for thuong", () => {
    const input: CalcInput = {
      giaNhap: 100000,
      giaBan: 300000,
      phiCoDinh: 0.1,
      ...DEFAULTS_THUONG,
    };
    const r = calcScenario(input, { hasVoucherXtra: false, hasPiShip: true });
    expect(r.phiHaTangVnd).toBe(0);
    approxEqual(r.phiCoDinhVnd, 30000);
  });
});

describe("calc() — full 4-scenario output", () => {
  it("returns all 4 scenarios with consistent giaBan", () => {
    const input: CalcInput = {
      giaNhap: 50000,
      giaBan: 100000,
      phiCoDinh: 0.126,
      ...DEFAULTS_MALL,
    };
    const r = calc(input);
    for (const k of Object.values(r)) {
      expect(k.giaBan).toBe(100000);
      expect(k.giaNhap).toBe(50000);
      expect(k.laiRong).toBe(50000);
    }
  });

  it("findBestScenario picks max loiNhuan", () => {
    const input: CalcInput = {
      giaNhap: 50000,
      giaBan: 100000,
      phiCoDinh: 0.126,
      ...DEFAULTS_MALL,
    };
    const r = calc(input);
    const best = findBestScenario(r);
    const bestProfit = r[best].loiNhuan;
    for (const k of Object.values(r)) {
      expect(k.loiNhuan).toBeLessThanOrEqual(bestProfit);
    }
  });
});

describe("Edge cases", () => {
  it("giaBan = 0 doesnt divide by zero", () => {
    const input: CalcInput = {
      giaNhap: 0,
      giaBan: 0,
      phiCoDinh: 0.1,
      ...DEFAULTS_MALL,
    };
    const r = calcScenario(input, { hasVoucherXtra: false, hasPiShip: true });
    expect(r.loiNhuanTrenDoanhThu).toBe(0);
    expect(r.chiPhiTrenDoanhThu).toBe(0);
  });

  it("voucher shop reduces phi thanh toan base", () => {
    const input: CalcInput = {
      giaNhap: 50000,
      giaBan: 100000,
      phiCoDinh: 0.126,
      ...DEFAULTS_MALL,
      phiVoucherShop: 0.1,
    };
    const r = calcScenario(input, { hasVoucherXtra: false, hasPiShip: true });
    // phi thanh toan = 0.0491 * (100000 + 15000 - 10000) = 0.0491 * 105000 = 5155.5
    approxEqual(r.phiThanhToanVnd, 5155.5);
    approxEqual(r.phiVoucherShopVnd, 10000);
  });
});
