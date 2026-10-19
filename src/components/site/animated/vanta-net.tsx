"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  isPreloaderActive,
  markVantaPending,
  markVantaSettled,
} from "@/lib/preload";
import type { VantaNetEffect } from "vanta/dist/vanta.net.min";

/* =============================================================
   VantaNet — Vanta.js NET background, strictly light mode.

   Pure-white canvas (0xFFFFFF) with Indigo-600 nodes/lines
   (0x2563EB) — the locked Kramora palette. Used on the landing
   hero (full density) and inner-page heroes (`subtle`).

   Lifecycle discipline (the non-negotiables):
   - destroy() on EVERY unmount — pages swap under the swoosh
     panel, so a leaked WebGL context would pile up across
     navigations and eventually crash the tab. Effect + ref are
     both nulled in cleanup.
   - three + vanta are dynamically imported: they never touch the
     server bundle and stay out of the initial JS payload.
   - WebGL runs on every viewport (scaleMobile 0.5 halves the
     render ratio on phones) and is skipped only for
     prefers-reduced-motion, where the CSS fallback (dot-grid +
     soft indigo glow) carries the hero instead.

   Feel: on first load the preloader covers the page while this
   initializes — the canvas is already live when the loader lifts,
   so the net never "pops in" (short 500ms fade, hidden by the
   sweep). On later SPA navigations the hero content paints first
   and the canvas cross-fades in over ~1s. The capability probe
   still waits past the hydration window — flipping state in the
   first effect flush can race React's deferred hydration on
   cold loads.

   Preloader accounting: each mount registers one "pending" mark
   (see @/lib/preload); the first-load loader holds its cover
   until this instance settles — WebGL initialized or the CSS
   fallback chosen. Exactly one settle per mount, token-guarded.
   ============================================================= */

interface VantaNetProps {
  className?: string;
  /** sparser net for inner-page heroes */
  subtle?: boolean;
}

type VantaFactory = (
  opts: Record<string, unknown>,
) => VantaNetEffect;

export function VantaNet({ className, subtle = false }: VantaNetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaNetEffect | null>(null);
  /* exactly-once settle token per mounted instance */
  const settleRef = useRef<{ settled: boolean } | null>(null);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [fastFade, setFastFade] = useState(false);

  const settle = () => {
    const token = settleRef.current;
    if (token && !token.settled) {
      token.settled = true;
      markVantaSettled();
    }
  };

  /* --- preloader accounting: one pending per mount, settled
         exactly once (initialized, fallback, or unmounted) --- */
  useEffect(() => {
    const token: { settled: boolean } = { settled: false };
    settleRef.current = token;
    markVantaPending();
    return () => {
      if (!token.settled) {
        token.settled = true;
        markVantaSettled();
      }
      if (settleRef.current === token) settleRef.current = null;
    };
  }, []);

  /* --- should WebGL run at all? (reduced motion only — mobile is
         explicitly supported per the client directive: scaleMobile
         0.5 halves the pixel ratio to keep phones cool) --- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // defer the probe past the hydration window (see note above)
    const probe = window.setTimeout(() => {
      if (reduced.matches) {
        settle(); // CSS fallback carries the hero — ready immediately
        setWebgl(false);
        return;
      }
      setWebgl(true);
    }, 150);
    const update = () => setWebgl(!reduced.matches);
    reduced.addEventListener("change", update);
    return () => {
      window.clearTimeout(probe);
      reduced.removeEventListener("change", update);
    };
  }, []);

  /* --- create / destroy the effect --- */
  useEffect(() => {
    if (!webgl) return;
    let cancelled = false;

    // let the hero content paint first — on first load the loader
    // covers this delay entirely; on SPA navigations it keeps the
    // ambience arriving after the headline
    const kick = window.setTimeout(() => {
      void (async () => {
        try {
          const [vantaMod, threeMod] = await Promise.all([
            import("vanta/dist/vanta.net.min"),
            import("three"),
          ]);
          if (cancelled || !hostRef.current || effectRef.current) return;
          const NET = vantaMod.default as unknown as VantaFactory;
          const THREE =
            (threeMod as unknown as { default?: object }).default ??
            threeMod;
          effectRef.current = NET({
            el: hostRef.current,
            THREE,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 0.5,
            color: 0x2563eb, // Indigo-600 — locked accent
            backgroundColor: 0xffffff, // Pure white — strict light mode
            points: subtle ? 6.0 : 8.0,
            maxDistance: subtle ? 26.0 : 22.0,
            spacing: subtle ? 24.0 : 18.0,
            showDots: true,
          });
          if (!cancelled) {
            // under the first-load preloader the canvas is covered —
            // skip the long cross-fade, the loader's sweep reveals
            // a net that is already live
            setFastFade(isPreloaderActive());
            setReady(true);
            // one frame of the net on screen → the loader may lift
            requestAnimationFrame(() => {
              if (!cancelled) settle();
            });
          }
        } catch {
          /* WebGL unavailable — the CSS fallback simply stays */
          settle();
        }
      })();
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(kick);
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
      setReady(false);
    };
  }, [webgl, subtle]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {/* CSS fallback — always painted beneath the canvas; on mobile
          and reduced-motion it is the whole background */}
      <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_30%,rgba(37,99,235,0.05),transparent_70%)]" />
      {/* WebGL canvas host — Vanta appends its <canvas> here.
          500ms fade under the first-load preloader (hidden by the
          sweep), 1s cross-fade on later SPA navigations */}
      <div
        ref={hostRef}
        className={cn(
          "absolute inset-0 transition-opacity ease-out",
          fastFade ? "duration-500" : "duration-1000",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
