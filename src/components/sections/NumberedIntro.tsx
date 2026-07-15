import { useEffect, useRef, useState } from "react";

export default function NumberedIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 lg:py-44 border-b"
      style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <div
          className={`transition-all duration-700 mb-16 ${vis ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="font-['Instrument_Serif']" style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
            Why Jibe Pro
          </span>
        </div>

        {/* Large number + headline grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-start">
          {/* Giant "10" */}
          <div
            className={`transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              transitionDelay: "100ms",
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(160px, 18vw, 280px)",
              lineHeight: "0.85",
              color: "#0076CE",
              letterSpacing: "-0.03em",
              userSelect: "none",
            }}
          >
            10
          </div>

          {/* Right content */}
          <div className="pt-4 lg:pt-8">
            <h2
              className={`font-['Instrument_Serif'] leading-[1.0] mb-8 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                fontSize: "clamp(36px, 4.2vw, 64px)",
                color: "#2F2F2F",
                transitionDelay: "200ms",
                letterSpacing: "-0.02em",
              }}
            >
              10 reasons to see beyond the survey.
            </h2>

            <p
              className={`text-[17px] leading-relaxed max-w-[560px] transition-all duration-700 ${vis ? "opacity-100" : "opacity-0"}`}
              style={{ color: "#6D6D69", transitionDelay: "350ms" }}
            >
              Surveys matter. They also represent only a fraction of customer interactions. Jibe Pro brings customer feedback, frontline judgment, and operational data together so leaders can understand more, act sooner, and measure what changed.
            </p>

            {/* Progress markers */}
            <div
              className={`flex items-center gap-2 mt-12 transition-all duration-700 ${vis ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "500ms" }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <a
                  key={i}
                  href={`#reason-0${i + 1}`}
                  className="transition-colors hover:opacity-100"
                  style={{
                    width: 24,
                    height: 2,
                    background: i < 1 ? "#0076CE" : "#D9D9D5",
                    display: "block",
                    borderRadius: 1,
                  }}
                  aria-label={`Reason ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
