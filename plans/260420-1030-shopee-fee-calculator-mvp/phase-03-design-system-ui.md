# Phase 03 — Design system + UI components (Bento)

**Priority**: High
**Status**: pending
**Effort**: 1 ngày
**Depends on**: Phase 01

## Overview

Build design system theo branding Betacom (đỏ #E63027) + style Minimalism + Bento grid. Generate base components qua skill `ui-ux-pro-max`. Setup shadcn primitives + custom calculator components.

## Key Insights

- Logo Betacom: 2 ngọn núi đỏ, rounded corners → match radius lg (12px) trong UI
- Bento grid: chia màn hình thành các ô có shadow nhẹ, border radius, padding rộng
- Mobile-first: stack dọc trên mobile, grid 2-3 cột trên desktop
- Số liệu dùng JetBrains Mono, dễ scan

## Requirements

**Functional**:
- Theme tokens: colors, typography, spacing, radius, shadow
- Shadcn primitives: Button, Input, Select, Card, Badge, Tabs, Switch, Tooltip, Toaster
- Custom: BentoCard wrapper, MoneyInput (format VND auto), PercentInput, CategoryCascader
- Header với logo Betacom + nav (Mall / Thường)
- Footer credit Betacom

**Non-functional**:
- WCAG AA contrast ≥ 4.5:1
- Mobile 320px+, desktop 1280px+
- Reduced motion respect

## Architecture

```
app/
├── globals.css             # CSS vars (Betacom palette)
├── layout.tsx              # Header + main + footer
components/
├── ui/                     # shadcn primitives (auto-generated)
├── layout/
│   ├── header.tsx
│   └── footer.tsx
├── common/
│   ├── bento-card.tsx
│   ├── money-input.tsx
│   ├── percent-input.tsx
│   ├── category-cascader.tsx
│   └── betacom-logo.tsx
```

## Design Tokens

```css
:root {
  --primary: 4 78% 53%;          /* #E63027 */
  --primary-hover: 4 78% 45%;
  --bg: 0 0% 98%;                /* #FAFAFA */
  --surface: 0 0% 100%;
  --border: 0 0% 90%;
  --text: 0 0% 10%;
  --muted: 220 9% 46%;
  --success: 142 71% 45%;        /* lãi xanh */
  --danger: 0 72% 51%;           /* lỗ đỏ */
  --radius: 0.75rem;             /* 12px */
}
```

Font:
- UI: Inter (next/font/google)
- Mono (số): JetBrains Mono (next/font/google)

## Related Code Files

**Create**: tất cả file trong `components/layout/`, `components/common/`
**Modify**: `app/globals.css`, `app/layout.tsx`

## Implementation Steps

1. Activate skill `ui-ux-pro-max`:
   - Mode: `plan` cho 3 màn hình chính (home, calculator Mall, calculator Thường)
   - Style: Minimalism + Bento
   - Output ASCII wireframe + design tokens
2. Update `tailwind.config.ts` map CSS vars → Tailwind classes
3. Update `app/globals.css` với tokens trên
4. Setup fonts trong `app/layout.tsx` (Inter + JetBrains Mono)
5. Install shadcn components: `npx shadcn@latest add button input select card badge tabs switch tooltip sonner label separator`
6. Build `BetacomLogo` component (next/image với betacomlogo.png)
7. Build `Header`: logo trái, nav giữa (Shop Mall / Shop Thường), mobile burger
8. Build `Footer`: copyright Betacom + link
9. Build `BentoCard`: wrapper Card với heading + children, shadow-sm, padding 6
10. Build `MoneyInput`: input format VND (1,000,000đ) on blur, parse on focus
11. Build `PercentInput`: input + suffix `%`, parse 0-100
12. Build `CategoryCascader`: 3 Select cascading, props mode='mall'|'thuong'
    - State: cap1 → filter cap2 → filter cap3
    - Return phí cố định + selected path
13. Update `app/layout.tsx` mount Header/Footer
14. Update `app/page.tsx` placeholder Bento layout

## Todo List

- [ ] Run ui-ux-pro-max plan để có wireframe
- [ ] Tailwind config + globals.css tokens
- [ ] Setup fonts Inter + JetBrains Mono
- [ ] Install shadcn primitives
- [ ] BetacomLogo component
- [ ] Header + Footer
- [ ] BentoCard
- [ ] MoneyInput + PercentInput
- [ ] CategoryCascader (3 cấp, cascading)
- [ ] Layout mount, page placeholder
- [ ] Test mobile responsive (320, 768, 1280)
- [ ] Lighthouse a11y >90

## Success Criteria

- Design system applied consistently
- Mobile + desktop layout đúng
- Cascader filter cap2/cap3 đúng theo cap1
- MoneyInput hiển thị format VND đúng
- A11y: focus visible, label đầy đủ, contrast pass

## Risks

- Cascader 1000+ rows dropdown lag → dùng `Command` component shadcn (virtualized) hoặc filter khi search
- Logo PNG có thể blur retina → dùng `next/image` với `priority`

## Next Steps

→ Phase 04: Wire UI vào calc engine để có calculator hoạt động
