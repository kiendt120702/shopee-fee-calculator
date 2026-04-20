import type { ShopMode } from "../types";

export interface CalcInput {
  giaNhap: number;
  giaBan: number;
  phiCoDinh: number;
  phiThanhToan: number;
  phiVoucherXtra: number;
  phiHaTang: number;
  phiShipKhTb: number;
  piShip: number;
  phiShipHoan: number;
  tiLeHoan: number;
  phiQc: number;
  phiVoucherShop: number;
  phiThue: number;
}

export interface ScenarioResult {
  giaBan: number;
  giaNhap: number;
  laiRong: number;
  phiCoDinhVnd: number;
  phiThanhToanVnd: number;
  phiHaTangVnd: number;
  phiVoucherXtraVnd: number;
  tongPhiShopee: number;
  phiPiShipVnd: number;
  phiQcVnd: number;
  phiVoucherShopVnd: number;
  phiThueVnd: number;
  phiShipHoanVnd: number;
  tongChiPhi: number;
  loiNhuan: number;
  loiNhuanTrenDoanhThu: number;
  chiPhiTrenDoanhThu: number;
}

export type ScenarioKey =
  | "khongDk_coPiShip"
  | "khongDk_khongPiShip"
  | "voucherXtra_coPiShip"
  | "voucherXtra_khongPiShip";

export type CalcResult = Record<ScenarioKey, ScenarioResult>;

export interface ScenarioOptions {
  hasVoucherXtra: boolean;
  hasPiShip: boolean;
}

export type { ShopMode };
