import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import HeroVisual3D from "../HeroVisual3D";

const LINE1 = "Understand every";
const LINE2 = "customer interaction.";
const FULL  = LINE1 + LINE2;
const TYPE_SPEED = 51; // ms per character

export default function HeroSection() {
  const [typedCount, setTypedCount]         = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const pause = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setTypedCount(prev => {
          const next = prev + 1;
          if (next >= FULL.length) {
            clearInterval(intervalRef.current!);
            setTimeout(() => setContentVisible(true), 180);
          }
          return next;
        });
      }, TYPE_SPEED);
    }, 300);
    return () => {
      clearTimeout(pause);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isTyping = typedCount < FULL.length;

  // Shared headline style
  const headlineBase: React.CSSProperties = {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "clamp(52px, 6.5vw, 96px)",
    lineHeight: 0.93,
    letterSpacing: "-0.025em",
    display: "block",
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden border-b"
      style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}
    >
      <div className="relative w-full max-w-[1320px] mx-auto px-6 lg:px-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1.05fr] gap-8 lg:gap-4 items-center min-h-[calc(100vh-7rem)]">

          {/* Left */}
          <div className="flex flex-col justify-center py-8 lg:py-0">

            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-10 transition-all duration-500"
              style={{ opacity: contentVisible ? 1 : 0, transform: contentVisible ? "translateY(0)" : "translateY(8px)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "#6D6D69" }}>Jibe Pro</span>
              <span className="w-px h-3" style={{ background: "#D9D9D5" }} />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: "#6D6D69" }}>Customer Experience Intelligence</span>
            </div>

            {/* Typewriter headline — full text always reserves space, chars reveal in place */}
            <div className="mb-10">
              {/* Line 1 */}
              <div className="mb-2">
                <h1 style={{ ...headlineBase, color: "#2F2F2F" }}>
                  {LINE1.split("").map((char, i) => (
                    <span key={i} style={{ opacity: i < typedCount ? 1 : 0 }}>
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
              {/* Line 2 */}
              <div>
                <h1 style={{ ...headlineBase, color: "#0076CE", fontStyle: "italic" }}>
                  {LINE2.split("").map((char, i) => {
                    const globalIdx = LINE1.length + i;
                    return (
                      <span key={i} style={{ opacity: globalIdx < typedCount ? 1 : 0 }}>
                        {char}
                      </span>
                    );
                  })}
                </h1>
              </div>
            </div>

            {/* Support text */}
            <p
              className="text-[17px] leading-[1.65] mb-10"
              style={{
                color: "#6D6D69",
                maxWidth: 460,
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.08s, transform 0.5s ease 0.08s",
              }}
            >
              Jibe Pro connects frontline predictions, customer feedback, and operational performance to reveal what surveys alone cannot.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.16s, transform 0.5s ease 0.16s",
              }}
            >
              <Link
                to="/demo?product=pro"
                className="px-7 py-3.5 font-semibold text-[14px] rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#0076CE", color: "white" }}
              >
                Book a demo
              </Link>
              <Link
                to="/jibe-pro/how-it-works"
                className="px-7 py-3.5 border font-medium text-[14px] rounded-xl transition-all hover:border-[#2F2F2F] hover:-translate-y-0.5"
                style={{ borderColor: "#D9D9D5", color: "#6D6D69" }}
              >
                See how it works
              </Link>
            </div>

            {/* Proof points */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-2"
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: "opacity 0.5s ease 0.24s",
              }}
            >
              {["MORE CUSTOMER SIGNALS", "FOCUSED QA", "BETTER COACHING", "MEASURABLE IMPACT"].map(label => (
                <span key={label} className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "#6D6D69" }}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className="flex items-center justify-center"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
            }}
          >
            <div className="w-full" style={{ maxWidth: 580 }}>
              <HeroVisual3D />
            </div>
          </div>

        </div>
      </div>


    </section>
  );
}
