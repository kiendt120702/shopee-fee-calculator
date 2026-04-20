import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculator/calculator-shell";

export const metadata: Metadata = {
  title: "Tính phí Shop Thường",
  description:
    "Công cụ tính phí Shop Thường: phí cố định mới từ 29/12/2025 (đã bao gồm VAT 8%), thanh toán, voucher, Pi Ship và lợi nhuận.",
};

export default function ThuongPage() {
  return <CalculatorShell mode="thuong" />;
}
