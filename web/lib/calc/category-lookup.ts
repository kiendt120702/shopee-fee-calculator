import mallData from "../data/categories-mall.json";
import thuongData from "../data/categories-thuong.json";
import type { Category, ShopMode } from "../types";

const MALL = mallData as Category[];
const THUONG = thuongData as Category[];

export function getCategories(mode: ShopMode): Category[] {
  return mode === "mall" ? MALL : THUONG;
}

export function getCap1List(mode: ShopMode): string[] {
  const set = new Set<string>();
  for (const c of getCategories(mode)) set.add(c.cap1);
  return Array.from(set).sort((a, b) => a.localeCompare(b, "vi"));
}

export function getCap2List(mode: ShopMode, cap1: string): string[] {
  const set = new Set<string>();
  for (const c of getCategories(mode)) {
    if (c.cap1 === cap1) set.add(c.cap2);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "vi"));
}

export function getCap3List(mode: ShopMode, cap1: string, cap2: string): string[] {
  const set = new Set<string>();
  for (const c of getCategories(mode)) {
    if (c.cap1 === cap1 && c.cap2 === cap2 && c.cap3) set.add(c.cap3);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "vi"));
}

export function findCategory(
  mode: ShopMode,
  cap1: string,
  cap2: string,
  cap3: string | null
): Category | null {
  const list = getCategories(mode);
  if (cap3) {
    const exact = list.find(
      (c) => c.cap1 === cap1 && c.cap2 === cap2 && c.cap3 === cap3
    );
    if (exact) return exact;
  }
  const cap2Match = list.find(
    (c) => c.cap1 === cap1 && c.cap2 === cap2 && !c.cap3
  );
  if (cap2Match) return cap2Match;
  const anyCap2 = list.find((c) => c.cap1 === cap1 && c.cap2 === cap2);
  return anyCap2 ?? null;
}

export function findCategoryFee(
  mode: ShopMode,
  cap1: string,
  cap2: string,
  cap3: string | null
): number | null {
  return findCategory(mode, cap1, cap2, cap3)?.phiCoDinh ?? null;
}
