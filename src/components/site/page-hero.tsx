"use client";

import type { ReactNode } from "react";
import { PAGE_MAP, type PageId } from "@/lib/pages";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  page: Exclude<PageId, "home">;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
  className?: string;
  /** optional ambient background layer (e.g. subtle VantaNet) */
  decor?: ReactNode;
}

/**
 * Shared inner-page hero: numbered eyebrow + serif title + sub copy.
 */
export function PageHero({ page, title, sub, children, className, decor }: PageHeroProps) {
  const meta = PAGE_MAP[page];
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_65%)]"
      />
      {decor}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 md:pb-14 md:pt-24">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-10 bg-primary/50" />
            Page {meta.n} — {meta.title}
          </p>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-[2.6rem] leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={170}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500">
              {sub}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Accent used inside hero titles: italic + primary color. */
export function Acc({ children }: { children: ReactNode }) {
  return <em className="italic text-primary">{children}</em>;
}
