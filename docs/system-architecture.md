# System Architecture

## Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     User Browser                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Next.js 16 App (static SSG)                       │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────┐      │  │
│  │  │ /calculator (Client)                      │      │  │
│  │  │                                            │      │  │
│  │  │  CalculatorShell                          │      │  │
│  │  │    ├─ useCalculator (state)              │      │  │
│  │  │    ├─ useHistory (localStorage)          │      │  │
│  │  │    ├─ URL params sync                    │      │  │
│  │  │    └─ lib/calc/ (pure functions)         │      │  │
│  │  └──────────────────────────────────────────┘      │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────┐      │  │
│  │  │ lib/data/ (bundled JSON — 1314×2 rows)   │      │  │
│  │  └──────────────────────────────────────────┘      │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                         ↕
          ┌─────────────────────────────┐
          │  Vercel CDN (static assets) │
          │  + @vercel/analytics        │
          │  + @vercel/speed-insights   │
          └─────────────────────────────┘
                         ↑
                    git push main
                         │
          ┌─────────────────────────────┐
          │  GitHub (source of truth)   │
          │  kiendt120702/shopee-fee... │
          └─────────────────────────────┘
```

## Layers

### 1. Presentation (React)
- **App Router** pages (Server Components mặc định)
- **Client boundary**: chỉ `CalculatorShell` và descendants là `"use client"` để dùng `useState`, `useEffect`
- shadcn/ui (base-ui under the hood) primitives cho form controls
- Tailwind v4 với OKLCH design tokens trong `globals.css`

### 2. State management
- **Local state** (useState) trong `CalculatorShell` — single source cho `mode`, `category`
- **Custom hook** `useCalculator(mode)` — wrap `calc()` với `useMemo`
- **Custom hook** `useHistory()` — localStorage sync, 20 entry max
- **URL state** — `?mode=...&gb=...&c1=...` encoded qua `lib/url-state.ts`, hydrate after mount để tránh SSR mismatch
- KHÔNG dùng Zustand/Redux/Context — quá overkill cho calculator

### 3. Business logic (pure)
- `lib/calc/scenario.ts` — 1 scenario calculation
- `lib/calc/index.ts` — orchestrate 4 scenarios + find best
- `lib/calc/reverse-solver.ts` — binary search target profit % → sell price
- `lib/calc/category-lookup.ts` — JSON lookup với Set dedup + Vietnamese sort
- Zero dependencies ngoài TypeScript

### 4. Data
- **Static JSON**: `categories-mall.json` (1314 rows) + `categories-thuong.json` (1314 rows)
- Generated once từ Excel qua `scripts/convert-excel.ts`
- Bundle size gzip ~80KB → acceptable cho static bundle

### 5. External services
- **Vercel Analytics**: pageview + custom events (`calc_used`, `mode_switched`, `reverse_calc_used`, `share_clicked`, `history_restored`)
- **Vercel Speed Insights**: Core Web Vitals
- KHÔNG có backend API — 100% client-side calc

## Deployment pipeline

```
Local dev (npm run dev)
      ↓
git push origin main
      ↓
GitHub webhook → Vercel
      ↓
Vercel build (Root Directory = web/)
  npm install → next build → static output
      ↓
Deploy production: shopee-fee-calculator.vercel.app
      ↓
Auto-invalidate CDN
```

Build time: ~45s (bao gồm install + Next build + static gen). Không có server function, không có ISR.

## Security

- 100% static site → không có attack surface từ backend
- Không thu thập PII, không có form submit lên server
- CSP inherit Vercel defaults
- localStorage: data không sensitive (giá nhập/bán sản phẩm của seller)

## Performance targets

- LCP <2s mobile 4G
- CLS <0.1
- Lighthouse: Perf >90, SEO >95, A11y >90

## Scale

Hobby plan Vercel:
- Bandwidth 100GB/tháng
- 100k request/ngày
- Analytics 2.5k events/tháng

Hoàn toàn đủ cho lead-gen traffic dự kiến (~3k visitor/tháng đầu). Khi vượt limit → nâng Pro ($20/tháng) hoặc switch Plausible.
