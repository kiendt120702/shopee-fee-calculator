# Phase 02 — Core calc engine (Mall + Thường) + tests

**Priority**: Critical
**Status**: pending
**Effort**: 1 ngày
**Depends on**: Phase 01

## Overview

Implement công thức tính phí pure functions cho 2 mode (Mall + Thường), cover full 4 kịch bản (KĐK / Voucher Xtra × Có/Không Pi Ship). Unit test exhaustive đối chiếu Excel.

## Key Insights (từ Excel)

**Shop Mall** — params mặc định:
- Phí thanh toán: 4.91%
- Phí voucher xtra: 4% (cap 50.000đ)
- Phí hạ tầng: 3.000đ
- Phí ship TB KH thanh toán: 15.000đ
- Pi Ship: 1.620đ
- Phí ship hoàn nếu không Pi Ship: `(50.000 × tỉ_lệ_hoàn) / (1 − tỉ_lệ_hoàn)` với tỉ lệ mặc định 10%
- QC ước tính: 10% giá bán
- Voucher shop: tự nhập (% giá bán)
- Thuế HKD: 1.5% giá bán

**Shop Thường**: tương tự nhưng KHÔNG có phí hạ tầng + thuế HKD khác (xác minh khi convert).

## Requirements

**Functional**:
- `calcMall(input): MallResult` — output 4 cột (Không ĐK Có Pi Ship / Không ĐK Không Pi Ship / Voucher Xtra Có Pi Ship / Voucher Xtra Không Pi Ship)
- `calcThuong(input): ThuongResult`
- `findCategoryFee(cap1, cap2, cap3?, mode): number` — lookup phí cố định
- Helper: format VND, format percent

**Non-functional**:
- Pure functions, no side effects
- 100% test coverage cho calc functions
- Test fixture: ít nhất 5 case mỗi mode, đối chiếu giá trị Excel

## Architecture

```
lib/
├── calc/
│   ├── types.ts              # CalcInput, MallResult, ThuongResult, Scenario
│   ├── shared.ts             # Constants, helpers (cap-50k, format)
│   ├── mall-formula.ts       # calcMall + breakdown
│   ├── thuong-formula.ts     # calcThuong
│   ├── category-lookup.ts    # findCategoryFee
│   └── __tests__/
│       ├── mall-formula.test.ts
│       ├── thuong-formula.test.ts
│       └── fixtures.ts       # Test cases từ Excel
└── format.ts                 # formatVnd, formatPercent
```

## Related Code Files

**Create**: tất cả file trong `lib/calc/` + `lib/format.ts` + `vitest.config.ts`

**Read**: `lib/data/categories-mall.json`, `lib/data/categories-thuong.json`, `lib/types.ts`

## Implementation Steps

1. Define types:
   ```ts
   export interface CalcInput {
     giaNhap: number;
     giaBan: number;
     phiCoDinh: number; // 0.126
     phiThanhToan?: number; // default 0.0491
     phiVoucherXtra?: number; // default 0.04
     phiHaTang?: number; // 3000 (Mall only)
     phiShipKhTb?: number; // 15000
     piShip?: number; // 1620
     phiShipHoan?: number; // 50000
     tiLeHoan?: number; // 0.1
     phiQc?: number; // 0.1
     phiVoucherShop?: number; // 0
     phiThue?: number; // 0.015
   }
   export interface ScenarioResult {
     phiCoDinhVnd: number;
     phiThanhToanVnd: number;
     phiHaTangVnd: number;
     phiVoucherXtraVnd: number; // 0 nếu không ĐK
     tongPhiShopee: number;
     phiPiShip: number; // 0 nếu không Pi Ship
     phiQcVnd: number;
     phiVoucherShopVnd: number;
     phiThueVnd: number;
     phiShipHoanVnd: number; // 0 nếu có Pi Ship
     tongChiPhi: number;
     loiNhuan: number;
     loiNhuanTrenDoanhThu: number;
     chiPhiTrenDoanhThu: number;
   }
   export interface MallResult {
     khongDk_coPiShip: ScenarioResult;
     khongDk_khongPiShip: ScenarioResult;
     voucherXtra_coPiShip: ScenarioResult;
     voucherXtra_khongPiShip: ScenarioResult;
   }
   ```

2. `shared.ts`:
   ```ts
   export const VOUCHER_XTRA_CAP = 50000;
   export const DEFAULTS = { phiThanhToan: 0.0491, phiVoucherXtra: 0.04, ... };
   export const calcVoucherXtra = (giaBan: number, rate: number) =>
     Math.min(giaBan * rate, VOUCHER_XTRA_CAP);
   export const calcPhiShipHoan = (phiHoan: number, tiLe: number) =>
     (phiHoan * tiLe) / (1 - tiLe);
   ```

3. `mall-formula.ts` — implement công thức:
   ```
   phiCoDinh = phiCoDinhRate × giaBan
   phiThanhToan = 0.0491 × (giaBan + 15000 − giaBan × voucherShop)
   tongPhiShopee = phiCoDinh + phiThanhToan + 3000 + (voucherXtra)
   tongChiPhi (có Pi Ship) = tongPhiShopee + piShip + qc + voucherShop + thue
   tongChiPhi (không Pi Ship) = tongPhiShopee + qc + voucherShop + thue + phiShipHoan
   loiNhuan = giaBan − giaNhap − tongChiPhi
   ```

4. `thuong-formula.ts` — tương tự nhưng KHÔNG có phí hạ tầng

5. `category-lookup.ts`:
   ```ts
   export function findCategoryFee(cap1: string, cap2: string, cap3: string | null, mode: 'mall' | 'thuong'): number | null
   ```

6. Viết `fixtures.ts` với 5+ test case, mỗi case có input + expected output từ Excel:
   - Case 1 Mall: giá nhập 50k, giá bán 100k, ngành Điện Thoại/Phụ kiện/Cáp sạc (12.6%) → đối chiếu Excel
   - Repeat cho Thường

7. Run `npx vitest` → all green

## Todo List

- [ ] Define types CalcInput, ScenarioResult, MallResult, ThuongResult
- [ ] Implement shared.ts (constants + helpers)
- [ ] Implement mall-formula.ts (4 scenarios)
- [ ] Implement thuong-formula.ts (4 scenarios)
- [ ] Implement category-lookup.ts
- [ ] Implement format.ts (VND, percent)
- [ ] Setup vitest config
- [ ] Write fixtures với 5+ case Mall, 5+ case Thường (đối chiếu Excel)
- [ ] Test all scenarios pass
- [ ] Coverage report >95% cho lib/calc/

## Success Criteria

- All test pass
- Coverage `lib/calc/` >95%
- Mismatch với Excel <1đ (rounding tolerance)

## Risks

- Excel có công thức custom edge case (vd voucher xtra có cap 50k, phí hoàn formula đặc biệt) → đọc kỹ Excel raw, hỏi user xác nhận khi nghi ngờ
- Floating point → dùng `Math.round` ở output cuối, không round trung gian

## Next Steps

→ Phase 03: Design system + UI components
