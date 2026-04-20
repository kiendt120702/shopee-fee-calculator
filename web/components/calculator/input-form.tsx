"use client";

import { useState } from "react";
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
import { formatPercent } from "@/lib/format";

interface InputFormProps {
  state: CalculatorState;
  category: CategorySelection;
  onCategoryChange: (sel: CategorySelection, fee: number | null) => void;
}

export function InputForm({ state, category, onCategoryChange }: InputFormProps) {
  const { input, setField, reset, mode } = state;
  const [advanced, setAdvanced] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <BentoCard
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
        title="Tham số nâng cao"
        description="Tuỳ chỉnh phí thanh toán, QC, voucher, thuế…"
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setAdvanced((v) => !v)}
          >
            {advanced ? "Ẩn" : "Hiện"}
          </Button>
        }
      >
        {advanced && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phí thanh toán">
              <PercentInput
                value={input.phiThanhToan}
                onChange={(v) => setField("phiThanhToan", v)}
              />
            </Field>
            <Field label="Phí Voucher Xtra">
              <PercentInput
                value={input.phiVoucherXtra}
                onChange={(v) => setField("phiVoucherXtra", v)}
              />
            </Field>
            {mode === "mall" && (
              <Field label="Phí hạ tầng">
                <MoneyInput
                  value={input.phiHaTang}
                  onChange={(v) => setField("phiHaTang", v)}
                />
              </Field>
            )}
            <Field label="Phí ship TB khách thanh toán">
              <MoneyInput
                value={input.phiShipKhTb}
                onChange={(v) => setField("phiShipKhTb", v)}
              />
            </Field>
            <Field label="Phí Pi Ship / đơn">
              <MoneyInput
                value={input.piShip}
                onChange={(v) => setField("piShip", v)}
              />
            </Field>
            <Field label="Phí ship hoàn (nếu không Pi Ship)">
              <MoneyInput
                value={input.phiShipHoan}
                onChange={(v) => setField("phiShipHoan", v)}
              />
            </Field>
            <Field label="Tỉ lệ hoàn đơn">
              <PercentInput
                value={input.tiLeHoan}
                onChange={(v) => setField("tiLeHoan", v)}
              />
            </Field>
            <Field label="Phí quảng cáo ước tính">
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
            <Field label="Thuế HKD ước tính">
              <PercentInput
                value={input.phiThue}
                onChange={(v) => setField("phiThue", v)}
              />
            </Field>
          </div>
        )}
        {!advanced && (
          <p className="text-xs text-muted-foreground">
            Đang dùng mặc định: TT 4.91%, Voucher Xtra 4% (cap 50k), QC 10%,
            Thuế 1.5%, Tỉ lệ hoàn 10%.
          </p>
        )}
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
