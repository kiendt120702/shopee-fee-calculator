# Codebase Summary

Monorepo flat structure: code Next.js trong `web/`, data nguồn + plans + docs ở root.

```
.
├── CÔNG THỨC TÍNH GIÁ BÁN SHOPEE MALL + THƯỜNG.xlsx   # Source data
├── betacomlogo.png                                     # Brand logo
├── docs/                                               # Documentation
├── plans/                                              # Implementation plans
└── web/                                                # Next.js app
    ├── app/                                            # App Router routes
    │   ├── layout.tsx                                  # Root layout + metadata + Analytics
    │   ├── page.tsx                                    # Marketing landing
    │   ├── calculator/page.tsx                         # Calculator tool
    │   ├── globals.css                                 # Tailwind + design tokens
    │   ├── opengraph-image.tsx                         # Dynamic OG image (1200×630)
    │   ├── robots.ts                                   # robots.txt generator
    │   └── sitemap.ts                                  # sitemap.xml generator
    ├── components/
    │   ├── ui/                                         # shadcn primitives (button, card, select, ...)
    │   ├── layout/
    │   │   ├── betacom-logo.tsx
    │   │   ├── site-header.tsx
    │   │   └── site-footer.tsx
    │   ├── common/
    │   │   ├── bento-card.tsx                          # Card wrapper với 5 accent colors
    │   │   ├── money-input.tsx                         # VND-formatted input
    │   │   ├── percent-input.tsx                       # 0–100% input
    │   │   ├── searchable-select.tsx                   # Combobox với cmdk
    │   │   └── category-cascader.tsx                   # 3-level category picker
    │   └── calculator/
    │       ├── calculator-shell.tsx                    # Main shell + state management
    │       ├── use-calculator.ts                       # Calc state hook
    │       ├── mode-toggle.tsx                         # Mall/Thuong dropdown
    │       ├── input-form.tsx                          # Form chính + advanced params
    │       ├── result-table.tsx                        # 4-scenario compare table
    │       ├── reverse-calc-card.tsx                   # Target profit → suggested price
    │       ├── share-button.tsx                        # Copy URL with state
    │       └── history-list.tsx                        # localStorage history
    ├── hooks/
    │   └── use-history.ts                              # History state hook
    ├── lib/
    │   ├── types.ts                                    # Category, ShopMode types
    │   ├── format.ts                                   # VND, percent formatters + parsers
    │   ├── url-state.ts                                # CalcInput ↔ URLSearchParams encode/decode
    │   ├── history-storage.ts                          # localStorage CRUD
    │   ├── analytics.ts                                # Vercel Analytics wrapper
    │   ├── utils.ts                                    # cn() helper (shadcn)
    │   ├── calc/
    │   │   ├── types.ts                                # CalcInput, ScenarioResult, CalcResult
    │   │   ├── shared.ts                               # Constants + DEFAULTS_MALL/THUONG + helpers
    │   │   ├── scenario.ts                             # calcScenario() — single scenario
    │   │   ├── index.ts                                # calc() — all 4 scenarios + findBest
    │   │   ├── category-lookup.ts                      # JSON lookup helpers
    │   │   ├── reverse-solver.ts                       # Binary search target profit %
    │   │   └── __tests__/                              # Vitest specs (17 tests)
    │   └── data/
    │       ├── categories-mall.json                    # 1.314 categories Shopee Mall
    │       └── categories-thuong.json                  # 1.314 categories Shop Thường
    ├── public/
    │   └── betacomlogo.png
    └── scripts/
        └── convert-excel.ts                            # XLSX → JSON one-time conversion
```

## Module boundaries

- **`lib/calc/`** — Pure functions, zero React, zero side effects. Unit testable.
- **`lib/data/`** — Static JSON, immutable at runtime. Re-generate via `npm run convert-data`.
- **`components/ui/`** — shadcn primitives, KHÔNG sửa trực tiếp.
- **`components/common/`** — Reusable input controls, không có business logic.
- **`components/calculator/`** — Calculator-specific. State quản lý qua `useCalculator` + local state.
- **`app/`** — Routes. Page là Server Component, Calculator wrapper là `"use client"`.

## Data flow

```
[user input] → useCalculator hook → setInput → calc() → result memoized
       ↓                                              ↓
[URL params] ← encodeToParams ← state          [4 ScenarioResult]
       ↓                                              ↓
[localStorage history]                          [ResultTable render]
```

## Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Static | Marketing landing (hero + features + FAQ + CTA) |
| `/calculator` | Static | CalculatorShell (form + results + history) |
| `/sitemap.xml` | Static | SEO sitemap |
| `/robots.txt` | Static | Crawler rules |
| `/opengraph-image` | Static | OG image 1200×630 cho social share |

Tất cả static, prerender ahead of time → performance tối ưu.

## Tests

- `lib/calc/__tests__/scenario.test.ts` — Mall/Thuong formulas, edge cases (8 tests)
- `lib/calc/__tests__/category-lookup.test.ts` — JSON lookup helpers (6 tests)
- `lib/calc/__tests__/reverse-solver.test.ts` — Binary search (3 tests)

Run: `npm test`. Hiện tại **17/17 pass**.
