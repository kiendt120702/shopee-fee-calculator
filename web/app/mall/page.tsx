import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculator/calculator-shell";

export const metadata: Metadata = {
  title: "Tính phí Shopee Mall",
  description:
    "Công cụ tính phí Shopee Mall: phí cố định, thanh toán, voucher Xtra, Pi Ship và lợi nhuận chính xác theo công thức 2026.",
};

export default function MallPage() {
  return <CalculatorShell mode="mall" />;
}
