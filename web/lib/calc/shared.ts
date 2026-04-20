import type { CalcInput, ShopMode } from "./types";

export const VOUCHER_XTRA_CAP = 50000;

export const DEFAULTS_MALL: Omit<CalcInput, "giaNhap" | "giaBan" | "phiCoDinh"> = {
  phiThanhToan: 0.0491,
  phiVoucherXtra: 0.04,
  phiHaTang: 3000,
  phiShipKhTb: 15000,
  piShip: 1620,
  phiShipHoan: 50000,
  tiLeHoan: 0.1,
  phiQc: 0.1,
  phiVoucherShop: 0,
  phiThue: 0.015,
  phiKhac: 0,
};

export const DEFAULTS_THUONG: Omit<CalcInput, "giaNhap" | "giaBan" | "phiCoDinh"> = {
  phiThanhToan: 0.0491,
  phiVoucherXtra: 0.04,
  phiHaTang: 0,
  phiShipKhTb: 15000,
  piShip: 1620,
  phiShipHoan: 50000,
  tiLeHoan: 0.1,
  phiQc: 0.1,
  phiVoucherShop: 0,
  phiThue: 0.015,
  phiKhac: 0,
};

export function getDefaults(mode: ShopMode): Omit<CalcInput, "giaNhap" | "giaBan" | "phiCoDinh"> {
  return mode === "mall" ? DEFAULTS_MALL : DEFAULTS_THUONG;
}

export function calcVoucherXtraVnd(giaBan: number, rate: number): number {
  return Math.min(giaBan * rate, VOUCHER_XTRA_CAP);
}

export function calcPhiShipHoanPerOrder(phiHoan: number, tiLe: number): number {
  if (tiLe <= 0 || tiLe >= 1) return 0;
  return (phiHoan * tiLe) / (1 - tiLe);
}

export function calcPhiThanhToanVnd(input: CalcInput): number {
  const { phiThanhToan, giaBan, phiShipKhTb, phiVoucherShop } = input;
  return phiThanhToan * (giaBan + phiShipKhTb - giaBan * phiVoucherShop);
}
