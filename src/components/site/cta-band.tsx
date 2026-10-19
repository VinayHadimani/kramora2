"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

/**
 * Shared closing CTA band — a bold indigo panel that invites the
 * visitor to the contact page. Used across the site.
 */
export function CTABand({
  title = "Have a project in mind?",
  sub = "Book a free 30-minute strategy call. We reply within 24 hours.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6">
      <Reveal y={20}>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center sm:px-12 md:py-20">
          {/* decorative rings */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-8 h-44 w-44 rounded-full border border-white/10"
          />

          <h2 className="relative font-display text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80">
            {sub}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100">
              <a href="#/contact" className="gap-1.5">
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#/process">See our process</a>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
