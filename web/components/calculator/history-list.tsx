"use client";

import { BentoCard } from "@/components/common/bento-card";
import { Button } from "@/components/ui/button";
import { formatVnd } from "@/lib/format";
import type { HistoryEntry } from "@/lib/history-storage";
import type { ShopMode } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

interface HistoryListProps {
  mode: ShopMode;
  entries: HistoryEntry[];
  onRestore: (e: HistoryEntry) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const MODE_LABEL: Record<ShopMode, string> = {
  mall: "Mall",
  thuong: "Thường",
};

const dateFmt = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function HistoryList({
  entries,
  onRestore,
  onRemove,
  onClear,
}: HistoryListProps) {
  const filtered = entries;
  return (
    <BentoCard
      title="Lịch sử tính"
      description="Lưu trong trình duyệt — gồm cả Mall và Thường"
      action={
        filtered.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs text-muted-foreground"
          >
            Xoá hết
          </Button>
        )
      }
    >
      {filtered.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Chưa có gì. Bấm &quot;Lưu vào lịch sử&quot; để lưu kết quả hiện tại.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border/50">
          {filtered.map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between gap-2 py-2"
            >
              <button
                type="button"
                className="group flex flex-1 flex-col items-start text-left"
                onClick={() => {
                  onRestore(e);
                  trackEvent("history_restored", { mode: e.mode });
                }}
              >
                <span className="flex items-center gap-2 text-xs font-medium group-hover:text-primary">
                  <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    {MODE_LABEL[e.mode]}
                  </span>
                  {formatVnd(e.input.giaNhap)} → {formatVnd(e.input.giaBan)}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {e.category.cap2 ?? "—"} · {dateFmt.format(e.createdAt)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onRemove(e.id)}
                className="text-xs text-muted-foreground hover:text-destructive"
                aria-label="Xoá"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </BentoCard>
  );
}
