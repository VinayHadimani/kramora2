"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScrollFrames, useVisible, clamp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MarqueeItem {
  text: string;
  cls?: string;
}

/**
 * ScrollBasedVelocity marquee — client wordmarks drift at a base
 * speed and react to scroll velocity (direction + boost) through the
 * shared rAF engine. The engine only keeps running while the strip
 * is visible (IntersectionObserver gate).
 */
export function LogoMarquee({ items }: { items: MarqueeItem[] }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const wrapRef = useVisible<HTMLDivElement>((v) => setVisible(v));
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(1);

  const measure = () => {
    const track = trackRef.current;
    if (!track || track.scrollWidth < 10) return;
    setWidthRef.current = track.scrollWidth / 3;
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useScrollFrames(
    (s) => {
      const track = trackRef.current;
      if (!track || setWidthRef.current < 10) return;
      // base drift + scroll-velocity boost; scrolling up reverses it
      const speed = clamp(0.8 + s.v * 0.085, -9, 9);
      offsetRef.current -= speed;
      const w = setWidthRef.current;
      if (offsetRef.current <= -w) offsetRef.current += w;
      if (offsetRef.current > 0) offsetRef.current -= w;
      track.style.transform = `translate3d(${offsetRef.current.toFixed(2)}px,0,0)`;
    },
    { continuous: visible && !reduced },
  );

  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-16 pr-16"
    >
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "whitespace-nowrap text-slate-400 transition-colors duration-300 hover:text-slate-700",
            item.cls,
          )}
        >
          {item.text}
        </span>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <div ref={wrapRef} className="mask-fade-x overflow-hidden">
        <div className="flex items-center gap-16 overflow-x-auto px-8 py-2">
          {items.map((item, i) => (
            <span
              key={i}
              className={cn(
                "whitespace-nowrap text-slate-400",
                item.cls,
              )}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="mask-fade-x overflow-hidden">
      <span className="sr-only">
        Trusted by: {items.map((i) => i.text).join(", ")}
      </span>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
