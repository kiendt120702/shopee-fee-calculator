"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/calc/category-lookup";
import { formatPercent } from "@/lib/format";
import { formatDataDate } from "@/lib/data/data-meta";
import type { Category, ShopMode } from "@/lib/types";

/** Bỏ dấu tiếng Việt để search không dấu */
function deaccent(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

const MODES: { value: ShopMode; label: string }[] = [
  { value: "thuong", label: "Shop Thường" },
  { value: "mall", label: "Shopee Mall" },
];

export function FeeTableView({
  initialMode = "thuong",
}: {
  initialMode?: ShopMode;
}) {
  const [mode, setMode] = useState<ShopMode>(initialMode);
  const [query, setQuery] = useState("");

  const all = useMemo(() => getCategories(mode), [mode]);

  const filtered = useMemo(() => {
    const q = deaccent(query.trim());
    if (!q) return all;
    const terms = q.split(/\s+/).filter(Boolean);
    return all.filter((c) => {
      const hay = deaccent(
        [c.cap1, c.cap2, c.cap3 ?? ""].join(" ")
      );
      return terms.every((t) => hay.includes(t));
    });
  }, [all, query]);

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Mode toggle */}
        <div className="inline-flex rounded-xl border border-border/70 bg-card p-1">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                mode === m.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm ngành hàng…"
            className="h-10 w-full rounded-xl border border-border/70 bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          />
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            ⌕
          </span>
        </div>
      </div>

      {/* Result count + ngày dữ liệu */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <p>
          Hiển thị{" "}
          <span className="font-semibold text-foreground">
            {filtered.length.toLocaleString("vi-VN")}
          </span>{" "}
          / {all.length.toLocaleString("vi-VN")} ngành hàng · Phí cố định đã gồm
          thuế GTGT
        </p>
        <p className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[oklch(0.6_0.18_145)]" />
          Dữ liệu cập nhật:{" "}
          <span className="font-semibold text-foreground">
            {formatDataDate()}
          </span>
        </p>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-border/70 bg-card px-4 py-10 text-center text-sm text-muted-foreground">
          Không tìm thấy ngành hàng phù hợp với “{query}”.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70">
          {/* Header */}
          <div className="grid grid-cols-[1.2fr_1.2fr_1.2fr_auto] gap-2 border-b border-border/60 bg-muted/80 px-3 py-2.5 text-[11px] font-semibold text-muted-foreground sm:text-xs">
            <div>Ngành cấp 1</div>
            <div>Ngành cấp 2</div>
            <div>Ngành cấp 3</div>
            <div className="w-16 text-right sm:w-20">Phí</div>
          </div>
          {/* Rows */}
          <ul className="divide-y divide-border/50">
            {filtered.map((c) => (
              <FeeRow key={`${mode}-${c.stt}`} category={c} />
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="mt-2 flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-gradient-to-br from-card to-muted/30 p-5 text-center">
        <p className="text-sm text-muted-foreground">
          Muốn tính lợi nhuận theo giá nhập / giá bán của bạn?
        </p>
        <Link
          href="/calculator"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
        >
          Mở công cụ tính phí →
        </Link>
      </div>
    </div>
  );
}

function FeeRow({ category: c }: { category: Category }) {
  return (
    <li className="grid grid-cols-[1.2fr_1.2fr_1.2fr_auto] items-center gap-2 px-3 py-2.5 text-xs transition hover:bg-accent/40 sm:text-sm">
      <span className="font-medium text-foreground">{c.cap1}</span>
      <span className="text-muted-foreground">{c.cap2}</span>
      <span className="text-muted-foreground">{c.cap3 ?? "—"}</span>
      <span className="w-16 text-right font-mono font-bold tabular-nums text-primary sm:w-20">
        {formatPercent(c.phiCoDinh)}
      </span>
    </li>
  );
}
