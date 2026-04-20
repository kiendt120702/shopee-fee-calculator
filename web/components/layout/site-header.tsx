"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BetacomLogo } from "./betacom-logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const onCalc = pathname === "/calculator";
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 lg:h-18">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <BetacomLogo size={32} />
          <span className="truncate text-base font-bold tracking-tight sm:text-lg lg:text-xl">
            Tính Phí Shopee
            <span className="ml-1 text-sm font-semibold text-primary sm:text-base lg:text-lg">
              · Betacom
            </span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/calculator"
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm",
              onCalc
                ? "bg-primary text-primary-foreground shadow shadow-primary/20"
                : "bg-primary/10 text-primary hover:bg-primary/15"
            )}
          >
            Tính ngay
          </Link>
          <a
            href="https://betacom.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary sm:inline-flex sm:text-sm"
          >
            betacom.vn ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
