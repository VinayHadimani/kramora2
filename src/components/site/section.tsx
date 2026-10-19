"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent page section shell. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Section heading block (kicker + title + sub), wrapped in Reveal. */
export function SectionHead({
  kicker,
  title,
  sub,
  className,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
        {kicker}
      </p>
      <h2 className="mt-3 max-w-3xl text-balance font-display text-3xl leading-[1.08] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 max-w-2xl text-pretty text-[17px] leading-relaxed text-slate-500">
          {sub}
        </p>
      )}
    </div>
  );
}
