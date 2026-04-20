import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tính Phí Sàn Shopee 2026 — Mall & Shop Thường | Betacom",
  description:
    "Công cụ miễn phí tính phí Shopee Mall và Shop Thường: phí cố định, thanh toán, voucher Xtra, Pi Ship, thuế HKD và lợi nhuận chính xác theo công thức 2026.",
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-[oklch(0.92_0.08_60)]/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[oklch(0.92_0.08_145)]/30 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-24 lg:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Cập nhật theo bảng phí Shopee 2026
        </div>

        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Tính phí sàn Shopee{" "}
          <span className="bg-gradient-to-r from-primary via-[oklch(0.6_0.22_15)] to-[oklch(0.55_0.2_45)] bg-clip-text text-transparent">
            chính xác từng đồng
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg lg:text-xl">
          Nhập giá nhập, giá bán và ngành hàng — công cụ tự động tính lợi
          nhuận, phí cố định, phí thanh toán, voucher Xtra, Pi Ship, thuế HKD
          theo công thức chuẩn cho Shopee Mall và Shop Thường.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/calculator"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:translate-y-[-1px] hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
          >
            Tính ngay miễn phí →
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/50 px-7 text-base font-semibold text-foreground backdrop-blur transition hover:bg-accent"
          >
            Xem cách hoạt động
          </Link>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Không cần đăng ký · Không thu thập dữ liệu · 100% miễn phí
        </p>

        {/* Hero preview card */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-[oklch(0.85_0.12_60)]/30 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-1.5 shadow-2xl shadow-primary/10 backdrop-blur">
              <div className="rounded-2xl bg-gradient-to-br from-card to-muted/30 p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <PreviewStat
                    label="Doanh thu"
                    value="100.000đ"
                    color="text-foreground"
                  />
                  <PreviewStat
                    label="Tổng chi phí"
                    value="34.367đ"
                    color="text-muted-foreground"
                  />
                  <PreviewStat
                    label="Lợi nhuận"
                    value="15.634đ"
                    color="text-[oklch(0.4_0.18_145)]"
                    badge="+15,6%"
                  />
                </div>
                <div className="mt-5 rounded-xl border border-[oklch(0.85_0.12_145)]/30 bg-[oklch(0.96_0.06_145)]/40 px-3 py-2 text-left text-xs">
                  <span className="text-muted-foreground">Phương án tối ưu: </span>
                  <span className="font-semibold text-[oklch(0.4_0.15_145)]">
                    Không ĐK · Có Pi Ship
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewStat({
  label,
  value,
  color,
  badge,
}: {
  label: string;
  value: string;
  color: string;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 text-left">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {badge && (
          <span className="rounded-full bg-[oklch(0.92_0.1_145)] px-2 py-0.5 text-[10px] font-bold text-[oklch(0.35_0.15_145)]">
            {badge}
          </span>
        )}
      </div>
      <div className={`mt-1 font-mono text-xl font-bold tabular-nums ${color}`}>
        {value}
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { value: "1.314", label: "Ngành hàng / mode" },
    { value: "4", label: "Kịch bản so sánh" },
    { value: "2", label: "Loại shop hỗ trợ" },
    { value: "100%", label: "Miễn phí" },
  ];
  return (
    <section className="border-y border-border/40 bg-card/40 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-mono text-2xl font-bold text-primary sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "So sánh 4 kịch bản cùng lúc",
      desc: "Tự động tính song song: có/không Voucher Xtra × có/không Pi Ship — chọn phương án có lợi nhuận cao nhất chỉ trong vài giây.",
      accent: "from-primary/20 to-primary/5",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Tính ngược giá bán",
      desc: "Nhập % lợi nhuận mong muốn → công cụ giải binary search ra giá niêm yết phù hợp. Không còn phải thử-và-sai.",
      accent: "from-[oklch(0.92_0.08_240)]/30 to-transparent",
      iconBg: "bg-[oklch(0.92_0.08_240)]",
      iconColor: "text-[oklch(0.45_0.15_240)]",
    },
    {
      title: "Đầy đủ phí Shopee 2026",
      desc: "Phí cố định (1.314 ngành), phí thanh toán 4.91%, Voucher Xtra (cap 50k), phí hạ tầng, Pi Ship, thuế HKD 1.5%.",
      accent: "from-[oklch(0.92_0.08_145)]/30 to-transparent",
      iconBg: "bg-[oklch(0.92_0.08_145)]",
      iconColor: "text-[oklch(0.4_0.15_145)]",
    },
    {
      title: "Search ngành nhanh",
      desc: "Cascader 3 cấp có search tiếng Việt có dấu — gõ vài ký tự là ra ngành cần tìm trong 1.314 lựa chọn.",
      accent: "from-[oklch(0.92_0.08_75)]/30 to-transparent",
      iconBg: "bg-[oklch(0.92_0.08_75)]",
      iconColor: "text-[oklch(0.5_0.15_60)]",
    },
    {
      title: "Lưu &amp; chia sẻ kết quả",
      desc: "Lịch sử tính lưu trong trình duyệt. Một click sinh link chứa tham số, gửi cho đồng nghiệp/kế toán xem ngay.",
      accent: "from-[oklch(0.92_0.08_300)]/30 to-transparent",
      iconBg: "bg-[oklch(0.92_0.08_300)]",
      iconColor: "text-[oklch(0.45_0.15_300)]",
    },
    {
      title: "Mobile friendly",
      desc: "Dùng được trên điện thoại khi đang setup sản phẩm trên app Shopee Seller. Giao diện gọn, số đậm dễ đọc.",
      accent: "from-[oklch(0.92_0.08_180)]/30 to-transparent",
      iconBg: "bg-[oklch(0.92_0.08_180)]",
      iconColor: "text-[oklch(0.4_0.15_195)]",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Mọi thứ seller Shopee cần
        </h2>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Một công cụ duy nhất để định giá đúng, biết trước lợi nhuận, không bị
          Shopee &quot;ăn&quot; bất ngờ vì nhầm phí.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br ${f.accent} bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-xl text-base font-bold ${f.iconBg} ${f.iconColor}`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {f.title.replace("&amp;", "&")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      n: "1",
      title: "Chọn loại shop",
      desc: "Shopee Mall hay Shop Thường — phí cố định và phí hạ tầng khác nhau, công cụ tự áp đúng công thức.",
    },
    {
      n: "2",
      title: "Nhập giá &amp; ngành hàng",
      desc: "Giá nhập, giá bán Shopee, chọn ngành hàng 3 cấp (có search). Tham số nâng cao có sẵn mặc định.",
    },
    {
      n: "3",
      title: "Xem so sánh 4 kịch bản",
      desc: "Bảng kết quả realtime: phương án nào lợi nhuận tối ưu được tô màu xanh, ra quyết định ngay.",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="border-y border-border/40 bg-gradient-to-br from-muted/30 via-background to-muted/30"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            3 bước, 30 giây có kết quả
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Không cần Excel, không cần công thức — chỉ cần biết giá nhập và
            ngành hàng.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.22_25)] font-mono text-2xl font-bold text-primary-foreground shadow-md shadow-primary/30">
                  {s.n}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {s.title.replace("&amp;", "&")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="absolute top-1/2 -right-3 hidden h-px w-6 bg-border lg:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/calculator"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
          >
            Bắt đầu tính ngay →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "Số liệu có chính xác không?",
      a: "Công cụ áp dụng chính xác công thức từ bảng phí tham khảo Shopee 2026 (Mall + Thường), bao gồm 1.314 ngành hàng. Số liệu mang tính chất ước tính, có thể chênh lệch nhỏ tuỳ tham số shop tự cấu hình (QC, voucher, tỉ lệ hoàn).",
    },
    {
      q: "Có thu phí không?",
      a: "Hoàn toàn miễn phí, không giới hạn lượt dùng, không cần đăng ký tài khoản. Betacom phát triển và duy trì như công cụ cộng đồng cho seller Việt.",
    },
    {
      q: "Dữ liệu của tôi có bị thu thập?",
      a: "Mọi tính toán xử lý trong trình duyệt của bạn. Lịch sử tính lưu localStorage, không gửi lên server. Chỉ thu thập số lượt truy cập ẩn danh qua Vercel Analytics (không cookie).",
    },
    {
      q: "Khi nào Shopee đổi phí thì tool có cập nhật?",
      a: "Có. Khi Shopee công bố bảng phí mới, Betacom sẽ cập nhật JSON ngành hàng và redeploy trong 1-2 ngày làm việc.",
    },
    {
      q: "Tôi có thể đề xuất tính năng?",
      a: "Có — gửi feedback qua website betacom.vn hoặc đặt vấn đề trên repo GitHub. Mọi góp ý đều được xem xét.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Câu hỏi thường gặp
        </h2>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:border-primary/30"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-left text-base font-semibold tracking-tight">
              {f.q}
              <span className="ml-2 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground transition group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[oklch(0.55_0.22_20)] to-[oklch(0.5_0.22_15)] p-8 text-center text-primary-foreground shadow-2xl shadow-primary/30 sm:p-12 lg:p-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <Image
            src="/betacomlogo.png"
            alt="Betacom"
            width={48}
            height={48}
            className="rounded-xl bg-white/10 p-1.5 backdrop-blur"
          />
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Sẵn sàng định giá thông minh hơn?
          </h2>
          <p className="mt-4 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
            Hàng nghìn seller Shopee đang dùng để tránh bán lỗ và tối ưu lợi
            nhuận. Bắt đầu trong 30 giây, không cần đăng ký.
          </p>
          <Link
            href="/calculator"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-card px-8 text-base font-bold text-primary shadow-xl transition hover:translate-y-[-1px] hover:bg-card/95"
          >
            Mở công cụ tính phí →
          </Link>
        </div>
      </div>
    </section>
  );
}
