# Kramora AI — Website

Marketing site for **Kramora AI**, an AI & automation agency. Eighteen pages delivered as a
hash-routed single-page app on a single Next.js route, with a strictly light visual system
(white · slate · indigo) and a motion-first, zero-jank architecture.

## Tech stack

- **Next.js 16** (App Router) · **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui** (New York style) + Lucide icons
- **Prisma ORM** + SQLite — contact-form persistence
- **Lenis** — inertial smooth scrolling (reduced-motion aware)
- **Vanta.js / three.js** — light-mode WebGL hero backgrounds
- Custom shared-rAF engine (`src/lib/motion.ts`) driving every scroll-linked animation

## Pages (hash routes on `/`)

| # | Page | Route |
|---|------|-------|
| 01 | Landing | `#/` |
| 02 | Services Overview | `#/services` |
| 03 | AI & Gen AI | `#/ai` |
| 04 | Data Engineering & Cloud | `#/data` |
| 05 | Web, Mobile & Automation | `#/web` |
| 06 | OCR, Document AI & Staff Aug | `#/ocr` |
| 07 | About Us | `#/about` |
| 08 | Our Process | `#/process` |
| 09 | Technology Stack | `#/stack` |
| 10 | Industries | `#/industries` |
| 11 | Case Studies | `#/work` |
| 12 | Insights Hub | `#/insights` |
| 13 | Engagement Models | `#/engage` |
| 14 | Testimonials & FAQ | `#/reviews` |
| 15 | Let's Build (contact) | `#/contact` |
| 16 | Privacy Policy | `#/privacy` |
| 17 | Terms of Service | `#/terms` |
| 18 | 404 | `#/notfound` |

Unknown routes normalize to `#/notfound`. Back/forward history works on every page.

## Highlights

- Swoosh clip-path page transitions (reduced-motion: instant swap)
- Signature components: **WorksWheel** (scroll-driven 3D ring), **CaseStudyFlipStack**,
  self-drawing **Timeline**, **CircuitBoard**, **AuroraBars**, **TextMorph**,
  **LogoMarquee**, **ParticleTypography**
- Fully responsive from 375 px up; 44 px touch targets; reduced-motion fallbacks everywhere
- Contact API: zod validation → Prisma persistence (`POST /api/contact`)
- Downloadable capability deck: `/kramora-capability-deck.pdf`

## Getting started

```bash
bun install           # or: npm install
cp .env.example .env  # then adjust DATABASE_URL if you like
bun run db:push       # create the SQLite database
bun run dev           # http://localhost:3000
```

Useful scripts: `bun run lint` (ESLint), `bun run db:generate` (regenerate Prisma client).

## Project structure

```
prisma/                      # Prisma schema (SQLite)
public/                      # favicon, logo, capability-deck PDF
src/
  app/                       # App Router — the single "/" route + /api/contact
  components/site/           # site shell + 18 pages
  components/site/animated/  # 8 signature animated components
  components/ui/             # shadcn/ui primitives
  lib/                       # motion engine, Lenis store, page registry, site data
```

## Notes

- `.env` and the SQLite database file are gitignored — contact submissions never leave your machine.
- The site targets a single deployed route (`/`); all 18 "pages" are hash routes handled by
  `src/components/site/kramora-site.tsx`.
