"use client";

import { Mail, MapPin } from "lucide-react";
import { BRAND, NAV_GROUPS } from "@/lib/site-data";
import { PAGE_MAP, hashForPage, type PageId } from "@/lib/pages";
import { Reveal } from "./reveal";

function FooterLink({ id, label }: { id: string; label: string }) {
  return (
    <li>
      <a
        href={hashForPage(id as PageId)}
        className="text-sm text-slate-500 transition-colors hover:text-primary"
      >
        {label}
      </a>
    </li>
  );
}

export function SiteFooter({ current }: { current: PageId }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50/70">
      <Reveal y={18}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <a
                href="#/"
                className="font-display text-3xl leading-none tracking-tight text-slate-900"
              >
                Kramora<span className="italic text-primary"> AI</span>
              </a>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                {BRAND.tagline} We design, build and ship production-grade
                intelligent systems.
              </p>
              <div className="mt-5 space-y-2.5 text-sm text-slate-600">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {BRAND.email}
                </a>
                <p className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {BRAND.usOfficeFull} · {BRAND.inOfficeFull}
                </p>
              </div>
            </div>

            {/* Link columns */}
            {NAV_GROUPS.map((group) => (
              <nav key={group.label} aria-label={`Footer — ${group.label}`}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <FooterLink key={item.id} id={item.id} label={item.label} />
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Footer — contact and legal">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Connect
              </h3>
              <ul className="space-y-2.5">
                <FooterLink id="contact" label="Let's Build" />
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-sm text-slate-500 transition-colors hover:text-primary"
                  >
                    {BRAND.email}
                  </a>
                </li>
                <FooterLink id="privacy" label="Privacy Policy" />
                <FooterLink id="terms" label="Terms of Service" />
                <FooterLink id="notfound" label="404" />
              </ul>
            </nav>
          </div>
        </div>
      </Reveal>

      {/* Giant wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden border-t border-slate-200/70"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="-mb-3 whitespace-nowrap text-center font-display text-[15vw] leading-[0.9] text-slate-200/70 md:-mb-5 md:text-[11vw]">
            Kramora
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© {year} Kramora AI. All rights reserved.</p>
          <p className="hidden md:block">
            Now booking Q3 engagements · We reply within 24 hours
          </p>
          <p className="text-slate-400">
            Page {PAGE_MAP[current].n} / 18
          </p>
        </div>
      </div>
    </footer>
  );
}
