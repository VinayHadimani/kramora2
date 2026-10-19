"use client";

import { Star } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TESTIMONIALS, FAQS } from "@/lib/site-data";

export function ReviewsPage() {
  return (
    <div>
      <PageHero
        page="reviews"
        title={
          <>
            What 27+ teams{" "}
            <Acc>say after shipping.</Acc>
          </>
        }
        sub="Six quotes from the field, and the five questions every new client asks — answered straight."
      />

      {/* ---------- Testimonials ---------- */}
      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="Testimonials"
            title={
              <>
                5.0 average,{" "}
            <Acc>across the board.</Acc>
              </>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name + t.role} delay={(i % 3) * 80} y={22}>
              <figure className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7">
                <span className="flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section className="pt-0 md:pt-2">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionHead
              kicker="FAQ"
              title={
                <>
                  The five questions{" "}
            <Acc>everyone asks.</Acc>
                </>
              }
              sub="Anything else — the strategy call is the fastest way to an answer. We reply within 24 hours."
            />
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="border-slate-200"
                >
                  <AccordionTrigger className="rounded-2xl px-1 py-5 text-left font-display text-xl tracking-tight hover:no-underline sm:text-2xl [&>svg]:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-slate-500">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      <CTABand title="Have a question we missed?" sub="Book a free 30-minute strategy call — straight answers, no pitch deck." />
      <NextBand from="reviews" />
    </div>
  );
}
