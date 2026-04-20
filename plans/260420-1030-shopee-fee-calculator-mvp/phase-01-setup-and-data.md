# Phase 01 — Setup project + convert Excel → JSON

**Priority**: Critical (blocker cho mọi phase sau)
**Status**: pending
**Effort**: 0.5 ngày

## Overview

Khởi tạo Next.js project, cài deps cơ bản, viết script convert file Excel ngành hàng → 2 JSON tĩnh (Mall + Thường) bundle vào codebase.

## Key Insights

- Excel có 2 sheet data: `DuLieuGoc` (Mall, ~1005 rows) và `DuLieuGoc2` (Thường, ~1005 rows)
- Cấu trúc cột: STT | Cấp 1 | Cấp 2 | Cấp 3 | (cột phụ) | Phí cố định
- Conversion chạy 1 lần, không cần build pipeline phức tạp

## Requirements

**Functional**:
- Init Next.js 15 App Router + TS strict
- Tailwind v4 + shadcn/ui
- Script `scripts/convert-excel.ts` đọc file xlsx, output JSON
- 2 JSON file: `lib/data/categories-mall.json`, `lib/data/categories-thuong.json`

**Non-functional**:
- TypeScript strict mode
- ESLint + Prettier
- gitignore chuẩn Next.js

## Architecture

```
project-root/
├── app/
│   ├── layout.tsx          # Root layout + Inter font + metadata VN
│   ├── page.tsx            # Placeholder
│   └── globals.css         # Tailwind + tokens
├── components/ui/          # shadcn/ui
├── lib/
│   ├── data/
│   │   ├── categories-mall.json
│   │   └── categories-thuong.json
│   └── types.ts
├── scripts/
│   └── convert-excel.ts
├── public/
│   └── betacomlogo.png     # copy từ root
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Related Code Files

**Create**:
- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `scripts/convert-excel.ts`
- `lib/data/categories-mall.json`, `lib/data/categories-thuong.json`
- `lib/types.ts` (Category interface)
- `public/betacomlogo.png`

**Read**:
- `CÔNG THỨC TÍNH GIÁ BÁN SHOPEE MALL + THƯỜNG.xlsx` (source)

## Implementation Steps

1. `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
2. Cài deps: `npm i xlsx @vercel/analytics @vercel/speed-insights`, dev: `vitest @vitest/ui tsx`
3. Init shadcn: `npx shadcn@latest init` (chọn theme zinc, neutral)
4. Tạo `lib/types.ts`:
   ```ts
   export interface Category {
     stt: number;
     cap1: string;
     cap2: string;
     cap3: string | null;
     phiCoDinh: number; // 0.126 = 12.6%
   }
   ```
5. Viết `scripts/convert-excel.ts` đọc 2 sheet `DuLieuGoc` và `DuLieuGoc2`, dùng cell A,B,C,D,F (skip cột E nếu trống), output 2 JSON file
6. Chạy `npx tsx scripts/convert-excel.ts` → verify file JSON tạo thành công
7. Copy `betacomlogo.png` vào `public/`
8. Setup `app/layout.tsx` với Inter font + metadata `lang="vi"`, title/description tiếng Việt
9. Update `app/globals.css` với CSS variables: `--primary: 230 48% 48%` (đỏ Betacom HSL)
10. Run `npm run build` → verify build pass

## Todo List

- [ ] Init Next.js project structure
- [ ] Install dependencies (runtime + dev)
- [ ] Init shadcn/ui
- [ ] Create types.ts với Category interface
- [ ] Write convert-excel.ts script
- [ ] Run script → generate 2 JSON files
- [ ] Verify JSON: count rows, sample 5 rows random
- [ ] Copy logo to public/
- [ ] Setup root layout + font + metadata VN
- [ ] Configure Tailwind theme với primary đỏ Betacom
- [ ] Build pass

## Success Criteria

- `npm run build` pass không lỗi
- 2 JSON file tồn tại, mỗi file >100 entries
- Random check: STT 195 (Mall) phải có cap1="Điện Thoại & Phụ Kiện", phiCoDinh=0.126
- Logo accessible tại `/betacomlogo.png`

## Risks

- xlsx parse cell có DUMMYFUNCTION → dùng `data_only` workaround hoặc đọc sheet bằng python rồi paste cứng
- Sheet structure thay đổi → assert column header trước khi parse

## Next Steps

→ Phase 02: Build calc engine dùng JSON này
