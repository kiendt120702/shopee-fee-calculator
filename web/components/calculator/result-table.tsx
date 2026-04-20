"use client";

import { BentoCard } from "@/components/common/bento-card";
import { Badge } from "@/components/ui/badge";
import { SCENARIO_KEYS, SCENARIO_LABELS, findBestScenario } from "@/lib/calc";
import type { CalcResult, ScenarioKey, ScenarioResult } from "@/lib/calc/types";
import type { ShopMode } from "@/lib/types";
import { formatVnd, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ResultTableProps {
  result: CalcResult;
  mode: ShopMode;
}

interface Row {
  label: string;
  pick: (s: ScenarioResult) => number;
  emphasize?: boolean;
  isPercent?: boolean;
  hideForThuong?: boolean;
}

const ROWS: Row[] = [
  { label: "Doanh thu", pick: (s) => s.giaBan },
  { label: "Giá nhập", pick: (s) => s.giaNhap },
  { label: "Lãi ròng (DT − Nhập)", pick: (s) => s.laiRong },
  { label: "Phí cố định", pick: (s) => s.phiCoDinhVnd },
  { label: "Phí thanh toán", pick: (s) => s.phiThanhToanVnd },
  { label: "Phí hạ tầng", pick: (s) => s.phiHaTangVnd, hideForThuong: true },
  { label: "Phí Voucher Xtra", pick: (s) => s.phiVoucherXtraVnd },
  { label: "Tổng phí Shopee", pick: (s) => s.tongPhiShopee, emphasize: true },
  { label: "Phí Pi Ship", pick: (s) => s.phiPiShipVnd },
  { label: "Phí quảng cáo", pick: (s) => s.phiQcVnd },
  { label: "Voucher shop", pick: (s) => s.phiVoucherShopVnd },
  { label: "Thuế HKD", pick: (s) => s.phiThueVnd },
  { label: "Phí ship hoàn", pick: (s) => s.phiShipHoanVnd },
  { label: "Tổng chi phí", pick: (s) => s.tongChiPhi, emphasize: true },
  { label: "LỢI NHUẬN", pick: (s) => s.loiNhuan, emphasize: true },
  { label: "Lợi nhuận / Doanh thu", pick: (s) => s.loiNhuanTrenDoanhThu, isPercent: true },
  { label: "Chi phí / Doanh thu", pick: (s) => s.chiPhiTrenDoanhThu, isPercent: true },
];

export function ResultTable({ result, mode }: ResultTableProps) {
  const best = findBestScenario(result);
  const visibleRows = ROWS.filter((r) => !(r.hideForThuong && mode === "thuong"));

  return (
    <BentoCard
      title="So sánh 4 kịch bản"
      description="Cột tô màu là phương án có lợi nhuận cao nhất"
    >
      <div className="-mx-2 overflow-x-auto sm:mx-0">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-card px-2 py-2 text-left text-xs font-medium text-muted-foreground">
                Khoản mục
              </th>
              {SCENARIO_KEYS.map((k) => (
                <th
                  key={k}
                  className={cn(
                    "px-2 py-2 text-right text-xs font-semibold",
                    k === best
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] leading-tight">
                      {SCENARIO_LABELS[k]}
                    </span>
                    {k === best && (
                      <Badge className="bg-primary/15 text-primary border-0 text-[10px]">
                        Tối ưu
                      </Badge>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.label} className="border-t border-border/40">
                <td
                  className={cn(
                    "sticky left-0 z-10 bg-card px-2 py-1.5 text-left text-xs",
                    row.emphasize && "font-semibold text-foreground"
                  )}
                >
                  {row.label}
                </td>
                {SCENARIO_KEYS.map((k) => {
                  const v = row.pick(result[k]);
                  const isProfit = row.label.startsWith("LỢI NHUẬN");
                  return (
                    <td
                      key={k}
                      className={cn(
                        "px-2 py-1.5 text-right font-mono tabular-nums text-xs",
                        row.emphasize && "font-semibold",
                        k === best && "bg-primary/5",
                        isProfit && v < 0 && "text-destructive",
                        isProfit && v > 0 && "text-[oklch(var(--success))]"
                      )}
                    >
                      {row.isPercent ? formatPercent(v) : formatVnd(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BentoCard>
  );
}

export function highlightBest(_result: CalcResult): ScenarioKey {
  return findBestScenario(_result);
}
