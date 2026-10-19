"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useVisible } from "@/lib/motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  ci: number;
}

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#94a3b8"];
const COLOR_WEIGHTS = [0.5, 0.26, 0.14, 0.1];

/**
 * CursorDrivenParticleTypography — canvas particles form the given
 * text and scatter around the cursor. Runs its own rAF loop, gated by
 * an IntersectionObserver; DPR capped at 2; particle count adapts to
 * viewport width. Reduced motion renders a static typeset instead.
 */
export function ParticleTypography({
  lines,
  className,
  srText,
}: {
  lines: string[];
  className?: string;
  srText?: string;
}) {
  const reduced = useReducedMotion();
  const wrapRef = useVisible<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    particles: Particle[];
    raf: number;
    running: boolean;
    visible: boolean;
    pointer: { x: number; y: number };
  }>({
    particles: [],
    raf: 0,
    running: false,
    visible: false,
    pointer: { x: -9999, y: -9999 },
  });

  /* ---------- setup / sampling ---------- */
  const setup = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // offscreen text render
    const off = document.createElement("canvas");
    off.width = Math.round(w);
    off.height = Math.round(h);
    const octx = off.getContext("2d");
    if (!octx) return;

    let fs = 150;
    octx.font = `800 ${fs}px Inter, Arial, sans-serif`;
    const widest = Math.max(...lines.map((l) => octx.measureText(l).width)) || 1;
    fs = Math.min(fs * ((w * 0.9) / widest), h * 0.34, 170);
    octx.font = `800 ${fs}px Inter, Arial, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    const lh = fs * 1.02;
    const total = lh * lines.length;
    const y0 = (h - total) / 2 + lh / 2;
    lines.forEach((l, i) => octx.fillText(l, w / 2, y0 + i * lh));

    const data = octx.getImageData(0, 0, off.width, off.height).data;
    const gap = w < 640 ? 5 : 4;
    const targets: { x: number; y: number }[] = [];
    for (let y = 0; y < off.height; y += gap) {
      for (let x = 0; x < off.width; x += gap) {
        if (data[(y * off.width + x) * 4 + 3] > 128) {
          targets.push({ x, y });
        }
      }
    }
    // cap the particle count
    let stride = 1;
    const CAP = w < 640 ? 1300 : 2400;
    while (targets.length / stride > CAP) stride++;
    const finalTargets = targets.filter((_, i) => i % stride === 0);

    const st = stateRef.current;
    const next: Particle[] = [];
    for (let i = 0; i < finalTargets.length; i++) {
      const t = finalTargets[i];
      const old = st.particles[i];
      const r = Math.random();
      let acc = 0;
      let ci = 0;
      for (let c = 0; c < COLORS.length; c++) {
        acc += COLOR_WEIGHTS[c];
        if (r <= acc) {
          ci = c;
          break;
        }
      }
      next.push({
        x: old ? old.x : Math.random() * w,
        y: old ? old.y : Math.random() * h,
        vx: old ? old.vx : 0,
        vy: old ? old.vy : 0,
        tx: t.x,
        ty: t.y,
        ci,
      });
    }
    st.particles = next;

    if (reduced) {
      // static render
      ctx.clearRect(0, 0, w, h);
      st.particles.forEach((p) => {
        ctx.fillStyle = COLORS[p.ci];
        ctx.fillRect(p.tx - 1.2, p.ty - 1.2, 2.4, 2.4);
      });
    }
  };

  /* ---------- animation loop ---------- */
  const tick = () => {
    const st = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    const { x: px, y: py } = st.pointer;
    const R2 = 110 * 110;
    for (const p of st.particles) {
      p.vx += (p.tx - p.x) * 0.016;
      p.vy += (p.ty - p.y) * 0.016;
      const dx = p.x - px;
      const dy = p.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const f = ((110 - d) / 110) * 2.6;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
      p.vx *= 0.84;
      p.vy *= 0.84;
      p.x += p.vx;
      p.y += p.vy;
    }

    ctx.clearRect(0, 0, w, h);
    let lastCi = -1;
    for (const p of st.particles) {
      if (p.ci !== lastCi) {
        ctx.fillStyle = COLORS[p.ci];
        lastCi = p.ci;
      }
      ctx.fillRect(p.x - 1.2, p.y - 1.2, 2.4, 2.4);
    }

    if (st.running && !document.hidden) {
      st.raf = requestAnimationFrame(tick);
    } else {
      st.running = false;
    }
  };

  const start = () => {
    const st = stateRef.current;
    if (st.running || reduced) return;
    st.running = true;
    st.raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    const st = stateRef.current;
    st.running = false;
    cancelAnimationFrame(st.raf);
  };

  /* ---------- lifecycle ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    setup();

    const onVisible = (v: boolean) => {
      stateRef.current.visible = v;
      if (v && !reduced) start();
      if (!v) stop();
    };
    const io = new IntersectionObserver(
      (entries) => onVisible(!!entries[0]?.isIntersecting),
      { rootMargin: "60px" },
    );
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    // touch: a tap/drag scatters particles immediately on contact
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      stateRef.current.pointer = { x: -9999, y: -9999 };
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointerleave", onLeave);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (stateRef.current.visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const wasRunning = stateRef.current.running;
        stop();
        setup();
        if (wasRunning) start();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    document.fonts?.ready.then(() => {
      const wasRunning = stateRef.current.running;
      stop();
      setup();
      if (wasRunning) start();
    }).catch(() => {});

    return () => {
      stop();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className} style={{ touchAction: "pan-y" }}>
      {srText && <span className="sr-only">{srText}</span>}
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
