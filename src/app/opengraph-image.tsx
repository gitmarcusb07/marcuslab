import { ImageResponse } from "next/og";

export const alt = "MarcusLab — Building Ideas. Creating Possibilities.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#101C2D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#F7F9FC",
          fontFamily: "Sora, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(105deg, #FF791F 8%, #FFB27A 48%, #168BFF 105%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 24,
          }}
        >
          MARCUSLAB.
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#8DC7FF",
            letterSpacing: "0.05em",
          }}
        >
          Building Ideas. Creating Possibilities.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            color: "#F7F9FC",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div style={{ width: 1, height: 24, background: "#168BFF" }} />
          <span>marcuslab.in</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
