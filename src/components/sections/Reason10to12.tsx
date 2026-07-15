import { useState, useEffect } from "react";
import proLogo from "@/imports/pro_traqnsparent.png";

// ── Reason 10: Integration — SVG lines drawn one by one ──────────────────────
// SVG viewBox 560x300 — node centers and Jibe Pro box positions
const N_CX = [65, 205, 355, 495]; // x-centers for top & bottom nodes
const TOP_Y = 30;    // top node center y
const BOT_Y = 268;   // bottom node center y
const JP_CX = 280;   // Jibe Pro center x
const JP_TOP = 105;  // Jibe Pro box top y
const JP_BOT = 195;  // Jibe Pro box bottom y

// JP box spans x: 160–400, y: JP_TOP–JP_BOT
const JP_LEFT = 160, JP_RIGHT = 400;

// Compute where a line from node edge (nx, ny) hits the JP box edge
function jpEdge(nx: number, fromTop: boolean): [number, number] {
  const nodeY = fromTop ? TOP_Y + 20 : BOT_Y - 20; // node edge y
  const jpY   = fromTop ? JP_TOP : JP_BOT;           // JP box face y
  // x on JP edge: clamp node x to box left/right
  const jpX   = Math.max(JP_LEFT + 8, Math.min(JP_RIGHT - 8, nx));
  return [jpX, jpY];
}

// 8 line paths: from node box edge → JP box edge
const LINE_PATHS = [
  ...N_CX.map(x => { const [ex, ey] = jpEdge(x, true);  return `M ${x} ${TOP_Y + 20} L ${ex} ${ey}`; }),
  ...N_CX.map(x => { const [ex, ey] = jpEdge(x, false); return `M ${x} ${BOT_Y - 20} L ${ex} ${ey}`; }),
];

const SOURCES = ["CRM","Survey Platform","Contact Center","QA System","Workforce Mgmt","Data Warehouse","BI Tools","Case Mgmt"];

function Reason10() {
  const [drawnCount, setDrawnCount] = useState(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setDrawnCount(0);
      // Draw one line every 650ms
      LINE_PATHS.forEach((_, i) => {
        const t = setTimeout(() => setDrawnCount(i + 1), 500 + i * 650);
        timers.push(t);
      });
      // All drawn — hold 15s then restart
      const hold = setTimeout(() => {
        timers = [];
        runCycle();
      }, 500 + LINE_PATHS.length * 650 + 15000);
      timers.push(hold);
    };

    const start = setTimeout(runCycle, 600);
    timers.push(start);
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="reason-08" className="scroll-mt-24 py-28 lg:py-40 border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>08</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-center">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Work with the systems your operation already uses.
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "#6D6D69", maxWidth: 400 }}>
              Jibe Pro connects customer feedback, CRM information, operational metrics, and interaction data without forcing leaders to manage another isolated reporting environment.
            </p>
          </div>
          {/* SVG-based hub diagram */}
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#D9D9D5", background: "#EBEBEB" }}>
            <svg viewBox="0 0 560 300" className="w-full" style={{ display: "block" }}>
              {/* Lines — drawn one at a time */}
              {LINE_PATHS.map((d, i) => (
                <path
                  key={i} d={d}
                  fill="none" stroke="#0076CE" strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray="200" strokeDashoffset={i < drawnCount ? "0" : "200"}
                  style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
                />
              ))}
              {/* Top 4 nodes */}
              {SOURCES.slice(0,4).map((s,i) => (
                <g key={s}>
                  <rect x={N_CX[i]-55} y={TOP_Y-20} width={110} height={40} rx={8}
                    fill="white" stroke={i < drawnCount ? "#0076CE" : "#D9D9D5"}
                    strokeWidth={i < drawnCount ? 1.5 : 1}
                    style={{ transition: "stroke 0.3s" }}
                  />
                  <text x={N_CX[i]} y={TOP_Y+4} textAnchor="middle" fontSize={10} fontFamily="IBM Plex Mono, monospace"
                    fill={i < drawnCount ? "#0076CE" : "#6D6D69"} style={{ transition: "fill 0.3s" }}>
                    {s}
                  </text>
                </g>
              ))}
              {/* Bottom 4 nodes */}
              {SOURCES.slice(4).map((s,i) => (
                <g key={s}>
                  <rect x={N_CX[i]-55} y={BOT_Y-20} width={110} height={40} rx={8}
                    fill="white" stroke={i+4 < drawnCount ? "#0076CE" : "#D9D9D5"}
                    strokeWidth={i+4 < drawnCount ? 1.5 : 1}
                    style={{ transition: "stroke 0.3s" }}
                  />
                  <text x={N_CX[i]} y={BOT_Y+4} textAnchor="middle" fontSize={10} fontFamily="IBM Plex Mono, monospace"
                    fill={i+4 < drawnCount ? "#0076CE" : "#6D6D69"} style={{ transition: "fill 0.3s" }}>
                    {s}
                  </text>
                </g>
              ))}
              {/* Jibe Pro center box — white with logo */}
              <rect x={JP_LEFT} y={JP_TOP} width={JP_RIGHT-JP_LEFT} height={JP_BOT-JP_TOP} rx={14}
                fill="white" stroke={drawnCount >= LINE_PATHS.length ? "#0076CE" : "#D9D9D5"} strokeWidth={drawnCount >= LINE_PATHS.length ? 2 : 1}
                style={{ filter: drawnCount >= LINE_PATHS.length ? "drop-shadow(0 0 10px rgba(0,118,206,0.25))" : "none", transition: "filter 0.4s, stroke 0.4s" }}
              />
              {/* Logo image — centered in box, 100% larger */}
              <image
                href={proLogo}
                x={JP_CX - 150} y={(JP_TOP + JP_BOT) / 2 - 74}
                width={300} height={148}
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
            <p className="px-6 pb-4 font-mono text-[10px] text-center" style={{ color: "#6D6D69" }}>Illustrative integration categories — connections are configured to each program.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reason 11: Pilot Framework ────────────────────────────────────────────────
const stages = [
  { n: "01", label: "Validate the Baseline", items: ["Confirm source data", "Agree on KPI definitions", "Review historical trends", "Establish minimum volume"] },
  { n: "02", label: "Define Cohorts", items: ["Match test and control groups", "Review tenure distribution", "Prevent cross-group exposure", "Document exclusions"] },
  { n: "03", label: "Separate Training and Ramp", items: ["Track adoption separately", "Set participation expectations", "Do not treat ramp as steady-state", "Monitor data completeness"] },
  { n: "04", label: "Measure", items: ["Apply agreed pre/post periods", "Track test and control equally", "Review channel and contact mix", "Document anomalies"] },
  { n: "05", label: "Decide and Scale", items: ["Determine whether evidence supports expansion", "Identify necessary improvements", "Establish rollout requirements", "Set governance cadence"] },
];

function Reason11() {
  const [open, setOpen] = useState<number>(-1);

  const nextStage = open < stages.length - 1 ? open + 1 : null;

  return (
    <section id="reason-09" className="scroll-mt-24 py-28 lg:py-40 border-b" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>09</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Run pilots designed to produce a decision.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-8" style={{ color: "#6D6D69", maxWidth: 400 }}>
              A pilot should not end with conflicting results. Jibe brings a disciplined five-stage measurement framework to implementation from day one.
            </p>
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(i)}
                  className="transition-all duration-200"
                  style={{
                    width: open === i ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: open === i ? "#0076CE" : i < open ? "#B9DDF4" : "#D9D9D5",
                  }}
                  aria-label={`Stage ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {stages.map((s, i) => (
              <div key={s.n} className="border rounded-2xl overflow-hidden transition-all" style={{
                borderColor: open === i ? "#0076CE" : "#D9D9D5",
                background: "white",
              }}>
                <button
                  className="w-full flex items-center gap-5 px-6 py-4 text-left transition-colors hover:bg-[#EBEBEB]"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span className="font-['Instrument_Serif'] text-[32px] leading-none" style={{ color: open === i ? "#0076CE" : "#D9D9D5" }}>{s.n}</span>
                  <span className="font-semibold text-[14px] flex-1" style={{ color: open === i ? "#0076CE" : "#2F2F2F" }}>{s.label}</span>
                  {/* Next-step nudge arrow for unopened stages above current */}
                  {open === -1 && i === 0 ? (
                    <span className="font-mono text-[11px] flex items-center gap-1 px-2 py-1 rounded-full border animate-pulse"
                      style={{ color: "#0076CE", borderColor: "#B9DDF4", background: "#E8F4FC" }}>
                      Click to explore
                    </span>
                  ) : nextStage === i && open !== i ? (
                    <span className="font-mono text-[11px] flex items-center gap-1 px-2 py-1 rounded-full border"
                      style={{ color: "#0076CE", borderColor: "#B9DDF4", background: "#E8F4FC" }}>
                      → Next
                    </span>
                  ) : (
                    <span className="font-mono text-[18px]" style={{ color: "#D9D9D5", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>+</span>
                  )}
                </button>
                {open === i && (
                  <div className="px-6 pb-5 pt-1 border-t" style={{ borderColor: "#EBEBEB" }}>
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      {s.items.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: "#0076CE" }} />
                          <span className="text-[13px]" style={{ color: "#6D6D69" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reason 12: Prove What Changed ─────────────────────────────────────────────
function Reason12() {
  const rows = [
    { name: "CSAT", baseline: "79%", current: "84%", change: "+5 pts", quality: "Sufficient volume" },
    { name: "NPS", baseline: "41", current: "47", change: "+6", quality: "Sufficient volume" },
    { name: "FCR", baseline: "65%", current: "68%", change: "+3 pts", quality: "Directional" },
    { name: "AHT", baseline: "4:58", current: "4:32", change: "−0:26", quality: "Sufficient volume" },
    { name: "QA Coverage", baseline: "12%", current: "34%", change: "+22 pts", quality: "Sufficient volume" },
    { name: "Survey Part.", baseline: "16.4%", current: "16.1%", change: "−0.3 pts", quality: "Data-quality review" },
  ];

  const qColor = (q: string) => {
    if (q === "Sufficient volume") return { color: "#0076CE", bg: "#E8F4FC" };
    if (q === "Directional") return { color: "#6D6D69", bg: "#EBEBEB" };
    return { color: "#2F2F2F", bg: "#EBEBEB" };
  };

  return (
    <section id="reason-10" className="scroll-mt-24 py-28 lg:py-40 border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>10</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Prove what changed.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-6" style={{ color: "#6D6D69", maxWidth: 400 }}>
              Jibe Pro brings customer outcomes, frontline signals, and operational performance into one reporting environment. Leaders can see whether a program is being used, whether behavior is changing, and whether results are moving.
            </p>
            <div className="p-5 rounded-xl border" style={{ borderColor: "#E8F4FC", background: "#E8F4FC" }}>
              <div className="font-mono text-[10px] uppercase mb-2" style={{ color: "#0076CE" }}>Recommended next action</div>
              <p className="text-[13px] leading-relaxed" style={{ color: "#004F8C" }}>
                CSAT and NPS improvements have sufficient volume to support expansion. FCR result is directional — extend the measurement period before including in executive scorecard.
              </p>
            </div>
          </div>
          <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "#D9D9D5" }}>
            <div className="px-5 py-4 border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
              <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#6D6D69" }}>Executive Impact Report — Q4 Pilot</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "#D9D9D5" }}>
                    {["Metric", "Baseline", "Current", "Change", "Data Quality"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wide whitespace-nowrap" style={{ color: "#6D6D69" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const { color, bg } = qColor(r.quality);
                    return (
                      <tr key={r.name} className="border-b hover:bg-[#EBEBEB] transition-colors" style={{ borderColor: "#D9D9D5" }}>
                        <td className="px-4 py-3 font-medium" style={{ color: "#2F2F2F" }}>{r.name}</td>
                        <td className="px-4 py-3 font-mono" style={{ color: "#6D6D69" }}>{r.baseline}</td>
                        <td className="px-4 py-3 font-mono font-medium" style={{ color: "#2F2F2F" }}>{r.current}</td>
                        <td className="px-4 py-3 font-mono font-medium" style={{ color: r.change.startsWith("+") ? "#0076CE" : "#6D6D69" }}>{r.change}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color, background: bg }}>{r.quality}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t" style={{ borderColor: "#D9D9D5", background: "#EBEBEB" }}>
              <span className="font-mono text-[10px]" style={{ color: "#D9D9D5" }}>Sample data — fictional program outcomes.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Reason10to12() {
  return (
    <>
      <Reason10 />
      <Reason11 />
      <Reason12 />
    </>
  );
}
