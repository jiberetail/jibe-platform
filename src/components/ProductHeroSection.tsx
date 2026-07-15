import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router";
import HeroVisual3D from "./HeroVisual3D";

const TYPE_SPEED = 51;

type ProductHeroSectionProps = {
  productName: string;
  descriptor: string;
  line1: string;
  line2: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  proofPoints: readonly string[];
  productLabel: "Pro" | "Retail" | "AI";
};

const headlineBase: CSSProperties = {
  fontFamily: "'Instrument Serif', Georgia, serif",
  fontSize: "clamp(52px, 6.5vw, 96px)",
  lineHeight: 0.93,
  letterSpacing: "-0.025em",
  display: "block",
};

export default function ProductHeroSection({
  productName,
  descriptor,
  line1,
  line2,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  proofPoints,
  productLabel,
}: ProductHeroSectionProps) {
  const fullText = useMemo(() => line1 + line2, [line1, line2]);
  const [typedCount, setTypedCount] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTypedCount(0);
    setContentVisible(false);

    const pause = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setTypedCount((previous) => {
          const next = Math.min(previous + 1, fullText.length);

          if (next >= fullText.length && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            revealRef.current = setTimeout(() => setContentVisible(true), 180);
          }

          return next;
        });
      }, TYPE_SPEED);
    }, 300);

    return () => {
      clearTimeout(pause);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (revealRef.current) clearTimeout(revealRef.current);
    };
  }, [fullText]);

  const secondaryClasses =
    "px-7 py-3.5 border font-medium text-[14px] rounded-xl transition-all hover:border-[#2F2F2F] hover:-translate-y-0.5";
  const secondaryStyle = { borderColor: "#D9D9D5", color: "#6D6D69" };

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden border-b"
      style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}
    >
      <div className="relative mx-auto w-full max-w-[1320px] px-6 pb-16 pt-28 lg:px-10">
        <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4 xl:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <div
              className="mb-10 flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6D6D69]">
                {productName}
              </span>
              <span className="h-3 w-px bg-[#D9D9D5]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6D6D69]">
                {descriptor}
              </span>
            </div>

            <h1 className="mb-10" aria-label={`${line1} ${line2}`}>
              <span className="mb-2 block text-[#2F2F2F]" style={headlineBase} aria-hidden="true">
                {line1.split("").map((character, index) => (
                  <span key={`${character}-${index}`} style={{ opacity: index < typedCount ? 1 : 0 }}>
                    {character}
                  </span>
                ))}
              </span>
              <span
                className="block italic text-[#0076CE]"
                style={headlineBase}
                aria-hidden="true"
              >
                {line2.split("").map((character, index) => (
                  <span
                    key={`${character}-${index}`}
                    style={{ opacity: line1.length + index < typedCount ? 1 : 0 }}
                  >
                    {character}
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="mb-10 text-[17px] leading-[1.65] text-[#6D6D69]"
              style={{
                maxWidth: 460,
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.08s, transform 0.5s ease 0.08s",
              }}
            >
              {description}
            </p>

            <div
              className="mb-10 flex flex-col items-start gap-3 sm:flex-row"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.16s, transform 0.5s ease 0.16s",
              }}
            >
              <Link
                to={primaryHref}
                className="rounded-xl bg-[#0076CE] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                {primaryLabel}
              </Link>
              {secondaryHref.startsWith("#") ? (
                <a href={secondaryHref} className={secondaryClasses} style={secondaryStyle}>
                  {secondaryLabel}
                </a>
              ) : (
                <Link to={secondaryHref} className={secondaryClasses} style={secondaryStyle}>
                  {secondaryLabel}
                </Link>
              )}
            </div>

            <div
              className="flex flex-wrap gap-x-6 gap-y-2"
              style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.5s ease 0.24s" }}
            >
              {proofPoints.map((label) => (
                <span
                  key={label}
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6D6D69]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            className="flex items-center justify-center"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
            }}
          >
            <div className="w-full max-w-[580px]">
              <HeroVisual3D productLabel={productLabel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
