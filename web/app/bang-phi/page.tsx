import type { Metadata } from "next";
import { FeeTableView } from "@/components/fee-table/fee-table-view";
import type { ShopMode } from "@/lib/types";

export const metadata: Metadata = {
  title: "Bảng phí cố định theo ngành hàng Shopee 2026",
  description:
    "Tra cứu phí cố định từng ngành hàng cho Shopee Mall và Shop Thường theo bảng phí 2026. Tìm kiếm nhanh, lọc theo loại shop.",
};

export default async function BangPhiPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const initialMode: ShopMode = mode === "mall" ? "mall" : "thuong";

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-4xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Tra cứu phí theo ngành hàng
          </div>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Bảng phí cố định Shopee
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            Toàn bộ phí cố định theo ngành hàng cho Shopee Mall và Shop Thường
            theo bảng phí 2026. Gõ để tìm nhanh ngành hàng cần tra.
          </p>
        </div>

        {/* Table view */}
        <div className="mt-10">
          <FeeTableView initialMode={initialMode} />
        </div>
      </section>
    </main>
  );
}
