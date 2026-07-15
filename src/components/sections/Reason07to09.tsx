import { useState, useEffect, useRef } from "react";

// ── Reason 07: Driver Explorer ────────────────────────────────────────────────
const drivers = [
  { name: "Billing & Payments", vol: 2840, sat: "68%", res: "72%", risk: "High" },
  { name: "Account Access", vol: 1920, sat: "74%", res: "81%", risk: "Medium" },
  { name: "Technical Support", vol: 1310, sat: "61%", res: "63%", risk: "High" },
  { name: "Order Status", vol: 1640, sat: "79%", res: "85%", risk: "Low" },
  { name: "Policy Questions", vol: 980, sat: "82%", res: "88%", risk: "Low" },
  { name: "Returns", vol: 840, sat: "71%", res: "75%", risk: "Medium" },
];
const maxVol = 2840;

function Reason07() {
  const [hov, setHov] = useState<string | null>(null);

  return (
    <section id="reason-07" className="py-28 lg:py-40 border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>06</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Find the drivers behind the result.
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "#6D6D69", maxWidth: 380 }}>
              Customer outcomes become more useful when connected to contact reasons, channels, and operational conditions. Identify where dissatisfaction and unresolved issues concentrate.
            </p>
          </div>
          <div className="border rounded-2xl overflow-hidden bg-white" style={{ borderColor: "#D9D9D5" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "#D9D9D5", background: "#EBEBEB" }}>
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#6D6D69" }}>Contact Driver Analysis</span>
            </div>
            <div className="divide-y" style={{ borderColor: "#D9D9D5" }}>
              {drivers.map((d) => (
                <div
                  key={d.name}
                  className="px-5 py-4 cursor-default transition-colors"
                  style={{ background: hov === d.name ? "#EBEBEB" : "white" }}
                  onMouseEnter={() => setHov(d.name)}
                  onMouseLeave={() => setHov(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[14px]" style={{ color: "#2F2F2F" }}>{d.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px]" style={{ color: "#6D6D69" }}>{d.sat} sat</span>
                      <span className="font-mono text-[11px]" style={{ color: "#6D6D69" }}>{d.res} res</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border" style={{
                        borderColor: d.risk === "High" ? "#2F2F2F" : "#D9D9D5",
                        color: d.risk === "High" ? "#2F2F2F" : "#6D6D69",
                      }}>{d.risk}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 rounded-full" style={{ background: "#EBEBEB" }}>
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${(d.vol / maxVol) * 100}%`,
                        background: d.risk === "High" ? "#0076CE" : "#D9D9D5",
                      }} />
                    </div>
                    <span className="font-mono text-[11px] w-14 text-right" style={{ color: "#6D6D69" }}>{d.vol.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t" style={{ borderColor: "#D9D9D5", background: "#EBEBEB" }}>
              <span className="font-mono text-[10px]" style={{ color: "#D9D9D5" }}>Sample data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reason 08: Enterprise to Interaction ──────────────────────────────────────
const levels = [
  { id: "enterprise", label: "Enterprise", sub: "All operations", nps: "47", csat: "82%", pred: "79%", res: "74%" },
  { id: "region", label: "Region", sub: "North America", nps: "51", csat: "84%", pred: "81%", res: "76%" },
  { id: "site", label: "Site", sub: "Phoenix Contact Center", nps: "48", csat: "83%", pred: "80%", res: "75%" },
  { id: "team", label: "Team", sub: "Team Alpha", nps: "53", csat: "85%", pred: "82%", res: "78%" },
  { id: "agent", label: "Agent", sub: "S. Reyes", nps: "—", csat: "88%", pred: "89%", res: "81%" },
  { id: "interaction", label: "Interaction", sub: "CAS-29483", nps: "—", csat: "9/10", pred: "Positive", res: "Resolved" },
];

function Reason08() {
  const [active, setActive] = useState(0); // start at Enterprise
  const level = levels[active];
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (stopped) return;
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % levels.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [stopped]);

  const handleClick = (i: number) => {
    setStopped(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(i);
  };

  return (
    <section id="reason-08" className="py-28 lg:py-40 border-b" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>07</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Move from the enterprise to the interaction.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-10" style={{ color: "#6D6D69", maxWidth: 380 }}>
              Executives need a consolidated view. Operators need to understand why results differ. Jibe Pro supports both — drill from enterprise summary to individual interaction in a single platform.
            </p>
            <div className="space-y-1">
              {levels.map((l, i) => (
                <button key={l.id} onClick={() => handleClick(i)} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all" style={{
                  borderColor: active === i ? "#0076CE" : "#D9D9D5",
                  background: active === i ? "#E8F4FC" : "white",
                }}>
                  <span className="font-mono text-[10px] tracking-widest w-16 shrink-0" style={{ color: active === i ? "#0076CE" : "#D9D9D5" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-[13px]" style={{ color: active === i ? "#0076CE" : "#2F2F2F" }}>{l.label}</span>
                  {i < active && <span className="ml-auto font-mono text-[10px]" style={{ color: "#0076CE" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="border rounded-2xl overflow-hidden bg-white" style={{ borderColor: "#D9D9D5" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "#EBEBEB" }}>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#6D6D69" }}>{level.label} View</div>
                <div className="font-semibold text-[16px]" style={{ color: "#2F2F2F" }}>{level.sub}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-6">
                  {levels.map((_, i) => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= active ? "#0076CE" : "#D9D9D5" }} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { l: "NPS", v: level.nps },
                    { l: "CSAT", v: level.csat },
                    { l: "Pred. Satisfaction", v: level.pred },
                    { l: "Resolution", v: level.res },
                    { l: "FCR", v: "68%" },
                    { l: "Jibe Accuracy", v: "91%" },
                  ].map(({ l, v }) => (
                    <div key={l} className="border rounded-xl p-4" style={{ borderColor: "#EBEBEB" }}>
                      <div className="font-mono text-[9px] uppercase tracking-wide mb-1" style={{ color: "#6D6D69" }}>{l}</div>
                      <div className="font-semibold text-[22px]" style={{ color: "#2F2F2F" }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  {active < levels.length - 1 && (
                    <button onClick={() => handleClick(active + 1)} className="px-5 py-2.5 font-semibold text-[12px] rounded-lg text-white transition-colors hover:opacity-90" style={{ background: "#0076CE" }}>
                      → {levels[active + 1].label}
                    </button>
                  )}
                  {active > 0 && (
                    <button onClick={() => handleClick(active - 1)} className="px-5 py-2.5 font-medium text-[12px] rounded-lg border transition-colors" style={{ borderColor: "#D9D9D5", color: "#6D6D69" }}>
                      ← {levels[active - 1].label}
                    </button>
                  )}
                </div>
              </div>
              <div className="px-6 py-3 border-t" style={{ borderColor: "#EBEBEB" }}>
                <span className="font-mono text-[10px]" style={{ color: "#D9D9D5" }}>Sample data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Reason07to09() {
  return (
    <>
      <Reason07 />
      <Reason08 />
    </>
  );
}
