import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculator/calculator-shell";

export const metadata: Metadata = {
  title: "Công cụ tính phí Shopee Mall & Thường",
  description:
    "Tính phí cố định, phí thanh toán, voucher Xtra, Pi Ship, thuế HKD và lợi nhuận chính xác theo công thức Shopee 2026.",
};

export default function CalculatorPage() {
  return <CalculatorShell />;
}
