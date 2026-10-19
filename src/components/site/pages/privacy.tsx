"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Who we are",
    p: [
      "Kramora AI (“we”, “us”) is an AI engineering agency with offices in Issaquah, WA (United States) and Bengaluru (India). You can reach us at ashu@kramoraa.com. This policy explains how we handle personal information when you visit kramora sites or contact us.",
    ],
  },
  {
    h: "2. Information we collect",
    p: [
      "Contact details you give us directly — name, work email, company, budget range and project notes — when you submit a strategy-call request or email us.",
      "Basic technical data — pages visited and anonymized analytics — used only to keep the site fast and useful. We do not use third-party advertising trackers.",
    ],
  },
  {
    h: "3. How we use it",
    p: [
      "We reply to your enquiry (within 24 hours), prepare the free 30-minute strategy call, and keep a record of the engagement. That's it. We don't sell data, and we don't add you to marketing sequences you didn't ask for.",
    ],
  },
  {
    h: "4. Legal bases",
    p: [
      "We process enquiry data on the basis of your consent (submitting the form) and our legitimate interest in responding to prospective clients. You can withdraw consent at any time by emailing us.",
    ],
  },
  {
    h: "5. Retention",
    p: [
      "Enquiry records are kept for up to 24 months, then deleted, unless you become a client — in which case contract records apply. Analytics data is aggregated and anonymized.",
    ],
  },
  {
    h: "6. Sharing",
    p: [
      "We share data only with infrastructure providers who host this site and our email (under contract, to process it on our behalf). We never sell or rent personal information.",
    ],
  },
  {
    h: "7. Your rights",
    p: [
      "You can request access, correction, export or deletion of your personal information at any time by emailing ashu@kramoraa.com. We respond within 30 days.",
    ],
  },
  {
    h: "8. Security",
    p: [
      "Submissions are encrypted in transit, stored on access-controlled systems, and visible only to the team handling your enquiry. No system is perfect; we keep ours boring and well-audited.",
    ],
  },
  {
    h: "9. Changes",
    p: [
      "If this policy changes materially, we'll note the date at the top. Continued use after changes means acceptance.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <div>
      <PageHero
        page="privacy"
        title={
          <>
            Privacy Policy, <Acc>in plain English.</Acc>
          </>
        }
        sub="Last updated: Q3. Short version: we use your details to reply to you — nothing else."
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
      <NextBand from="privacy" />
    </div>
  );
}
