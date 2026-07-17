import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router";
import { assetUrl } from "../assetUrl";
import HeroVisual3D from "./HeroVisual3D";
import ScrollCue from "./ScrollCue";

const TYPE_SPEED = 51;

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

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

function RetailPodiumAtmosphere() {
  const podiums = [
    "jibe-retail-mlb-survey-cutout.png",
    "jibe-retail-nhl-cutout.png",
    "jibe-retail-fan-town-search-cutout.png",
    "jibe-retail-mlb-survey-cutout.png",
    "jibe-retail-nhl-cutout.png",
    "jibe-retail-fan-town-search-cutout.png",
    "jibe-retail-mlb-survey-cutout.png",
  ];

  return (
    <div className="retail-podium-atmosphere" aria-hidden="true">
      {podiums.map((podium, index) => (
        <span className="retail-ambient-podium" key={index}>
          <img
            src={assetUrl(`assets/podiums/cutouts/${podium}`)}
            alt=""
            className="retail-ambient-podium__image"
            loading="eager"
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}

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
  const reducedMotion = usePrefersReducedMotion();
  const [typedCount, setTypedCount] = useState(() => (reducedMotion ? fullText.length : 0));
  const [contentVisible, setContentVisible] = useState(reducedMotion);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTypedCount(0);
    setContentVisible(false);

    const completeWithoutMotion = () => {
      setTypedCount(fullText.length);
      setContentVisible(true);
    };

    if (reducedMotion) {
      completeWithoutMotion();
      return;
    }

    // If timer throttling or a busy main thread interrupts the type/reveal
    // sequence, never leave meaningful controls and the product lockup hidden.
    const expectedDuration = 300 + fullText.length * TYPE_SPEED + 180;
    safetyRef.current = setTimeout(completeWithoutMotion, expectedDuration + 1200);

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
      if (safetyRef.current) clearTimeout(safetyRef.current);
    };
  }, [fullText, reducedMotion]);

  const secondaryClasses =
    "rounded-md border border-[#CCCCCC] px-7 py-3.5 text-[14px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-3";
  const fallbackScrollTarget = `product-details-${productLabel.toLowerCase()}`;
  const scrollTargetHref = secondaryHref.startsWith("#")
    ? secondaryHref
    : `#${fallbackScrollTarget}`;

  return (
    <section
      className="jibe-product-hero relative flex min-h-screen items-center overflow-hidden border-b"
    >
      {productLabel === "Retail" && <RetailPodiumAtmosphere />}

      {!secondaryHref.startsWith("#") && (
        <span
          id={fallbackScrollTarget}
          className="pointer-events-none absolute bottom-0 left-0 h-px w-px scroll-mt-24"
          aria-hidden="true"
        />
      )}

      <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-6 pb-20 pt-28 lg:px-10">
        <div className="grid min-h-[calc(100svh-12rem)] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4 xl:grid-cols-[1fr_1.05fr]">
          <div className="jibe-product-hero__copy flex flex-col justify-center py-8 lg:py-10">
            <div
              className="jibe-product-eyebrow mb-8 flex w-fit items-center gap-3 transition-all duration-500"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(8px)",
                visibility: contentVisible ? "visible" : "hidden",
              }}
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0076CE]">
                {productName}
              </span>
              <span className="h-3 w-px bg-[#CCCCCC]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F5F5F]">
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
              className="mb-8 text-[16px] leading-[1.7] text-[#5F5F5F]"
              style={{
                maxWidth: 460,
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.08s, transform 0.5s ease 0.08s",
                visibility: contentVisible ? "visible" : "hidden",
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
                visibility: contentVisible ? "visible" : "hidden",
              }}
            >
              <Link
                to={primaryHref}
                className="rounded-md bg-[#0076CE] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-3"
              >
                {primaryLabel}
              </Link>
              {secondaryHref.startsWith("#") ? (
                <a href={secondaryHref} className={secondaryClasses}>
                  {secondaryLabel}
                </a>
              ) : (
                <Link to={secondaryHref} className={secondaryClasses}>
                  {secondaryLabel}
                </Link>
              )}
            </div>

            {productLabel !== "Retail" && (
              <ul
                className="jibe-product-proof-list grid max-w-[560px] grid-cols-2"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transition: "opacity 0.5s ease 0.24s",
                  visibility: contentVisible ? "visible" : "hidden",
                }}
              >
                {proofPoints.map((label) => (
                  <li
                    key={label}
                    className="jibe-product-proof"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}

            <div
              className="mt-8 lg:hidden"
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: "opacity 0.5s ease 0.3s",
                visibility: contentVisible ? "visible" : "hidden",
              }}
            >
              <ScrollCue href={scrollTargetHref} />
            </div>
          </div>

          <div
            className="jibe-product-hero__visual flex items-center justify-center"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
              visibility: contentVisible ? "visible" : "hidden",
            }}
          >
            <div className="jibe-product-hero__halo w-full max-w-[580px]">
              <HeroVisual3D productLabel={productLabel} reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
          visibility: contentVisible ? "visible" : "hidden",
        }}
      >
        <ScrollCue href={scrollTargetHref} />
      </div>
    </section>
  );
}
