import type { Metadata } from "next";
import Link from "next/link";
import {
  FEE_EXPLANATIONS,
  type FeeExplanation,
  type ViolationGroup,
} from "@/lib/data/fee-explanations";

export const metadata: Metadata = {
  title: "Giải thích các loại phí Shopee 2026 — Phí cố định, PiShip, Voucher Xtra",
  description:
    "Giải thích chi tiết từng loại phí khi bán hàng trên Shopee: phí cố định, phí thanh toán, Voucher Xtra, PiShip, phí hạ tầng, thuế HKD — định nghĩa, công thức và lưu ý.",
};

export default function CacLoaiPhiPage() {
  const items = FEE_EXPLANATIONS;

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-3xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Tìm hiểu phí Shopee
          </div>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Các loại phí Shopee
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            Giải thích chi tiết từng loại phí khi bán hàng trên Shopee — bấm vào
            từng mục để xem định nghĩa, công thức tính và lưu ý quan trọng.
          </p>
        </div>

        {/* Accordion danh sách phí */}
        <div className="mt-10 flex flex-col gap-2.5">
          {items.map((f) => (
            <FeeAccordion key={f.id} fee={f} defaultOpen={items.length === 1} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-gradient-to-br from-card to-muted/30 p-6 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            Đã hiểu các loại phí? Tính ngay lợi nhuận thực tế của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/calculator"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
            >
              Mở công cụ tính phí →
            </Link>
            <Link
              href="/bang-phi"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Xem bảng phí ngành hàng
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeeAccordion({
  fee,
  defaultOpen,
}: {
  fee: FeeExplanation;
  defaultOpen?: boolean;
}) {
  return (
    <details
      id={fee.id}
      open={defaultOpen}
      className="group scroll-mt-20 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition open:border-primary/30 open:shadow-md"
    >
      {/* Hàng tiêu đề (luôn hiển thị) */}
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold tracking-tight sm:text-lg">
            {fee.name}
          </h2>
          <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
            {fee.summary}
          </p>
        </div>
        {fee.badge && (
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary tabular-nums">
            {fee.badge}
          </span>
        )}
        {/* Mũi tên xoay khi mở */}
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground transition group-open:rotate-180 group-open:bg-primary group-open:text-primary-foreground"
          aria-hidden
        >
          ⌄
        </span>
      </summary>

      {/* Nội dung chi tiết */}
      <div className="border-t border-border/60 px-5 pt-4 pb-5 sm:px-6">
        {/* Đoạn giải thích */}
        {fee.paragraphs.length > 0 && (
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            {fee.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* Công thức */}
        {fee.formula && (
          <div className="mt-4">
            <div className="rounded-xl border-2 border-primary/30 bg-primary/[0.04] px-4 py-4 text-center">
              <p className="text-sm font-bold text-primary sm:text-base">
                {fee.formula}
              </p>
            </div>
            {fee.formulaNote && (
              <p className="mt-2 text-center text-xs italic text-muted-foreground">
                {fee.formulaNote}
              </p>
            )}
          </div>
        )}

        {/* Bảng phí vi phạm */}
        {fee.violationGroups && fee.violationGroups.length > 0 && (
          <ViolationTable
            groups={fee.violationGroups}
            feeHeader={
              fee.violationFeeHeader ?? "Phí dịch vụ từng lần phát sinh"
            }
          />
        )}

        {/* Lưu ý */}
        {fee.notes && fee.notes.length > 0 && (
          <div className="mt-4 rounded-xl border border-[oklch(0.9_0.08_85)]/50 bg-[oklch(0.97_0.04_85)]/50 p-4">
            <p className="mb-2 text-xs font-semibold text-[oklch(0.5_0.13_70)]">
              ⚠️ Lưu ý
            </p>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/80">
              {fee.notes.map((n, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[oklch(0.6_0.13_70)]" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Source */}
        {fee.sourceUrl && (
          <a
            href={fee.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            Xem chi tiết trên Shopee ↗
          </a>
        )}
      </div>
    </details>
  );
}

function ViolationTable({
  groups,
  feeHeader,
}: {
  groups: ViolationGroup[];
  feeHeader: string;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border/70">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1.4fr_1.3fr] bg-primary text-[11px] font-semibold text-primary-foreground sm:text-xs">
        <div className="px-3 py-2.5">Nhóm lý do vi phạm</div>
        <div className="border-l border-primary-foreground/20 px-3 py-2.5">
          Chi tiết vi phạm
        </div>
        <div className="border-l border-primary-foreground/20 px-3 py-2.5">
          {feeHeader}
        </div>
      </div>
      {/* Groups */}
      {groups.map((g, gi) => (
        <div
          key={gi}
          className={`grid grid-cols-[1fr_1.4fr_1.3fr] text-xs sm:text-sm ${
            gi > 0 ? "border-t-2 border-border" : ""
          }`}
        >
          {/* Cột nhóm — gộp dòng */}
          <div className="flex items-center bg-primary/5 px-3 py-3 font-semibold text-primary">
            {g.group}
          </div>
          {/* Cột chi tiết + phí */}
          <div className="col-span-2 grid grid-cols-[1.08fr_1fr]">
            {g.rows.map((r, ri) => (
              <div key={ri} className="contents">
                <div
                  className={`border-l border-border/60 px-3 py-3 text-foreground ${
                    ri > 0 ? "border-t border-border/60" : ""
                  }`}
                >
                  {r.detail}
                </div>
                <div
                  className={`border-l border-border/60 px-3 py-3 font-medium text-muted-foreground ${
                    ri > 0 ? "border-t border-border/60" : ""
                  }`}
                >
                  {r.fee}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
