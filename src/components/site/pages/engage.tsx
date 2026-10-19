"use client";

import { ArrowRight, Check } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { ENGAGEMENTS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function EngagePage() {
  return (
    <div>
      <PageHero
        page="engage"
        title={
          <>
            Three ways to <Acc>work with us.</Acc>
          </>
        }
        sub="Fixed scope, dedicated pods or staff augmentation — same senior-only standard, different shapes. Most teams start with a pod."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="Engagement models"
            title={
              <>
                Pick the shape.{" "}
            <Acc>We bring the seniors.</Acc>
              </>
            }
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {ENGAGEMENTS.map((m, i) => (
            <Reveal key={m.id} delay={i * 90} y={24}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border bg-white p-7 transition-all duration-300 sm:p-8",
                  m.popular
                    ? "border-primary shadow-2xl shadow-primary/15 lg:-translate-y-3"
                    : "border-slate-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5",
                )}
              >
                {m.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-primary/30">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-3xl tracking-tight text-slate-900">
                  {m.name}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 text-sm font-medium",
                    m.popular ? "text-primary" : "text-slate-500",
                  )}
                >
                  {m.headline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{m.desc}</p>

                <ul className="mt-6 space-y-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          m.popular ? "bg-primary/15 text-primary" : "bg-slate-100 text-slate-500",
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <p className="text-xs text-slate-400">
                    Best for: <span className="text-slate-600">{m.bestFor}</span>
                  </p>
                  <a
                    href="#/contact"
                    className={cn(
                      "group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all",
                      m.popular
                        ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-600"
                        : "border border-slate-300 text-slate-800 hover:border-primary/50 hover:text-primary",
                    )}
                  >
                    Start with {m.name}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Not sure which fits? The strategy call ends with a recommendation — even if it's "none of the above yet."
          </p>
        </Reveal>
      </Section>

      <CTABand title="Still deciding?" sub="Book a free 30-minute strategy call — we'll recommend the right model." />
      <NextBand from="engage" />
    </div>
  );
}
