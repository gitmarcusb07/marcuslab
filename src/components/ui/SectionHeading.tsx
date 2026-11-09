import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
            dark ? "text-blue-soft" : "text-blue",
          )}
        >
          <span className="mono text-[0.62rem] font-medium opacity-60">
            {index}
          </span>
          <span className="h-px w-7 bg-current opacity-50" />
          <span className="mono text-[0.62rem] font-medium">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="w-full">
        <h2
          className={cn(
            "display mt-6 text-[clamp(2.9rem,7vw,6.3rem)]",
            dark ? "text-paper" : "text-navy",
            align === "center" && "mx-auto",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.14} className="w-full">
          <p
            className={cn(
              "pretty mt-6 max-w-xl text-[0.98rem] leading-7 sm:text-[1.04rem]",
              dark ? "text-paper/58" : "text-muted",
              align === "center" && "mx-auto",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
