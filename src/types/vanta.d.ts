/* =============================================================
   Vanta type shim — vanta ships untyped UMD bundles.
   Only the NET effect (light mode) is used on this site.
   ============================================================= */

declare module "vanta/dist/vanta.net.min" {
  export interface VantaNetOptions {
    el: HTMLElement;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    /** line/node color — 0x2563EB (Indigo-600) on this site */
    color?: number;
    /** canvas background — 0xFFFFFF (pure white) on this site */
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }

  export interface VantaNetEffect {
    destroy: () => void;
  }

  const NET: (options: VantaNetOptions) => VantaNetEffect;
  export default NET;
}
