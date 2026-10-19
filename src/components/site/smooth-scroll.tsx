"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

/* =============================================================
   SmoothScrollProvider — global inertial (Lenis) scrolling.

   HYDRATION-CRITICAL DESIGN:
   The returned tree is ALWAYS the same fragment — children are
   never re-parented. (A previous version swapped <>{children}</>
   for a <ReactLenis> wrapper once enabled: a component-type change
   at the root that remounted the whole app right after hydration,
   regenerating every Radix useId — surfacing as an aria-controls
   hydration mismatch on the mobile nav Sheet.) Lenis is now
   created/destroyed imperatively inside an effect, so the React
   tree is byte-identical between server and client, forever.

   Mobile: Lenis stays active on every viewport — `syncTouch:
   false` keeps touch scrolling 100% native (flick-scrolling is
   never hijacked, zero lag); Lenis only tracks position and
   powers programmatic scrolls. Disabled entirely for
   prefers-reduced-motion.
   ============================================================= */

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.5,
      smoothWheel: true,
      // touch stays fully native on phones/tablets — the user
      // flick-scrolls with the OS's own momentum, never ours
      syncTouch: false,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);

    let raf = requestAnimationFrame(function loop(t: number) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // NEVER re-parent children — identical tree on server & client
  return <>{children}</>;
}
