"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, CalendarClock, Download, Loader2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/site/page-hero";
import { NextBand } from "@/components/site/next-band";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { ParticleTypography } from "@/components/site/animated/particle-typography";
import { BRAND } from "@/lib/site-data";

const formSchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  email: z.string().email("A valid email helps us reply within 24 hours."),
  company: z.string().optional(),
  budget: z.string().min(1, "Pick a range — rough is fine."),
  message: z
    .string()
    .min(10, "A sentence or two about the project is all we need.")
    .max(2000, "That's a lot — let's save it for the call."),
});

type FormValues = z.infer<typeof formSchema>;

const BUDGETS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+ or ongoing pod",
];

export function ContactPage() {
  const [budget, setBudget] = useState<string>("");
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, budget }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      toast.success("Thanks — we reply within 24 hours.", {
        description: "Your strategy call request is in. Check your inbox shortly.",
      });
    } catch {
      toast.error("Couldn't send that.", {
        description: "Email us directly at ashu@kramoraa.com — we reply within 24 hours.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHero
        page="contact"
        title={
          <>
            Let’s <span className="italic text-primary">build.</span>
          </>
        }
        sub="Free 30-minute strategy call. We reply within 24 hours — capacity is limited this quarter."
      />

      {/* ---------- Particle hero ---------- */}
      <Section className="pt-0 md:pt-2">
        <Reveal y={26}>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-b from-slate-50 to-white">
            <ParticleTypography
              lines={["LET'S", "BUILD"]}
              srText="Let's build"
              className="h-[300px] sm:h-[380px] md:h-[440px]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center pb-8">
              <div className="pointer-events-auto flex flex-col items-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full shadow-xl shadow-primary/25">
                  <a href="#booking-form" className="gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Book free strategy call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href="/kramora-capability-deck.pdf" download className="gap-2">
                    <Download className="h-4 w-4" />
                    Capability deck
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------- Contact info + form ---------- */}
      <Section className="pt-4 md:pt-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* info column */}
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-primary" /> Email
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-2 block font-display text-2xl tracking-tight text-slate-900 transition-colors hover:text-primary"
                >
                  {BRAND.email}
                </a>
                <p className="mt-1 text-sm text-slate-500">{BRAND.replyWindow}.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> US Office
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-tight text-slate-900">
                    Issaquah, WA
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Headquarters — strategy & delivery.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> India Office
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-tight text-slate-900">
                    Bengaluru
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Engineering hub — 24/7 coverage.</p>
                </div>
              </div>
              <div className="rounded-3xl bg-primary p-6 text-white">
                <p className="font-display text-2xl tracking-tight">
                  Now booking Q3 engagements.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                  Limited capacity this quarter — the strategy call is free and
                  comes with a recommendation, even if it's "not yet."
                </p>
              </div>
            </div>
          </Reveal>

          {/* form column */}
          <Reveal delay={120}>
            <form
              id="booking-form"
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"
              noValidate
            >
              <h2 className="font-display text-3xl tracking-tight text-slate-900">
                Book your strategy call
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Tell us a little about the project — we reply within 24 hours.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cf-name">Name *</Label>
                  <Input id="cf-name" placeholder="Ada Lovelace" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cf-email">Work email *</Label>
                  <Input
                    id="cf-email"
                    type="email"
                    placeholder="you@company.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cf-company">Company</Label>
                  <Input id="cf-company" placeholder="Company, Inc." {...register("company")} />
                </div>
                <div className="space-y-2">
                  <Label>Budget range *</Label>
                  <Select
                    value={budget}
                    onValueChange={(v) => {
                      setBudget(v);
                      setValue("budget", v, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-xs text-red-600">{errors.budget.message}</p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cf-message">About the project *</Label>
                  <Textarea
                    id="cf-message"
                    rows={4}
                    placeholder="What are you building? What's the deadline? What's in the way?"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="mt-7 w-full rounded-full shadow-xl shadow-primary/25"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Request the call
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-slate-400">
                No spam, no follow-up sequences — one reply, within 24 hours.
              </p>
            </form>
          </Reveal>
        </div>
      </Section>

      <NextBand from="contact" />
    </div>
  );
}
