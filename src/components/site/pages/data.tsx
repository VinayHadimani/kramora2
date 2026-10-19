"use client";

import { CloudCog, DatabaseZap, GitBranch, Layers, Radio, ServerCog, Warehouse } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { STATS } from "@/lib/site-data";

const CAPABILITIES = [
  { icon: GitBranch, title: "ETL / ELT", desc: "Batch and incremental pipelines with contracts, lineage and tests — boring in the best way.", points: ["dbt", "Airflow", "Data contracts"] },
  { icon: Radio, title: "Streaming", desc: "Event-driven pipelines processing data the moment it happens — keyed, exactly-once, observable.", points: ["Kafka", "Flink", "Real-time features"] },
  { icon: Warehouse, title: "Warehousing", desc: "Lakehouse and warehouse architectures modeled for the queries your teams actually run.", points: ["Snowflake", "Iceberg", "Modeling"] },
  { icon: CloudCog, title: "DevOps & SRE", desc: "24/7 platform reliability with SLOs, on-call runbooks and a paper trail.", points: ["SLOs", "Runbooks", "Observability"] },
  { icon: ServerCog, title: "Kubernetes", desc: "Clusters your team can operate — GitOps, autoscaling and progressive delivery as defaults.", points: ["GitOps", "Autoscaling", "Progressive delivery"] },
  { icon: Layers, title: "Multi-cloud", desc: "AWS, GCP and Azure by design — no hostage situations, portability where it pays.", points: ["AWS", "GCP", "Azure"] },
];

const FLOW = ["Ingest", "Pipeline", "Warehouse", "Serve"];

export function DataPage() {
  return (
    <div>
      <PageHero
        page="data"
        title={
          <>
            Data engineering & cloud, built{" "}
            <Acc>for the boring parts.</Acc>
          </>
        }
        sub="Deep dive into the data hub: ETL/ELT, streaming, warehousing, DevOps, Kubernetes and multi-cloud — the foundation every intelligent system stands on."
      />

      <Section className="pt-2 md:pt-4">
        {/* architecture strip */}
        <Reveal y={26}>
          <div className="mb-10 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex min-w-[540px] items-center gap-3">
              {FLOW.map((step, i) => (
                <div key={step} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Stage {i + 1}
                    </p>
                    <p className="mt-1 font-display text-2xl tracking-tight text-slate-900">
                      {step}
                    </p>
                  </div>
                  {i < FLOW.length - 1 && (
                    <span aria-hidden="true" className="h-px w-8 shrink-0 bg-primary/40" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm text-slate-400">
              One governed path from source to serving — with lineage at every hop.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <SectionHead
            kicker="Capabilities"
            title={
              <>
                Six disciplines, <Acc>zero</Acc> hand-offs.
              </>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 80} y={22}>
              <article className="group h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <c.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <DatabaseZap className="h-5 w-5 text-slate-200" aria-hidden="true" />
                </div>
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
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-slate-500">
            24/7 delivery · {STATS.retention} retention · every cluster ships with runbooks your team can operate.
          </p>
        </Reveal>
      </Section>

      <CTABand title="Your data platform, in weeks?" sub="Book a free 30-minute strategy call — we'll map the shortest path." />
      <NextBand from="data" />
    </div>
  );
}
