import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculator/calculator-shell";

export const metadata: Metadata = {
  title: "Tính Phí Sàn Shopee 2026 — Mall & Shop Thường",
  description:
    "Công cụ miễn phí tính phí Shopee Mall và Shop Thường: phí cố định, phí thanh toán, voucher Xtra, Pi Ship, thuế HKD và lợi nhuận chính xác theo công thức 2026.",
};

export default function HomePage() {
  return <CalculatorShell />;
}
