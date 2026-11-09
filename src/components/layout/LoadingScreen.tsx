import Image from "next/image";

const BRAND = "MARCUSLAB.";

/**
 * Purely presentational splash. It hides itself with CSS (no timers, no
 * scroll locking, no session state), so it can never trap the page — even if
 * hydration is slow or JavaScript fails.
 */
export default function LoadingScreen() {
  return (
    <div
      id="site-loader"
      className="site-loader fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-navy text-paper"
      role="status"
      aria-label="Loading MarcusLab"
    >
      <div aria-hidden="true" className="grid-lines-light absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,121,31,0.18),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_68%_58%,rgba(22,139,255,0.14),transparent_38%)]"
      />

      <div className="relative flex flex-col items-center px-6">
        <div className="relative mb-7 h-[74px] w-[74px]">
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-[1.7rem] border border-paper/10"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-4 animate-[spin_9s_linear_infinite] rounded-[2rem] border border-transparent border-t-orange/70 border-r-blue/30"
          />
          <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.35rem] border border-paper/20 bg-paper/10 p-1 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/logo.png"
              alt=""
              width={74}
              height={74}
              priority
              className="h-full w-full rounded-[1rem] object-cover"
            />
          </span>
        </div>

        <div className="flex overflow-hidden font-display text-[clamp(1.55rem,4vw,2.35rem)] font-bold tracking-[-0.06em]">
          {BRAND.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block animate-[loader-letter_520ms_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{
                animationDelay: `${120 + index * 34}ms`,
                color: letter === "." ? "#FF791F" : undefined,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="mt-5 h-px w-48 overflow-hidden bg-paper/10 sm:w-60">
          <div className="h-full w-full origin-left animate-[loader-progress_1.05s_cubic-bezier(0.22,1,0.36,1)_forwards] bg-gradient-to-r from-orange via-orange to-blue" />
        </div>

        <p className="mono mt-4 text-[0.54rem] tracking-[0.24em] text-paper/35">
          Calibrating the digital universe
        </p>
      </div>
    </div>
  );
}
