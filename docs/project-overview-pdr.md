# Project Overview — Tính Phí Sàn Shopee (Betacom)

## Mục tiêu

Công cụ web miễn phí giúp **seller Shopee Việt Nam** định giá đúng và biết trước lợi nhuận trước khi niêm yết sản phẩm. Tính chính xác toàn bộ phí Shopee 2026 (cố định, thanh toán, voucher Xtra, Pi Ship, thuế HKD) cho 2 mode: **Shopee Mall** và **Shopee Thường**.

## Đối tượng

- Seller cá nhân/HKD đang bán trên Shopee Thường
- Shop chính hãng Shopee Mall
- Người mới setup shop, chưa biết tính giá vốn-bán-lãi
- Kế toán shop cần verify số liệu

## Pain points giải quyết

1. Công thức Shopee có nhiều phí ẩn (cố định theo ngành, voucher Xtra cap 50k, phí ship hoàn theo tỉ lệ) → seller dễ tính sai → bán lỗ
2. Bảng phí Shopee thay đổi định kỳ → file Excel cá nhân không update kịp
3. Khó so sánh nhanh "có/không Voucher Xtra × có/không Pi Ship" để chọn phương án tối ưu

## Tính năng chính

- **Calculator 2 mode**: chuyển đổi Shopee Mall ↔ Shopee Thường qua dropdown
- **So sánh 4 kịch bản** song song: KĐK / Voucher Xtra × Có / Không Pi Ship
- **Reverse calc**: nhập % lợi nhuận mong muốn → ra giá bán đề xuất (binary search)
- **Cascader ngành hàng 3 cấp**: 1.314 ngành mỗi mode, có search tiếng Việt có dấu
- **Lock phí cố định**: phí Shopee quy định read-only, chỉ tham số shop tự cấu hình mới chỉnh được
- **Share URL**: copy link kèm full state (giá, ngành, tham số) cho đồng nghiệp/kế toán
- **Lịch sử**: lưu localStorage 20 entry, gồm cả Mall + Thường

## Non-goals (MVP)

- Auth/login (public tool, maximize traffic)
- Database backend (data tĩnh JSON)
- Dark mode (Phase sau)
- i18n (chỉ tiếng Việt)
- Premium features / payment
- Native mobile app
- Tích hợp Shopee Open API (read-only sản phẩm thật)

## Constraints

- **Branding**: Đỏ Betacom `#E63027` + logo Betacom
- **Stack**: Next.js 16 + React 19 + Tailwind 4 + shadcn/ui (cố định, không thay)
- **Hosting**: Vercel free tier (Hobby plan)
- **Data update**: Khi Shopee đổi phí → re-run `convert-excel.ts` + redeploy

## Source of truth

- File Excel gốc: `CÔNG THỨC TÍNH GIÁ BÁN SHOPEE MALL + THƯỜNG.xlsx` (root project)
- 1.314 ngành × 2 mode đã extract → `web/lib/data/categories-{mall,thuong}.json`
- Công thức tham chiếu Shopee 2026
