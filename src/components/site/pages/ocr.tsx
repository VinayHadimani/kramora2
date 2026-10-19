"use client";

import { FileStack, ScanText, Sparkles, UserCog, Users } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { STATS } from "@/lib/site-data";

const CAPABILITIES = [
  { icon: ScanText, title: "IDP — Intelligent Document Processing", desc: "Classify, extract, validate and route — with confidence thresholds that route exceptions to humans.", points: ["Classification", "Extraction", "Validation"] },
  { icon: FileStack, title: "OCR at scale", desc: "Printed and handwriting-adjacent text across formats — scans, faxes, PDFs and photos.", points: ["Multi-format", "Confidence scores", "Layout awareness"] },
  { icon: Sparkles, title: "Structured Data Extraction", desc: "Turning unstructured documents into typed records your systems can consume directly.", points: ["Typed records", "Schema output", "Entity resolution"] },
  { icon: Users, title: "Dedicated Teams", desc: "Senior pods that embed with your team — your process, our people, full IP transfer.", points: ["4–6 seniors", "Weekly demos", "Full IP transfer"] },
  { icon: UserCog, title: "Managed Pods", desc: "We run the pod end to end — capacity planning, coverage and 24/7 support included.", points: ["24/7 coverage", "Capacity planning", "SLAs"] },
];

export function OcrPage() {
  return (
    <div>
      <PageHero
        page="ocr"
        title={
          <>
            Documents in, decisions out —{" "}
            <Acc>at 4.2k an hour.</Acc>
          </>
        }
        sub="Deep dive into the document hub: IDP, OCR, structured data extraction — plus dedicated teams and managed pods that plug straight into your org."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="Capabilities"
            title={
              <>
                Read it, structure it,{" "}
            <Acc>route it.</Acc>
              </>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 80} y={22}>
              <article className="group h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <c.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-2xl tracking-tight text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          {/* flagship stat card */}
          <Reveal delay={160} y={22}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-slate-900 p-6 text-white sm:p-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                  Insurance · Generative AI
                </p>
                <p className="mt-5 font-display text-6xl leading-none">
                  {STATS.docs}
                  <span className="ml-2 text-xl font-sans text-white/60">
                    {STATS.docsUnit}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Policy documents extracted, classified and routed — with
                  human-in-the-loop review exactly where counsel requires it.
                </p>
              </div>
              <a
                href="#/work"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                See the case study
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand title="Drowning in documents?" sub="Book a free 30-minute strategy call — we'll size the pipeline with you." />
      <NextBand from="ocr" />
    </div>
  );
}
