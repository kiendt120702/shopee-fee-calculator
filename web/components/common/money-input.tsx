"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { parseMoneyInput } from "@/lib/format";
import { cn } from "@/lib/utils";

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const formatter = new Intl.NumberFormat("vi-VN");

function format(n: number): string {
  if (!n) return "";
  return formatter.format(n);
}

export function MoneyInput({
  value,
  onChange,
  placeholder = "0",
  id,
  className,
}: MoneyInputProps) {
  const [text, setText] = useState(format(value));

  useEffect(() => {
    setText(format(value));
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        inputMode="numeric"
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value;
          const num = parseMoneyInput(raw);
          setText(format(num));
          onChange(num);
        }}
        className="pr-9 font-mono tabular-nums"
      />
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
        đ
      </span>
    </div>
  );
}
