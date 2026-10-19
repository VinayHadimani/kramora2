import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll";

export const metadata: Metadata = {
  title: "Kramora AI — We build intelligent products that scale",
  description:
    "Kramora AI is a senior-only AI agency. We design, build and ship production-grade intelligent systems — 2–3x faster, with 97% retention and 24/7 delivery.",
  keywords: [
    "Kramora AI",
    "AI agency",
    "generative AI",
    "data engineering",
    "LLM apps",
    "RAG systems",
    "OCR",
    "document AI",
    "staff augmentation",
    "Next.js",
  ],
  authors: [{ name: "Kramora AI" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Kramora AI",
    description: "We build intelligent products that scale.",
    siteName: "Kramora AI",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Fonts loaded via link for resilient, cached loading.
            The no-page-custom-font rule targets the pages router; this is
            the app router layout (single layout for the whole site). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Preloader failsafe: if React never takes over (JS disabled
            or a stalled bundle), remove the first-load cover after
            3.5s so the server-rendered content stays readable.
            The Preloader marks itself with data-live once mounted,
            which cancels this. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){var p=document.getElementById('k-preloader');if(p&&!p.hasAttribute('data-live'))p.remove()},3500)",
          }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        {/* Lenis inertial scrolling — desktop only, registered globally
            in @/lib/lenis so route swaps and anchors move the viewport
            through the same virtual scroll position. */}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
