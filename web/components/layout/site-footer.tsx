export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-3 py-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 sm:text-xs">
        <p>
          © {new Date().getFullYear()} Betacom. Số liệu mang tính chất ước
          tính, dựa trên công thức tham khảo Shopee 2026.
        </p>
        <p>
          By <span className="font-semibold text-primary">Betacom IT</span>
        </p>
      </div>
    </footer>
  );
}
