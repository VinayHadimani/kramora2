"use client";

import { useState } from "react";
import { ArrowRight, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section, SectionHead } from "@/components/site/section";
import { TextMorph } from "@/components/site/animated/text-morph";
import { AuroraBars } from "@/components/site/animated/aurora-bars";
import { LogoMarquee } from "@/components/site/animated/logo-marquee";
import { GlassCard } from "@/components/site/animated/glass-card";
import { VantaNet } from "@/components/site/animated/vanta-net";
import { BRAND, STATS, HUBS, LANDING_STATS, MORPH_PHRASES, CLIENT_LOGOS } from "@/lib/site-data";
import { hashForPage, type PageId } from "@/lib/pages";

function Stars({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function LandingPage() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <div className="page-fade-up">
      {/* ---------- Top banner ---------- */}
      {bannerOpen && (
        <div className="border-b border-primary/15 bg-primary/[0.06]">
          <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2.5 text-center">
            <p className="text-xs font-medium text-primary sm:text-[13px]">
              <span className="font-semibold">{BRAND.booking}</span>
              <span className="mx-2 hidden text-primary/40 sm:inline">·</span>
              <span className="hidden sm:inline">{BRAND.replyWindow}</span>
            </p>
            <button
              type="button"
              onClick={() => setBannerOpen(false)}
              aria-label="Dismiss banner"
              className="absolute right-4 rounded-full p-1.5 text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        {/* Vanta.js NET — pure-white WebGL canvas with indigo nodes.
            Cross-fades in after the headline paints (desktop);
            mobile keeps the lightweight CSS dot-grid + glow. */}
        <VantaNet />
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/[0.07] blur-3xl"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-14 sm:px-6 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 py-1.5 pl-2 pr-4 text-xs font-medium text-slate-600 shadow-sm">
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  AI Agency
                </span>
                {BRAND.tagline}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-7 font-display text-[2.9rem] leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.6rem]">
                We build
                <span className="block h-[1.32em] text-primary">
                  <TextMorph phrases={MORPH_PHRASES} className="italic" />
                </span>
                that scale.
              </h1>
            </Reveal>
            <Reveal delay={190}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-500">
                Kramora AI is a senior-only AI agency. We design, build and ship
                production-grade intelligent systems — 2–3x faster, with 97%
                retention and 24/7 delivery.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full shadow-xl shadow-primary/25">
                  <a href="#/contact" className="gap-1.5">
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href="#/services">Explore Services</a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Stars />
                  <strong className="font-semibold text-slate-900">{STATS.rating}</strong>
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block" />
                <span>
                  Trusted by <strong className="font-semibold text-slate-900">{STATS.teams} teams</strong>
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block" />
                <span>{STATS.support} delivery</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} y={36} className="relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-4 lg:mt-10">
              <GlassCard />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Social proof marquee ---------- */}
      <section aria-label="Trusted by" className="border-y border-slate-100 bg-slate-50/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-medium text-slate-500">
              <Stars className="inline h-3 w-3" /> {STATS.rating} — trusted by{" "}
              {STATS.teams} teams
            </p>
          </Reveal>
          <div className="mt-7">
            <LogoMarquee items={CLIENT_LOGOS} />
          </div>
        </div>
      </section>

      {/* ---------- Stats with AuroraBars ---------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <AuroraBars />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 text-center sm:grid-cols-3 sm:gap-6">
            {LANDING_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 110}>
                <p className="font-display text-6xl tracking-tight text-slate-900 md:text-7xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  {s.label}
                </p>
                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 8 Technical Hubs ---------- */}
      <Section id="hubs" className="pt-6 md:pt-8">
        <Reveal>
          <SectionHead
            kicker="Overview"
            title={
              <>
                Eight technical hubs,{" "}
                <em className="italic text-primary">one</em> delivery platform.
              </>
            }
            sub="A brief map of everything we build — each hub links to its dedicated page. Start anywhere; they're all connected."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HUBS.map((hub, i) => (
            <Reveal key={hub.id} delay={(i % 4) * 70} y={22}>
              <a
                href={hashForPage(hub.page as PageId)}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5 active:scale-[0.98] active:shadow-none"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <hub.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-2xl tracking-tight text-slate-900">
                  {hub.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {hub.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- CTA ---------- */}
      <div className="pt-4">
        <CTABand />
      </div>
      <NextBand from="home" />
    </div>
  );
}
