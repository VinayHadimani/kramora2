"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. These terms",
    p: [
      "By using this website you agree to these terms. They cover the site itself — engagement terms for client work are defined in a separate signed statement of work.",
    ],
  },
  {
    h: "2. The website",
    p: [
      "This site describes Kramora AI's services. Figures shown — like 4.2k documents/hour or 97% retention — reflect our internal tracking and are updated quarterly. They're illustrative of typical engagements, not a warranty of outcomes.",
    ],
  },
  {
    h: "3. Case studies & content",
    p: [
      "Case studies marked as placeholders are pending client review. Insights articles reflect our engineering opinion at time of publication and may change as the field moves.",
    ],
  },
  {
    h: "4. Acceptable use",
    p: [
      "Don't probe, scrape at volume, or attempt to disrupt the site. Automated access for indexing (search engines) is welcome.",
    ],
  },
  {
    h: "5. Intellectual property",
    p: [
      "The site content, wordmark and design are ours. For client engagements: everything we build under a signed SOW — code, models, prompts, evaluation suites — transfers to the client. No lock-in, ever.",
    ],
  },
  {
    h: "6. Liability",
    p: [
      "The site is provided “as is”. To the maximum extent permitted by law, we're not liable for indirect damages arising from use of the website. Nothing here limits our obligations under a signed client agreement.",
    ],
  },
  {
    h: "7. Governing law",
    p: [
      "These terms are governed by the laws of the State of Washington, USA, without regard to conflict-of-law rules.",
    ],
  },
  {
    h: "8. Contact",
    p: [
      "Questions about these terms: ashu@kramoraa.com — we reply within 24 hours.",
    ],
  },
];

export function TermsPage() {
  return (
    <div>
      <PageHero
        page="terms"
        title={
          <>
            Terms of Service, <Acc>no traps.</Acc>
          </>
        }
        sub="Last updated: Q3. The short version: be reasonable, and everything we build for clients is theirs."
      />
      <Section className="pt-2 md:pt-6">
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.h} delay={Math.min(i * 40, 200)} y={16}>
              <section>
                <h2 className="font-display text-2xl tracking-tight text-slate-900">{s.h}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-600">
                  {s.p.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </Section>
      <NextBand from="terms" />
    </div>
  );
}
