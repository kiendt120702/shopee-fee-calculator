import type { Metadata } from "next";
import Link from "next/link";
import {
  SHOPEE_UPDATES,
  UPDATE_CATEGORIES,
  type ShopeeUpdate,
} from "@/lib/data/shopee-updates";

export const metadata: Metadata = {
  title: "Cập nhật sàn Shopee 2026 — Thay đổi phí & chính sách",
  description:
    "Tổng hợp các thông báo thay đổi phí, chính sách, voucher và vận chuyển của sàn Shopee. Betacom cập nhật liên tục để seller theo dõi.",
};

/**
 * Sắp xếp tin mới nhất lên trên (ngày giảm dần). Khi trùng ngày, giữ nguyên
 * thứ tự khai báo trong mảng (tin khai báo trước hiển thị trước).
 */
function sortByDateDesc(items: ShopeeUpdate[]): ShopeeUpdate[] {
  return items
    .map((u, i) => ({ u, i }))
    .sort((a, b) => b.u.date.localeCompare(a.u.date) || a.i - b.i)
    .map(({ u }) => u);
}

/** Định dạng ngày YYYY-MM-DD -> "23 thg 05 · 2026" */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")} thg ${String(m).padStart(2, "0")} · ${y}`;
}

export default function UpdatesPage() {
  const updates = sortByDateDesc(SHOPEE_UPDATES);

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-[oklch(0.92_0.08_60)]/35 blur-3xl" />
      </div>

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:pt-20">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Theo dõi thay đổi của sàn
          </div>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Cập nhật{" "}
            <span className="bg-gradient-to-r from-primary via-[oklch(0.6_0.22_15)] to-[oklch(0.55_0.2_45)] bg-clip-text text-transparent">
              sàn Shopee
            </span>
          </h1>
          <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
            Tổng hợp các thông báo thay đổi phí, chính sách, voucher và vận
            chuyển của Shopee. Betacom theo dõi và cập nhật công cụ tính phí
            tương ứng.
          </p>
        </div>

        {/* Timeline */}
        {updates.length === 0 ? (
          <p className="mt-14 text-center text-sm text-muted-foreground">
            Chưa có thông báo nào. Vui lòng quay lại sau.
          </p>
        ) : (
          <div className="relative mt-12">
            {/* Vertical line — aligns with the dots inside the left rail */}
            <div
              className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-primary/40 via-border to-transparent sm:left-[151px]"
              aria-hidden
            />
            <ol className="flex flex-col gap-6">
              {updates.map((u) => (
                <UpdateItem key={u.id} update={u} />
              ))}
            </ol>
          </div>
        )}

        {/* CTA back to calculator */}
        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-gradient-to-br from-card to-muted/30 p-6 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            Mọi thay đổi phí đều được phản ánh trong công cụ tính phí.
          </p>
          <Link
            href="/calculator"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
          >
            Tính phí ngay →
          </Link>
        </div>
      </section>
    </main>
  );
}

function UpdateItem({ update }: { update: ShopeeUpdate }) {
  const cat = UPDATE_CATEGORIES[update.category];
  const paragraphs = update.description.split("\n").filter(Boolean);

  return (
    <li className="relative pl-7 sm:pl-[174px]">
      {/* Date rail (desktop): sits to the LEFT of the timeline dot */}
      <time
        dateTime={update.date}
        className="absolute top-[18px] left-0 hidden w-[130px] whitespace-nowrap text-right font-mono text-xs text-muted-foreground tabular-nums sm:block"
      >
        {formatDate(update.date)}
      </time>

      {/* Timeline dot */}
      <span
        className={`absolute top-5 left-0 flex size-3.5 items-center justify-center rounded-full border-2 sm:top-[19px] sm:left-[142px] sm:size-[18px] ${
          update.important
            ? "border-primary bg-primary"
            : "border-border bg-background"
        }`}
        aria-hidden
      >
        {update.important && (
          <span className="size-1.5 rounded-full bg-primary-foreground" />
        )}
      </span>

      <article
        className={`group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
          update.important
            ? "border-primary/40 ring-1 ring-primary/10"
            : "border-border/70"
        }`}
      >
        <div className="p-5 sm:p-6">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${cat.badgeClass}`}
            >
              {cat.label}
            </span>
            {update.important && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
                ★ Quan trọng
              </span>
            )}
            <time
              dateTime={update.date}
              className="ml-auto font-mono text-xs text-muted-foreground tabular-nums sm:hidden"
            >
              {formatDate(update.date)}
            </time>
          </div>

          {/* Title */}
          <h2 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
            {update.title}
          </h2>

          {/* Description */}
          <div className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        {update.comparison && update.comparison.length > 0 && (
          <ComparisonTable
            rows={update.comparison}
            labels={
              update.comparisonLabels ?? { before: "Trước", after: "Sau" }
            }
          />
        )}

        {/* Footer: nút chi tiết nội bộ + link nguồn */}
        {(update.detailHref || update.sourceUrl) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 px-5 py-3 sm:px-6">
            {update.detailHref && (
              <Link
                href={update.detailHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
              >
                {update.detailLabel ?? "Xem chi tiết"} →
              </Link>
            )}
            {update.sourceUrl && (
              <a
                href={update.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Xem thông báo gốc trên Shopee ↗
              </a>
            )}
          </div>
        )}
      </article>
    </li>
  );
}

function ComparisonTable({
  rows,
  labels,
}: {
  rows: { label: string; before: string; after: string }[];
  labels: { before: string; after: string };
}) {
  return (
    <div className="border-t border-border/60 px-5 pt-4 pb-5 sm:px-6">
      <div className="overflow-hidden rounded-xl border border-border/70">
        {/* Header */}
        <div className="grid grid-cols-[1.1fr_1fr_1fr] text-[11px] font-semibold sm:text-xs">
          <div className="bg-muted/60 px-3 py-2.5 text-muted-foreground">
            Hạng mục
          </div>
          <div className="bg-[oklch(0.32_0.05_255)] px-3 py-2.5 text-center text-white">
            {labels.before}
          </div>
          <div className="bg-primary px-3 py-2.5 text-center text-primary-foreground">
            {labels.after}
          </div>
        </div>
        {/* Rows */}
        {rows.map((row, i) => {
          // Khi giá trị trước/sau giống nhau -> gộp 2 cột làm 1 (không có thay đổi)
          const unchanged = row.before.trim() === row.after.trim();
          return (
            <div
              key={i}
              className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-border/60 text-xs sm:text-sm"
            >
              <div className="bg-muted/30 px-3 py-3 font-medium text-foreground">
                {row.label}
              </div>
              {unchanged ? (
                <CompareCell value={row.before} tone="same" span2 />
              ) : (
                <>
                  <CompareCell value={row.before} tone="before" />
                  <CompareCell value={row.after} tone="after" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompareCell({
  value,
  tone,
  span2,
}: {
  value: string;
  tone: "before" | "after" | "same";
  /** Gộp 2 cột (dùng khi trước/sau giống nhau) */
  span2?: boolean;
}) {
  const lines = value.split("\n").filter(Boolean);
  const toneClass =
    tone === "after"
      ? "bg-primary/5 font-semibold text-primary"
      : tone === "same"
        ? "bg-muted/20 text-muted-foreground"
        : "text-muted-foreground";
  return (
    <div
      className={`px-3 py-3 text-center leading-snug ${span2 ? "col-span-2" : ""} ${toneClass}`}
    >
      {lines.map((ln, i) => (
        <p key={i} className={i > 0 ? "mt-0.5" : undefined}>
          {ln}
        </p>
      ))}
    </div>
  );
}
