"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/common/searchable-select";
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

export function CategoryCascader({
  mode,
  value,
  onChange,
}: CategoryCascaderProps) {
  const cap1List = useMemo(() => getCap1List(mode), [mode]);
  const cap2List = useMemo(
    () => (value.cap1 ? getCap2List(mode, value.cap1) : []),
    [mode, value.cap1]
  );
  const cap3List = useMemo(
    () =>
      value.cap1 && value.cap2 ? getCap3List(mode, value.cap1, value.cap2) : [],
    [mode, value.cap1, value.cap2]
  );

  const emit = (next: CategorySelection) => {
    const fee =
      next.cap1 && next.cap2
        ? findCategory(mode, next.cap1, next.cap2, next.cap3)?.phiCoDinh ?? null
        : null;
    onChange(next, fee);
  };

  return (
    <div className="grid gap-3">
      <div className="grid min-w-0 gap-1.5">
        <Label className="text-xs text-muted-foreground">Ngành cấp 1</Label>
        <SearchableSelect
          value={value.cap1}
          options={cap1List}
          placeholder="Chọn ngành cấp 1"
          searchPlaceholder="Tìm ngành cấp 1…"
          onChange={(v) => emit({ cap1: v, cap2: null, cap3: null })}
        />
      </div>

      <div className="grid min-w-0 gap-1.5">
        <Label className="text-xs text-muted-foreground">Ngành cấp 2</Label>
        <SearchableSelect
          value={value.cap2}
          options={cap2List}
          placeholder={value.cap1 ? "Chọn ngành cấp 2" : "—"}
          searchPlaceholder="Tìm ngành cấp 2…"
          disabled={!value.cap1}
          onChange={(v) => emit({ cap1: value.cap1, cap2: v, cap3: null })}
        />
      </div>

      <div className="grid min-w-0 gap-1.5">
        <Label className="text-xs text-muted-foreground">
          Ngành cấp 3 {cap3List.length === 0 && "(không có)"}
        </Label>
        <SearchableSelect
          value={value.cap3}
          options={cap3List}
          placeholder={
            cap3List.length === 0 && value.cap2 ? "Không bắt buộc" : "Chọn cấp 3"
          }
          searchPlaceholder="Tìm ngành cấp 3…"
          disabled={!value.cap2 || cap3List.length === 0}
          onChange={(v) =>
            emit({ cap1: value.cap1, cap2: value.cap2, cap3: v })
          }
        />
      </div>
    </div>
  );
}
