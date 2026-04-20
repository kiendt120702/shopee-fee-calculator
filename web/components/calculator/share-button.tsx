"use client";

import { toast } from "sonner";
import { encodeToParams } from "@/lib/url-state";
import { trackEvent } from "@/lib/analytics";
import type { CalculatorState } from "./use-calculator";
import type { CategorySelection } from "@/components/common/category-cascader";

interface ShareButtonProps {
  state: CalculatorState;
  category: CategorySelection;
}

export function ShareButton({ state, category }: ShareButtonProps) {
  const handleShare = async () => {
    const params = encodeToParams(state.input, category);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Đã copy link kết quả vào clipboard");
      trackEvent("share_clicked", { mode: state.mode });
    } catch {
      toast.error("Không thể copy. Hãy copy thủ công từ thanh địa chỉ.");
    }
    history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90"
    >
      Chia sẻ link kết quả
    </button>
  );
}
