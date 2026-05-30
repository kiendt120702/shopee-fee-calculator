import Link from "next/link";
import { formatDataDate } from "@/lib/data/data-meta";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-3 py-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 sm:text-xs">
        <p>
          © {new Date().getFullYear()} Betacom. Biểu phí cập nhật{" "}
          <span className="font-semibold text-foreground">
            {formatDataDate()}
          </span>
          . Số liệu mang tính chất ước tính, dựa trên công thức tham khảo Shopee
          2026.
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/calculator" className="hover:text-primary">
            Tính phí
          </Link>
          <Link href="/bang-phi" className="hover:text-primary">
            Bảng phí
          </Link>
          <Link href="/updates" className="hover:text-primary">
            Cập nhật sàn
          </Link>
          <span>
            By <span className="font-semibold text-primary">Betacom IT</span>
          </span>
        </nav>
      </div>
    </footer>
  );
}
