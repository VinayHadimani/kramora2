"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { CaseStudyFlipStack } from "@/components/site/animated/flip-stack";
import { CASES } from "@/lib/site-data";

export function WorkPage() {
  return (
    <div>
      <PageHero
        page="work"
        title={
          <>
            Proof, <Acc>in production.</Acc>
          </>
        }
        sub="Case studies from the field — scroll through the stack. The featured insurance deployment runs at 4.2k documents/hour; the next three write-ups are in preparation with those clients."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal y={30}>
          <CaseStudyFlipStack cases={CASES} />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-10 text-center text-sm text-slate-400">
            Placeholder case studies go live as soon as client review completes — ask us for references in the meantime.
          </p>
        </Reveal>
      </Section>

      <CTABand title="Want to be the next case study?" sub="Book a free 30-minute strategy call — we'll scope the first milestone together." />
      <NextBand from="work" />
    </div>
  );
}
