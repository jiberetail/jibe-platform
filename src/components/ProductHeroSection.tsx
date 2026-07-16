import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router";
import HeroVisual3D from "./HeroVisual3D";
import ScrollCue from "./ScrollCue";

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
  fontSize: "clamp(50px, 6.1vw, 90px)",
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
    "rounded-lg border px-7 py-3.5 text-[14px] font-semibold transition-colors hover:border-[#0076CE] hover:text-[#0076CE]";
  const secondaryStyle = { borderColor: "#D9D9D5", color: "#6D6D69" };
  const fallbackScrollTarget = `product-details-${productLabel.toLowerCase()}`;
  const scrollTargetHref = secondaryHref.startsWith("#")
    ? secondaryHref
    : `#${fallbackScrollTarget}`;

  return (
    <section
      className="jibe-product-hero relative flex min-h-screen items-center overflow-hidden border-b"
    >
      {!secondaryHref.startsWith("#") && (
        <span
          id={fallbackScrollTarget}
          className="pointer-events-none absolute bottom-0 left-0 h-px w-px scroll-mt-24"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto w-full max-w-[1320px] px-6 pb-20 pt-28 lg:px-10">
        <div className="grid min-h-[calc(100svh-12rem)] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4 xl:grid-cols-[1fr_1.05fr]">
          <div className="jibe-product-hero__copy flex flex-col justify-center py-8 lg:py-10">
            <div
              className="jibe-product-eyebrow mb-8 flex w-fit items-center gap-3 transition-all duration-500"
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

            <h1 className="mb-8" aria-label={`${line1} ${line2}`}>
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
              className="mb-8 text-[16px] leading-[1.7] text-[#5B6B80]"
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
                className="rounded-lg bg-[#0076CE] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(0,118,206,0.22)] transition-colors hover:bg-[#005FA7]"
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
              className="grid max-w-[520px] grid-cols-2 gap-2"
              style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.5s ease 0.24s" }}
            >
              {proofPoints.map((label) => (
                <span
                  key={label}
                  className="jibe-product-proof"
                >
                  <i aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>

            <div
              className="mt-8 lg:hidden"
              style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}
            >
              <ScrollCue href={scrollTargetHref} />
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
            <div className="jibe-product-window w-full max-w-[580px]">
              <div className="jibe-product-window__bar" aria-hidden="true">
                <span className="jibe-product-window__lights"><i /><i /><i /></span>
                <span>Jibe {productLabel} / Platform view</span>
                <span className="jibe-product-window__status">Live</span>
              </div>
              <div className="jibe-product-window__canvas">
                <HeroVisual3D productLabel={productLabel} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
        style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}
      >
        <ScrollCue href={scrollTargetHref} />
      </div>
    </section>
  );
}
