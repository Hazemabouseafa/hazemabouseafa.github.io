import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131315",
        }}
      >
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "28px",
            border: "4px solid #5C3B28",
            background: "#1E1E21",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              background: "#9F67FF",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
