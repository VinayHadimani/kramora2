"use client";

import { cn } from "@/lib/utils";

export type SwooshPhase = "idle" | "cover" | "reveal";

interface SwooshProps {
  phase: SwooshPhase;
  /** destination page title shown while the panel covers the screen */
  label: string;
  /** intro variant shows the wordmark larger */
  intro?: boolean;
}

/**
 * Swoosh page-transition overlay.
 * Two oversized, slightly rotated panels (indigo behind white) sweep
 * across the viewport — transform-only, GPU-composited, no layout cost.
 * Phases are driven by the router:
 *   idle (panels parked off-screen, transitions disabled) →
 *   cover (panel slides up to cover, 340ms) →
 *   reveal (panel exits upward, 520ms) → idle (instant reset).
 */
export function Swoosh({ phase, label, intro }: SwooshProps) {
  const panelStyle = (trail: boolean) => {
    switch (phase) {
      case "cover":
        return {
          transform: "translate3d(0, 0, 0) rotate(-2.2deg)",
          transition: `transform 0.34s cubic-bezier(0.55, 0, 0.25, 1) ${trail ? "80ms" : "0ms"}`,
          willChange: "transform",
        } as React.CSSProperties;
      case "reveal":
        return {
          transform: "translate3d(0, -112%, 0) rotate(-2.2deg)",
          transition: `transform 0.52s cubic-bezier(0.22, 1, 0.36, 1) ${trail ? "80ms" : "0ms"}`,
          willChange: "transform",
        } as React.CSSProperties;
      default:
        // parked below the viewport with transitions disabled — the
        // reveal→idle reset jumps instantly and invisibly
        return {
          transform: "translate3d(0, 106%, 0) rotate(-2.2deg)",
          transition: "none",
        } as React.CSSProperties;
    }
  };

  const labelVisible = phase === "cover";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      {/* trailing indigo panel — creates the layered sweep */}
      <div className="sw-panel absolute bg-primary" style={panelStyle(true)} />
      {/* front white panel carrying the label */}
      <div className="sw-panel absolute bg-white" style={panelStyle(false)}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            opacity: labelVisible ? 1 : 0,
            transform: `translateY(${labelVisible ? 0 : 14}px)`,
            transition: `opacity 0.2s ease ${labelVisible ? "140ms" : "0ms"}, transform 0.2s ease ${labelVisible ? "140ms" : "0ms"}`,
          }}
        >
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.35em]",
              intro ? "text-primary" : "text-slate-400",
            )}
          >
            {intro ? "Kramora AI" : "Kramora AI — Loading"}
          </span>
          <span
            className={cn(
              "font-display text-slate-900",
              intro ? "text-5xl italic sm:text-6xl" : "text-4xl italic sm:text-5xl",
            )}
          >
            {intro ? (
              <>
                {label}
                <span className="not-italic text-primary">.</span>
              </>
            ) : (
              label
            )}
          </span>
          {intro && (
            <span className="text-sm text-slate-500">
              AI-First. Innovation-Driven. Built for Growth.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
