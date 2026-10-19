"use client";

import { ArrowRight, Bot, BrainCircuit, MessagesSquare, Network, Search } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { VantaNet } from "@/components/site/animated/vanta-net";
import { STATS } from "@/lib/site-data";

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    desc: "Forecasting, scoring, vision and custom training — from feature stores to evaluation harnesses, built to pass review.",
    points: ["Custom model training", "Evaluation suites", "Drift monitoring"],
  },
  {
    icon: Bot,
    title: "NLP",
    desc: "Classification, entity recognition and summarization pipelines that hold up in regulated environments.",
    points: ["Entity extraction", "Summarization", "Multilingual"],
  },
  {
    icon: Network,
    title: "LLM Applications",
    desc: "Product-grade LLM features — not demos. Guardrails, caching and cost controls designed in from day one.",
    points: ["Guardrails & evals", "Cost controls", "Structured outputs"],
  },
  {
    icon: Search,
    title: "RAG Systems",
    desc: "Retrieval-augmented generation with citations, entitlements and the audit trail counsel actually signs.",
    points: ["Cited answers", "Entitlement-aware retrieval", "Audit trails"],
  },
  {
    icon: MessagesSquare,
    title: "AI Agents",
    desc: "Autonomous workflows that know their limits — tool use, checkpoints and escalation paths to a human.",
    points: ["Tool use", "Human checkpoints", "Escalation paths"],
  },
];

export function AiPage() {
  return (
    <div>
      <PageHero
        page="ai"
        decor={<VantaNet subtle />}
        title={
          <>
            Artificial intelligence that ships —{" "}
            <Acc>not just demos.</Acc>
          </>
        }
        sub="Deep dive into the AI & Gen AI hub: machine learning, NLP, LLM applications, RAG systems and autonomous agents — production-grade, evaluated and documented."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="Capabilities"
            title={
              <>
                Five disciplines, <Acc>one</Acc> engineering standard.
              </>
            }
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

          {/* proof card */}
          <Reveal delay={160} y={22}>
            <a
              href="#/work"
              className="group flex h-full flex-col justify-between rounded-3xl bg-primary p-6 text-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/30 sm:p-7"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                  Flagship result
                </p>
                <p className="mt-4 font-display text-5xl leading-none">
                  {STATS.docs}
                  <span className="ml-2 text-lg">{STATS.docsUnit}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Our insurance document pipeline — generative AI with
                  human-in-the-loop review, straight into production.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                See the case study
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0 md:pt-2">
        <Reveal>
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-7 sm:grid-cols-3 sm:p-9">
            <div>
              <p className="font-display text-4xl text-slate-900">{STATS.models}</p>
              <p className="mt-1 text-sm text-slate-500">models in production</p>
            </div>
            <div>
              <p className="font-display text-4xl text-slate-900">{STATS.pipelines}</p>
              <p className="mt-1 text-sm text-slate-500">pipelines running</p>
            </div>
            <div>
              <p className="font-display text-4xl text-slate-900">{STATS.modelPerf}</p>
              <p className="mt-1 text-sm text-slate-500">model performance, last 24h</p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTABand title="Planning an AI feature?" sub="Book a free 30-minute strategy call — we'll pressure-test the idea with you." />
      <NextBand from="ai" />
    </div>
  );
}
