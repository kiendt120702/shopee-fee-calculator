"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BentoCard } from "@/components/common/bento-card";
import { MoneyInput } from "@/components/common/money-input";
import { PercentInput } from "@/components/common/percent-input";
import {
  CategoryCascader,
  type CategorySelection,
} from "@/components/common/category-cascader";
import type { CalculatorState } from "./use-calculator";
import { formatPercent, formatVnd } from "@/lib/format";

interface InputFormProps {
  state: CalculatorState;
  category: CategorySelection;
  onCategoryChange: (sel: CategorySelection, fee: number | null) => void;
}

export function InputForm({ state, category, onCategoryChange }: InputFormProps) {
  const { input, setField, reset, mode } = state;

  return (
    <div className="flex flex-col gap-5">
      <BentoCard
        accent="primary"
        title="Thông tin sản phẩm"
        description="Nhập giá nhập, giá bán và chọn ngành hàng"
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={reset}
            className="text-xs text-muted-foreground"
          >
            Reset
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="giaNhap" className="text-xs text-muted-foreground">
              Giá nhập
            </Label>
            <MoneyInput
              id="giaNhap"
              value={input.giaNhap}
              onChange={(v) => setField("giaNhap", v)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="giaBan" className="text-xs text-muted-foreground">
              Giá bán (niêm yết Shopee)
            </Label>
            <MoneyInput
              id="giaBan"
              value={input.giaBan}
              onChange={(v) => setField("giaBan", v)}
            />
          </div>
        </div>
        <Separator />
        <CategoryCascader
          mode={mode}
          value={category}
          onChange={onCategoryChange}
        />
        <div className="mt-1 flex items-center justify-between rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Phí cố định áp dụng</span>
          <span className="font-mono font-semibold text-primary">
            {formatPercent(input.phiCoDinh)}
          </span>
        </div>
      </BentoCard>

      <BentoCard
        accent="warning"
        title="Tham số nâng cao"
        description="Phí Shopee đã cố định, các tham số shop có thể chỉnh"
      >
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phí Shopee bắt buộc
            </h4>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Áp dụng mọi đơn
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <ReadOnlyField
              label="Phí thanh toán"
              value={formatPercent(input.phiThanhToan)}
              hint="Tính trên (giá bán + ship − voucher shop)"
            />
            {mode === "mall" && (
              <ReadOnlyField
                label="Phí hạ tầng"
                value={`${formatVnd(input.phiHaTang)} / đơn`}
              />
            )}
            <ReadOnlyField
              label="Thuế HKD"
              value={formatPercent(input.phiThue)}
              hint="Quy định nhà nước, đã bao gồm trong phí cố định"
            />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Dịch vụ tùy chọn
            </h4>
            <span className="rounded-full bg-[oklch(0.92_0.08_240)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.45_0.15_240)]">
              Shop chọn bật/tắt
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Bảng kết quả tự tính cả 4 kịch bản có/không 2 dịch vụ này.
          </p>
          <div className="flex flex-col gap-1.5">
            <ReadOnlyField
              label="Phí Voucher Xtra"
              value={`${formatPercent(input.phiVoucherXtra)} · cap ${formatVnd(50000)}`}
              hint="Khi đăng ký chương trình trợ giá Voucher Xtra"
            />
            <ReadOnlyField
              label="Phí Pi Ship / đơn"
              value={formatVnd(input.piShip)}
              hint="Khi đăng ký dịch vụ Pi Ship (tránh phí ship hoàn)"
            />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tham số shop tự ước tính
            </h4>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              Có thể chỉnh
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Field label="Phí quảng cáo">
              <PercentInput
                value={input.phiQc}
                onChange={(v) => setField("phiQc", v)}
              />
            </Field>
            <Field label="Voucher của shop">
              <PercentInput
                value={input.phiVoucherShop}
                onChange={(v) => setField("phiVoucherShop", v)}
              />
            </Field>
            <Field label="Tỉ lệ hoàn đơn">
              <PercentInput
                value={input.tiLeHoan}
                onChange={(v) => setField("tiLeHoan", v)}
              />
            </Field>
            <Field label="Phí ship TB khách thanh toán">
              <MoneyInput
                value={input.phiShipKhTb}
                onChange={(v) => setField("phiShipKhTb", v)}
              />
            </Field>
            <Field label="Phí ship hoàn / đơn (nếu không Pi Ship)">
              <MoneyInput
                value={input.phiShipHoan}
                onChange={(v) => setField("phiShipHoan", v)}
              />
            </Field>
            <Field label="Phí khác (đóng gói, nhân công, kho bãi…)">
              <PercentInput
                value={input.phiKhac}
                onChange={(v) => setField("phiKhac", v)}
              />
            </Field>
          </div>
        </section>
      </BentoCard>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ReadOnlyField({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2">
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-medium text-foreground">
          {label}
        </div>
        {hint && (
          <div className="truncate text-[10px] text-muted-foreground">
            {hint}
          </div>
        )}
      </div>
      <span className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold tabular-nums text-primary">
        {value}
      </span>
    </div>
  );
}
