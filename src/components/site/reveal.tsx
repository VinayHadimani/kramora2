"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  /** initial offset in px */
  y?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper. A single shared IntersectionObserver adds
 * `.is-in` when the element enters the viewport; CSS handles the
 * transition (see globals.css). Zero per-element listeners.
 */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
