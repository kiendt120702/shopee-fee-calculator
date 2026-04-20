# Deployment Guide

## Production environment

| Item | Value |
|---|---|
| Hosting | Vercel (Hobby plan, free) |
| Project | `kiendt120702s-projects/shopee-fee-calculator` |
| Project ID | `prj_iIp0ZwKTZz7AYgt4VA3AI7ze04sA` |
| Production URL | https://shopee-fee-calculator.vercel.app |
| GitHub repo | https://github.com/kiendt120702/shopee-fee-calculator |
| Branch | `main` |
| Root Directory | `web` |
| Framework | Next.js (auto-detect) |
| Node version | 22.x |
| Region | `iad1` (Washington, D.C.) |

## Auto-deploy pipeline

```
git push origin main
       ↓
GitHub webhook → Vercel
       ↓
Vercel build (Root: web/, ~45s)
  - npm install
  - next build
  - Static generation (6 routes)
       ↓
Deploy to production
       ↓
CDN invalidate
```

Mỗi `git push` lên `main` → auto-deploy production. Không cần CLI manual.

## Manual deploy (CLI fallback)

```bash
cd web
vercel deploy --prod
```

Vercel CLI đã linked vào project (file `web/.vercel/project.json`). Login `kiendt120702` qua GitHub OAuth.

## Environment variables

| Key | Value | Where |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://shopee-fee-calculator.vercel.app` | Vercel Project Env Vars (production) |

Khi đổi production URL → update env var → redeploy. Sitemap, robots, OG image đều dùng env này.

## Settings checklist (Vercel dashboard)

### Settings → Build and Deployment
- ✅ **Root Directory**: `web`
- ✅ **Include files outside the root directory**: Enabled
- ✅ **Framework Preset**: Next.js
- ✅ **Build Command**: default (`next build`)
- ✅ **Install Command**: default
- ✅ **Output Directory**: default

### Settings → Git
- ✅ Connected: `kiendt120702/shopee-fee-calculator`
- ✅ Production Branch: `main`
- ✅ Pull Request Comments: Enabled

### Settings → Deployment Protection
- ✅ Vercel Authentication: **Disabled** (public access required)
- ✅ Password Protection: Disabled

## Update data (khi Shopee đổi phí)

```bash
# 1. Update Excel file ở root
# 2. Re-generate JSON
cd web
npm run convert-data

# 3. Verify
npm test
npm run build

# 4. Commit + push → auto-deploy
git add lib/data/
git commit -m "feat: update Shopee fee schedule YYYY-MM-DD"
git push
```

## Custom domain (optional, future)

User Betacom có sẵn 3 domain: `dtkien.tech`, `betacom.agency`, `betacom.site`.

Để attach subdomain (vd `tinhphi.betacom.agency`):

```bash
cd web
vercel domains add tinhphi.betacom.agency shopee-fee-calculator
```

Hoặc qua dashboard:
1. Settings → Domains → Add
2. Nhập subdomain
3. DNS đã trỏ về Vercel (vì domain registered qua Vercel)
4. Active ngay (~1 phút)

Sau khi active:
1. Update env `NEXT_PUBLIC_SITE_URL` → new domain
2. Redeploy production
3. Update sitemap submit lên Google Search Console

## Rollback

Vercel dashboard → Deployments → tìm deployment cũ working → click `...` → **"Promote to Production"**. Instant rollback, không cần rebuild.

CLI alternative:
```bash
vercel rollback <deployment-url>
```

## Monitoring

| Tool | URL | Note |
|---|---|---|
| Analytics | Vercel project → Analytics tab | Pageview, top pages, country, device |
| Speed Insights | Vercel project → Speed Insights tab | Core Web Vitals (LCP, CLS, INP) |
| Build Logs | Vercel project → Deployments → click | Check khi build fail |
| GitHub Actions | (chưa có) | Có thể thêm khi cần CI test |

## Common issues

| Issue | Cause | Fix |
|---|---|---|
| 404 trên domain chính | SSO Protection ON | Settings → Deployment Protection → Disable Vercel Authentication |
| Build fail "Root Directory does not exist" | CLI deploy đã upload sai folder | Settings → Root Directory = `web` (không slash) |
| `NEXT_PUBLIC_SITE_URL` không apply | Chưa redeploy sau khi set | Deployments → Redeploy production |
| OG image lỗi sau đổi domain | Cache Facebook | Dùng https://developers.facebook.com/tools/debug/ scrape lại |
| Vercel Analytics > 2.5k events/tháng | Vượt free tier | Upgrade Pro $20/tháng hoặc switch Plausible |
