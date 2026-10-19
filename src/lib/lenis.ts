import type Lenis from "lenis";

/* =============================================================
   Lenis handle + viewport helpers.

   The SmoothScrollProvider registers the live root instance here.
   Everything that moves the viewport (route swaps under the swoosh
   panel, same-page jumps, in-page anchors) MUST go through these
   helpers so Lenis's virtual scroll position never fights a native
   programmatic scroll.
   ============================================================= */

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Instant scroll reset — called while the swoosh panel fully covers
 * the viewport, so the jump must never be visible (and never animate).
 */
export function lenisResetScroll() {
  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

/** Buttery glide back to the top of the current page. */
export function lenisScrollTopSmooth() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.1 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Smooth-scroll to an in-page target (selector or element).
 * Returns false when the selector matches nothing.
 */
export function lenisScrollTo(
  target: string | HTMLElement,
  opts: { offset?: number } = {},
): boolean {
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;
  if (!el) return false;
  if (instance) {
    instance.scrollTo(el, { duration: 1.1, offset: opts.offset ?? -72 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}
