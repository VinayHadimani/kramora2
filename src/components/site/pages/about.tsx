"use client";

import { Mail, MapPin } from "lucide-react";
import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { BRAND, PRINCIPLES, STATS } from "@/lib/site-data";

export function AboutPage() {
  return (
    <div>
      <PageHero
        page="about"
        title={
          <>
            {"AI-First. "}<Acc>Innovation-Driven.</Acc>{" Built for Growth."}
          </>
        }
        sub="Kramora AI is a senior-only AI agency headquartered in Issaquah, WA, with an engineering office in Bengaluru, India. We build intelligent products for teams that need velocity."
      />

      {/* ---------- Principles ---------- */}
      <Section className="pt-2 md:pt-4">
        <Reveal>
          <SectionHead
            kicker="The four core principles"
            title={
              <>
                What we optimize for,{" "}
            <Acc>on every engagement.</Acc>
              </>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 70} y={22}>
              <article className="group h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5">
                <span className="font-display text-4xl leading-none text-primary/25 transition-colors group-hover:text-primary/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Story ---------- */}
      <Section className="pt-0 md:pt-2">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHead
              kicker="Our story"
              title={
                <>
                  Started by engineers who were tired of{" "}
            <Acc>theatre.</Acc>
                </>
              }
            />
            <div className="space-y-4 text-[15px] leading-relaxed text-slate-500">
              <p>
                Kramora was founded on a simple observation: most AI projects
                don't fail on models — they fail on engineering. So we built
                the agency we would have hired: senior-only pods, weekly
                demos, and numbers we publish.
              </p>
              <p>
                Today we run {STATS.models} models across {STATS.pipelines}{" "}
                pipelines for {STATS.teams} teams, with {STATS.retention}{" "}
                retention and a {STATS.rating} rating. We reply within 24
                hours — and we say no when a project isn't right.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-primary">
                  {BRAND.email}
                </a>
              </span>
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-primary" />
                {BRAND.usOfficeFull} · {BRAND.inOfficeFull}
              </span>
            </div>
          </Reveal>

          {/* offices + stats panel */}
          <Reveal delay={120} y={30}>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-slate-100 p-7 sm:border-b-0 sm:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    US Headquarters
                  </p>
                  <p className="mt-2 font-display text-3xl tracking-tight text-slate-900">
                    Issaquah, WA
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Client partnerships, strategy and delivery leadership.
                  </p>
                </div>
                <div className="p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    India Office
                  </p>
                  <p className="mt-2 font-display text-3xl tracking-tight text-slate-900">
                    Bengaluru
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Engineering hub — {STATS.support} coverage across time zones.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 border-t border-slate-100">
                {[
                  { v: STATS.rating, l: "Client rating" },
                  { v: STATS.teams, l: "Teams served" },
                  { v: STATS.retention, l: "Retention" },
                ].map((s) => (
                  <div key={s.l} className="border-r border-slate-100 p-5 text-center last:border-r-0">
                    <p className="font-display text-3xl text-slate-900">{s.v}</p>
                    <p className="mt-1 text-xs text-slate-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand title="Sound like your kind of team?" sub="Book a free 30-minute strategy call — meet the people who'd build it." />
      <NextBand from="about" />
    </div>
  );
}
