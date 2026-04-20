# Phase 05 — Reverse calc + share URL + history

**Priority**: Medium
**Status**: pending
**Effort**: 0.5 ngày
**Depends on**: Phase 04

## Overview

Thêm 3 tính năng nâng cao: tính ngược (nhập % lợi nhuận → giá bán đề xuất), share kết quả qua URL params, lưu lịch sử calc vào localStorage.

## Requirements

**Functional**:
- Reverse calc: nhập giá nhập + ngành hàng + % lợi nhuận mong muốn + scenario chọn → giải bằng binary search ra giá bán
- Share button → copy URL chứa toàn bộ params (base64 hoặc query string)
- Restore từ URL khi load page
- History: 10 calc gần nhất lưu localStorage, click để restore

**Non-functional**:
- URL ngắn, sạch (dùng query string, omit defaults)
- localStorage gracefully degrade (private browsing)

## Architecture

```
components/calculator/
├── reverse-calc-card.tsx
├── share-button.tsx
├── history-list.tsx
lib/
├── url-state.ts                  # encode/decode CalcInput ↔ URLSearchParams
├── history-storage.ts            # localStorage CRUD
├── calc/
│   └── reverse-solver.ts         # binary search
hooks/
├── use-url-sync.ts               # sync state ↔ URL
├── use-history.ts                # history hook
```

## Implementation Steps

1. `reverse-solver.ts`:
   ```ts
   export function solveGiaBan(args: {
     giaNhap: number;
     phiCoDinh: number;
     targetLnPercent: number;  // 0.2 = 20%
     scenario: 'coPiShip' | 'khongPiShip';
     hasVoucherXtra: boolean;
     mode: 'mall' | 'thuong';
     overrides?: Partial<CalcInput>;
   }): { giaBan: number; result: ScenarioResult } | null
   ```
   Binary search giaBan từ giaNhap đến giaNhap × 10. Tolerance 0.001%.
2. `url-state.ts`:
   ```ts
   export function encodeToParams(input: CalcInput): URLSearchParams // omit if equal default
   export function decodeFromParams(params: URLSearchParams): Partial<CalcInput>
   ```
3. `use-url-sync.ts`: dùng `useRouter` + `useSearchParams`, debounce update URL khi state đổi
4. `history-storage.ts`:
   ```ts
   export interface HistoryEntry { id: string; createdAt: number; mode: 'mall'|'thuong'; input: CalcInput; label?: string; }
   export const history = { getAll(), add(entry), remove(id), clear() }
   ```
5. `useHistory()` hook quản lý state + sync localStorage
6. `ReverseCalcCard`:
   - Bento card riêng, đặt dưới ResultTable
   - Inputs: giá nhập (auto-fill từ form chính), ngành hàng (auto-fill), %LN target, scenario chọn
   - Button "Tính giá bán" → gọi solver → hiển thị giá đề xuất + breakdown ngắn
   - Button "Áp dụng" → set giá bán vào form chính
7. `ShareButton`: copy URL hiện tại to clipboard, toast "Đã copy"
8. `HistoryList`: Bento card sidebar/bottom, list 10 entry, click restore, button xóa
9. Wire vào CalculatorShell: thêm Reverse + Share + History

## Todo List

- [ ] reverse-solver.ts (binary search)
- [ ] Test reverse-solver với 3 case
- [ ] url-state.ts encode/decode
- [ ] use-url-sync hook
- [ ] history-storage.ts
- [ ] useHistory hook
- [ ] ReverseCalcCard component
- [ ] ShareButton
- [ ] HistoryList
- [ ] Integrate vào shell
- [ ] Manual test: copy URL, paste tab khác → state restore
- [ ] Manual test: tính 3 lần → check history list

## Success Criteria

- Reverse calc trả giá bán mà tính lại ra %LN khớp target ±0.5%
- Share URL paste → restore đúng state
- History persist qua reload
- Private mode không crash (try/catch localStorage)

## Risks

- Binary search không hội tụ với edge case (giá nhập quá cao) → return null + UI báo "Không thể đạt %LN này"
- URL quá dài → cân nhắc base64 nén nếu >500 chars

## Next Steps

→ Phase 06: Analytics + SEO + deploy
