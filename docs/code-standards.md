# Code Standards

## Principles

- **YAGNI** (You Aren't Gonna Need It): Không build feature/abstraction cho future hypothesis
- **KISS** (Keep It Simple, Stupid): Calculator tool — chọn pattern đơn giản nhất chạy được
- **DRY** (Don't Repeat Yourself): Extract khi 3+ chỗ trùng, không phải 2

## Languages & Versions

- **TypeScript** strict mode (`tsconfig.json` có `strict: true`)
- **Node.js** ≥22 LTS
- **React** 19, **Next.js** 16 (App Router + Turbopack)
- **Tailwind** v4 (CSS-first config qua `@theme inline`)

## File naming

- **Kebab-case** cho mọi file: `mode-toggle.tsx`, `reverse-solver.ts`
- File tên dài + descriptive OK — LLM/grep tools dễ tìm
- `__tests__/` folder cho test files, suffix `.test.ts`

## File size

- Code file ≤200 lines (soft limit)
- Vượt → tách module theo logical separation:
  - Component lớn → tách presentation + hook
  - Logic file → tách theo domain (vd: `scenario.ts` riêng `index.ts` riêng)
- Markdown/JSON/config: không giới hạn

## TypeScript

- **Interface > Type alias** cho object shapes
- **Type alias** cho union/intersection
- Export types từ `lib/calc/types.ts` (single source)
- Tránh `any` → dùng `unknown` + narrow
- Strict null checks: chỉ optional khi có lý do

```ts
// ✓ Good
export interface CalcInput {
  giaNhap: number;
  giaBan: number;
  // ...
}
export type ShopMode = "mall" | "thuong";

// ✗ Bad
type CalcInput = { ... }  // dùng interface
const x: any = ...        // không dùng any
```

## React

- **Server Components mặc định**, chỉ thêm `"use client"` khi cần `useState`/`useEffect`/event handler
- Client boundary đặt **càng sâu càng tốt** — landing page có thể giữ Server, chỉ wrap Calculator
- Memo qua `useMemo` cho expensive calc (vd `calc(input)`)
- KHÔNG dùng `useCallback` trừ khi prop chuyền vào memoized child
- Component name: PascalCase, file name: kebab-case match

## State management rules

- Local state (useState) → ưu tiên
- Custom hook → khi state + side effect cần reuse
- Lift state up → khi 2+ siblings cần share
- Context → KHÔNG dùng cho calculator (overkill)
- Global store (Zustand/Redux) → CẤM trong project này

## CSS / Styling

- **Tailwind utility-first**, KHÔNG viết CSS module
- Design token → dùng CSS variable trong `globals.css`, expose qua Tailwind:
  ```css
  :root { --primary: oklch(0.58 0.215 27); }
  ```
- Dùng `cn()` từ `lib/utils.ts` để merge class
- Responsive: mobile-first, breakpoint chuẩn `sm: md: lg: xl:`
- KHÔNG inline style trừ khi dynamic value (vd progress bar width)

## Imports

- Absolute import qua `@/` alias (config trong `tsconfig.json`)
- Order: external → internal absolute → relative → types → CSS
- Không có blank line giữa nhóm

```ts
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { calc } from "@/lib/calc";

import { useCalculator } from "./use-calculator";

import type { ShopMode } from "@/lib/types";
```

## Error handling

- Pure calc functions: KHÔNG throw, return `null` hoặc default
- Storage operations (`localStorage`): wrap try/catch, silent ignore
- User-facing errors: dùng `sonner` toast (`toast.error(...)`)
- KHÔNG throw lên React render — sẽ crash page

## Comments

- Default: KHÔNG comment
- Chỉ comment WHY, không comment WHAT
- Edge case workaround → comment ngắn 1 dòng
- KHÔNG dùng JSDoc trừ khi function được consume rộng

## Tests

- **Vitest** + jsdom-free (chỉ test pure functions)
- Test file co-locate trong `__tests__/` cạnh source
- Test pattern: `describe + it`, không dùng `test`
- Tolerance numeric ±1đ (rounding)
- Fixture đối chiếu Excel để verify công thức

## Git

- Branch: `main` (không có develop/staging)
- Commit message: **Conventional Commits**
  - `feat:` new feature
  - `fix:` bug fix
  - `refactor:` rewrite không đổi behavior
  - `chore:` tooling/cleanup
  - `docs:` chỉ docs (KHÔNG dùng cho `.claude/`)
- KHÔNG mention AI/Claude/Cursor trong commit message
- KHÔNG `--no-verify` skip hooks

## Lint / Format

- ESLint config từ `eslint-config-next`
- Không có Prettier — Tailwind class order tự manage
- Pre-commit: `npm test` + `npm run build`

## Forbidden

- ❌ `console.log` trong production code (test/script OK)
- ❌ `useEffect` cho derived state — dùng `useMemo`
- ❌ Inline arrow function trong JSX prop nếu có closure dependency
- ❌ Mock data trong component (data từ JSON tĩnh)
- ❌ Sensitive info trong git (API key, .env)
- ❌ Dependency thừa — kiểm `package.json` định kỳ
