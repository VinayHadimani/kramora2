"use client";

import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NextBand } from "@/components/site/next-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

export function NotFoundPage() {
  return (
    <div>
      <Section className="flex min-h-[62vh] flex-col items-center justify-center text-center md:min-h-[70vh]">
        <Reveal>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            <Compass className="h-4 w-4" />
            Page 18 — the custom 404
          </p>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-6 font-display text-[7rem] leading-none tracking-tight text-slate-900 sm:text-[10rem]">
            4<span className="italic text-primary">0</span>4
          </h1>
        </Reveal>
        <Reveal delay={170}>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-slate-500">
            This page drifted off the map. The other seventeen are exactly where
            we left them.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full shadow-xl shadow-primary/25">
              <a href="#/" className="gap-1.5">
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#/contact">Tell us what broke</a>
            </Button>
          </div>
        </Reveal>
      </Section>
      <NextBand from="notfound" />
    </div>
  );
}
