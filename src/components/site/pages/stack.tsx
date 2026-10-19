"use client";

import { PageHero, Acc } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { CTABand } from "@/components/site/cta-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STACK_LAYERS } from "@/lib/site-data";

export function StackPage() {
  return (
    <div>
      <PageHero
        page="stack"
        title={
          <>
            The eight-layer{" "}
            <Acc>technology matrix.</Acc>
          </>
        }
        sub="Frontend to Blockchain to DevOps — every layer of the stack, the tools we run in production, and the standard we hold them to."
      />

      <Section className="pt-2 md:pt-4">
        <Reveal y={24}>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-center gap-1.5 rounded-2xl bg-slate-100/80 p-1.5">
              {STACK_LAYERS.map((layer) => (
                <TabsTrigger
                  key={layer.id}
                  value={layer.id}
                  className="rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  {layer.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {STACK_LAYERS.map((layer) => (
              <TabsContent key={layer.id} value={layer.id} className="mt-0">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                      {layer.name}
                    </h3>
                    <p className="text-sm text-slate-500">{layer.note}</p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Every choice is documented, versioned and reviewable — no black boxes in the stack.
          </p>
        </Reveal>
      </Section>

      <CTABand title="Want this stack in your org?" sub="Book a free 30-minute strategy call — we'll audit what you run today." />
      <NextBand from="stack" />
    </div>
  );
}
