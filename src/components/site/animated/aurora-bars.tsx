"use client";

import { useVisible } from "@/lib/motion";

const HEIGHTS = [42, 68, 55, 88, 62, 95, 48, 76, 58, 90, 44, 70, 52, 84, 60, 74];

/**
 * AuroraBars — a field of soft indigo bars that breathe behind a
 * stats row. Pure CSS animation (transform only), paused via the
 * shared visibility gate when scrolled out of view.
 *
 * Mobile bar-count reduction is pure CSS (`max-sm:hidden` on every
 * other bar): no JS state, no post-hydration re-render — the server
 * and client markup are byte-identical, so it can never contribute
 * to hydration diffs.
 */
export function AuroraBars() {
  const ref = useVisible<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-end justify-center gap-[1.6%] overflow-hidden px-[7%] [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]"
    >
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="aurora-bar flex-1 rounded-t-full max-sm:odd:hidden"
          style={{
            height: `${h}%`,
            background:
              "linear-gradient(to top, rgba(37,99,235,0.16), rgba(147,197,253,0.05) 68%, transparent 100%)",
            transformOrigin: "bottom",
            animation: `aurora-bar ${6.2 + (i % 3) * 0.9}s ease-in-out ${(i * -0.42).toFixed(2)}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
