"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { ShopMode } from "@/lib/types";

interface ModeToggleProps {
  value: ShopMode;
  onChange: (mode: ShopMode) => void;
}

const MODES: { value: ShopMode; label: string; sub: string }[] = [
  { value: "mall", label: "Shopee Mall", sub: "Có phí hạ tầng 3.000đ/đơn" },
  { value: "thuong", label: "Shopee Thường", sub: "Phí mới 29/12/2025, gồm VAT 8%" },
];

export function ModeToggle({ value, onChange }: ModeToggleProps) {
  const current = MODES.find((m) => m.value === value) ?? MODES[0];

  return (
    <div className="grid gap-1.5">
      <Label className="text-xs text-muted-foreground">Loại shop</Label>
      <Select
        value={value}
        onValueChange={(v) => v && onChange(v as ShopMode)}
      >
        <SelectTrigger className="w-full text-base font-semibold">
          <span>{current.label}</span>
        </SelectTrigger>
        <SelectContent>
          {MODES.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              <div className="flex flex-col items-start gap-0.5 py-0.5">
                <span className="text-sm font-semibold">{m.label}</span>
                <span className="text-[11px] text-muted-foreground">
                  {m.sub}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
