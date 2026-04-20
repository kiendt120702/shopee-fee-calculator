"use client";

import { useEffect, useState } from "react";
import { useCalculator } from "./use-calculator";
import { InputForm } from "./input-form";
import { ResultTable } from "./result-table";
import { ReverseCalcCard } from "./reverse-calc-card";
import { ShareButton } from "./share-button";
import { HistoryList } from "./history-list";
import { ModeToggle } from "./mode-toggle";
import type { ShopMode } from "@/lib/types";
import type { CategorySelection } from "@/components/common/category-cascader";
import { decodeFromParams } from "@/lib/url-state";
import { useHistory } from "@/hooks/use-history";
import { trackEvent } from "@/lib/analytics";
import { getDefaults } from "@/lib/calc/shared";

interface CalculatorShellProps {
  initialMode?: ShopMode;
}

const EMPTY_CATEGORY: CategorySelection = { cap1: null, cap2: null, cap3: null };

export function CalculatorShell({ initialMode = "mall" }: CalculatorShellProps) {
  const [mode, setMode] = useState<ShopMode>(initialMode);
  const state = useCalculator(mode);
  const [category, setCategory] = useState<CategorySelection>(EMPTY_CATEGORY);
  const history = useHistory();

  // Hydrate from URL (?mode=mall|thuong + params) after mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode === "mall" || urlMode === "thuong") {
      setMode(urlMode);
    }
    const decoded = decodeFromParams(
      params,
      urlMode === "thuong" ? "thuong" : "mall"
    );
    if (Object.keys(decoded.input).length > 0) {
      state.setInput({ ...state.input, ...decoded.input });
    }
    if (
      decoded.category.cap1 ||
      decoded.category.cap2 ||
      decoded.category.cap3
    ) {
      setCategory(decoded.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset defaults when user switches mode (keep gia, category)
  const handleModeChange = (next: ShopMode) => {
    if (next === mode) return;
    const defaults = getDefaults(next);
    state.setInput({
      ...state.input,
      ...defaults,
      // adjust default phiCoDinh only when no category selected
      phiCoDinh: category.cap1 ? state.input.phiCoDinh : next === "mall" ? 0.126 : 0.1,
    });
    trackEvent("mode_switched", { from: mode, to: next });
    setMode(next);
  };

  useEffect(() => {
    const id = setTimeout(() => trackEvent("calc_used", { mode }), 1000);
    return () => clearTimeout(id);
  }, [state.input, mode]);

  const handleCategoryChange = (
    sel: CategorySelection,
    fee: number | null
  ) => {
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
      <header className="mb-6 flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            Công cụ Betacom
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tính phí &amp; lợi nhuận sàn Shopee
          </h1>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="w-full sm:max-w-md">
            <ModeToggle value={mode} onChange={handleModeChange} />
          </div>
          <div className="flex gap-2">
            <ShareButton state={state} category={category} />
            <button
              type="button"
              onClick={saveToHistory}
              className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs font-medium hover:bg-accent"
            >
              Lưu lịch sử
            </button>
          </div>
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
              if (e.mode !== mode) setMode(e.mode);
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
