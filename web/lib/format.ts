const VND = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

const PERCENT = new Intl.NumberFormat("vi-VN", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export function formatVnd(value: number): string {
  return `${VND.format(Math.round(value))}đ`;
}

export function formatVndSigned(value: number): string {
  const rounded = Math.round(value);
  if (rounded > 0) return `+${VND.format(rounded)}đ`;
  return `${VND.format(rounded)}đ`;
}

export function formatPercent(value: number): string {
  return PERCENT.format(value);
}

export function parseMoneyInput(raw: string): number {
  const cleaned = raw.replace(/[^\d]/g, "");
  if (!cleaned) return 0;
  return Number.parseInt(cleaned, 10);
}

export function parsePercentInput(raw: string): number {
  const cleaned = raw.replace(/[^\d.,-]/g, "").replace(",", ".");
  const n = Number.parseFloat(cleaned);
  if (Number.isNaN(n)) return 0;
  return n / 100;
}
