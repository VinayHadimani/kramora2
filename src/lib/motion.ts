"use client";

import { useEffect, useRef, useState } from "react";

/* =============================================================
   Shared motion engine — ONE rAF loop for the entire site.
   Solves the "everything is lagging" problem: a single passive
   scroll listener + one requestAnimationFrame loop serves every
   scroll-driven effect (parallax, marquee, wheel, timeline...).
   ============================================================= */

export interface FrameState {
  y: number;
  /** smoothed scroll velocity, px/frame (~60fps normalized), clamped ±90 */
  v: number;
  dt: number;
  now: number;
}

type Sub = { fn: (s: FrameState) => void; continuous: boolean };

const subs = new Set<Sub>();
let raf = 0;
let lastT = 0;
let lastY = 0;
let vel = 0;
let dirty = false;
let idleFrames = 0;
let continuousCount = 0;
let listenerAttached = false;

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

function loop(t: number) {
  const y = window.scrollY;
  if (lastT === 0) {
    lastT = t - 16.7;
    lastY = y; // seed: first frame has zero velocity
  }
  const dt = Math.max(t - lastT, 1);
  const raw = ((y - lastY) / dt) * 16.7;
  vel = vel * 0.72 + raw * 0.28;
  if (Math.abs(vel) < 0.05) vel = 0;

  // jump backstop for scroll-reveals (see handleRevealJumps)
  if (Math.abs(y - lastY) > window.innerHeight * 0.6) handleRevealJumps();

  const state: FrameState = { y, v: clamp(vel, -90, 90), dt, now: t };
  subs.forEach((s) => s.fn(state));

  lastY = y;
  lastT = t;

  if (dirty) {
    idleFrames = 0;
    dirty = false;
  } else {
    idleFrames++;
  }
  if (idleFrames > 6 && continuousCount === 0) {
    raf = 0;
    lastT = 0;
    return;
  }
  raf = requestAnimationFrame(loop);
}

function kick() {
  if (!raf) raf = requestAnimationFrame(loop);
}

let lastEventY = -1;

function onScroll() {
  const y = window.scrollY;
  if (lastEventY >= 0 && Math.abs(y - lastEventY) > window.innerHeight * 0.6) {
    handleRevealJumps();
  }
  lastEventY = y;
  dirty = true;
  idleFrames = 0;
  kick();
}

function ensureListener() {
  if (listenerAttached) return;
  listenerAttached = true;
  lastEventY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
}

/**
 * Subscribe to the shared frame loop.
 * `continuous: true` keeps the loop running while the element is
 * visible (marquee, wheel) — pair it with an IntersectionObserver.
 * Callback is invoked once immediately with the current state so
 * components can paint their initial layout.
 */
export function useScrollFrames(
  cb: (s: FrameState) => void,
  opts: { continuous?: boolean } = {},
) {
  const cbRef = useRef(cb);
  const cont = !!opts.continuous;
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);
  useEffect(() => {
    ensureListener();
    const sub: Sub = {
      fn: (s) => cbRef.current(s),
      continuous: cont,
    };
    subs.add(sub);
    if (cont) {
      continuousCount++;
      kick();
    }
    // initial paint
    cbRef.current({
      y: window.scrollY,
      v: 0,
      dt: 16.7,
      now: performance.now(),
    });
    return () => {
      subs.delete(sub);
      if (cont) continuousCount--;
    };
  }, [cont]);
}

/* ---------------- Reduced motion ---------------- */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ---------------- Shared reveal observer ---------------- */

let revealIO: IntersectionObserver | null = null;
/** elements waiting to be revealed — used by the jump backstop */
const pendingReveals = new Set<Element>();

function revealEl(el: Element) {
  el.classList.add("is-in");
  pendingReveals.delete(el);
  revealIO?.unobserve(el);
}

function getRevealIO() {
  if (revealIO) return revealIO;
  revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) revealEl(e.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -7% 0px" },
  );
  return revealIO;
}

/**
 * Jump backstop: if a single frame moves more than ~60% of the
 * viewport (keyboard paging, programmatic jumps), elements can skip
 * the intersection band entirely and stay invisible. The engine
 * detects those jumps and force-reveals anything now above the fold.
 */
function handleRevealJumps() {
  if (pendingReveals.size === 0) return;
  for (const el of pendingReveals) {
    const rect = (el as HTMLElement).getBoundingClientRect();
    if (rect.bottom < 0) revealEl(el); // fully above the viewport
  }
}

export function observeReveal(el: Element) {
  getRevealIO().observe(el);
  pendingReveals.add(el);
  return () => {
    pendingReveals.delete(el);
    getRevealIO().unobserve(el);
  };
}

/* ---------------- Visibility gate (IO) ---------------- */

export function useVisible<T extends HTMLElement>(
  onVisible?: (visible: boolean) => void,
) {
  const ref = useRef<T>(null);
  const cbRef = useRef(onVisible);
  useEffect(() => {
    cbRef.current = onVisible;
  }, [onVisible]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        el.dataset.anim = visible ? "on" : "off";
        cbRef.current?.(visible);
      },
      { threshold: 0.05, rootMargin: "80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
