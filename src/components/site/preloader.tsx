"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";
import { openRevealGate } from "@/lib/motion";
import {
  getPendingVanta,
  markPreloaderActive,
  markPreloaderDone,
  onPreloadChange,
  setScrollLocked,
} from "@/lib/preload";

/* =============================================================
   Preloader — the first-load cover.

   Paints together with the server HTML (the wordmark rise, label
   and progress line are pure CSS — no JS needed to show it) and
   holds the viewport while the page beneath actually gets ready:
   fonts land and the Vanta NET hero initializes BEHIND the cover.
   It then sweeps away with the same panel motion signature as
   every page transition, opening the reveal gate so the hero
   cascades in. Nothing ever "pops in" after content is visible.

   Lift conditions (checked in a post-hydration effect):
     - minimum hold ~550ms, so the wordmark registers
       (200ms for prefers-reduced-motion)
     - document.fonts ready — the fonts the reveal needs
     - no pending Vanta instances (see @/lib/preload accounting)
     - hard cap ~2.8s — a stalled CDN can never trap the user
   ============================================================= */

type Phase = "hold" | "exit" | "done";

const WORD = "Kramora AI";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("hold");
  const [sweep, setSweep] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markPreloaderActive();
    setScrollLocked(true);
    document.documentElement.classList.add("overflow-hidden");
    // hand-off for the no-JS / stalled-hydration failsafe in layout
    rootRef.current?.setAttribute("data-live", "1");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN = reduced ? 200 : 550;
    const CAP = 2800;
    const EXIT = reduced ? 240 : 780;

    let fontsDone = false;
    let minDone = false;
    let capDone = false;
    let exited = false;

    const finish = () => {
      setPhase("done");
      markPreloaderDone();
      setScrollLocked(false);
      document.documentElement.classList.remove("overflow-hidden");
      getLenis()?.start();
    };

    const tryExit = () => {
      if (exited || !minDone || !fontsDone) return;
      if (getPendingVanta() > 0 && !capDone) return;
      exited = true;
      // hero cascade begins as the panels sweep away
      openRevealGate();
      setSweep(!reduced);
      setPhase("exit");
      window.setTimeout(finish, EXIT);
    };

    const unsub = onPreloadChange(tryExit);
    const tMin = window.setTimeout(() => {
      minDone = true;
      tryExit();
    }, MIN);
    const tCap = window.setTimeout(() => {
      capDone = true;
      tryExit();
    }, CAP);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        fontsDone = true;
        tryExit();
      });
    } else {
      fontsDone = true;
    }
    return () => {
      unsub();
      window.clearTimeout(tMin);
      window.clearTimeout(tCap);
    };
  }, []);

  if (phase === "done") return null;

  const exiting = phase === "exit";

  const panelStyle = (trail: boolean): React.CSSProperties =>
    sweep
      ? {
          // parked covering at hold; sweeps up on exit — the exact
          // motion signature of every page transition on the site
          transform: exiting
            ? "translate3d(0, -112%, 0) rotate(-2.2deg)"
            : "translate3d(0, 0, 0) rotate(-2.2deg)",
          transition: exiting
            ? `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${trail ? "90ms" : "0ms"}`
            : "none",
          willChange: exiting ? "transform" : undefined,
        }
      : {
          // reduced motion: panels never move, the cover just fades
          transform: "translate3d(0, 0, 0) rotate(-2.2deg)",
        };

  return (
    <div
      ref={rootRef}
      id="k-preloader"
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[120] overflow-hidden",
        exiting && "pointer-events-none",
        exiting && !sweep && "opacity-0 transition-opacity duration-200",
      )}
    >
      {/* trailing indigo panel — the layered sweep */}
      <div className="sw-panel absolute bg-primary" style={panelStyle(true)} />
      {/* front white panel carrying the loader content */}
      <div className="sw-panel absolute bg-white" style={panelStyle(false)}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
          style={{
            opacity: exiting ? 0 : 1,
            transform: exiting ? "translateY(-14px)" : "translateY(0)",
            // the wordmark stays readable as the sweep begins, then
            // lifts — a two-beat exit, panels trailing the content
            transition:
              "opacity 0.3s ease 180ms, transform 0.3s ease 180ms",
          }}
        >
          <span
            className="pl-fade text-[11px] font-semibold uppercase tracking-[0.35em] text-primary"
            style={{ animationDelay: "70ms" }}
          >
            Kramora AI
          </span>

          {/* wordmark — letters rise one by one (pure CSS, pre-hydration).
              Brisk stagger so the full wordmark is standing well before
              the cover can lift, even on a warm cached load. */}
          <span className="font-display text-5xl italic tracking-tight text-slate-900 sm:text-6xl">
            {WORD.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="inline-block w-[0.26em]" />
              ) : (
                <span key={i} className="pl-mask">
                  <span
                    className="pl-letter"
                    style={{ animationDelay: `${90 + i * 26}ms` }}
                  >
                    {ch}
                  </span>
                </span>
              ),
            )}
            <span className="pl-mask">
              <span
                className="pl-letter not-italic text-primary"
                style={{ animationDelay: `${90 + WORD.length * 26}ms` }}
              >
                .
              </span>
            </span>
          </span>

          {/* indeterminate progress — eases toward ~¾ and holds */}
          <span className="mt-3 block h-px w-40 overflow-hidden rounded-full bg-slate-200">
            <span className="preloader-bar block h-full w-full origin-left bg-primary" />
          </span>

          <span
            className="pl-fade text-sm text-slate-500"
            style={{ animationDelay: "420ms" }}
          >
            AI-First. Innovation-Driven. Built for Growth.
          </span>
        </div>
      </div>
    </div>
  );
}
