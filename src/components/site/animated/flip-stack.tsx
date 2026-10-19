"use client";

import { useRef } from "react";
import { clamp, useScrollFrames } from "@/lib/motion";
import type { CaseStudy } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * CaseStudyFlipStack (light mode) — sticky cards that stack with a
 * depth scale + dim as the next card scrolls over. Transform-only,
 * updated inside the shared rAF engine.
 */
export function CaseStudyFlipStack({ cases }: { cases: CaseStudy[] }) {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollFrames(() => {
    const vh = window.innerHeight;
    const STICKY = 96;
    for (let i = 0; i < cases.length - 1; i++) {
      const next = wrapRefs.current[i + 1];
      const card = cardRefs.current[i];
      const dim = dimRefs.current[i];
      if (!next || !card || !dim) continue;
      const nextTop = next.getBoundingClientRect().top;
      if (nextTop > vh + 400 || nextTop < -400) continue;
      const p = clamp(1 - (nextTop - STICKY) / (vh * 0.7), 0, 1);
      card.style.transform = `scale(${(1 - p * 0.055).toFixed(4)})`;
      dim.style.opacity = (p * 0.6).toFixed(3);
    }
  });

  return (
    <div className="relative">
      {cases.map((c, i) => (
        <div
          key={c.id}
          ref={(el) => {
            wrapRefs.current[i] = el;
          }}
          className={cn("sticky top-24", i < cases.length - 1 && "mb-[13vh]")}
          style={{ zIndex: i + 1 }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn(
              "relative flex aspect-[3/4] min-h-[500px] w-full flex-col justify-between overflow-hidden rounded-3xl border bg-white p-7 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] transition-shadow md:aspect-[16/9] md:min-h-[520px] md:p-12",
              c.featured
                ? "border-primary/30"
                : "border-slate-200",
              "will-change-transform",
            )}
            style={{ transformOrigin: "50% 20%" }}
          >
            {c.featured && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-primary"
              />
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold",
                    c.featured
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {c.category}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                    c.featured
                      ? "border-primary/30 text-primary"
                      : "border-slate-200 text-slate-400",
                  )}
                >
                  {c.featured ? "Featured" : "Placeholder"}
                </span>
              </div>
              <h3 className="mt-6 max-w-2xl font-display text-3xl leading-[1.06] tracking-tight text-slate-900 sm:text-4xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                {c.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-end gap-4 border-t border-slate-100 pt-6">
              <span
                className={cn(
                  "font-display text-6xl leading-none tracking-tight sm:text-7xl",
                  c.featured ? "text-primary" : "text-slate-300",
                )}
              >
                {c.stat}
              </span>
              <span className="pb-2 text-sm font-medium text-slate-400">
                {c.statLabel}
              </span>
            </div>

            <div
              ref={(el) => {
                dimRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-slate-900/[0.06]"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
