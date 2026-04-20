"use client";

import { useState } from "react";
import { BentoCard } from "@/components/common/bento-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PercentInput } from "@/components/common/percent-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { solveGiaBan } from "@/lib/calc/reverse-solver";
import { formatPercent, formatVnd } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";
import type { CalcInput, ScenarioOptions } from "@/lib/calc/types";
import type { ShopMode } from "@/lib/types";

interface ReverseCalcCardProps {
  mode: ShopMode;
  input: CalcInput;
  onApply: (giaBan: number) => void;
}

const SCENARIO_OPTIONS: { key: string; label: string; opts: ScenarioOptions }[] = [
  { key: "k-co", label: "Không ĐK · Có Pi Ship", opts: { hasVoucherXtra: false, hasPiShip: true } },
  { key: "k-khong", label: "Không ĐK · Không Pi Ship", opts: { hasVoucherXtra: false, hasPiShip: false } },
  { key: "v-co", label: "Voucher Xtra · Có Pi Ship", opts: { hasVoucherXtra: true, hasPiShip: true } },
  { key: "v-khong", label: "Voucher Xtra · Không Pi Ship", opts: { hasVoucherXtra: true, hasPiShip: false } },
];

export function ReverseCalcCard({ mode, input, onApply }: ReverseCalcCardProps) {
  const [target, setTarget] = useState(0.2);
  const [scenarioKey, setScenarioKey] = useState("k-co");
  const [proposed, setProposed] = useState<{ giaBan: number; achievedLnPercent: number } | null>(null);

  const compute = () => {
    const sc = SCENARIO_OPTIONS.find((s) => s.key === scenarioKey);
    if (!sc) return;
    const result = solveGiaBan({
      base: { ...input },
      targetLnPercent: target,
      scenario: sc.opts,
    });
    if (!result) {
      toast.error(`Không thể đạt ${formatPercent(target)} với giá nhập hiện tại.`);
      setProposed(null);
      return;
    }
    setProposed(result);
    trackEvent("reverse_calc_used", { mode, target });
  };

  return (
    <BentoCard
      accent="info"
      title="Tính ngược giá bán"
      description="Nhập % lợi nhuận mong muốn → ra giá bán đề xuất"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label className="text-xs text-muted-foreground">% Lợi nhuận mong muốn</Label>
          <PercentInput value={target} onChange={setTarget} />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-xs text-muted-foreground">Kịch bản</Label>
          <Select value={scenarioKey} onValueChange={(v) => v && setScenarioKey(v)}>
            <SelectTrigger className="w-full min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-72">
              {SCENARIO_OPTIONS.map((s) => (
                <SelectItem key={s.key} value={s.key}>
                  <span className="whitespace-normal">{s.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <Button type="button" onClick={compute} className="w-full sm:w-auto">
          Tính giá bán đề xuất
        </Button>
        {proposed && (
          <div className="flex flex-col items-start gap-0.5 sm:items-end sm:text-right">
            <span className="text-xs text-muted-foreground">
              Giá bán đề xuất ({formatPercent(proposed.achievedLnPercent)} LN)
            </span>
            <button
              type="button"
              onClick={() => onApply(proposed.giaBan)}
              className="font-mono text-base font-bold text-primary hover:underline sm:text-lg"
              title="Áp dụng vào form"
            >
              {formatVnd(proposed.giaBan)} →
            </button>
          </div>
        )}
      </div>
    </BentoCard>
  );
}
