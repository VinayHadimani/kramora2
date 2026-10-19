"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { INDUSTRIES } from "@/lib/site-data";

export function IndustriesPage() {
  return (
    <div>
      <PageHero
        page="industries"
        title={
          <>
            Twelve verticals,{" "}
            <Acc>one engineering standard.</Acc>
          </>
        }
        sub="From healthcare to travel — the domain changes, the discipline doesn't. Here's where we've shipped the most."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="The twelve verticals"
            title={
              <>
                Where our pods <Acc>ship the most.</Acc>
              </>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 70} y={20}>
              <article className="group h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <ind.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-slate-900">
                    {ind.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{ind.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand title="Working in one of these?" sub="Book a free 30-minute strategy call — we've probably shipped something similar." />
      <NextBand from="industries" />
    </div>
  );
}
