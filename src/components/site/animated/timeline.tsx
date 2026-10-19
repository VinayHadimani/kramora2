"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { clamp, useScrollFrames } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Step {
  n: string;
  title: string;
  weeks: string;
  desc: string;
  chips: string[];
}

/**
 * Process Timeline (light mode: white bg, slate text, indigo line).
 * The center line draws itself as you scroll — the fill height and
 * node states are updated inside the shared rAF engine.
 */
export function Timeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, steps.length);
  }, [steps.length]);

  useScrollFrames(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const rect = list.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
    const start = window.innerHeight * 0.72;
    const p = clamp((start - rect.top) / rect.height, 0, 1);
    fill.style.height = `${(p * 100).toFixed(2)}%`;
    const listH = list.offsetHeight;
    const listTop = rect.top;
    nodeRefs.current.forEach((node) => {
      if (!node) return;
      // measure against the LIST, not offsetParent (each row is
      // `relative`, so node.offsetTop is always ~8 — which lit every
      // node at once instead of as the line reaches them)
      const top = node.getBoundingClientRect().top - listTop;
      const passed = top + 8 <= p * listH;
      node.classList.toggle("passed", passed);
    });
  });

  return (
    <div ref={listRef} className="relative">
      {/* base line */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[22px] top-0 w-px bg-slate-200 md:left-1/2"
      />
      {/* progress fill */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[22px] top-0 w-px md:left-1/2"
      >
        <div ref={fillRef} className="absolute left-0 top-0 w-px bg-primary" style={{ height: "0%" }} />
      </span>

      <div className="space-y-10 md:space-y-16">
        {steps.map((step, i) => {
          const leftSide = i % 2 === 0;
          return (
            <div key={step.n} className="relative md:grid md:grid-cols-2 md:gap-24">
              {/* node */}
              <span
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="tl-node absolute left-[22px] top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-slate-300 bg-white transition-colors duration-500 md:left-1/2"
              />
              <div
                className={cn(
                  "pl-12 md:pl-0",
                  leftSide ? "md:col-start-1 md:pr-4" : "md:col-start-2 md:pl-4",
                )}
              >
                <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-display text-4xl leading-none text-primary/25 transition-colors group-hover:text-primary/50">
                      {step.n}
                    </span>
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {step.weeks}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-display text-2xl tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">
                    {step.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
