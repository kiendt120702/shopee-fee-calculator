"use client";

import { BentoCard } from "@/components/common/bento-card";
import { Badge } from "@/components/ui/badge";
import {
  SCENARIO_KEYS,
  SCENARIO_LABELS,
  SCENARIO_LABELS_SHORT,
  findBestScenario,
} from "@/lib/calc";
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
      accent="success"
      title="So sánh 4 kịch bản"
      description="Cột tô màu là phương án có lợi nhuận cao nhất"
    >
      <div className="rounded-xl border border-[oklch(0.85_0.12_145)]/30 bg-[oklch(0.96_0.06_145)]/40 px-3 py-2 text-xs">
        <span className="font-medium text-muted-foreground">Phương án tối ưu: </span>
        <span className="font-semibold text-[oklch(0.4_0.15_145)]">
          {SCENARIO_LABELS[best]}
        </span>
        <span className="ml-1 font-mono font-bold text-[oklch(0.4_0.15_145)]">
          · {formatVnd(result[best].loiNhuan)}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <colgroup>
            <col className="w-[38%] sm:w-[34%]" />
            <col className="w-[15.5%] sm:w-[16.5%]" />
            <col className="w-[15.5%] sm:w-[16.5%]" />
            <col className="w-[15.5%] sm:w-[16.5%]" />
            <col className="w-[15.5%] sm:w-[16.5%]" />
          </colgroup>
          <thead>
            <tr>
              <th className="bg-card/80 px-2 py-2 text-left text-xs font-medium text-muted-foreground">
                Khoản mục
              </th>
              {SCENARIO_KEYS.map((k) => {
                const lbl = SCENARIO_LABELS_SHORT[k];
                return (
                  <th
                    key={k}
                    title={SCENARIO_LABELS[k]}
                    className={cn(
                      "rounded-t-md px-1.5 py-2 text-right text-[11px] font-semibold leading-tight",
                      k === best
                        ? "bg-[oklch(0.92_0.1_145)]/60 text-[oklch(0.35_0.15_145)]"
                        : "bg-muted/30 text-muted-foreground"
                    )}
                  >
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="block">{lbl.line1}</span>
                      <span className="block text-[10px] font-normal opacity-90">
                        {lbl.line2}
                      </span>
                      {k === best && (
                        <Badge className="mt-0.5 border-0 bg-[oklch(0.92_0.1_145)] px-1.5 py-0 text-[9px] font-bold text-[oklch(0.35_0.15_145)]">
                          Tối ưu
                        </Badge>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isProfit = row.label.startsWith("LỢI NHUẬN");
              const isTotalCost = row.label === "Tổng chi phí";
              const isTotalFee = row.label === "Tổng phí Shopee";
              return (
                <tr
                  key={row.label}
                  className={cn(
                    "border-t border-border/40",
                    isProfit && "bg-[oklch(0.96_0.06_145)]/40",
                    (isTotalCost || isTotalFee) && "bg-muted/30"
                  )}
                >
                  <td
                    className={cn(
                      "px-2 py-1.5 text-left text-xs",
                      row.emphasize && "font-semibold text-foreground",
                      isProfit && "text-[oklch(0.35_0.15_145)]"
                    )}
                  >
                    {row.label}
                  </td>
                  {SCENARIO_KEYS.map((k) => {
                    const v = row.pick(result[k]);
                    return (
                      <td
                        key={k}
                        className={cn(
                          "px-1.5 py-1.5 text-right font-mono tabular-nums text-[11px] sm:text-xs",
                          row.emphasize && "font-semibold",
                          k === best && "bg-[oklch(0.92_0.1_145)]/30",
                          isProfit && v < 0 && "text-destructive font-bold",
                          isProfit && v > 0 && "text-[oklch(0.35_0.15_145)] font-bold"
                        )}
                      >
                        {row.isPercent ? formatPercent(v) : formatVnd(v)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </BentoCard>
  );
}

export function highlightBest(_result: CalcResult): ScenarioKey {
  return findBestScenario(_result);
}
