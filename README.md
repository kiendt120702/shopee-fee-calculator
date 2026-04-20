# Tính Phí Sàn Shopee — Betacom

Công cụ web miễn phí cho seller Shopee tính phí, lợi nhuận và so sánh kịch bản đăng ký dịch vụ. Dữ liệu phí cố định cho cả **Shopee Mall** và **Shop Thường** được trích xuất từ bảng phí tham khảo Shopee 2026.

## Cấu trúc dự án

```
.
├── CÔNG THỨC TÍNH GIÁ BÁN SHOPEE MALL + THƯỜNG.xlsx   # Source data
├── betacomlogo.png                                     # Logo brand
├── plans/                                              # Implementation plans
└── web/                                                # Next.js app
```

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Vercel Analytics + Speed Insights
- Vitest cho unit tests
- Static JSON 1.314 ngành hàng × 2 mode

## Local development

```bash
cd web
npm install
npm run dev          # http://localhost:3000
npm test             # Run unit tests
npm run build        # Production build
npm run convert-data # Re-generate JSON từ Excel
```

## Tính năng

- Tính phí Shopee Mall + Shop Thường theo công thức 2026
- So sánh 4 kịch bản: Có/không Voucher Xtra × Có/không Pi Ship
- Tính ngược: nhập % lợi nhuận → ra giá bán đề xuất
- Chia sẻ kết quả qua URL params
- Lưu lịch sử trong trình duyệt (localStorage)
- SEO + sitemap + OG image cho social
- Mobile responsive, branding Betacom

## Deploy

1. Push `web/` lên GitHub repo
2. Connect Vercel, root = `web/`
3. Set env `NEXT_PUBLIC_SITE_URL` = production URL
4. Deploy

## Credits

© Betacom — số liệu mang tính chất ước tính.
