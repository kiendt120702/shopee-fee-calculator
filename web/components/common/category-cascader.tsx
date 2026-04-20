"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  getCap1List,
  getCap2List,
  getCap3List,
  findCategory,
} from "@/lib/calc/category-lookup";
import type { ShopMode } from "@/lib/types";

export interface CategorySelection {
  cap1: string | null;
  cap2: string | null;
  cap3: string | null;
}

interface CategoryCascaderProps {
  mode: ShopMode;
  value: CategorySelection;
  onChange: (sel: CategorySelection, phiCoDinh: number | null) => void;
}

export function CategoryCascader({ mode, value, onChange }: CategoryCascaderProps) {
  const cap1List = useMemo(() => getCap1List(mode), [mode]);
  const cap2List = useMemo(
    () => (value.cap1 ? getCap2List(mode, value.cap1) : []),
    [mode, value.cap1]
  );
  const cap3List = useMemo(
    () => (value.cap1 && value.cap2 ? getCap3List(mode, value.cap1, value.cap2) : []),
    [mode, value.cap1, value.cap2]
  );

  const emit = (next: CategorySelection) => {
    const fee = next.cap1 && next.cap2
      ? findCategory(mode, next.cap1, next.cap2, next.cap3)?.phiCoDinh ?? null
      : null;
    onChange(next, fee);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="grid gap-1.5">
        <Label className="text-xs text-muted-foreground">Ngành cấp 1</Label>
        <Select
          value={value.cap1 ?? ""}
          onValueChange={(v) => v && emit({ cap1: v, cap2: null, cap3: null })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn ngành cấp 1" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {cap1List.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label className="text-xs text-muted-foreground">Ngành cấp 2</Label>
        <Select
          disabled={!value.cap1}
          value={value.cap2 ?? ""}
          onValueChange={(v) => v && emit({ cap1: value.cap1, cap2: v, cap3: null })}
        >
          <SelectTrigger>
            <SelectValue placeholder={value.cap1 ? "Chọn ngành cấp 2" : "—"} />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {cap2List.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label className="text-xs text-muted-foreground">
          Ngành cấp 3 {cap3List.length === 0 && "(không có)"}
        </Label>
        <Select
          disabled={!value.cap2 || cap3List.length === 0}
          value={value.cap3 ?? ""}
          onValueChange={(v) => v && emit({ cap1: value.cap1, cap2: value.cap2, cap3: v })}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                cap3List.length === 0 && value.cap2 ? "Không bắt buộc" : "Chọn cấp 3"
              }
            />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {cap3List.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
