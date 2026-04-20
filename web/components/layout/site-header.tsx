"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BetacomLogo } from "./betacom-logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/mall", label: "Shop Mall" },
  { href: "/thuong", label: "Shop Thường" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <BetacomLogo size={28} />
          <span className="text-sm font-semibold tracking-tight">
            Tính Phí Shopee
            <span className="ml-1 text-muted-foreground font-normal">· Betacom</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
