# Project Roadmap

## Phase 1 — MVP (✅ COMPLETED 2026-04-20)

| Item | Status |
|---|---|
| Setup Next.js 16 + Tailwind 4 + shadcn/ui | ✅ |
| Convert Excel → JSON (1.314 categories × 2 mode) | ✅ |
| Calc engine (Mall + Thường, 4 scenarios) + 17 unit tests | ✅ |
| Bento UI với branding đỏ Betacom | ✅ |
| Calculator page với input form + result table | ✅ |
| Reverse calc (target profit % → sell price) | ✅ |
| SearchableSelect cho 3-cấp ngành hàng | ✅ |
| Lock phí Shopee cố định (read-only) | ✅ |
| URL share + localStorage history | ✅ |
| Marketing landing page tại `/` | ✅ |
| Mobile responsive | ✅ |
| Deploy Vercel + auto-deploy từ GitHub | ✅ |

**Live**: https://shopee-fee-calculator.vercel.app

## Phase 2 — Polish & Validate (planned)

- [ ] Custom domain (vd `tinhphi.betacom.agency`)
- [ ] Submit sitemap Google Search Console
- [ ] Verify analytics tracking đầy đủ
- [ ] User testing với 5-10 seller thật, thu feedback
- [ ] Fix UX issue từ feedback
- [ ] Lighthouse audit + fix nếu <90
- [ ] OG image preview test trên Facebook + Zalo

## Phase 3 — Growth features (post-validation)

- [ ] **Export Excel**: download bảng compare 4 scenarios
- [ ] **Batch calc**: upload list sản phẩm CSV, tính hàng loạt
- [ ] **Profit chart**: visualize lợi nhuận theo range giá bán
- [ ] **Compare history**: side-by-side 2-3 entries trong lịch sử
- [ ] **Save preset tham số**: lưu config QC/voucher/thuế cho từng shop
- [ ] **Dark mode**

## Phase 4 — Premium tier (nếu MVP đủ traction)

- [ ] Auth (Google OAuth qua Better Auth hoặc Clerk)
- [ ] Cloud sync history qua Postgres (Neon free tier)
- [ ] Multi-shop workspace
- [ ] Subscription billing qua SePay/Stripe
- [ ] Pricing: free unlimited basic + premium 99k/tháng

## Phase 5 — Ecosystem (long-term)

- [ ] Tool tính phí sàn TikTok Shop
- [ ] Tool tính phí sàn Lazada
- [ ] Multi-platform fee comparator (1 sản phẩm × N sàn → so sánh ROI)

## Maintenance cycle

- **Hàng tháng**: check Shopee có thay đổi phí không. Nếu có → update Excel + re-run convert script + redeploy
- **Quarterly**: review Vercel Analytics, optimize top-bounce pages
- **Annually**: dependencies upgrade (Next.js, React, Tailwind)

## Success metrics (MVP → 6 tháng)

| Metric | Target |
|---|---|
| Unique visitors / tháng | 3.000 |
| Bounce rate | <55% |
| Avg session duration | >2 phút |
| Calc events / session | >3 |
| Lighthouse Performance | >90 |
| Lighthouse SEO | >95 |
| Số ngành seller dùng | >100 |

## Tracking decisions

Mỗi lần đổi major (vd thêm route mới, đổi data structure, breaking change) → ghi vào file changelog mới (`docs/project-changelog.md` — sẽ tạo khi cần).

Hiện tại MVP chưa có user thật → roadmap có thể pivot dựa trên feedback giai đoạn Phase 2.
