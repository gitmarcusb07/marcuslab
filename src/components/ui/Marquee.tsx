import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Duration of one full loop, in seconds. */
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
}

/**
 * A lightweight CSS marquee. The duplicated set is hidden from assistive tech
 * and the animation pauses on hover.
 */
export function Marquee({
  items,
  duration = 34,
  className,
  itemClassName,
  separator = "✦",
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee edge-fade-x overflow-hidden", className)}
      aria-label={items.join(" · ")}
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item, index) => (
              <div
                key={`${copy}-${item}-${index}`}
                className={cn(
                  "flex shrink-0 items-center gap-6 px-6 sm:gap-8 sm:px-8",
                  itemClassName,
                )}
              >
                <span>{item}</span>
                <span className="text-orange" aria-hidden="true">
                  {separator}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
