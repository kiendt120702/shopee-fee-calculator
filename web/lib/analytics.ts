import { track } from "@vercel/analytics";

type EventName =
  | "calc_used"
  | "mode_switched"
  | "reverse_calc_used"
  | "share_clicked"
  | "history_saved"
  | "history_restored";

export function trackEvent(name: EventName, props?: Record<string, string | number | boolean>) {
  try {
    track(name, props);
  } catch {
    // no-op in dev or if analytics blocked
  }
}
