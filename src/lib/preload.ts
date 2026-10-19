/* =============================================================
   Preloader coordination store.

   The Preloader owns the first-load experience: it paints with the
   server HTML (pure-CSS animation, zero JS needed to show it), then
   holds the viewport while the page beneath actually gets ready —
   fonts landed, Vanta NET hero initialized — before sweeping away.
   Nothing "pops in" after the reveal: the WebGL hero is already
   live when the cover lifts.

   This module is the shared state between the loader, the VantaNet
   component (pending/settled accounting) and the router (skips the
   intro swoosh when the loader handles the first reveal).
   ============================================================= */

let active = false;
let scrollLocked = false;
let pendingVanta = 0;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

/* ---- loader lifecycle ---- */

/** Called when the Preloader mounts (post-hydration). */
export function markPreloaderActive() {
  active = true;
}

/** Called when the loader has fully lifted and unmounted. */
export function markPreloaderDone() {
  active = false;
  emit();
}

/** True while the first-load loader is covering the viewport. */
export function isPreloaderActive(): boolean {
  return active;
}

/* ---- scroll lock (the loader holds the viewport) ---- */

export function setScrollLocked(next: boolean) {
  scrollLocked = next;
}

export function isScrollLocked(): boolean {
  return scrollLocked;
}

/* ---- Vanta readiness accounting ----
   Every mounted VantaNet increments `pendingVanta` and decrements it
   exactly once when it settles — WebGL initialized, or the CSS
   fallback takes over. The loader only lifts when the counter is
   back to zero, so a deep link that swaps landing → AI page mid-load
   still waits for the hero that actually shows the net. */

export function markVantaPending() {
  pendingVanta++;
}

export function markVantaSettled() {
  pendingVanta = Math.max(0, pendingVanta - 1);
  emit();
}

export function getPendingVanta(): number {
  return pendingVanta;
}

/** Subscribe to any readiness change (loader re-checks on every emit). */
export function onPreloadChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
