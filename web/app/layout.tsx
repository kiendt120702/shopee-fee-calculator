import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopee-fee.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tính Phí Sàn Shopee 2026 — Betacom",
    template: "%s | Tính Phí Shopee — Betacom",
  },
  description:
    "Công cụ tính phí Shopee Mall & Thường miễn phí. Tính lợi nhuận, phí cố định, phí thanh toán, voucher Xtra, Pi Ship, thuế HKD chính xác theo công thức Shopee 2026.",
  keywords: [
    "tính phí shopee",
    "phí shopee mall",
    "phí shopee thường",
    "tính lợi nhuận shopee",
    "pi ship",
    "voucher xtra",
    "betacom",
  ],
  authors: [{ name: "Betacom" }],
  creator: "Betacom",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Tính Phí Shopee — Betacom",
    title: "Tính Phí Sàn Shopee 2026 — Betacom",
    description:
      "Tính phí và lợi nhuận khi bán hàng trên Shopee Mall & Shop Thường — chính xác theo bảng phí 2026.",
  },
  icons: {
    icon: "/betacomlogo.png",
    apple: "/betacomlogo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#E63027",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Tính Phí Shopee — Betacom",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              inLanguage: "vi-VN",
              offers: { "@type": "Offer", price: "0", priceCurrency: "VND" },
              creator: { "@type": "Organization", name: "Betacom" },
            }),
          }}
        />
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <Toaster richColors position="top-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
