"use client";

import { ArrowRight, MonitorSmartphone, Workflow } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

const CAPABILITIES = [
  { icon: MonitorSmartphone, title: "Next.js Platforms", desc: "Production web platforms — typed, tested and observable from the first commit.", points: ["App Router", "TypeScript", "Edge-ready"] },
  { icon: MonitorSmartphone, title: "React Native Apps", desc: "One codebase, both stores — native feel, OTA updates and shared design systems.", points: ["iOS & Android", "OTA updates", "Shared design system"] },
  { icon: Workflow, title: "Workflow Automation", desc: "Internal operations encoded as software — approvals, hand-offs and reminders on rails.", points: ["Approvals", "State machines", "Audit logs"] },
  { icon: Workflow, title: "RPA", desc: "Bots that do the clicking nobody should — attended and unattended, with human checkpoints.", points: ["Attended & unattended", "Human checkpoints", "Exception queues"] },
  { icon: Workflow, title: "Orchestration", desc: "Multi-system processes with retries, compensation and full visibility — wired end to end.", points: ["Retries", "Compensation", "Observability"] },
];

export function WebPage() {
  return (
    <div>
      <PageHero
        page="web"
        title={
          <>
            Web, mobile & automation —{" "}
            <Acc>software people actually enjoy.</Acc>
          </>
        }
        sub="Deep dive into the engineering hub: Next.js platforms, React Native apps, workflow automation, RPA and orchestration that removes the busywork."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="Capabilities"
            title={
              <>
                Ship the interface,{" "}
            <Acc>automate</Acc> the rest.
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

          {/* engineering principles card */}
          <Reveal delay={160} y={22}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-primary/25 bg-primary/[0.05] p-6 sm:p-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Engineering standard
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Typed end to end — TypeScript from database to screen.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Observable by default — traces, logs and metrics on day one.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Weekly demos — working software, not slideware.
                  </li>
                </ul>
              </div>
              <a
                href="#/process"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                How we work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand title="A platform worth shipping?" sub="Book a free 30-minute strategy call — scope, stack and a plan in one call." />
      <NextBand from="web" />
    </div>
  );
}
