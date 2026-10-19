"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_GROUPS, BRAND } from "@/lib/site-data";
import { PAGE_MAP, hashForPage, type PageId } from "@/lib/pages";
import { cn } from "@/lib/utils";

function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="#/"
      aria-label="Kramora AI — home"
      className={cn(
        "font-display text-[26px] leading-none tracking-tight text-slate-900",
        className,
      )}
    >
      Kramora<span className="italic text-primary"> AI</span>
    </a>
  );
}

export function SiteHeader({ current }: { current: PageId }) {
  const [open, setOpen] = useState(false);
  const meta = PAGE_MAP[current];

  const linkCls = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "text-primary"
        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px]">
        <Wordmark />

        {/* ---------- Desktop nav ---------- */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          <a
            href="#/"
            aria-current={current === "home" ? "page" : undefined}
            className={linkCls(current === "home")}
          >
            Home
          </a>
          {NAV_GROUPS.map((group) => {
            const groupActive = meta.section === group.label;
            return (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    "group-hover:bg-slate-100/80",
                    groupActive
                      ? "text-primary"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div
                  className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-900/5">
                    {group.items.map((item) => {
                      const active = current === item.id;
                      return (
                        <a
                          key={item.id}
                          href={hashForPage(item.id as PageId)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-start gap-3 rounded-xl px-3.5 py-2.5 transition-colors",
                            active
                              ? "bg-primary/5"
                              : "hover:bg-slate-50",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full",
                              active ? "bg-primary" : "bg-slate-300",
                            )}
                          />
                          <span>
                            <span
                              className={cn(
                                "block text-sm font-medium",
                                active ? "text-primary" : "text-slate-900",
                              )}
                            >
                              {item.label}
                            </span>
                            <span className="block text-xs text-slate-500">
                              {item.desc}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button asChild className="hidden rounded-full shadow-lg shadow-primary/20 sm:inline-flex">
            <a href="#/contact" className="gap-1.5">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>

          {/* ---------- Mobile nav ---------- */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                suppressHydrationWarning
                className="h-11 w-11 rounded-full lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              data-lenis-prevent
              aria-describedby={undefined}
              className="flex w-[86vw] max-w-sm flex-col gap-0 overflow-y-auto p-0"
            >
              <SheetHeader className="border-b border-slate-200 px-6 py-5">
                <SheetTitle asChild>
                  <div>
                    <Wordmark />
                    <p className="mt-1 text-xs text-slate-500">{BRAND.tagline}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4">
                <a
                  href="#/"
                  onClick={() => setOpen(false)}
                  aria-current={current === "home" ? "page" : undefined}
                  className={cn(
                    "mb-1 block rounded-xl px-4 py-3 text-[15px] font-medium",
                    current === "home"
                      ? "bg-primary/5 text-primary"
                      : "text-slate-800 hover:bg-slate-50",
                  )}
                >
                  Home
                </a>
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="mb-2 mt-3">
                    <p className="px-4 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {group.label}
                    </p>
                    {group.items.map((item) => {
                      const active = current === item.id;
                      return (
                        <a
                          key={item.id}
                          href={hashForPage(item.id as PageId)}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3 text-[15px]",
                            active
                              ? "bg-primary/5 font-medium text-primary"
                              : "text-slate-800 hover:bg-slate-50",
                          )}
                        >
                          {item.label}
                          <ArrowRight className="h-4 w-4 text-slate-300" />
                        </a>
                      );
                    })}
                  </div>
                ))}
              </nav>
              <div className="border-t border-slate-200 p-5">
                <Button asChild className="w-full rounded-full">
                  <a href="#/contact" onClick={() => setOpen(false)} className="gap-1.5">
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  {BRAND.replyWindow}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
