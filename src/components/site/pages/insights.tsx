"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { WorksWheel } from "@/components/site/animated/works-wheel";
import { ARTICLES } from "@/lib/site-data";

export function InsightsPage() {
  return (
    <div>
      <PageHero
        page="insights"
        title={
          <>
            Field notes from{" "}
            <Acc>the build.</Acc>
          </>
        }
        sub="Five insights from our engineering team — scroll to spin the wheel, click the top card to read. No hot takes; things we've actually shipped."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal y={24}>
          <WorksWheel articles={ARTICLES} />
        </Reveal>
      </Section>

      <CTABand title="Disagree with one of these?" sub="Even better — book a free 30-minute strategy call and tell us why." />
      <NextBand from="insights" />
    </div>
  );
}
