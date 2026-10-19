"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Timeline } from "@/components/site/animated/timeline";
import { PROCESS_STEPS, STATS } from "@/lib/site-data";

export function ProcessPage() {
  return (
    <div>
      <PageHero
        page="process"
        title={
          <>
            From idea to production — in{" "}
            <Acc>four moves.</Acc>
          </>
        }
        sub="Discover, Design, Build, Scale. The line below draws itself as you scroll — so does every project we run."
      />

      <Section className="pt-2 md:pt-6">
        <Reveal y={24}>
          <Timeline steps={PROCESS_STEPS} />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid gap-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-7 sm:grid-cols-3 sm:p-9">
            <div>
              <p className="font-display text-4xl text-slate-900">{STATS.speed}</p>
              <p className="mt-1 text-sm text-slate-500">faster than typical agency engagements</p>
            </div>
            <div>
              <p className="font-display text-4xl text-slate-900">{STATS.support}</p>
              <p className="mt-1 text-sm text-slate-500">delivery and support after launch</p>
            </div>
            <div>
              <p className="font-display text-4xl text-slate-900">{STATS.retention}</p>
              <p className="mt-1 text-sm text-slate-500">retention — most teams keep us</p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTABand title="Ready for move one?" sub="Book a free 30-minute strategy call — the audit starts there." />
      <NextBand from="process" />
    </div>
  );
}
