"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TextMorphProps {
  phrases: string[];
  /** swap interval in ms */
  interval?: number;
  className?: string;
}

/**
 * Cycles phrases with a vertical sweep. Both layers are absolutely
 * positioned inside a fixed-height box — zero layout shift, and the
 * animation is transform/opacity only.
 */
export function TextMorph({ phrases, interval = 3200, className }: TextMorphProps) {
  const reduced = useReducedMotion();
  const [[cur, prev], setState] = useState<[number, number | null]>([0, null]);

  useEffect(() => {
    if (phrases.length < 2 || reduced) return;
    const id = setInterval(() => {
      setState(([c]) => [ (c + 1) % phrases.length, c ]);
    }, interval);
    return () => clearInterval(id);
  }, [phrases, interval, reduced]);

  return (
    <span
      className={cn("relative block h-[1.32em] overflow-hidden leading-[1.32em]", className)}
    >
      {!reduced && prev !== null && (
        <span
          key={`out-${prev}`}
          aria-hidden="true"
          className="absolute inset-0 whitespace-nowrap morph-out"
          style={{ animation: "morph-out 0.6s cubic-bezier(0.22,1,0.36,1) forwards" }}
        >
          {phrases[prev]}
        </span>
      )}
      <span
        key={`in-${cur}`}
        className="absolute inset-0 whitespace-nowrap morph-in"
        style={{ animation: "morph-in 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {phrases[cur]}
      </span>
    </span>
  );
}
