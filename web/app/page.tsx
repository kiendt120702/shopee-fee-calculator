import Link from "next/link";
import { BentoCard } from "@/components/common/bento-card";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-10 pb-16 sm:px-6 sm:pt-16">
      <section>
        <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Cập nhật theo bảng phí Shopee 2026
        </span>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Tính phí sàn Shopee — chính xác, miễn phí
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Nhập giá nhập, giá bán, ngành hàng — công cụ tự động tính lợi nhuận,
          phí cố định, phí thanh toán, voucher Xtra, Pi Ship và thuế HKD theo
          công thức Shopee Mall &amp; Shop Thường.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <BentoCard
            title="Shopee Mall"
            description="Phí cao hơn, có phí hạ tầng 3.000đ/đơn"
          >
            <p className="text-sm text-muted-foreground">
              Dành cho shop chính hãng Shopee Mall. Phí cố định cập nhật từ
              08/09/2025, đã bao gồm thuế GTGT.
            </p>
            <Link
              href="/mall"
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Mở công cụ Mall →
            </Link>
          </BentoCard>

          <BentoCard
            title="Shop Thường"
            description="Phí mới từ 29/12/2025, đã bao gồm VAT 8%"
          >
            <p className="text-sm text-muted-foreground">
              Dành cho shop cá nhân &amp; hộ kinh doanh. Không có phí hạ tầng,
              công thức đơn giản hơn Mall.
            </p>
            <Link
              href="/thuong"
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Mở công cụ Thường →
            </Link>
          </BentoCard>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "So sánh 4 kịch bản",
              body: "Có / không Voucher Xtra × Có / không Pi Ship — chọn phương án lợi nhuận tối đa.",
            },
            {
              title: "Tính ngược giá bán",
              body: "Nhập % lợi nhuận mong muốn, công cụ giải ra giá niêm yết phù hợp.",
            },
            {
              title: "Lưu &amp; chia sẻ",
              body: "Lưu lịch sử tính trong trình duyệt, chia sẻ kết quả qua link.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border/70 bg-card p-4"
            >
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
