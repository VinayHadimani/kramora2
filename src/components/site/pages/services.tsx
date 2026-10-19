"use client";

import { ArrowRight } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { CircuitBoard } from "@/components/site/animated/circuit-board";
import { HUBS, STATS } from "@/lib/site-data";
import { hashForPage, type PageId } from "@/lib/pages";

export function ServicesPage() {
  return (
    <div>
      <PageHero
        page="services"
        title={
          <>
            One partner across the entire{" "}
            <Acc>modern stack.</Acc>
          </>
        }
        sub="From LLM applications to Kubernetes clusters — eight technical hubs, one senior team, zero hand-offs. Explore the map below or jump straight into a hub."
      />

      {/* ---------- Circuit board centerpiece ---------- */}
      <Section className="pt-2 md:pt-4">
        <Reveal y={30}>
          <CircuitBoard />
        </Reveal>
      </Section>

      {/* ---------- 8 services grid ---------- */}
      <Section className="pt-2 md:pt-6">
        <Reveal>
          <SectionHead
            kicker="The eight hubs"
            title={
              <>
                Everything we build, <Acc>deep-dived</Acc> on its own page.
              </>
            }
            sub="Pages 03–06 explore each hub in detail — capabilities, deliverables and the numbers behind them."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HUBS.map((hub, i) => (
            <Reveal key={hub.id} delay={(i % 4) * 70} y={22}>
              <a
                href={hashForPage(hub.page as PageId)}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <hub.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-3xl leading-none text-slate-200 transition-colors group-hover:text-primary/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-tight text-slate-900">
                  {hub.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {hub.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Deep dive
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-3xl border border-slate-200 bg-slate-50/60 px-6 py-5 text-sm text-slate-500">
            <span>
              <strong className="font-semibold text-slate-900">{STATS.models} models</strong> in production
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span>
              <strong className="font-semibold text-slate-900">{STATS.pipelines} pipelines</strong> running
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span>
              <strong className="font-semibold text-slate-900">{STATS.modelPerf}</strong> model performance, last 24h
            </span>
          </div>
        </Reveal>
      </Section>

      <CTABand />
      <NextBand from="services" />
    </div>
  );
}
