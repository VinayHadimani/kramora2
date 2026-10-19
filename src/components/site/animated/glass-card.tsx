"use client";

import { useEffect, useRef, useState } from "react";
import { Activity } from "lucide-react";
import { STATS } from "@/lib/site-data";
import { useReducedMotion, useScrollFrames } from "@/lib/motion";

const SPARK = "M2 30 C 16 27, 24 28, 34 23 S 54 19, 64 21 S 88 10, 118 4";

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

/**
 * Floating glassmorphic "Kramora Intelligence" card for the hero.
 * A parallax wrapper (driven by the shared engine) floats the card
 * at a fraction of scroll speed; the inner card breathes on a CSS
 * keyframe. The +34% metric counts up and the sparkline draws
 * itself when the card scrolls into view.
 */
export function GlassCard() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const perf = useCountUp(34, seen && !reduced);

  useScrollFrames((s) => {
    const el = parallaxRef.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
    const offset = Math.max(-70, Math.min(70, s.y * 0.055));
    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  });

  const sparkStyle = seen && !reduced
    ? { animation: "spark-draw 1.3s cubic-bezier(0.4,0,0.2,1) 0.25s both" }
    : undefined;

  return (
    <div ref={parallaxRef} className="relative will-change-transform">
      <div
        ref={cardRef}
        className="anim-float rounded-3xl border border-slate-200/80 bg-white/75 p-7 shadow-[0_32px_80px_-32px_rgba(15,23,42,0.28)] backdrop-blur-md sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            <Activity className="h-3.5 w-3.5 text-primary" />
            Kramora Intelligence
          </p>
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              style={{ animation: "pulse-dot 2.2s ease-out infinite" }}
            />
            Active
          </span>
        </div>

        <div className="mt-7 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs text-slate-500">Model performance</p>
            <p className="mt-1.5 font-display text-4xl leading-none text-slate-900 tabular-nums">
              +{perf}%
              <span className="ml-2.5 align-middle text-xs font-sans font-medium text-slate-400">
                last 24h
              </span>
            </p>
          </div>
          <svg
            viewBox="0 0 120 36"
            className="h-10 w-auto text-primary"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={`${SPARK} L118 36 L2 36 Z`}
              fill="currentColor"
              opacity="0.12"
            />
            <path
              className="spark-line"
              pathLength={1}
              d={SPARK}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={sparkStyle}
            />
          </svg>
        </div>

        <div className="mt-6 border-t border-slate-200/80 pt-6">
          <p className="text-xs text-slate-500">Intelligent automation engine</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-700">
              {STATS.models} models
            </span>
            <span className="rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
              {STATS.pipelines} pipelines running
            </span>
          </div>
        </div>
      </div>

      {/* secondary chip — deliberately layered over the card's corner */}
      <div
        aria-hidden="true"
        className={`anim-float-rev absolute -bottom-6 -left-7 hidden -rotate-2 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-3.5 shadow-[0_22px_55px_-20px_rgba(15,23,42,0.4)] backdrop-blur-md transition-opacity duration-700 sm:block ${
          seen || reduced ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Client retention
        </p>
        <p className="mt-1 font-display text-2xl leading-none text-slate-900">
          {STATS.retention}
          <span className="ml-2 text-xs font-sans font-medium text-slate-400">
            · {STATS.teams} teams
          </span>
        </p>
      </div>
    </div>
  );
}
