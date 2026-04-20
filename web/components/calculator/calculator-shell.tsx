"use client";

import { useEffect, useState } from "react";
import { useCalculator } from "./use-calculator";
import { InputForm } from "./input-form";
import { ResultTable } from "./result-table";
import { ReverseCalcCard } from "./reverse-calc-card";
import { ShareButton } from "./share-button";
import { HistoryList } from "./history-list";
import type { ShopMode } from "@/lib/types";
import type { CategorySelection } from "@/components/common/category-cascader";
import { decodeFromParams } from "@/lib/url-state";
import { useHistory } from "@/hooks/use-history";
import { trackEvent } from "@/lib/analytics";

interface CalculatorShellProps {
  mode: ShopMode;
}

export function CalculatorShell({ mode }: CalculatorShellProps) {
  const initial = typeof window !== "undefined"
    ? decodeFromParams(new URLSearchParams(window.location.search), mode)
    : { input: {}, category: { cap1: null, cap2: null, cap3: null } as CategorySelection };

  const state = useCalculator(mode, initial.input);
  const [category, setCategory] = useState<CategorySelection>(initial.category);

  const history = useHistory();

  useEffect(() => {
    const id = setTimeout(() => trackEvent("calc_used", { mode }), 1000);
    return () => clearTimeout(id);
  }, [state.input, mode]);

  const handleCategoryChange = (sel: CategorySelection, fee: number | null) => {
    setCategory(sel);
    if (fee !== null) state.setField("phiCoDinh", fee);
  };

  const saveToHistory = () => {
    history.add({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      mode,
      input: state.input,
      category,
    });
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            {mode === "mall" ? "Shopee Mall" : "Shop Thường"}
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Công cụ tính phí {mode === "mall" ? "Shopee Mall" : "Shop Thường"}
          </h1>
        </div>
        <div className="flex gap-2">
          <ShareButton state={state} category={category} />
          <button
            type="button"
            onClick={saveToHistory}
            className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs font-medium hover:bg-accent"
          >
            Lưu vào lịch sử
          </button>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col gap-5">
          <InputForm
            state={state}
            category={category}
            onCategoryChange={handleCategoryChange}
          />
          <ReverseCalcCard
            mode={mode}
            input={state.input}
            onApply={(giaBan) => state.setField("giaBan", giaBan)}
          />
        </div>
        <div className="flex flex-col gap-5">
          <ResultTable result={state.result} mode={mode} />
          <HistoryList
            mode={mode}
            entries={history.entries}
            onRestore={(e) => {
              state.setInput(e.input);
              setCategory(e.category);
            }}
            onRemove={history.remove}
            onClear={history.clear}
          />
        </div>
      </div>
    </main>
  );
}
