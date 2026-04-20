import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tính phí sàn Shopee — Betacom";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg,#fff 0%,#fff5f4 100%)",
          padding: "80px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#E63027",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
            display: "flex",
          }}
        >
          BETACOM
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 800,
            color: "#0a0a0a",
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          Tính phí sàn Shopee 2026
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#525252",
            display: "flex",
            maxWidth: 900,
          }}
        >
          Mall &amp; Shop Thường · So sánh 4 kịch bản · Tính ngược giá bán · Miễn phí
        </div>
      </div>
    ),
    { ...size }
  );
}
