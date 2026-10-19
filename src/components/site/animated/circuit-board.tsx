"use client";

import { HUBS } from "@/lib/site-data";
import { hashForPage, type PageId } from "@/lib/pages";
import { useVisible } from "@/lib/motion";

/* Light-mode circuit board: 8 service nodes around a central hub.
   Decorative SVG — energy pulses travel the traces (CSS animations
   on stroke-dashoffset), paused when off-screen. */

const NODES: [number, number][] = [
  [120, 90],
  [400, 60],
  [680, 90],
  [720, 240],
  [680, 390],
  [400, 420],
  [120, 390],
  [80, 240],
];

const TRACES = [
  "M400 240 L250 90 H120",
  "M400 240 V60",
  "M400 240 L550 90 H680",
  "M400 240 H720",
  "M400 240 L550 390 H680",
  "M400 240 V420",
  "M400 240 L250 390 H120",
  "M400 240 H80",
];

export function CircuitBoard() {
  const ref = useVisible<HTMLDivElement>();

  return (
    <div ref={ref} className="relative">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.25)] sm:p-6">
        <svg
          viewBox="0 0 800 480"
          className="h-auto w-full text-slate-200"
          fill="none"
          aria-hidden="true"
        >
          {/* faint grid */}
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`gv${i}`}
              x1={80 + i * 80}
              y1="20"
              x2={80 + i * 80}
              y2="460"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`gh${i}`}
              x1="40"
              y1={80 + i * 80}
              x2="760"
              y2={80 + i * 80}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}

          {/* traces */}
          {TRACES.map((d, i) => (
            <path
              key={`t${i}`}
              d={d}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* energy flows (indigo, dash animation) */}
          {TRACES.slice(0, 4).map((d, i) => (
            <path
              key={`f${i}`}
              className="circuit-flow"
              d={d}
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="18 262"
              style={{
                animation: `dash-flow ${3 + i * 0.6}s linear ${(i * -0.9).toFixed(1)}s infinite`,
              }}
              opacity="0.7"
            />
          ))}

          {/* nodes */}
          {NODES.map(([x, y], i) => (
            <g key={`n${i}`}>
              <circle cx={x} cy={y} r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
              <circle
                className="circuit-pulse"
                cx={x}
                cy={y}
                r="4"
                fill="#2563eb"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `node-pulse 2.6s ease-in-out ${(i * 0.35).toFixed(2)}s infinite`,
                }}
              />
            </g>
          ))}

          {/* central hub */}
          <circle cx="400" cy="240" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="3" opacity="0.95" />
          <circle cx="400" cy="240" r="9" fill="#2563eb" />
          <circle
            cx="400"
            cy="240"
            r="40"
            fill="none"
            stroke="#bfdbfe"
            strokeWidth="1.5"
            strokeDasharray="3 7"
          />
        </svg>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-slate-100 pt-5">
          {HUBS.map((hub) => (
            <a
              key={hub.id}
              href={hashForPage(hub.page as PageId)}
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all hover:border-primary/40 hover:text-primary active:scale-[0.97]"
            >
              <hub.icon className="h-3.5 w-3.5 text-primary/70" />
              {hub.title}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        The Kramora stack — every hub connected to one delivery platform.
      </p>
    </div>
  );
}
