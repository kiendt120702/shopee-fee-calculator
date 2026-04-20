"use client";

import { useMemo, useState } from "react";
import { calc, getDefaults } from "@/lib/calc";
import type { CalcInput, CalcResult, ShopMode } from "@/lib/calc/types";

export interface CalculatorState {
  mode: ShopMode;
  input: CalcInput;
  result: CalcResult;
  setField: <K extends keyof CalcInput>(key: K, value: CalcInput[K]) => void;
  reset: () => void;
  setInput: (input: CalcInput) => void;
}

function buildInitial(mode: ShopMode, partial?: Partial<CalcInput>): CalcInput {
  return {
    giaNhap: 50000,
    giaBan: 100000,
    phiCoDinh: mode === "mall" ? 0.126 : 0.1,
    ...getDefaults(mode),
    ...partial,
  };
}

export function useCalculator(
  mode: ShopMode,
  initial?: Partial<CalcInput>
): CalculatorState {
  const [input, setInput] = useState<CalcInput>(() => buildInitial(mode, initial));

  const result = useMemo(() => calc(input), [input]);

  const setField = <K extends keyof CalcInput>(key: K, value: CalcInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setInput(buildInitial(mode));

  return { mode, input, result, setField, reset, setInput };
}
