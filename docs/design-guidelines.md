# Design Guidelines

## Brand

- **Name**: Tính Phí Shopee · Betacom
- **Owner**: Betacom IT
- **Logo**: 2 đỉnh núi đỏ rounded, file `betacomlogo.png` (1024×1024 PNG, transparent bg)

## Color tokens (OKLCH)

Định nghĩa trong `web/app/globals.css` `:root`:

| Token | OKLCH | Hex approx | Use |
|---|---|---|---|
| `--primary` | `oklch(0.58 0.215 27)` | `#E63027` | CTA, accent, brand |
| `--primary-hover` | `oklch(0.5 0.22 25)` | `#C8261F` | Hover state |
| `--background` | `oklch(0.99 0 0)` | `#FCFCFC` | Page bg |
| `--card` | `oklch(1 0 0)` | `#FFFFFF` | Card surface |
| `--foreground` | `oklch(0.18 0 0)` | `#1A1A1A` | Body text |
| `--muted-foreground` | `oklch(0.5 0 0)` | `#7F7F7F` | Secondary text |
| `--border` | `oklch(0.92 0 0)` | `#EAEAEA` | Border, divider |
| `--success` | `oklch(0.62 0.18 145)` | `#1AAA5C` | Profit, positive |
| `--destructive` | `oklch(0.6 0.22 25)` | `#DC2626` | Loss, error |
| `--accent` | `oklch(0.96 0.02 25)` | `#FBF1F1` | Subtle accent bg |

**Background gradient** (toàn site): 3 radial blobs pastel (đỏ-cam góc trái, vàng góc phải, xanh đáy).

## Typography

- **Sans**: Inter (next/font/google, latin + vietnamese subset)
- **Mono** (số liệu): JetBrains Mono
- **Weights**: 400, 500, 600, 700, 800 (heading)
- **Tracking**: `tracking-tight` cho heading, default cho body
- **Font-feature**: `tabular-nums` cho mọi số trong table/result để align cột

### Type scale

| Element | Mobile | Desktop |
|---|---|---|
| Hero h1 | `text-4xl` | `text-6xl` |
| Section h2 | `text-3xl` | `text-4xl` |
| Card title | `text-base font-semibold` | `text-base font-semibold` |
| Body | `text-sm` | `text-base` |
| Caption | `text-xs` | `text-xs` |

## Spacing

- **Border radius**: `--radius: 0.75rem` (12px) — match logo style bo tròn
- **Card padding**: `p-4` mobile / `p-5` sm / `p-6` lg (progressive)
- **Section padding**: `py-16 sm:py-20 lg:py-24`
- **Gap grid**: `gap-4 sm:gap-5`

## Components patterns

### BentoCard (`components/common/bento-card.tsx`)

5 accent variants với subtle gradient:

| Variant | Use case |
|---|---|
| `default` | Lịch sử, neutral content |
| `primary` (đỏ) | Thông tin sản phẩm — input chính |
| `warning` (vàng-cam) | Tham số nâng cao |
| `success` (xanh lá) | Kết quả lợi nhuận |
| `info` (xanh dương) | Tính ngược (reverse calc) |

### Inputs

- **MoneyInput**: format VND `1,000,000đ`, suffix `đ` absolute right
- **PercentInput**: type text + suffix `%`, parse 0–100 → 0.0–1.0
- **SearchableSelect**: combobox shadcn (Popover + cmdk), search Vietnamese diacritic-insensitive
- **CategoryCascader**: 3 SearchableSelect xếp dọc, cap2 disabled khi chưa chọn cap1

### ResultTable

- 5 cột: label + 4 scenario
- Header 2 dòng: line1 (Không ĐK / Voucher Xtra) bold + line2 (Có/Không Pi Ship) nhỏ
- Best scenario: tô nền xanh `oklch(0.92 0.1 145)` + Badge "Tối ưu"
- Hàng "LỢI NHUẬN": nền xanh nhạt full-row, profit dương xanh đậm bold, âm đỏ
- Hàng "Tổng phí Shopee" + "Tổng chi phí": nền xám muted
- Mobile: horizontal scroll + sticky cột "Khoản mục"

## Responsive breakpoints

Tailwind defaults:

| Breakpoint | Width | Use |
|---|---|---|
| (mobile) | <640px | 1 cột stack, tighter padding |
| `sm:` | ≥640px | Tablet portrait, 2 cột inline |
| `md:` | ≥768px | Tablet landscape |
| `lg:` | ≥1024px | Desktop, layout 2 cột (form/result) |

**Mobile-first** luôn — viết base style cho mobile, override với `sm:` `lg:` cho lớn hơn.

## Accessibility

- Contrast WCAG AA ≥4.5:1 (đã verify với primary đỏ trên white)
- Focus visible: `focus-visible:ring-3 focus-visible:ring-ring/50`
- Label đầy đủ cho mọi input (`<Label htmlFor>`)
- ARIA cho custom controls (radio group, combobox)
- Reduced motion: animations dùng `@keyframes`, respect `prefers-reduced-motion` (default Tailwind)

## Animations

- **Subtle**: hover translate `-translate-y-1`, shadow lift, color transition `transition`
- **Loud** (chỉ landing): hero badge ping, gradient text
- KHÔNG entrance animation cho UI dùng nhiều (calculator) — gây mệt

## Branding placement

- **Logo header**: 32px (mobile) / 32px desktop, link về `/`
- **Logo footer**: KHÔNG có (chỉ text "By Betacom IT" đỏ)
- **Logo CTA section** landing: 48px trắng overlay trên gradient đỏ
- **Favicon**: `/betacomlogo.png` (Next sẽ optimize)
- **OG image**: 1200×630 generated từ `app/opengraph-image.tsx`, có logo + tagline

## Voice & tone

- **Tiếng Việt thuần**, không lai Anglicism
- Câu ngắn, dùng "bạn" thay "quý khách"
- Số liệu: dùng đơn vị Việt (1.000đ thay $1,000)
- Giọng confident, không marketing fluff ("Hàng nghìn seller đã tin dùng" KHÔNG dùng vì chưa verify)
- CTA action verb: "Tính ngay", "Mở công cụ", "Bắt đầu"
