import { useState, useEffect } from "react";

const stages = [
  {
    n: "01",
    label: "Predict",
    desc: "Frontline teams record a structured view of the interaction outcome — satisfaction, resolution, and confidence — immediately after the conversation closes.",
  },
  {
    n: "02",
    label: "Validate",
    desc: "Customer feedback and operational results confirm or challenge the prediction. Jibe Pro measures where frontline judgment aligned with actual outcomes and where gaps emerged.",
  },
  {
    n: "03",
    label: "Understand",
    desc: "Jibe identifies patterns across customers, agents, teams, channels, and contact reasons. Leaders can see where satisfaction, resolution, and risk are concentrated.",
  },
  {
    n: "04",
    label: "Act",
    desc: "Leaders focus QA, improve coaching, correct workflows, and measure the result. The outcome of each action feeds back into the next prediction cycle.",
  },
];

export default function JibeLoop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setActive((p) => (p + 1) % stages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-32 border-t border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase block mb-4" style={{ color: "#6D6D69" }}>
            The Jibe Loop
          </span>
          <h2
            className="font-['Instrument_Serif'] leading-[1.0]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}
          >
            Predict. Validate. Understand. Act.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Loop diagram */}
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                <style>{`
                  @keyframes haloOrbit {
                    from { stroke-dashoffset: 659; }
                    to   { stroke-dashoffset: -220; }
                  }
                  .jibe-halo-arc {
                    animation: haloOrbit 4.2s linear infinite;
                  }
                `}</style>
                <circle cx="160" cy="160" r="140" fill="none" stroke="#D9D9D5" strokeWidth="1" />
                <circle cx="160" cy="160" r="100" fill="none" stroke="#D9D9D5" strokeWidth="0.5" />
                {/* Main progress arc */}
                <circle
                  cx="160" cy="160" r="140"
                  fill="none" stroke="#0076CE" strokeWidth="2"
                  strokeDasharray="879"
                  strokeDashoffset={879 - (active / stages.length) * 879 - 879 * 0.25}
                  style={{ transition: "stroke-dashoffset 0.9s ease-out", transformOrigin: "center", transform: "rotate(-90deg)" }}
                />
                {/* Halo — solid filled arc traveling the ring */}
                <circle
                  className="jibe-halo-arc"
                  cx="160" cy="160" r="140"
                  fill="none"
                  stroke="#0076CE"
                  strokeWidth="20"
                  strokeDasharray="55 824"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>

              {stages.map((s, i) => {
                const angle = (i / stages.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 140;
                const cx = 160 + r * Math.cos(rad);
                const cy = 160 + r * Math.sin(rad);
                const isActive = active === i;
                return (
                  <button
                    key={s.label}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${s.label} stage`}
                    aria-pressed={isActive}
                    className="absolute flex items-center justify-center transition-all"
                    style={{
                      left: `${(cx / 320) * 100}%`,
                      top: `${(cy / 320) * 100}%`,
                      transform: "translate(-50%, -50%)",
                      width: isActive ? 52 : 40,
                      height: isActive ? 52 : 40,
                      borderRadius: "50%",
                      background: isActive ? "#0076CE" : "white",
                      border: `1.5px solid ${isActive ? "#0076CE" : "#D9D9D5"}`,
                    }}
                  >
                    <span className="font-mono text-[10px] font-medium" style={{ color: isActive ? "white" : "#6D6D69" }}>
                      {s.n}
                    </span>
                  </button>
                );
              })}

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-['Instrument_Serif'] text-[18px] text-center" style={{ color: "#6D6D69" }}>
                  {stages[active].label}
                </div>
                <div className="w-6 h-px bg-[#D9D9D5] mt-2" />
              </div>
            </div>
          </div>

          {/* Stage list */}
          <div className="space-y-2">
            {stages.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className="w-full text-left p-5 rounded-2xl border transition-all"
                style={{
                  borderColor: active === i ? "#0076CE" : "#D9D9D5",
                  background: active === i ? "#E8F4FC" : "white",
                }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-mono text-[11px]" style={{ color: "#D9D9D5" }}>{s.n}</span>
                  <span className="font-semibold text-[15px]" style={{ color: active === i ? "#0076CE" : "#2F2F2F" }}>
                    {s.label}
                  </span>
                  {active === i && <div className="ml-auto w-2 h-2 rounded-full" style={{ background: "#0076CE" }} />}
                </div>
                {active === i && (
                  <p className="text-[14px] leading-relaxed ml-10" style={{ color: "#6D6D69" }}>
                    {s.desc}
                  </p>
                )}
              </button>
            ))}
            <div className="flex items-center gap-3 px-5 pt-2">
              <div className="w-10 h-px" style={{ background: "#D9D9D5" }} />
              <p className="font-mono text-[11px]" style={{ color: "#D9D9D5" }}>
                Act feeds back into Predict — continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
