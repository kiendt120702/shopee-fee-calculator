"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PercentInputProps {
  value: number; // 0..1
  onChange: (value: number) => void;
  step?: number;
  id?: string;
  className?: string;
}

function toDisplay(v: number): string {
  if (v === 0) return "";
  return (v * 100).toFixed(2).replace(/\.?0+$/, "");
}

export function PercentInput({
  value,
  onChange,
  step = 0.01,
  id,
  className,
}: PercentInputProps) {
  const [text, setText] = useState(toDisplay(value));

  useEffect(() => {
    setText(toDisplay(value));
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        value={text}
        step={step}
        onChange={(e) => {
          const raw = e.target.value.replace(",", ".");
          setText(raw);
          if (raw === "" || raw === "-" || raw === ".") {
            onChange(0);
            return;
          }
          const n = Number.parseFloat(raw);
          if (!Number.isNaN(n)) onChange(n / 100);
        }}
        className="pr-9 font-mono tabular-nums"
      />
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
        %
      </span>
    </div>
  );
}
