# Phase 04 — Calculator pages (Mall + Thường)

**Priority**: Critical
**Status**: pending
**Effort**: 1 ngày
**Depends on**: Phase 02, Phase 03

## Overview

Wire calc engine vào UI components để có calculator hoạt động. 3 route: home (chọn mode), `/mall`, `/thuong`. Result table 4 cột so sánh kịch bản.

## Requirements

**Functional**:
- Form input bento card: giá nhập, giá bán, ngành hàng (cascader), tham số mở rộng (collapsible: phí thanh toán, voucher xtra, ship, QC, voucher shop, thuế, tỉ lệ hoàn)
- Real-time calc: thay đổi input → result update ngay (debounce 200ms)
- Result table 4 cột: KĐK Có Pi Ship | KĐK Không Pi Ship | Voucher Xtra Có Pi Ship | Voucher Xtra Không Pi Ship
- Hàng: Doanh thu, Giá nhập, Lãi ròng, Phí cố định, Phí thanh toán, Phí hạ tầng (Mall), Voucher Xtra, Tổng phí Shopee, Pi Ship, QC, Voucher shop, Thuế, Phí ship hoàn, Tổng chi phí, **Lợi nhuận**, LN/DT, CP/DT
- Highlight cột tốt nhất (lợi nhuận cao nhất) bằng border primary
- Lãi xanh, lỗ đỏ
- Reset button

**Non-functional**:
- No layout shift khi result update
- Keyboard navigable

## Architecture

```
app/
├── page.tsx                      # Landing: chọn Mall/Thường + giới thiệu
├── mall/page.tsx                 # Calculator Mall
├── thuong/page.tsx               # Calculator Thường
components/calculator/
├── calculator-shell.tsx          # Bento layout: form trái, result phải
├── input-form.tsx                # Form chính + advanced collapsible
├── result-table.tsx              # 4 column compare
├── result-row.tsx                # Hàng table với money formatting
├── best-scenario-badge.tsx       # Badge "Tối ưu" cho cột best
hooks/
├── use-calculator.ts             # Wrap calcMall/calcThuong + state
```

## Related Code Files

**Create**: tất cả file trong `app/mall/`, `app/thuong/`, `components/calculator/`, `hooks/`
**Modify**: `app/page.tsx` (landing)

## Implementation Steps

1. `useCalculator(mode)` hook:
   ```ts
   const [input, setInput] = useState<CalcInput>(DEFAULTS);
   const result = useMemo(() => mode === 'mall' ? calcMall(input) : calcThuong(input), [input, mode]);
   return { input, setInput, result };
   ```
2. `InputForm` component:
   - Bento card: "Thông tin sản phẩm"
     - MoneyInput giá nhập
     - MoneyInput giá bán
     - CategoryCascader → onSelect set phiCoDinh
   - Bento card collapsible: "Tham số nâng cao"
     - PercentInput phí thanh toán (default 4.91%)
     - PercentInput voucher xtra (default 4%)
     - MoneyInput phí hạ tầng (Mall only, default 3000)
     - MoneyInput phí ship KH TB (15000)
     - MoneyInput Pi Ship (1620)
     - MoneyInput phí ship hoàn (50000)
     - PercentInput tỉ lệ hoàn (10%)
     - PercentInput phí QC (10%)
     - PercentInput voucher shop (0%)
     - PercentInput thuế HKD (1.5%)
   - Reset button
3. `ResultTable`:
   - shadcn Table 5 cột (label + 4 scenario)
   - Highlight cột best (max lợi nhuận) bằng `ring-2 ring-primary`
   - Số âm → text-danger, dương → text-success cho hàng Lợi nhuận
   - Rows dùng `ResultRow` component
4. `app/mall/page.tsx`:
   ```tsx
   export default function MallPage() {
     return <CalculatorShell mode="mall" />;
   }
   ```
5. `app/thuong/page.tsx`: tương tự mode="thuong"
6. `app/page.tsx`: hero + 2 card lớn dẫn đến Mall/Thường + section giới thiệu Betacom
7. Update header nav active state theo route
8. Test responsive: form trên mobile xếp dọc, desktop side-by-side

## Todo List

- [ ] Hook useCalculator
- [ ] InputForm component (basic + advanced)
- [ ] CalculatorShell layout
- [ ] ResultTable + ResultRow
- [ ] Best scenario detection + highlight
- [ ] Mall page
- [ ] Thường page
- [ ] Landing page với 2 CTA
- [ ] Header active state per route
- [ ] Mobile responsive test
- [ ] Test E2E manual: nhập 1 case → check số khớp Excel

## Success Criteria

- Nhập input → result update <200ms
- Số liệu khớp Excel
- Mobile usable, không scroll ngang
- Best scenario highlight đúng

## Risks

- Form quá dài trên mobile → collapsible advanced section
- Result table 4 cột tràn mobile → scroll ngang trong Card hoặc switch sang card view trên mobile

## Next Steps

→ Phase 05: Reverse calc + share URL + history
