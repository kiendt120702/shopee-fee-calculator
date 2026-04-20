import Link from "next/link";
import { BetacomLogo } from "./betacom-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <BetacomLogo size={40} />
          <span className="text-lg font-bold tracking-tight sm:text-xl">
            Tính Phí Shopee
            <span className="ml-1.5 text-base font-semibold text-primary sm:text-lg">
              · Betacom
            </span>
          </span>
        </Link>
        <a
          href="https://betacom.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-muted-foreground hover:text-primary sm:text-base"
        >
          betacom.vn ↗
        </a>
      </div>
    </header>
  );
}
