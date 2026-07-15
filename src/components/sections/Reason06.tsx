import { useState } from "react";

const quadrants = [
  { id: "sr", sat: "Satisfied", res: "Resolved", count: 3240, pct: "62.5%", bg: "#FFFFFF", border: "#D9D9D5", numColor: "#2F2F2F", desc: "Positive outcome" },
  { id: "su", sat: "Satisfied", res: "Not resolved", count: 890, pct: "17.2%", bg: "#EBEBEB", border: "#D9D9D5", numColor: "#6D6D69", desc: "Latent risk — may return" },
  { id: "dr", sat: "Dissatisfied", res: "Resolved", count: 640, pct: "12.4%", bg: "#EBEBEB", border: "#D9D9D5", numColor: "#6D6D69", desc: "Experience gap despite resolution" },
  { id: "du", sat: "Dissatisfied", res: "Not resolved", count: 410, pct: "7.9%", bg: "#FFFFFF", border: "#2F2F2F", numColor: "#2F2F2F", desc: "Highest risk — QA and coaching priority" },
];

export default function Reason06() {
  const [hovered, setHovered] = useState<string | null>(null);

  const hov = quadrants.find((q) => q.id === hovered);

  return (
    <section
      id="reason-06"
      className="py-28 lg:py-40 border-b"
      style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>06</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left: text */}
          <div>
            <h2
              className="font-['Instrument_Serif'] leading-[1.04] mb-6"
              style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}
            >
              Separate satisfaction from resolution.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-8" style={{ color: "#6D6D69", maxWidth: 400 }}>
              A customer may be satisfied even when an issue remains unresolved, or dissatisfied despite a technical resolution. Jibe Pro keeps these outcomes separate so leaders can understand what actually happened.
            </p>

            {/* Hover details */}
            <div
              className="border rounded-xl p-5 transition-all"
              style={{
                borderColor: "#D9D9D5",
                background: "#EBEBEB",
                minHeight: 88,
                opacity: hov ? 1 : 0.4,
              }}
            >
              {hov ? (
                <>
                  <div className="font-mono text-[10px] uppercase tracking-wide mb-1" style={{ color: "#0076CE" }}>
                    {hov.sat} · {hov.res}
                  </div>
                  <div className="font-semibold text-[20px] mb-1" style={{ color: "#2F2F2F" }}>
                    {hov.count.toLocaleString()} interactions
                  </div>
                  <div className="text-[13px]" style={{ color: "#6D6D69" }}>{hov.desc}</div>
                </>
              ) : (
                <div className="font-mono text-[11px]" style={{ color: "#D9D9D5" }}>Hover a quadrant to explore</div>
              )}
            </div>
          </div>

          {/* Right: 2x2 grid */}
          <div>
            {/* Axis labels */}
            <div className="grid grid-cols-2 gap-0.5 mb-0.5">
              <div className="text-center font-mono text-[10px] uppercase py-1" style={{ color: "#D9D9D5" }}>Not resolved</div>
              <div className="text-center font-mono text-[10px] uppercase py-1" style={{ color: "#D9D9D5" }}>Resolved</div>
            </div>

            <div className="grid grid-cols-2 gap-0.5">
              {/* Order: su, sr, du, dr */}
              {[quadrants[1], quadrants[0], quadrants[3], quadrants[2]].map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl border p-6 cursor-default transition-all hover:scale-[1.02] hover:shadow-md"
                  style={{ background: q.bg, borderColor: q.border }}
                  onMouseEnter={() => setHovered(q.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="font-mono text-[9px] uppercase tracking-wide mb-3"
                    style={{ color: "#6D6D69" }}
                  >
                    {q.sat}
                  </div>
                  <div
                    className="font-['Instrument_Serif'] leading-none mb-1"
                    style={{ fontSize: 38, color: q.numColor }}
                  >
                    {q.count.toLocaleString()}
                  </div>
                  <div
                    className="font-mono text-[10px]"
                    style={{ color: "#D9D9D5" }}
                  >
                    {q.pct}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] text-center" style={{ color: "#D9D9D5" }}>Sample data</p>
          </div>
        </div>
      </div>
    </section>
  );
}
