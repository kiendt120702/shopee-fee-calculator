import Link from "next/link";
import { BetacomLogo } from "./betacom-logo";

export function SiteHeader() {
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
        <a
          href="https://betacom.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold text-muted-foreground hover:text-primary sm:text-sm lg:text-base"
        >
          betacom.vn ↗
        </a>
      </div>
    </header>
  );
}
