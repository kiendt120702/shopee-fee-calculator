import type { CalcInput, ShopMode } from "@/lib/calc/types";
import type { CategorySelection } from "@/components/common/category-cascader";
import { getDefaults } from "@/lib/calc/shared";

const FIELD_KEYS: (keyof CalcInput)[] = [
  "giaNhap",
  "giaBan",
  "phiCoDinh",
  "phiThanhToan",
  "phiVoucherXtra",
  "phiHaTang",
  "phiShipKhTb",
  "piShip",
  "phiShipHoan",
  "tiLeHoan",
  "phiQc",
  "phiVoucherShop",
  "phiThue",
  "phiKhac",
];

const SHORT: Record<keyof CalcInput, string> = {
  giaNhap: "gn",
  giaBan: "gb",
  phiCoDinh: "fc",
  phiThanhToan: "ft",
  phiVoucherXtra: "fx",
  phiHaTang: "fh",
  phiShipKhTb: "sk",
  piShip: "ps",
  phiShipHoan: "sh",
  tiLeHoan: "th",
  phiQc: "qc",
  phiVoucherShop: "vs",
  phiThue: "tx",
  phiKhac: "ot",
};

const REVERSE_SHORT: Record<string, keyof CalcInput> = Object.fromEntries(
  Object.entries(SHORT).map(([k, v]) => [v, k as keyof CalcInput])
);

export function encodeToParams(
  input: CalcInput,
  category: CategorySelection,
  mode?: ShopMode
): URLSearchParams {
  const params = new URLSearchParams();
  if (mode) params.set("mode", mode);
  for (const key of FIELD_KEYS) {
    const v = input[key];
    if (typeof v === "number" && v !== 0) {
      params.set(SHORT[key], v.toString());
    }
  }
  if (category.cap1) params.set("c1", category.cap1);
  if (category.cap2) params.set("c2", category.cap2);
  if (category.cap3) params.set("c3", category.cap3);
  return params;
}

export function decodeFromParams(
  params: URLSearchParams,
  mode: ShopMode
): { input: Partial<CalcInput>; category: CategorySelection } {
  const input: Partial<CalcInput> = {};
  const defaults = getDefaults(mode);
  for (const [shortKey, value] of params.entries()) {
    const fullKey = REVERSE_SHORT[shortKey];
    if (fullKey) {
      const n = Number.parseFloat(value);
      if (!Number.isNaN(n)) (input as Record<string, number>)[fullKey] = n;
    }
  }
  // Re-apply defaults if no override (so phiHaTang for thuong stays 0)
  for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
    if (input[key] === undefined) (input as Record<string, number>)[key] = defaults[key];
  }
  return {
    input,
    category: {
      cap1: params.get("c1"),
      cap2: params.get("c2"),
      cap3: params.get("c3"),
    },
  };
}
