---
title: Shopee Fee Calculator Website (Betacom)
status: completed
created: 2026-04-20
owner: Betacom
mode: auto
blockedBy: []
blocks: []
---

# Shopee Fee Calculator Website — MVP Plan

Website công cụ miễn phí cho seller Shopee tính phí + lợi nhuận, kèm reverse calc và analytics traffic. Build bằng Next.js 15, deploy Vercel, branding Betacom (đỏ #E63027).

## Goals

- Tái hiện 100% công thức Excel gốc (Shop Mall + Shop Thường)
- UI Minimalism + Bento grid với shadcn/ui, mobile-first
- Reverse calc: nhập % lợi nhuận → giá bán đề xuất
- Share link kết quả qua URL params + lưu lịch sử localStorage
- Đo traffic theo ngày/giờ qua Vercel Analytics
- SEO tốt cho lead-gen Betacom

## Non-Goals (MVP)

- Auth/login
- Database backend
- Dark mode (Phase 4)
- i18n (chỉ tiếng Việt)
- Premium features / payment
- Custom domain (dùng Vercel subdomain)
- Mobile native app

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + shadcn/ui (skill: ui-ux-pro-max + ui-styling)
- Vercel Analytics + Speed Insights
- Static JSON cho data ngành hàng
- Vitest cho unit test công thức
- Deploy: Vercel free tier

## Phases

| # | Phase | Status | Effort | File |
|---|-------|--------|--------|------|
| 01 | Setup project + convert Excel → JSON | completed | 0.5d | [phase-01-setup-and-data.md](phase-01-setup-and-data.md) |
| 02 | Core calc engine (Mall + Thường) + tests | completed | 1d | [phase-02-calc-engine.md](phase-02-calc-engine.md) |
| 03 | Design system + UI components (Bento) | completed | 1d | [phase-03-design-system-ui.md](phase-03-design-system-ui.md) |
| 04 | Calculator pages (Mall + Thường) | completed | 1d | [phase-04-calculator-pages.md](phase-04-calculator-pages.md) |
| 05 | Reverse calc + share URL + history | completed | 0.5d | [phase-05-advanced-features.md](phase-05-advanced-features.md) |
| 06 | Analytics + SEO + deploy Vercel | completed | 0.5d | [phase-06-analytics-seo-deploy.md](phase-06-analytics-seo-deploy.md) |

**Total**: ~4.5 ngày

## Key Dependencies

- xlsx package (one-time conversion)
- shadcn/ui CLI
- @vercel/analytics + @vercel/speed-insights
- Logo file: betacomlogo.png (đã có trong project root)
- Excel source: `CÔNG THỨC TÍNH GIÁ BÁN SHOPEE MALL + THƯỜNG.xlsx`

## Success Criteria

- 100% giá trị tính khớp Excel (test fixtures từ ít nhất 5 case mỗi sheet)
- LCP <2s mobile, Lighthouse >90 cả 4 mục
- Vercel Analytics ghi nhận pageview + custom events
- Share URL hoạt động (paste link → restore state)
- Build pass, no TS errors, no console warning

## Risks

| Risk | Mitigation |
|------|------------|
| Công thức Excel có edge case (vd voucher xtra cap 50k) | Unit test exhaustive, đối chiếu 10+ giá trị |
| 1000+ rows bundle nặng | gzip ~150KB, dynamic import nếu >200KB |
| Shopee đổi % phí | JSON tách riêng, redeploy <5 phút |
| Vercel Analytics free tier 2.5k events | Monitor, switch Plausible nếu vượt |

## Branding

- Primary: `#E63027` (đỏ Betacom)
- Logo: betacomlogo.png — header trái + favicon + OG image
- Font: Inter (UI) + JetBrains Mono (số liệu)
- Style: Minimalism + Bento grid, light mode, radius lg (12px)
