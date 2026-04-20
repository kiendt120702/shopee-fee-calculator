import { describe, it, expect } from "vitest";
import {
  getCap1List,
  getCap2List,
  findCategory,
  findCategoryFee,
} from "../category-lookup";

describe("Category lookup — Mall", () => {
  it("cap1 list non-empty + sorted unique", () => {
    const list = getCap1List("mall");
    expect(list.length).toBeGreaterThan(10);
    expect(new Set(list).size).toBe(list.length);
  });

  it("cap2 list filtered by cap1", () => {
    const list = getCap2List("mall", "Điện Thoại & Phụ Kiện");
    expect(list).toContain("Phụ kiện");
  });

  it("STT 195 — Điện Thoại / Phụ kiện / Vỏ bao... = 12.6%", () => {
    const fee = findCategoryFee(
      "mall",
      "Điện Thoại & Phụ Kiện",
      "Phụ kiện",
      "Vỏ bao, Ốp lưng & Miếng dán"
    );
    expect(fee).toBe(0.126);
  });

  it("findCategory falls back to cap2-only when cap3 unknown", () => {
    const c = findCategory("mall", "Điện Thoại & Phụ Kiện", "Phụ kiện", null);
    expect(c).not.toBeNull();
    expect(c?.cap1).toBe("Điện Thoại & Phụ Kiện");
  });

  it("returns null for unknown cap1", () => {
    const fee = findCategoryFee("mall", "Không Tồn Tại", "X", null);
    expect(fee).toBeNull();
  });
});

describe("Category lookup — Thuong", () => {
  it("cap1 list non-empty", () => {
    const list = getCap1List("thuong");
    expect(list.length).toBeGreaterThan(10);
  });
});
