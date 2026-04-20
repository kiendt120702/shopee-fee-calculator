import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface BentoCardProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function BentoCard({
  title,
  description,
  className,
  children,
  action,
}: BentoCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6",
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </Card>
  );
}
