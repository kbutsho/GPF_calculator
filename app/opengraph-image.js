import { ImageResponse } from "next/og";

// Social share card. English text only: the default OG font has no Bangla glyphs.
export const alt = "GPF Calculator — General Provident Fund profit & closing balance calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #115e59 0%, #0d9488 60%, #14b8a6 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34, opacity: 0.9 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#fff",
              color: "#0f766e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            %
          </div>
          GPF Calculator · Bangladesh
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 36, maxWidth: 1000 }}>
          Your GPF year-end profit, accurate to the paisa
        </div>
        <div style={{ fontSize: 34, marginTop: 30, opacity: 0.9, maxWidth: 1000 }}>
          Slab rates 13% · 12% · 11% · month-wise subscription profit · statement check · free
        </div>
      </div>
    ),
    size
  );
}
