"use client";

import { ArrowRight } from "lucide-react";
import { PAGE_MAP, hashForPage, nextPageId, type PageId } from "@/lib/pages";
import { Reveal } from "./reveal";

/**
 * "Up next" band — closes every page with a guided link to the next
 * page in the sitemap, so the whole 18-page site can be browsed
 * end-to-end with a single, obvious control.
 */
export function NextBand({ from }: { from: PageId }) {
  const next = nextPageId(from);
  const nextMeta = PAGE_MAP[next];
  return (
    <Reveal y={14}>
      <a
        href={hashForPage(next)}
        className="group block border-t border-slate-200 transition-colors duration-300 hover:bg-primary"
        aria-label={`Next page: ${nextMeta.title}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-9 sm:px-6 md:py-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary transition-colors duration-300 group-hover:text-white/80">
              Up next — Page {nextMeta.n}
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-white sm:text-4xl">
              {nextMeta.title}
            </h2>
          </div>
          <ArrowRight
            className="h-9 w-9 shrink-0 text-primary transition-all duration-300 group-hover:translate-x-2 group-hover:text-white"
            strokeWidth={1.5}
          />
        </div>
      </a>
    </Reveal>
  );
}
