/**
 * Kramora AI — Capability Deck (Q3) PDF generator.
 *
 * Produces a light-themed, typographic 6-page deck at:
 *   public/kramora-capability-deck.pdf
 *
 * Run: bun scripts/gen-deck.cjs   (pdfkit is CommonJS)
 */
/* eslint-disable @typescript-eslint/no-require-imports -- pdfkit is CJS; this is a CommonJS build script */
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const OUT = path.join(__dirname, "..", "public", "kramora-capability-deck.pdf");

// ---------- palette ----------
const INDIGO = "#2563EB"; // accent
const INK = "#1E293B"; // headings (slate-800)
const BODY = "#334155"; // primary body text (slate-700)
const MUTED = "#64748B"; // secondary text (slate-500)
const FAINT = "#94A3B8"; // footer / tertiary (slate-400)
const LINE = "#E2E8F0"; // hairlines (slate-200)
const WASH = "#EFF6FF"; // light indigo fill (indigo-50)

// ---------- geometry ----------
const PAGE_W = 612; // US Letter, points
const PAGE_H = 792;
const M = 64; // side margin
const CW = PAGE_W - M * 2; // content width = 484

const doc = new PDFDocument({
  size: "LETTER",
  // bottom margin must stay below the running footer text (y 734) so
  // pdfkit never auto-paginates the footer onto phantom pages
  margins: { top: 56, bottom: 40, left: M, right: M },
  info: {
    Title: "Kramora AI — Capability Deck (Q3)",
    Author: "Kramora AI",
    Subject: "Capability Deck",
    Creator: "Kramora AI",
  },
});

const stream = fs.createWriteStream(OUT);
doc.pipe(stream);

// ---------- helpers ----------
function topBar() {
  doc.save().rect(0, 0, PAGE_W, 5).fill(INDIGO).restore();
}

function runningFooter(num) {
  doc
    .save()
    .moveTo(M, 728)
    .lineTo(PAGE_W - M, 728)
    .strokeColor(LINE)
    .lineWidth(0.75)
    .stroke()
    .restore();
  doc.font("Helvetica").fontSize(8).fillColor(FAINT)
    .text("Kramora AI · Capability Deck — Q3", M, 736, { width: CW });
  doc.font("Helvetica-Bold").fontSize(8).fillColor(FAINT)
    .text(num, M, 736, { width: CW, align: "right" });
}

function eyebrow(text, y, opts = {}) {
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(INDIGO)
    .text(text, opts.x ?? M, y, { width: CW, characterSpacing: 1.6 });
}

function sectionTitle(text, y) {
  doc
    .font("Helvetica-Bold")
    .fontSize(27)
    .fillColor(INK)
    .text(text, M, y, { width: CW, characterSpacing: -0.2 });
}

// Two-color word on one line, horizontally centered or left-anchored.
function twoTone(part1, part2, y, size, opts = {}) {
  doc.font("Helvetica-Bold").fontSize(size);
  const w1 = doc.widthOfString(part1);
  const w2 = doc.widthOfString(part2);
  const x = opts.center ? (PAGE_W - (w1 + w2)) / 2 : M;
  doc.fillColor(opts.color1 ?? INK).text(part1, x, y, { lineBreak: false });
  doc.fillColor(opts.color2 ?? INDIGO).text(part2, x + w1, y, { lineBreak: false });
  return w1 + w2;
}

function hairline(x, y, w, color, width) {
  doc
    .save()
    .moveTo(x, y)
    .lineTo(x + w, y)
    .strokeColor(color ?? LINE)
    .lineWidth(width ?? 1)
    .stroke()
    .restore();
}

// Decorative dot matrix — subtle slate dots with a diagonal of indigo accents.
function dotGrid(x, y, cols, rows, spacing) {
  const accents = new Set();
  for (let i = 0; i < Math.min(cols, rows); i++) accents.add(i * cols + (cols - 1 - i));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const color = accents.has(idx) ? INDIGO : LINE;
      doc.save().circle(x + c * spacing, y + r * spacing, 1.4).fill(color).restore();
    }
  }
}

// ============================================================
// PAGE 1 — COVER
// ============================================================
topBar();

// Eyebrow badge: "CAPABILITY DECK — Q3"
(function badge() {
  const label = "CAPABILITY DECK — Q3";
  doc.font("Helvetica-Bold").fontSize(8.5);
  const spacing = 1.2;
  const textW = doc.widthOfString(label, { characterSpacing: spacing });
  const bw = textW + 28;
  const bh = 26;
  const by = 150;
  doc.save().roundedRect(M, by, bw, bh, 13).fill(WASH).restore();
  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(INDIGO)
    .text(label, M, by + 8.5, { width: bw, align: "center", characterSpacing: spacing });
})();

// Wordmark
twoTone("Kramora", " AI", 210, 56);

// Accent rule under the wordmark
doc.save().rect(M, 296, 56, 3).fill(INDIGO).restore();
// Tagline
doc
  .font("Helvetica")
  .fontSize(15.5)
  .fillColor(BODY)
  .text("AI-First. Innovation-Driven. Built for Growth.", M, 322, {
    width: CW,
    characterSpacing: 0.2,
  });

// Decorative dot matrix, right side
dotGrid(394, 382, 12, 7, 14);

doc.outline.addItem("Cover");

// Hub index strip near the bottom
hairline(M, 560, CW);
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(MUTED)
  .text(
    "AI & Gen AI · Data Engineering · Cloud & DevOps · Web & Mobile · Automation & RPA · OCR & Document AI · Staff Augmentation · Blockchain & Emerging",
    M,
    576,
    { width: CW, lineGap: 4 }
  );

// Cover footer — contact line
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(MUTED)
  .text("ashu@kramoraa.com · Issaquah, WA · Bengaluru, India", M, 700, {
    width: CW,
    align: "center",
  });

doc.addPage();
doc.outline.addItem("Who we are");

// ============================================================
// PAGE 2 — WHO WE ARE
// ============================================================
topBar();
eyebrow("01 · COMPANY", 72);
sectionTitle("Who we are", 92);

doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor(BODY)
  .text(
    "Kramora AI is a senior-only AI agency. We embed experienced engineers — not juniors learning on your budget — to design, build, and run production AI systems. From Gen AI products to the data and cloud foundations underneath them, we take work from whiteboard to 24/7 operations.",
    M,
    140,
    { width: CW, lineGap: 5 }
  );

// Stats grid — 4 x 2
const stats = [
  ["5.0", "average rating"],
  ["27+", "teams supported"],
  ["97%", "client retention"],
  ["2–3x", "faster delivery"],
  ["24/7", "follow-the-sun delivery"],
  ["12", "AI models in production"],
  ["4", "data pipelines live"],
  ["+34%", "model performance, last 24h"],
];
(function statGrid() {
  const gap = 12;
  const w = (CW - 3 * gap) / 4;
  const h = 82;
  const startY = 252;
  stats.forEach((s, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = M + col * (w + gap);
    const y = startY + row * (h + gap);
    doc
      .save()
      .roundedRect(x, y, w, h, 6)
      .fillColor("#FFFFFF")
      .lineWidth(0.75)
      .strokeColor(LINE)
      .fillAndStroke()
      .restore();
    doc
      .font("Helvetica-Bold")
      .fontSize(21)
      .fillColor(INDIGO)
      .text(s[0], x + 10, y + 13, { width: w - 20 });
    doc
      .font("Helvetica")
      .fontSize(8.3)
      .fillColor(MUTED)
      .text(s[1], x + 10, y + 42, { width: w - 20, lineGap: 2 });
  });
})();

// "We reply within 24 hours." callout
(function replyCallout() {
  const y = 470;
  const h = 74;
  doc.save().roundedRect(M, y, CW, h, 8).fill(WASH).restore();
  doc.save().rect(M, y, 3, h).fill(INDIGO).restore();
  doc
    .font("Helvetica-Bold")
    .fontSize(13.5)
    .fillColor(INK)
    .text("We reply within 24 hours.", M + 24, y + 16, { width: CW - 48 });
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(MUTED)
    .text(
      "Every inquiry is read and answered by a senior engineer — usually the same business day.",
      M + 24,
      y + 38,
      { width: CW - 48 }
    );
})();

runningFooter("02");
doc.addPage();
doc.outline.addItem("Eight technical hubs");

// ============================================================
// PAGE 3 — EIGHT TECHNICAL HUBS
// ============================================================
topBar();
eyebrow("02 · SERVICES", 72);
sectionTitle("Eight technical hubs", 92);

const hubs = [
  ["AI & Gen AI", "Custom LLM applications, RAG systems, agents, and fine-tuning that ship to production."],
  ["Data Engineering", "Pipelines, warehouses, and streaming foundations that keep models fed and fast."],
  ["Cloud & DevOps", "Resilient infrastructure, CI/CD, and cost-optimized operations on AWS, GCP, and Azure."],
  ["Web & Mobile", "High-performance web and mobile products built end to end on modern stacks."],
  ["Automation & RPA", "Workflow automation that removes manual toil across your business."],
  ["OCR & Document AI", "Extraction pipelines that turn unstructured documents into usable data."],
  ["Staff Augmentation", "Senior engineers embedded in your team and ramped in days."],
  ["Blockchain & Emerging", "Smart contracts, Web3 infrastructure, and disciplined early-stage tech bets."],
];
(function hubGrid() {
  const gap = 24;
  const w = (CW - gap) / 2; // 230
  const rowH = 104;
  const startY = 148;
  hubs.forEach((hub, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (w + gap);
    const y = startY + row * rowH;
    const num = String(i + 1).padStart(2, "0");
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(INDIGO)
      .text(num, x, y, { characterSpacing: 1.2 });
    doc
      .font("Helvetica-Bold")
      .fontSize(12.5)
      .fillColor(INK)
      .text(hub[0], x, y + 16, { width: w });
    doc
      .font("Helvetica")
      .fontSize(9.5)
      .fillColor(MUTED)
      .text(hub[1], x, y + 34, { width: w - 12, lineGap: 3 });
  });
})();

// Bottom note pill
(function hubNote() {
  const y = 596;
  const label = "Not sure where to start? We will help you pick the right hub in a free 30-minute call.";
  doc.font("Helvetica").fontSize(9.5);
  const tw = doc.widthOfString(label);
  const pw = tw + 48;
  const ph = 34;
  const px = (PAGE_W - pw) / 2;
  doc.save().roundedRect(px, y, pw, ph, 17).lineWidth(0.75).strokeColor(LINE).fillColor("#FFFFFF").fillAndStroke().restore();
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(MUTED)
    .text(label, px, y + 11.5, { width: pw, align: "center" });
})();

runningFooter("03");
doc.addPage();
doc.outline.addItem("How we work");

// ============================================================
// PAGE 4 — HOW WE WORK
// ============================================================
topBar();
eyebrow("03 · PROCESS", 72);
sectionTitle("How we work", 92);

const phases = [
  ["1", "Discover", "WEEKS 1–2", "Align on goals, audit data and systems, and define a roadmap with clear success metrics."],
  ["2", "Design", "WEEKS 3–4", "Prototype the architecture, select the right models, and lock scope before a line of code is written."],
  ["3", "Build", "WEEKLY SPRINTS", "Ship in weekly sprints with a working demo every week, so you see progress from day one."],
  ["4", "Scale", "24/7", "Harden, monitor, and optimize in production with follow-the-sun support as usage grows."],
];
(function phaseList() {
  const startY = 148;
  const rowH = 66;
  phases.forEach((p, i) => {
    const y = startY + i * rowH;
    // numbered disc
    doc.save().circle(M + 9, y + 9.5, 9).fill(INDIGO).restore();
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("#FFFFFF")
      .text(p[0], M, y + 3.5, { width: 18, align: "center" });
    // phase name
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor(INK)
      .text(p[1], M + 28, y + 1, { width: 200 });
    // duration, right-aligned
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor(INDIGO)
      .text(p[2], M + 236, y + 4, { width: CW - 236, align: "right", characterSpacing: 1.2 });
    // description
    doc
      .font("Helvetica")
      .fontSize(9.8)
      .fillColor(MUTED)
      .text(p[3], M + 28, y + 20, { width: CW - 28, lineGap: 3 });
  });
})();

// Flagship stat callout
(function flagship() {
  const y = 442;
  const h = 150;
  doc.save().roundedRect(M, y, CW, h, 10).fill(WASH).restore();
  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(INDIGO)
    .text("FLAGSHIP DEPLOYMENT", M + 24, y + 22, { characterSpacing: 1.5 });
  doc
    .font("Helvetica-Bold")
    .fontSize(30)
    .fillColor(INK)
    .text("4.2k documents / hour", M + 24, y + 40, { width: CW - 48 });
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(MUTED)
    .text(
      "Insurance document pipeline — OCR, classification, and extraction — running in production, around the clock.",
      M + 24,
      y + 84,
      { width: CW - 48, lineGap: 4 }
    );
})();

runningFooter("04");
doc.addPage();
doc.outline.addItem("Engagement models");

// ============================================================
// PAGE 5 — ENGAGEMENT MODELS
// ============================================================
topBar();
eyebrow("04 · ENGAGEMENT", 72);
sectionTitle("Engagement models", 92);

const models = [
  {
    name: "Fixed Scope",
    bullets: ["Clear deliverables and timeline", "Best for MVPs and audits", "Fixed price, no surprises"],
    featured: false,
  },
  {
    name: "Dedicated Pods",
    bullets: ["Cross-functional senior pod", "Weekly sprints with demos", "Scale up or down anytime"],
    featured: true,
  },
  {
    name: "Staff Augmentation",
    bullets: ["Senior engineers in your team", "Ramped in days, not months", "Your process, your tools"],
    featured: false,
  },
];
(function modelCards() {
  const gap = 14;
  const w = (CW - 2 * gap) / 3; // ~152
  const y = 176;
  const h = 196;
  models.forEach((m, i) => {
    const x = M + i * (w + gap);
    doc
      .save()
      .roundedRect(x, y, w, h, 10)
      .fillColor(m.featured ? WASH : "#FFFFFF")
      .lineWidth(m.featured ? 1.5 : 0.75)
      .strokeColor(m.featured ? INDIGO : LINE)
      .fillAndStroke()
      .restore();

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor(INK)
      .text(m.name, x + 14, y + 22, { width: w - 28 });
    doc.save().rect(x + 14, y + 44, 26, 2).fill(INDIGO).restore();

    let by = y + 60;
    m.bullets.forEach((b) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .fillColor(INDIGO)
        .text("·  ", x + 14, by, { continued: true });
      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor(BODY)
        .text(b, { width: w - 26, lineGap: 3 });
      by += 26;
    });

    if (m.featured) {
      const label = "MOST POPULAR";
      doc.font("Helvetica-Bold").fontSize(6.5);
      const spacing = 1;
      const tw = doc.widthOfString(label, { characterSpacing: spacing });
      const bw = tw + 18;
      const bx = x + (w - bw) / 2;
      doc.save().roundedRect(bx, y - 8, bw, 16, 8).fill(INDIGO).restore();
      doc
        .font("Helvetica-Bold")
        .fontSize(6.5)
        .fillColor("#FFFFFF")
        .text(label, bx, y - 4, { width: bw, align: "center", characterSpacing: spacing });
    }
  });
})();

// Note under the cards
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(MUTED)
  .text(
    "Mix and match — most clients start with a Fixed Scope audit, then move to a Dedicated Pod.",
    M,
    430,
    { width: CW, align: "center" }
  );

runningFooter("05");
doc.addPage();
doc.outline.addItem("Let's build");

// ============================================================
// PAGE 6 — BACK COVER
// ============================================================
topBar();
dotGrid(430, 596, 9, 5, 14);

doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor(INDIGO)
  .text("GET STARTED", M, 196, { width: CW, align: "center", characterSpacing: 1.6 });

twoTone("Let's ", "build.", 232, 46, { center: true });

// Accent rule, centered
doc.save().rect((PAGE_W - 56) / 2, 318, 56, 3).fill(INDIGO).restore();

doc
  .font("Helvetica-Bold")
  .fontSize(14)
  .fillColor(INDIGO)
  .text("ashu@kramoraa.com", M, 344, { width: CW, align: "center" });

doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor(MUTED)
  .text("Issaquah, WA · Bengaluru, India", M, 372, { width: CW, align: "center" });

// CTA pill
(function ctaPill() {
  const label = "Book a free 30-minute strategy call.";
  doc.font("Helvetica-Bold").fontSize(11);
  const tw = doc.widthOfString(label);
  const pw = tw + 44;
  const ph = 32;
  const px = (PAGE_W - pw) / 2;
  const y = 424;
  doc.save().roundedRect(px, y, pw, ph, 16).fill(INDIGO).restore();
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#FFFFFF")
    .text(label, px, y + 9.5, { width: pw, align: "center" });
})();

// Closing micro-facts
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(FAINT)
  .text(
    "Replies within 24 hours · Senior engineers only · U.S. and India offices",
    M,
    560,
    { width: CW, align: "center" }
  );

runningFooter("06");

// ---------- finalize ----------
doc.end();

stream.on("finish", () => {
  const size = fs.statSync(OUT).size;
  console.log(`Wrote ${OUT} (${(size / 1024).toFixed(1)} KB, 6 pages)`);
});
