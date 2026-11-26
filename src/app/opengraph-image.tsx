import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "ENG HAZEM — حازم أبوسعيفة | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#131315",
          color: "#F5F2EC",
          padding: "72px 84px",
          fontFamily: "sans-serif",
          borderBottom: "8px solid #7C3AED",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              backgroundColor: "#9F67FF",
            }}
          />
          <span>ENG HAZEM</span>
          <span style={{ color: "#9C6A4A" }}>·</span>
          <span style={{ color: "#B4B0AB" }}>HAZEM.MY</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.06,
              color: "#F5F2EC",
            }}
          >
            Software Engineer
          </div>
          <div style={{ fontSize: "30px", color: "#B4B0AB" }}>
            حازم أبوسعيفة · websites, apps, platforms & business software
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #5C3B28",
            paddingTop: "24px",
            fontSize: "22px",
            color: "#9F67FF",
          }}
        >
          <span>+20 155 061 2361</span>
          <span>hazem.my</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
