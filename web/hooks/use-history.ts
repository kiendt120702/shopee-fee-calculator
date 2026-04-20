"use client";

import { useCallback, useEffect, useState } from "react";
import { historyStorage, type HistoryEntry } from "@/lib/history-storage";

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(historyStorage.getAll());
  }, []);

  const add = useCallback((e: HistoryEntry) => {
    setEntries(historyStorage.add(e));
  }, []);

  const remove = useCallback((id: string) => {
    setEntries(historyStorage.remove(id));
  }, []);

  const clear = useCallback(() => {
    setEntries(historyStorage.clear());
  }, []);

  return { entries, add, remove, clear };
}
