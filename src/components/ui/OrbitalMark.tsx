import { cn } from "@/lib/utils";

interface OrbitalMarkProps {
  className?: string;
  /** Use a light ring on dark surfaces. */
  tone?: "light" | "dark";
}

/** MarcusLab's compass-star mark. Also mirrored in app/icon.svg. */
export function OrbitalMark({ className, tone = "light" }: OrbitalMarkProps) {
  const ring = tone === "dark" ? "#F7F9FC" : "#101C2D";

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-9 w-9", className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="21.5" stroke={ring} strokeOpacity="0.16" />
      <circle
        cx="24"
        cy="24"
        r="16"
        stroke={ring}
        strokeOpacity="0.24"
        strokeDasharray="1 4"
        strokeLinecap="round"
      />
      <path
        d="M24 7.5L27.6 20.4L40.5 24L27.6 27.6L24 40.5L20.4 27.6L7.5 24L20.4 20.4L24 7.5Z"
        fill="#FF791F"
      />
      <path
        d="M24 13.5L26.4 21.6L34.5 24L26.4 26.4L24 34.5L21.6 26.4L13.5 24L21.6 21.6L24 13.5Z"
        fill="#168BFF"
        fillOpacity="0.9"
      />
      <circle cx="24" cy="24" r="3.2" fill="#F7F9FC" />
      <circle cx="38" cy="10" r="1.7" fill="#168BFF" />
    </svg>
  );
}
