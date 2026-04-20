import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type Accent = "default" | "primary" | "success" | "info" | "warning";

interface BentoCardProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  accent?: Accent;
  icon?: React.ReactNode;
}

const ACCENT_STYLES: Record<Accent, { card: string; iconWrap: string; title: string }> = {
  default: {
    card: "border-border/80 bg-card",
    iconWrap: "bg-muted text-muted-foreground",
    title: "text-foreground",
  },
  primary: {
    card: "border-primary/25 bg-gradient-to-br from-card via-card to-primary/[0.04]",
    iconWrap: "bg-primary/10 text-primary",
    title: "text-foreground",
  },
  success: {
    card: "border-[oklch(0.85_0.12_145)]/40 bg-gradient-to-br from-card via-card to-[oklch(0.92_0.08_145)]/30",
    iconWrap: "bg-[oklch(0.92_0.08_145)] text-[oklch(0.4_0.15_145)]",
    title: "text-foreground",
  },
  info: {
    card: "border-[oklch(0.78_0.12_240)]/30 bg-gradient-to-br from-card via-card to-[oklch(0.94_0.05_240)]/40",
    iconWrap: "bg-[oklch(0.94_0.05_240)] text-[oklch(0.45_0.15_240)]",
    title: "text-foreground",
  },
  warning: {
    card: "border-[oklch(0.85_0.12_75)]/40 bg-gradient-to-br from-card via-card to-[oklch(0.94_0.08_75)]/30",
    iconWrap: "bg-[oklch(0.94_0.08_75)] text-[oklch(0.5_0.15_60)]",
    title: "text-foreground",
  },
};

export function BentoCard({
  title,
  description,
  className,
  children,
  action,
  accent = "default",
  icon,
}: BentoCardProps) {
  const styles = ACCENT_STYLES[accent];
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 rounded-2xl border p-4 shadow-sm sm:p-5 lg:p-6",
        styles.card,
        className
      )}
    >
      {(title || action || icon) && (
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {icon && (
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg",
                  styles.iconWrap
                )}
              >
                {icon}
              </span>
            )}
            <div>
              {title && (
                <h3 className={cn("text-base font-semibold tracking-tight", styles.title)}>
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </Card>
  );
}
