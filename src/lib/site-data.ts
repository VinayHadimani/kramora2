import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Building2,
  Clapperboard,
  CloudCog,
  DatabaseZap,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  MonitorSmartphone,
  Plane,
  Scale,
  ScanText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

/* =============================================================
   Canonical site content — single source of truth.
   All "Client Reconciliation" numbers are locked here and reused
   verbatim across every page (97% retention, Issaquah HQ, 5.0...).
   ============================================================= */

export const BRAND = {
  name: "Kramora AI",
  tagline: "AI-First. Innovation-Driven. Built for Growth.",
  email: "ashu@kramoraa.com",
  usOffice: "Issaquah, WA",
  usOfficeFull: "US Office — Issaquah, WA",
  inOffice: "Bengaluru, India",
  inOfficeFull: "India Office — Bengaluru",
  replyWindow: "We reply within 24 hours",
  booking: "Now booking Q3 engagements — limited capacity",
} as const;

export const STATS = {
  rating: "5.0",
  teams: "27+",
  retention: "97%",
  speed: "2–3x",
  support: "24/7",
  docs: "4.2k",
  docsUnit: "documents/hour",
  modelPerf: "+34%",
  models: "12",
  pipelines: "4",
} as const;

/* ---------------- Navigation (18 pages) ---------------- */

export interface NavItem {
  id: string;
  label: string;
  desc?: string;
}

export const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Services",
    items: [
      { id: "services", label: "Overview", desc: "One partner across the modern stack" },
      { id: "ai", label: "AI & Gen AI", desc: "ML, NLP, LLM apps, RAG, agents" },
      { id: "data", label: "Data Eng & Cloud", desc: "Pipelines, warehousing, K8s" },
      { id: "web", label: "Web & Automation", desc: "Next.js, React Native, RPA" },
      { id: "ocr", label: "OCR & Staff Aug", desc: "Document AI, dedicated pods" },
    ],
  },
  {
    label: "Company",
    items: [
      { id: "about", label: "About Us", desc: "Principles, story, offices" },
      { id: "process", label: "Our Process", desc: "Discover → Design → Build → Scale" },
      { id: "stack", label: "Technology Stack", desc: "The 8-layer matrix" },
      { id: "industries", label: "Industries", desc: "12 verticals we serve" },
    ],
  },
  {
    label: "Resources",
    items: [
      { id: "work", label: "Case Studies", desc: "Proof in production" },
      { id: "insights", label: "Insights Hub", desc: "5 field notes from our team" },
      { id: "engage", label: "Engagement Models", desc: "Fixed scope, pods, staff aug" },
      { id: "reviews", label: "Testimonials & FAQ", desc: "What 27+ teams say" },
    ],
  },
];

/* ---------------- 8 Technical Hubs ---------------- */

export interface Hub {
  id: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  page: string; // target page id
}

export const HUBS: Hub[] = [
  {
    id: "ai",
    icon: Sparkles,
    title: "AI & Gen AI",
    blurb: "ML, NLP, LLM applications, RAG systems and autonomous agents.",
    page: "ai",
  },
  {
    id: "data-eng",
    icon: DatabaseZap,
    title: "Data Engineering",
    blurb: "ETL/ELT, streaming pipelines and modern warehousing.",
    page: "data",
  },
  {
    id: "cloud",
    icon: CloudCog,
    title: "Cloud & DevOps",
    blurb: "Kubernetes, multi-cloud and 24/7 platform reliability.",
    page: "data",
  },
  {
    id: "web-mobile",
    icon: MonitorSmartphone,
    title: "Web & Mobile",
    blurb: "Next.js platforms and React Native applications.",
    page: "web",
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Automation & RPA",
    blurb: "Workflow automation, RPA and orchestration at scale.",
    page: "web",
  },
  {
    id: "ocr",
    icon: ScanText,
    title: "OCR & Document AI",
    blurb: "IDP, OCR and structured data extraction pipelines.",
    page: "ocr",
  },
  {
    id: "staff",
    icon: Users,
    title: "Staff Augmentation",
    blurb: "Dedicated senior teams and managed pods.",
    page: "ocr",
  },
  {
    id: "chain",
    icon: Blocks,
    title: "Blockchain & Emerging",
    blurb: "Distributed systems and emerging-tech R&D.",
    page: "stack",
  },
];

/* ---------------- Process (4 moves) ---------------- */

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discover",
    weeks: "Weeks 1–2",
    desc: "We audit your stack, data and goals, then map the shortest path to production. Every engagement starts with an honest assessment — not a sales deck.",
    chips: ["Stack audit", "Data audit", "Roadmap", "Success metrics"],
  },
  {
    n: "02",
    title: "Design",
    weeks: "Weeks 3–4",
    desc: "Architecture, prototypes and a delivery plan your team can actually hold us to. We design for the boring parts first — security, compliance, failure modes.",
    chips: ["Architecture", "UX prototypes", "Delivery plan"],
  },
  {
    n: "03",
    title: "Build",
    weeks: "Sprints",
    desc: "Senior engineers ship in weekly increments — you see working software every week, not slideware. 2–3x faster than typical agency engagements.",
    chips: ["Weekly demos", "Production deploys", "QA"],
  },
  {
    n: "04",
    title: "Scale",
    weeks: "Ongoing",
    desc: "24/7 delivery and support. We monitor, optimize and hand over — or stay on as your embedded pod. 97% retention says most teams keep us.",
    chips: ["Monitoring", "Optimization", "Support SLAs"],
  },
];

/* ---------------- About: 4 Core Principles ---------------- */

export const PRINCIPLES = [
  {
    title: "AI-First",
    desc: "Every engagement starts from what intelligence can do — not from a template. We build with the latest models, then engineer around their limits.",
  },
  {
    title: "Senior talent",
    desc: "No junior benches, no bait-and-switch. The people who pitch are the people who build — 4–6 senior engineers per pod, 97% retention.",
  },
  {
    title: "Outcome-obsessed",
    desc: "We're measured on shipped production systems, not billable hours. 4.2k documents/hour is a number we put on the wall.",
  },
  {
    title: "Transparent & fast",
    desc: "Weekly demos, open backlogs, honest trade-offs. We reply within 24 hours — and we say no when a project isn't right.",
  },
];

/* ---------------- Technology Stack (8 layers) ---------------- */

export const STACK_LAYERS = [
  {
    id: "frontend",
    name: "Frontend",
    note: "Interfaces that feel instant and stay maintainable.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Vite"],
  },
  {
    id: "backend",
    name: "Backend",
    note: "Typed services built for auditability and scale.",
    items: ["Node.js", "Python", "Go", "GraphQL", "PostgreSQL", "Redis", "gRPC"],
  },
  {
    id: "aiml",
    name: "AI / ML",
    note: "From fine-tuning to evaluation harnesses.",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "vLLM"],
  },
  {
    id: "aitools",
    name: "AI Tools",
    note: "Model APIs, vector stores and experiment tracking.",
    items: ["OpenAI", "Anthropic", "Pinecone", "Weights & Biases", "Ray", "LlamaIndex"],
  },
  {
    id: "dataeng",
    name: "Data Eng",
    note: "Pipelines that are boring in the best way.",
    items: ["Spark", "Kafka", "Airflow", "dbt", "Snowflake", "Fivetran", "Iceberg"],
  },
  {
    id: "cloud",
    name: "Cloud",
    note: "Multi-cloud by design — no hostage situations.",
    items: ["AWS", "Google Cloud", "Azure", "Cloudflare", "Vercel", "Multi-cloud strategy"],
  },
  {
    id: "blockchain",
    name: "Blockchain",
    note: "Where distributed systems actually earn their keep.",
    items: ["Solidity", "Ethereum", "Hyperledger", "Smart-contract audits", "Custody design"],
  },
  {
    id: "devops",
    name: "DevOps",
    note: "24/7 reliability with a paper trail.",
    items: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "Argo CD", "Grafana", "PagerDuty"],
  },
];

/* ---------------- Industries (12 verticals) ---------------- */

export const INDUSTRIES: { icon: LucideIcon; name: string; blurb: string }[] = [
  { icon: HeartPulse, name: "Healthcare", blurb: "Clinical intelligence and patient-facing AI that passes HIPAA." },
  { icon: Landmark, name: "FinTech", blurb: "Risk models, onboarding automation and real-time data platforms." },
  { icon: ShieldCheck, name: "Insurance", blurb: "Document AI at 4.2k documents/hour — our flagship vertical." },
  { icon: ShoppingBag, name: "Retail & E-commerce", blurb: "Demand forecasting, search and personalized merchandising." },
  { icon: Truck, name: "Logistics & Supply Chain", blurb: "Route optimization and end-to-end visibility pipelines." },
  { icon: Factory, name: "Manufacturing", blurb: "Predictive maintenance and vision-based quality control." },
  { icon: GraduationCap, name: "Education", blurb: "Adaptive learning and assessment automation." },
  { icon: Building2, name: "Real Estate", blurb: "Valuation models and intelligent listing platforms." },
  { icon: Scale, name: "Legal", blurb: "Contract intelligence and precedent research copilots." },
  { icon: Zap, name: "Energy & Utilities", blurb: "Load forecasting and grid-analytics platforms." },
  { icon: Clapperboard, name: "Media & Entertainment", blurb: "Content pipelines and recommendation engines." },
  { icon: Plane, name: "Travel & Hospitality", blurb: "Dynamic pricing and guest-experience automation." },
];

/* ---------------- Insights: 5 articles ---------------- */

export interface Article {
  id: string;
  title: string;
  tag: string;
  minutes: number;
  excerpt: string;
  body: string[];
  bullets: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "beyond",
    title: "Beyond the Chatbot",
    tag: "Gen AI",
    minutes: 6,
    excerpt: "Where generative AI actually pays off — past the demo, inside the P&L.",
    body: [
      "Most generative AI pilots die between the demo and the ledger. The technology works; the economics and the workflow placement don't. The teams that win treat a model as a component inside a system that already has owners, metrics and SLAs.",
      "We start every Gen AI engagement from a unit of work — a document processed, a ticket resolved, a draft reviewed — and price the intelligence against it. If the math doesn't clear at pilot scale, we say so in week one, not month six.",
    ],
    bullets: [
      "Pick use cases with a measurable unit of work, not vague 'productivity'.",
      "Budget for evaluation infrastructure on day one — it's 30% of real cost.",
      "Ship to a small ring of power users before promising the org chart.",
    ],
  },
  {
    id: "foundation",
    title: "The Data Foundation",
    tag: "Data Eng",
    minutes: 7,
    excerpt: "Why AI programs stall on weak data foundations — and how to fix it in weeks.",
    body: [
      "Nobody sets out to build a swamp, yet most enterprises have three: a swamp of duplicates, a swamp of undocumented pipelines, and a swamp of dashboards nobody trusts. Every ambitious AI roadmap eventually collides with all three.",
      "The fix is unglamorous and fast when scoped honestly: one governed domain at a time, contracts on the pipelines, and lineage your auditors can read. Do that for two domains and the rest of the AI program stops fighting gravity.",
    ],
    bullets: [
      "Fund data contracts before funding models — they're cheaper and compound.",
      "One domain at a time; breadth-first data programs stall at 18 months.",
      "Make lineage a deliverable, not a wiki page.",
    ],
  },
  {
    id: "rag",
    title: "RAG in Regulated Industries",
    tag: "Architecture",
    minutes: 8,
    excerpt: "Retrieval-augmented generation that survives compliance, audit and counsel.",
    body: [
      "In insurance, legal and healthcare, a confident wrong answer is worse than no answer. The architecture that survives review is boring on purpose: grounded retrieval, cited sources, deterministic guardrails and a human checkpoint exactly where the regulator expects one.",
      "Our insurance deployment runs at 4.2k documents an hour because the hard part wasn't the model — it was chunking, entitlements and the review queue that counsel actually signed off on.",
    ],
    bullets: [
      "Cite or it didn't happen: every generated claim carries its source span.",
      "Entitlements belong in retrieval, not in a prompt hoping to be obeyed.",
      "Design the human-in-the-loop queue before the model, not after.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping ML",
    tag: "MLOps",
    minutes: 5,
    excerpt: "From notebook to production without the model graveyard.",
    body: [
      "The gap between a great notebook and a production system is organizational, not mathematical. Versioning, evaluation, rollback and monitoring are engineering disciplines — and they're what separates a demo from the +34% model performance we track in production.",
      "Treat every model like a service with an SLO. When it degrades, page an engineer — don't wait for a quarterly review to discover the drift.",
    ],
    bullets: [
      "A model without an SLO is a demo, whatever the slide says.",
      "Evaluation suites are regression tests — run them on every change.",
      "Rollback is a first-class feature. If you can't roll back, you can't ship.",
    ],
  },
  {
    id: "build",
    title: "Build vs. Augment",
    tag: "Strategy",
    minutes: 6,
    excerpt: "When to build in-house, when to augment — a decision framework that holds.",
    body: [
      "The build-versus-hire question is really a question about rate of learning. If the capability is your product, build it and keep the people. If it's a means to an end, augment it and keep the roadmap.",
      "Our own data point: clients who start with a managed pod and internalize the discipline retain at 97% — because they learned the system, not just rented the output.",
    ],
    bullets: [
      "If it differentiates you in a sales conversation, build it.",
      "If it disappears into the product, augment it.",
      "Whatever you choose, own the evaluation — that part is never outsourced.",
    ],
  },
];

/* ---------------- Case Studies ---------------- */

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  stat: string;
  statLabel: string;
  desc: string;
  tags: string[];
  featured?: boolean;
  placeholder?: boolean;
}

export const CASES: CaseStudy[] = [
  {
    id: "insurance",
    category: "Insurance",
    title: "Generative AI document pipeline for a national insurer",
    stat: "4.2k",
    statLabel: "documents/hour",
    desc: "A production-grade IDP + GenAI pipeline that extracts, classifies and routes policy documents with human-in-the-loop review where counsel requires it. Model performance improved +34% over the first quarter in production; 12 models across 4 pipelines now run under one platform.",
    tags: ["Document AI", "RAG", "Human-in-the-loop"],
    featured: true,
  },
  {
    id: "fintech",
    category: "FinTech",
    title: "Real-time data platform for a lending platform",
    stat: "—",
    statLabel: "in preparation",
    desc: "Case study placeholder — the full write-up is being prepared with the client's compliance team. Ask us about streaming risk features in the meantime.",
    tags: ["Streaming", "Warehousing"],
    placeholder: true,
  },
  {
    id: "healthtech",
    category: "Healthtech",
    title: "ML triage copilot for a care-management team",
    stat: "—",
    statLabel: "in preparation",
    desc: "Case study placeholder — publication pending clinical review board approval. Ask us about evaluation design for regulated models.",
    tags: ["ML", "Evaluation"],
    placeholder: true,
  },
  {
    id: "retail",
    category: "Retail",
    title: "Workflow automation for a multi-brand retailer",
    stat: "—",
    statLabel: "in preparation",
    desc: "Case study placeholder — full numbers being verified by the client's finance team. Ask us about orchestration patterns in the meantime.",
    tags: ["RPA", "Orchestration"],
    placeholder: true,
  },
];

/* ---------------- Testimonials (6) ---------------- */

export const TESTIMONIALS = [
  {
    quote: "They rebuilt our document pipeline in eight weeks — 4.2k documents an hour, straight into production. No theatre.",
    name: "VP of Data",
    role: "Insurance",
  },
  {
    quote: "The pod feels like part of our team. Weekly demos, open backlog, zero surprises.",
    name: "CTO",
    role: "FinTech",
  },
  {
    quote: "From first call to production in one quarter. I've never seen that pace from any partner.",
    name: "Head of Product",
    role: "Healthtech",
  },
  {
    quote: "Senior engineers only — it shows in the questions they ask before the ones they answer.",
    name: "Director of Engineering",
    role: "Logistics",
  },
  {
    quote: "Transparent, fast and honest about trade-offs. A rare combination in this market.",
    name: "CEO",
    role: "Retail",
  },
  {
    quote: "Our retention number is 97% — and Kramora is a big reason why.",
    name: "COO",
    role: "SaaS",
  },
];

/* ---------------- FAQ (5) ---------------- */

export const FAQS = [
  {
    q: "How fast can we start?",
    a: "We're now booking Q3 engagements with limited capacity. After a scoping call we can kick off within a week. We reply within 24 hours at every step.",
  },
  {
    q: "Who owns the code and the models?",
    a: "You do — full stop. Everything we build for you, including prompts, evaluation suites and infrastructure code, transfers to you. No lock-in, no license games.",
  },
  {
    q: "How do engagements work?",
    a: "Three models: fixed scope for well-defined projects, dedicated pods (our most popular) for ongoing builds, and staff augmentation when you need individual experts inside your org.",
  },
  {
    q: "What does a typical team look like?",
    a: "A pod is 4–6 senior engineers plus a lead. Senior-only, no benches, and 97% retention across engagements — the people who start your project finish it.",
  },
  {
    q: "What happens after launch?",
    a: "24/7 delivery and support with monitoring and SLAs. You can scale the pod up, wind it down, or have us hand over completely — the runbooks are always yours.",
  },
];

/* ---------------- Engagement Models ---------------- */

export const ENGAGEMENTS = [
  {
    id: "fixed",
    name: "Fixed Scope",
    headline: "Defined outcome, fixed timeline",
    desc: "For well-specified projects with a clear finish line. We scope, we commit, we deliver against milestones.",
    points: ["Scoped spec & milestones", "Fixed pricing", "2-week sprints", "Full IP transfer"],
    bestFor: "Migrations, rebuilds, one-shot platforms",
    popular: false,
  },
  {
    id: "pods",
    name: "Dedicated Pods",
    headline: "A senior pod embedded in your team",
    desc: "4–6 senior engineers who work as an extension of your team — async-first, weekly demos, and 24/7 coverage as needed.",
    points: ["4–6 senior engineers", "Weekly demos", "97% retention", "24/7 coverage", "Scale up or down"],
    bestFor: "Ongoing product and platform builds",
    popular: true,
  },
  {
    id: "staff",
    name: "Staff Augmentation",
    headline: "Individual experts into your org",
    desc: "Senior specialists placed directly into your structure — fast to start, easy to steer, no bench overhead.",
    points: ["Per-role placement", "Fast start", "Senior only", "Your process, our people"],
    bestFor: "Gap-filling on in-house teams",
    popular: false,
  },
];

/* ---------------- Client wordmarks (marquee) ---------------- */

export const CLIENT_LOGOS = [
  { text: "HELIOS", cls: "text-sm font-semibold tracking-[0.28em]" },
  { text: "Northwind", cls: "font-display text-2xl italic" },
  { text: "ARCADIA", cls: "text-base font-bold tracking-widest" },
  { text: "quantiva", cls: "text-lg font-medium lowercase" },
  { text: "Meridian&Co", cls: "font-display text-xl" },
  { text: "VANTA", cls: "text-sm font-extrabold tracking-[0.34em]" },
  { text: "bluepeak", cls: "text-lg font-semibold" },
  { text: "Lumina Labs", cls: "font-display text-2xl italic" },
  { text: "OBSIDIAN", cls: "text-base font-bold tracking-[0.22em]" },
  { text: "kestrel", cls: "text-lg font-medium lowercase" },
];

/* ---------------- Hero morph phrases ---------------- */

export const MORPH_PHRASES = ["intelligent products", "data platforms", "autonomous systems"];

export const LANDING_STATS = [
  { value: "2–3x", label: "Faster", desc: "than typical agency engagements" },
  { value: "97%", label: "Retention", desc: "across all active engagements" },
  { value: "24/7", label: "Delivery", desc: "your pod follows the sun" },
];
