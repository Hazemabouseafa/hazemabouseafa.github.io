import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "14px",
          border: "2px solid #5C3B28",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "999px",
            background: "#9F67FF",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
