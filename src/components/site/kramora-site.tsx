"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PAGE_MAP,
  hashForPage,
  pageIdFromHash,
  type PageId,
} from "@/lib/pages";
import { useReducedMotion } from "@/lib/motion";
import { lenisResetScroll, lenisScrollTo, lenisScrollTopSmooth } from "@/lib/lenis";
import { isPreloaderActive } from "@/lib/preload";
import { Swoosh, type SwooshPhase } from "./swoosh";
import { Preloader } from "./preloader";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

import { LandingPage } from "./pages/landing";
import { ServicesPage } from "./pages/services";
import { AiPage } from "./pages/ai";
import { DataPage } from "./pages/data";
import { WebPage } from "./pages/web";
import { OcrPage } from "./pages/ocr";
import { AboutPage } from "./pages/about";
import { ProcessPage } from "./pages/process";
import { StackPage } from "./pages/stack";
import { IndustriesPage } from "./pages/industries";
import { WorkPage } from "./pages/work";
import { InsightsPage } from "./pages/insights";
import { EngagePage } from "./pages/engage";
import { ReviewsPage } from "./pages/reviews";
import { ContactPage } from "./pages/contact";
import { PrivacyPage } from "./pages/privacy";
import { TermsPage } from "./pages/terms";
import { NotFoundPage } from "./pages/notfound";

interface TransState {
  to: PageId;
  phase: SwooshPhase;
  intro?: boolean;
}

function renderPage(id: PageId) {
  switch (id) {
    case "home":
      return <LandingPage />;
    case "services":
      return <ServicesPage />;
    case "ai":
      return <AiPage />;
    case "data":
      return <DataPage />;
    case "web":
      return <WebPage />;
    case "ocr":
      return <OcrPage />;
    case "about":
      return <AboutPage />;
    case "process":
      return <ProcessPage />;
    case "stack":
      return <StackPage />;
    case "industries":
      return <IndustriesPage />;
    case "work":
      return <WorkPage />;
    case "insights":
      return <InsightsPage />;
    case "engage":
      return <EngagePage />;
    case "reviews":
      return <ReviewsPage />;
    case "contact":
      return <ContactPage />;
    case "privacy":
      return <PrivacyPage />;
    case "terms":
      return <TermsPage />;
    default:
      return <NotFoundPage />;
  }
}

export function KramoraSite() {
  const [page, setPage] = useState<PageId>("home");
  const [trans, setTrans] = useState<TransState | null>(null);

  const pageRef = useRef(page);
  const transRef = useRef(trans);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  useEffect(() => {
    pageRef.current = page;
    transRef.current = trans;
    reducedRef.current = reduced;
  }, [page, trans, reduced]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timers.current.push(t);
  };

  /** Instantly swap content while the panel covers the screen. */
  const swap = useCallback((target: PageId) => {
    setPage(target);
    pageRef.current = target;
    // reset through Lenis when active — a native scrollTo here would
    // fight the virtual scroll position and snap back mid-glide
    lenisResetScroll();
    const meta = PAGE_MAP[target];
    document.title = meta.docTitle;
    if (location.hash !== hashForPage(target)) {
      history.replaceState(null, "", hashForPage(target));
    }
  }, []);

  const startTransition = useCallback(
    (to: PageId) => {
      clearTimers();
      if (reducedRef.current) {
        // reduced motion: instant swap, no overlay
        swap(to);
        setTrans(null);
        return;
      }
      setTrans({ to, phase: "cover" });
      later(() => {
        // use the latest target in case the user changed destination mid-flight
        const target = transRef.current?.to ?? to;
        swap(target);
        setTrans((t) => (t ? { ...t, to: target, phase: "reveal" } : t));
        later(() => setTrans(null), 640);
      }, 370);
    },
    [swap],
  );

  const handleHash = useCallback(() => {
    const raw = location.hash;
    /* In-page anchors (e.g. the skip-to-content link "#main") are not
       routes: glide to the element through Lenis and restore the route
       hash afterwards — never route them to the 404 page. */
    if (raw && !raw.startsWith("#/")) {
      lenisScrollTo(raw);
      history.replaceState(null, "", hashForPage(pageRef.current));
      return;
    }
    const to = pageIdFromHash(raw);
    const current = transRef.current;
    if (current && current.phase !== "idle") {
      // mid-transition: just retarget; the swap picks the latest up
      if (to !== current.to) setTrans((t) => (t ? { ...t, to } : t));
      return;
    }
    if (to === pageRef.current) {
      lenisScrollTopSmooth();
      return;
    }
    startTransition(to);
  }, [startTransition]);

  /* ---- initial load: parse hash + first reveal ----
     All state changes run inside timer callbacks (async), which keeps
     the effect body free of synchronous setState. With the Preloader
     covering first load, the deep-link swap happens hidden beneath it
     and the loader's own sweep IS the reveal — the intro swoosh only
     plays as a fallback when the loader is not active. */
  useEffect(() => {
    const initial = pageIdFromHash(location.hash);
    document.title = PAGE_MAP[initial].docTitle;
    later(() => {
      swap(initial);
      if (isPreloaderActive() || reducedRef.current) return;
      // fallback intro: panels cover, hold the wordmark, lift away
      setTrans({ to: initial, phase: "cover", intro: true });
      later(() => {
        setTrans((t) => (t ? { ...t, phase: "reveal" } : t));
        later(() => setTrans(null), 640);
      }, 800);
    }, 90);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [handleHash]);

  const meta = PAGE_MAP[page];
  const label = trans ? PAGE_MAP[trans.to].short : meta.short;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader current={page} />
      <main id="main" className="flex-1" key={page}>
        {renderPage(page)}
      </main>
      <SiteFooter current={page} />
      <Swoosh
        phase={trans?.phase ?? "idle"}
        label={label}
        intro={trans?.intro}
      />
      {/* first-load cover — paints with the server HTML, lifts once
          fonts + the Vanta hero are ready beneath it */}
      <Preloader />
      <div aria-live="polite" className="sr-only">
        {`Page ${meta.n} — ${meta.title}`}
      </div>
    </div>
  );
}
