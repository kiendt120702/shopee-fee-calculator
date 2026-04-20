# Phase 06 — Analytics + SEO + deploy Vercel

**Priority**: High
**Status**: pending
**Effort**: 0.5 ngày
**Depends on**: Phase 05

## Overview

Cài Vercel Analytics + Speed Insights, tối ưu SEO tiếng Việt, custom event tracking, deploy lên Vercel free tier với subdomain.

## Requirements

**Functional**:
- Vercel Analytics track pageviews tự động per route
- Vercel Speed Insights track Core Web Vitals
- Custom events: `calc_used`, `mode_switched`, `reverse_calc_used`, `share_clicked`, `history_restored`
- Sitemap + robots.txt auto generate
- OG image cho social share
- Schema.org WebApplication
- Metadata tiếng Việt cho mỗi route

**Non-functional**:
- Lighthouse Performance >90, SEO >95, A11y >90, Best Practices >95
- Build time <2 phút trên Vercel

## Architecture

```
app/
├── layout.tsx                # metadata + Analytics + SpeedInsights
├── sitemap.ts                # generate sitemap
├── robots.ts                 # robots.txt
├── opengraph-image.tsx       # OG dynamic
├── mall/page.tsx             # metadata riêng
├── thuong/page.tsx           # metadata riêng
lib/
├── analytics.ts              # wrapper track() events
```

## Implementation Steps

1. Cài: `npm i @vercel/analytics @vercel/speed-insights` (đã làm Phase 01, verify)
2. Mount trong `app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   import { SpeedInsights } from '@vercel/speed-insights/next';
   // <Analytics /> <SpeedInsights />
   ```
3. Metadata root `layout.tsx`:
   ```ts
   export const metadata: Metadata = {
     metadataBase: new URL('https://YOUR-SUBDOMAIN.vercel.app'),
     title: { default: 'Tính Phí Sàn Shopee 2026 — Betacom', template: '%s | Betacom' },
     description: 'Công cụ tính phí Shopee Mall & Thường miễn phí. Tính lợi nhuận, phí cố định, phí thanh toán, voucher, Pi Ship, thuế HKD chính xác theo công thức Shopee 2026.',
     keywords: ['tính phí shopee', 'phí shopee mall', 'phí shopee thường', 'tính lợi nhuận shopee', 'pi ship', 'voucher xtra'],
     openGraph: { type: 'website', locale: 'vi_VN', siteName: 'Tính Phí Shopee — Betacom' },
     icons: { icon: '/betacomlogo.png' },
   };
   ```
4. Per-route metadata cho `/mall`, `/thuong` (title + description riêng)
5. `lib/analytics.ts`:
   ```ts
   import { track } from '@vercel/analytics';
   export const analytics = {
     calcUsed: (mode: string) => track('calc_used', { mode }),
     modeSwitched: (from: string, to: string) => track('mode_switched', { from, to }),
     reverseCalcUsed: () => track('reverse_calc_used'),
     shareClicked: () => track('share_clicked'),
     historyRestored: () => track('history_restored'),
   };
   ```
6. Wire `analytics.*` vào components tương ứng (debounce calcUsed 1s)
7. `app/sitemap.ts`:
   ```ts
   export default function sitemap(): MetadataRoute.Sitemap {
     return [
       { url: '/', priority: 1, changeFrequency: 'weekly' },
       { url: '/mall', priority: 0.9 },
       { url: '/thuong', priority: 0.9 },
     ];
   }
   ```
8. `app/robots.ts`:
   ```ts
   export default function robots(): MetadataRoute.Robots {
     return { rules: [{ userAgent: '*', allow: '/' }], sitemap: 'https://YOUR.vercel.app/sitemap.xml' };
   }
   ```
9. `app/opengraph-image.tsx` — generate OG image 1200x630 với logo + tagline
10. Schema.org JSON-LD trong layout:
    ```tsx
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Tính Phí Shopee',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0' },
    })}} />
    ```
11. Run Lighthouse local → fix issues
12. Push lên GitHub → connect Vercel → deploy
13. Verify: pageview hiện trong dashboard Vercel Analytics
14. Submit sitemap lên Google Search Console (manual)

## Todo List

- [ ] Verify Vercel Analytics + Speed Insights installed
- [ ] Mount Analytics + SpeedInsights vào layout
- [ ] Root metadata VN
- [ ] Per-route metadata
- [ ] lib/analytics.ts wrapper
- [ ] Wire custom events vào UI
- [ ] sitemap.ts
- [ ] robots.ts
- [ ] opengraph-image.tsx
- [ ] Schema.org JSON-LD
- [ ] Lighthouse audit + fix
- [ ] Push GitHub repo
- [ ] Connect Vercel + deploy
- [ ] Verify analytics live
- [ ] Submit sitemap GSC

## Success Criteria

- Vercel build pass, deploy live
- Truy cập subdomain hoạt động
- Lighthouse: Perf >90, SEO >95, A11y >90, Best Practices >95
- Analytics dashboard ghi nhận pageview trong 5 phút sau deploy
- Custom events `calc_used` xuất hiện sau khi dùng tool
- OG image render đúng khi share Facebook (test với Sharing Debugger)

## Risks

- Subdomain Vercel có thể bị Shopee/seller block → cân nhắc custom domain sớm
- Vercel Analytics free tier 2.5k events/tháng → monitor, switch Plausible nếu vượt
- OG image generation có thể chậm cold start → static OG image fallback

## Next Steps

- Phase 7 (post-MVP): custom domain, dark mode, premium features (export Excel, batch calc, save cloud)
- Marketing: SEO content, share trong group seller Shopee
