import type { CalcInput, ShopMode } from "@/lib/calc/types";
import type { CategorySelection } from "@/components/common/category-cascader";

export interface HistoryEntry {
  id: string;
  createdAt: number;
  mode: ShopMode;
  input: CalcInput;
  category: CategorySelection;
  label?: string;
}

const KEY = "betacom-shopee-fee-history-v1";
const MAX_ENTRIES = 20;

function safeRead(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as HistoryEntry[];
  } catch {
    return [];
  }
}

function safeWrite(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    // localStorage disabled — silently ignore
  }
}

export const historyStorage = {
  getAll(): HistoryEntry[] {
    return safeRead();
  },
  add(entry: HistoryEntry): HistoryEntry[] {
    const list = [entry, ...safeRead()].slice(0, MAX_ENTRIES);
    safeWrite(list);
    return list;
  },
  remove(id: string): HistoryEntry[] {
    const list = safeRead().filter((e) => e.id !== id);
    safeWrite(list);
    return list;
  },
  clear(): HistoryEntry[] {
    safeWrite([]);
    return [];
  },
};
