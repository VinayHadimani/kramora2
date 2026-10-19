"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { clamp, useReducedMotion, useScrollFrames } from "@/lib/motion";
import type { Article } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * WorksWheel (light mode) — a rotating ring of insight articles.
 * Desktop (≥1280px): scroll rotates the wheel across a tall sticky
 * section. Mobile: the SAME ring, rendered compact and driven by
 * touch — drag to spin (momentum + snap), tap the top card to read.
 * Reduced-motion visitors get a clean card grid in both cases.
 */
export function WorksWheel({ articles }: { articles: Article[] }) {
  const reduced = useReducedMotion();
  const [isLg, setIsLg] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const wheelMode = isLg && !reduced;
  const open = articles.find((a) => a.id === openId) ?? null;

  return (
    <>
      {wheelMode ? (
        <WheelDesktop articles={articles} onOpen={(id) => setOpenId(id)} />
      ) : reduced ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((a, i) => (
            <CardGridItem key={a.id} article={a} index={i} onOpen={() => setOpenId(a.id)} />
          ))}
        </div>
      ) : (
        <WheelMobile articles={articles} onOpen={(id) => setOpenId(id)} />
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent
          data-lenis-prevent
          aria-describedby={undefined}
          className="max-h-[85vh] max-w-lg overflow-y-auto rounded-3xl"
        >
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                {open?.tag}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                {open?.minutes} min read
              </span>
            </div>
            <DialogTitle className="mt-2 font-display text-3xl tracking-tight">
              {open?.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              {open?.excerpt}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
            {open?.body.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="space-y-2.5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
              {open?.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end border-t border-slate-100 pt-4">
            <Button asChild className="rounded-full">
              <a href="#/contact" onClick={() => setOpenId(null)} className="gap-1.5">
                Discuss this with us
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- shared ring geometry ---------------- */

const R = 240; // ring radius
const STEP = 72; // degrees between cards
const STAGE = 760; // layout box (cards 250×260 + overhang)

/** Position every card on the ring for rotation progress `k`. */
function layoutRing(
  cardEls: (HTMLElement | null)[],
  articles: unknown[],
  k: number,
) {
  for (let i = 0; i < articles.length; i++) {
    const el = cardEls[i];
    if (!el) continue;
    const A = i * STEP - STEP * k;
    const norm = ((A % 360) + 360) % 360;
    const d = Math.min(norm, 360 - norm); // distance from top position
    const scale = 1 - (d / 360) * 0.55;
    const opacity = 1 - (d / 360) * 0.85;
    el.style.transform = `rotate(${A.toFixed(2)}deg) translateY(${-R}px) rotate(${-A.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    el.style.opacity = opacity.toFixed(3);
    el.style.zIndex = String(Math.round(100 - d / 3.6));
    el.style.pointerEvents = d < 36 ? "auto" : "none";
  }
}

/* ---------------- Desktop wheel (scroll-driven) ---------------- */

function WheelDesktop({
  articles,
  onOpen,
}: {
  articles: Article[];
  onOpen: (id: string) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useScrollFrames(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    const p = clamp((vh * 0.15 - rect.top) / (rect.height - vh), 0, 1);
    const k = p * (articles.length - 1);
    layoutRing(cardRefs.current, articles, k);
    const na = Math.round(clamp(k, 0, articles.length - 1));
    if (na !== activeRef.current) {
      activeRef.current = na;
      setActive(na);
    }
  });

  const current = articles[active] ?? articles[0];

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(280px,420px)_1fr]">
      {/* active article panel (stays aligned with the wheel) */}
      <div className="xl:col-start-1 xl:row-start-1">
        <div className="sticky top-0 hidden h-screen items-center xl:flex">
          <div key={current.id} className="page-fade-up">
            <div className="flex items-center gap-2.5">
              <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                {current.tag}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                {current.minutes} min
              </span>
            </div>
            <h3 className="mt-4 font-display text-3xl leading-[1.05] tracking-tight text-slate-900">
              {current.title}
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-500 line-clamp-6">
              {current.body[0]}
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full"
              onClick={() => onOpen(current.id)}
            >
              Read the insight
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* the wheel — tall section with sticky center */}
      <div ref={sectionRef} className="relative h-[175vh] xl:col-start-2 xl:row-start-1">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="relative h-[760px] w-[760px]">
            {/* hub */}
            <div className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[70px] flex h-[140px] w-[140px] items-center justify-center rounded-full border border-slate-200 bg-white text-center shadow-xl shadow-slate-900/5">
              <span className="anim-spin-slow absolute -inset-3 rounded-full border border-dashed border-slate-300" aria-hidden="true" />
              <div>
                <p className="font-display text-[26px] leading-none tracking-tight text-slate-900">
                  Insights
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  05 field notes
                </p>
              </div>
            </div>

            {/* cards on the ring */}
            {articles.map((a, i) => (
              <button
                key={a.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                onClick={() => onOpen(a.id)}
                aria-label={`Open article: ${a.title}`}
                className={cn(
                  "absolute left-1/2 top-1/2 -ml-[125px] -mt-[130px] h-[260px] w-[250px] rounded-3xl border bg-white text-left",
                  i === 0
                    ? "border-primary/30 shadow-[0_28px_70px_-30px_rgba(37,99,235,0.4)]"
                    : "border-slate-200 shadow-lg shadow-slate-900/5",
                )}
                style={{ willChange: "transform, opacity" }}
              >
                <span className="block p-6">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                      {a.tag}
                    </span>
                    <span className="text-xs text-slate-400">{a.minutes} min</span>
                  </span>
                  <span className="mt-4 block font-display text-[26px] leading-[1.08] tracking-tight text-slate-900">
                    {a.title}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {a.excerpt}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mobile wheel (touch/drag-driven) ----------------
   The same 760px ring, uniformly scaled to the viewport width.
   Drag horizontally to spin (momentum + snap to the nearest card),
   tap the top card to open it. touch-action: pan-y keeps vertical
   page scrolling native — only horizontal drags spin the ring. */

function WheelMobile({
  articles,
  onOpen,
}: {
  articles: Article[];
  onOpen: (id: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(0.45);

  const kRef = useRef(0); // rotation progress (0 … n-1)
  const rafRef = useRef(0);
  const dragRef = useRef({
    id: -1,
    x: 0,
    moved: 0,
    t: 0,
    vx: 0,
    card: null as string | null,
  });

  const last = articles.length - 1;

  const stopMomentum = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  const syncActive = (k: number) => {
    const na = Math.round(clamp(k, 0, last));
    if (na !== activeRef.current) {
      activeRef.current = na;
      setActive(na);
    }
  };

  const apply = (k: number) => {
    layoutRing(cardRefs.current, articles, k);
    syncActive(k);
  };

  /** momentum → settle → snap to the nearest card */
  const release = (vx: number) => {
    stopMomentum();
    let v = clamp(-vx / 240, -0.14, 0.14); // px/frame → k/frame
    const tick = () => {
      kRef.current += v;
      v *= 0.92;
      const atEdge =
        kRef.current < -0.35 || kRef.current > last + 0.35;
      if (atEdge) v = 0;
      kRef.current = clamp(kRef.current, -0.35, last + 0.35);
      if (Math.abs(v) < 0.0045) {
        // ease toward the snapped card
        const target = clamp(Math.round(kRef.current), 0, last);
        const diff = target - kRef.current;
        if (Math.abs(diff) < 0.002) {
          kRef.current = target;
          apply(target);
          rafRef.current = 0;
          return;
        }
        kRef.current += diff * 0.18;
        apply(kRef.current);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      apply(kRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  /** prev/next buttons ease the ring by exactly one card */
  const goTo = (target: number) => {
    stopMomentum();
    const clamped = clamp(target, 0, last);
    const tick = () => {
      const diff = clamped - kRef.current;
      if (Math.abs(diff) < 0.002) {
        kRef.current = clamped;
        apply(clamped);
        rafRef.current = 0;
        return;
      }
      kRef.current += diff * 0.16;
      apply(kRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  /* fit the 760px ring to the viewport width */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(1, Math.max(0.36, el.clientWidth / STAGE)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* initial layout + cleanup */
  useEffect(() => {
    apply(kRef.current);
    return stopMomentum;
  }, []);

  const current = articles[active] ?? articles[0];

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopMomentum();
    const target = e.target as HTMLElement;
    dragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      moved: 0,
      t: performance.now(),
      vx: 0,
      card: target.closest("[data-ring-card]")?.getAttribute("data-ring-card") ?? null,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const now = performance.now();
    const dt = Math.max(now - d.t, 1);
    d.vx = (dx / dt) * 16.7; // px/frame
    d.moved += Math.abs(dx);
    d.x = e.clientX;
    d.t = now;
    kRef.current = clamp(kRef.current - dx / 240, -0.35, last + 0.35);
    apply(kRef.current);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d.id !== e.pointerId) return;
    d.id = -1;
    // a still tap on a card opens it (drags never do)
    if (d.moved < 8 && d.card) onOpen(d.card);
    else release(d.vx);
  };

  return (
    <div>
      <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
        Drag to spin — tap a card to read
      </p>

      {/* ring stage — scales to fit; pan-y keeps page scroll native */}
      <div
        ref={wrapRef}
        className="relative mx-auto aspect-square w-full max-w-[560px] touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={(e) => {
          if (dragRef.current.id === e.pointerId) dragRef.current.id = -1;
        }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: STAGE,
            height: STAGE,
            transform: `translate(-50%, -50%) scale(${scale.toFixed(4)})`,
          }}
        >
          {/* hub */}
          <div className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[70px] flex h-[140px] w-[140px] items-center justify-center rounded-full border border-slate-200 bg-white text-center shadow-xl shadow-slate-900/5">
            <span className="anim-spin-slow absolute -inset-3 rounded-full border border-dashed border-slate-300" aria-hidden="true" />
            <div>
              <p className="font-display text-[26px] leading-none tracking-tight text-slate-900">
                Insights
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                05 field notes
              </p>
            </div>
          </div>

          {/* cards on the ring */}
          {articles.map((a, i) => (
            <button
              key={a.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              data-ring-card={a.id}
              aria-label={`Open article: ${a.title}`}
              className={cn(
                "absolute left-1/2 top-1/2 -ml-[125px] -mt-[130px] h-[260px] w-[250px] rounded-3xl border bg-white text-left",
                i === 0
                  ? "border-primary/30 shadow-[0_28px_70px_-30px_rgba(37,99,235,0.4)]"
                  : "border-slate-200 shadow-lg shadow-slate-900/5",
              )}
              style={{ willChange: "transform, opacity" }}
              onClick={(e) => {
                // keyboard activation path (Enter/Space); pointer taps
                // are handled by the stage's pointerup logic
                if (e.detail === 0) onOpen(a.id);
              }}
            >
              <span className="block p-6">
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                    {a.tag}
                  </span>
                  <span className="text-xs text-slate-400">{a.minutes} min</span>
                </span>
                <span className="mt-4 block font-display text-[26px] leading-[1.08] tracking-tight text-slate-900">
                  {a.title}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-slate-500 line-clamp-3">
                  {a.excerpt}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* active article + prev/next controls (44px touch targets) */}
      <div className="mx-auto mt-2 max-w-md px-2 text-center">
        <div key={current.id} className="page-fade-up">
          <div className="flex items-center justify-center gap-2.5">
            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
              {current.tag}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock3 className="h-3.5 w-3.5" />
              {current.minutes} min
            </span>
          </div>
          <h3 className="mt-3 font-display text-3xl leading-[1.05] tracking-tight text-slate-900">
            {current.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-500 line-clamp-3">
            {current.excerpt}
          </p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous insight"
            disabled={active <= 0}
            onClick={() => goTo(active - 1)}
            className="h-11 w-11 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="w-12 text-center text-sm font-semibold tabular-nums text-slate-500">
            {active + 1} / {articles.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next insight"
            disabled={active >= last}
            onClick={() => goTo(active + 1)}
            className="h-11 w-11 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Grid fallback (reduced motion) ---------------- */

function CardGridItem({
  article,
  index,
  onOpen,
}: {
  article: Article;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-900/5 active:scale-[0.98]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          {article.tag}
        </span>
        <span className="text-xs text-slate-400">{article.minutes} min</span>
      </div>
      <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight text-slate-900">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{article.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
      <span className="sr-only">Article {index + 1}</span>
    </button>
  );
}
