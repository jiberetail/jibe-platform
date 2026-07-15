import { useEffect, useRef, useState } from "react";

export default function Reason01() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="reason-01" ref={ref} className="scroll-mt-24 py-28 lg:py-40 border-b" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div
          className="font-['Instrument_Serif'] leading-none mb-10 transition-all duration-700"
          style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em", opacity: vis ? 1 : 0 }}
        >
          01
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <h2
              className="font-['Instrument_Serif'] leading-[1.04] mb-6"
              style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}
            >
              The only platform that connects what frontline teams see with what customers actually say.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-6" style={{ color: "#6D6D69", maxWidth: 520 }}>
              CRMs track cases. Survey tools collect responses. QA platforms review calls. Every category handles one piece. None of them connect agent judgment, customer feedback, and operational performance in a single operating picture.
            </p>
            <p className="text-[16px] leading-[1.65]" style={{ color: "#6D6D69", maxWidth: 520 }}>
              Jibe Pro is the only platform built to close that gap — giving contact center leaders a view of customer experience no other tool can produce.
            </p>
          </div>

          {/* Right: visual */}
          <div
            className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="border rounded-2xl p-8 bg-white" style={{ borderColor: "#D9D9D5" }}>
              {/* What exists */}
              <div className="font-mono text-[10px] uppercase tracking-widest mb-6" style={{ color: "#6D6D69" }}>
                What exists today
              </div>
              <div className="space-y-3 mb-8">
                {[
                  { label: "CRM", desc: "Cases and history" },
                  { label: "Survey platform", desc: "Some customer responses" },
                  { label: "QA system", desc: "Sampled call reviews" },
                  { label: "Workforce tools", desc: "Schedule and attendance" },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-center gap-4 px-4 py-3 rounded-xl border" style={{ borderColor: "#D9D9D5", background: "#EBEBEB" }}>
                    <span className="font-semibold text-[13px] w-36 shrink-0" style={{ color: "#2F2F2F" }}>{label}</span>
                    <span className="text-[12px]" style={{ color: "#6D6D69" }}>{desc}</span>
                    <span className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: "#D9D9D5", color: "#6D6D69" }}>Isolated</span>
                  </div>
                ))}
              </div>

              {/* The divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: "#D9D9D5" }} />
                <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "#EAF5FC", color: "#0076CE", border: "1px solid #B9DDF4" }}>
                  Jibe Pro
                </span>
                <div className="flex-1 h-px" style={{ background: "#D9D9D5" }} />
              </div>

              {/* What Jibe connects */}
              <div className="px-4 py-4 rounded-xl border" style={{ borderColor: "#B9DDF4", background: "#EAF5FC" }}>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "#0076CE" }}>
                  One unified view
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Agent prediction", "Survey response", "Operational data", "QA signal", "Customer outcome", "Performance trend"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#0076CE" }} />
                      <span className="text-[12px]" style={{ color: "#004F8C" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
