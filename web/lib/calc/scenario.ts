import {
  calcPhiShipHoanPerOrder,
  calcPhiThanhToanVnd,
  calcVoucherXtraVnd,
} from "./shared";
import type { CalcInput, ScenarioOptions, ScenarioResult } from "./types";

export function calcScenario(
  input: CalcInput,
  opts: ScenarioOptions
): ScenarioResult {
  const { giaBan, giaNhap, phiCoDinh, phiHaTang, phiQc, phiVoucherShop, phiThue, phiKhac, piShip, phiShipHoan, tiLeHoan } = input;

  const laiRong = giaBan - giaNhap;
  const phiCoDinhVnd = phiCoDinh * giaBan;
  const phiThanhToanVnd = calcPhiThanhToanVnd(input);
  const phiHaTangVnd = phiHaTang;
  const phiVoucherXtraVnd = opts.hasVoucherXtra
    ? calcVoucherXtraVnd(giaBan, input.phiVoucherXtra)
    : 0;

  const tongPhiShopee =
    phiCoDinhVnd + phiThanhToanVnd + phiHaTangVnd + phiVoucherXtraVnd;

  const phiPiShipVnd = opts.hasPiShip ? piShip : 0;
  const phiQcVnd = phiQc * giaBan;
  const phiVoucherShopVnd = phiVoucherShop * giaBan;
  const phiThueVnd = phiThue * giaBan;
  const phiKhacVnd = phiKhac * giaBan;
  const phiShipHoanVnd = opts.hasPiShip
    ? 0
    : calcPhiShipHoanPerOrder(phiShipHoan, tiLeHoan);

  const tongChiPhi =
    tongPhiShopee +
    phiPiShipVnd +
    phiQcVnd +
    phiVoucherShopVnd +
    phiThueVnd +
    phiKhacVnd +
    phiShipHoanVnd;

  const loiNhuan = giaBan - giaNhap - tongChiPhi;
  const loiNhuanTrenDoanhThu = giaBan === 0 ? 0 : loiNhuan / giaBan;
  const chiPhiTrenDoanhThu = giaBan === 0 ? 0 : tongChiPhi / giaBan;

  return {
    giaBan,
    giaNhap,
    laiRong,
    phiCoDinhVnd,
    phiThanhToanVnd,
    phiHaTangVnd,
    phiVoucherXtraVnd,
    tongPhiShopee,
    phiPiShipVnd,
    phiQcVnd,
    phiVoucherShopVnd,
    phiThueVnd,
    phiKhacVnd,
    phiShipHoanVnd,
    tongChiPhi,
    loiNhuan,
    loiNhuanTrenDoanhThu,
    chiPhiTrenDoanhThu,
  };
}
