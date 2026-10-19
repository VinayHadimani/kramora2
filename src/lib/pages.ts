/* =============================================================
   Page registry — the 18-page sitemap (15 core + 3 utility),
   driven by hash routes on the single "/" route.
   ============================================================= */

export type PageId =
  | "home"
  | "services"
  | "ai"
  | "data"
  | "web"
  | "ocr"
  | "about"
  | "process"
  | "stack"
  | "industries"
  | "work"
  | "insights"
  | "engage"
  | "reviews"
  | "contact"
  | "privacy"
  | "terms"
  | "notfound";

export interface PageMeta {
  id: PageId;
  /** sitemap number, e.g. "PAGE 02" */
  n: string;
  title: string;
  /** label shown on the swoosh panel while transitioning */
  short: string;
  docTitle: string;
  /** top-level nav section it belongs to ("home" | group label) */
  section: string;
}

export const PAGES: PageMeta[] = [
  { id: "home", n: "01", title: "Landing", short: "Kramora AI", docTitle: "Kramora AI — We build intelligent products that scale", section: "home" },
  { id: "services", n: "02", title: "Services Overview", short: "Services", docTitle: "Services — Kramora AI", section: "Services" },
  { id: "ai", n: "03", title: "AI & Gen AI", short: "AI & Gen AI", docTitle: "AI & Gen AI — Kramora AI", section: "Services" },
  { id: "data", n: "04", title: "Data Engineering & Cloud", short: "Data & Cloud", docTitle: "Data Engineering & Cloud — Kramora AI", section: "Services" },
  { id: "web", n: "05", title: "Web, Mobile & Automation", short: "Web & Automation", docTitle: "Web, Mobile & Automation — Kramora AI", section: "Services" },
  { id: "ocr", n: "06", title: "OCR, Document AI & Staff Aug", short: "OCR & Staff Aug", docTitle: "OCR, Document AI & Staff Aug — Kramora AI", section: "Services" },
  { id: "about", n: "07", title: "About Us", short: "About", docTitle: "About Us — Kramora AI", section: "Company" },
  { id: "process", n: "08", title: "Our Process", short: "Process", docTitle: "Our Process — Kramora AI", section: "Company" },
  { id: "stack", n: "09", title: "Technology Stack", short: "Tech Stack", docTitle: "Technology Stack — Kramora AI", section: "Company" },
  { id: "industries", n: "10", title: "Industries", short: "Industries", docTitle: "Industries — Kramora AI", section: "Company" },
  { id: "work", n: "11", title: "Case Studies", short: "Case Studies", docTitle: "Case Studies — Kramora AI", section: "Resources" },
  { id: "insights", n: "12", title: "Insights Hub", short: "Insights", docTitle: "Insights Hub — Kramora AI", section: "Resources" },
  { id: "engage", n: "13", title: "Engagement Models", short: "Engagement", docTitle: "Engagement Models — Kramora AI", section: "Resources" },
  { id: "reviews", n: "14", title: "Testimonials & FAQ", short: "Testimonials", docTitle: "Testimonials & FAQ — Kramora AI", section: "Resources" },
  { id: "contact", n: "15", title: "Let's Build", short: "Let's Build", docTitle: "Let's Build — Kramora AI", section: "contact" },
  { id: "privacy", n: "16", title: "Privacy Policy", short: "Privacy", docTitle: "Privacy Policy — Kramora AI", section: "legal" },
  { id: "terms", n: "17", title: "Terms of Service", short: "Terms", docTitle: "Terms of Service — Kramora AI", section: "legal" },
  { id: "notfound", n: "18", title: "404 — Page Not Found", short: "404", docTitle: "Page not found — Kramora AI", section: "error" },
];

export const PAGE_MAP: Record<string, PageMeta> = Object.fromEntries(
  PAGES.map((p) => [p.id, p]),
);

/** Parse a location.hash into a PageId ("notfound" for unknown routes). */
export function pageIdFromHash(hash: string): PageId {
  const clean = hash.replace(/^#\/?/, "").replace(/\/$/, "").toLowerCase();
  if (!clean) return "home";
  return clean in PAGE_MAP ? (clean as PageId) : "notfound";
}

export function hashForPage(id: PageId): string {
  return id === "home" ? "#/" : `#/${id}`;
}

/** The next page in sitemap order (for the "Up next" band). */
export function nextPageId(id: PageId): PageId {
  const idx = PAGES.findIndex((p) => p.id === id);
  if (idx === -1 || PAGES.length < 2) return "home";
  const next = PAGES[(idx + 1) % PAGES.length];
  return next.id === "notfound" ? "home" : next.id;
}
