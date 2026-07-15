import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoMeta       from "@/imports/Meta-Logo.png";
import logoATT        from "@/imports/AT_T-logo_2016.png";
import logoTMobile    from "@/imports/t-mobile-logo-png-transparent.png";
import logoSutherland from "@/imports/Image_6-17-26_at_5.58_PM.png";
import logoMLB        from "@/imports/Major_League_Baseball_logo.svg.png";
import logoGoDaddy    from "@/imports/GD_LOCKUP_RGB_BLACK.png";
import logoHughesNet  from "@/imports/HughesNet-Logo.png";
import logoUbiquity   from "@/imports/ubiquity_logo.png";
import logoTXHB       from "@/imports/txhb-logo-blue-1.png";

const CLIENTS: { src: string; alt: string; tall?: boolean }[] = [
  { src: logoMeta,       alt: "Meta", tall: true },
  { src: logoATT,        alt: "AT&T" },
  { src: logoTMobile,    alt: "T-Mobile Money" },
  { src: logoSutherland, alt: "Sutherland" },
  { src: logoMLB,        alt: "Major League Baseball", tall: true },
  { src: logoGoDaddy,    alt: "GoDaddy" },
  { src: logoHughesNet,  alt: "HughesNet" },
  { src: logoUbiquity,   alt: "Ubiquity" },
  { src: logoTXHB,       alt: "TX Health Benefits Pool" },
];

export default function Reason02() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVis(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="reason-02"
      ref={ref}
      className="py-28 lg:py-40 border-b"
      style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div
          className="font-['Instrument_Serif'] leading-none mb-10 transition-all duration-700"
          style={{
            fontSize: "clamp(72px, 8vw, 110px)",
            color: "#D9D9D5",
            letterSpacing: "-0.03em",
            opacity: vis ? 1 : 0,
          }}
        >
          02
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <h2
              className="font-['Instrument_Serif'] leading-[1.04] mb-6"
              style={{
                fontSize: "clamp(32px, 3.6vw, 52px)",
                color: "#2F2F2F",
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by industry giants and the teams building what's next.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-8" style={{ color: "#6D6D69", maxWidth: 420 }}>
              From Fortune 500 enterprises managing millions of interactions to high-growth innovators building the contact center of the future — Jibe Pro operates across industries, scales, and contact-center models.
            </p>
            <div
              className="flex items-start gap-3 p-4 rounded-xl border"
              style={{ borderColor: "#B9DDF4", background: "#E8F4FC" }}
            >
              <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: "#0076CE" }} />
              <p className="text-[13px] leading-relaxed" style={{ color: "#004F8C" }}>
                Every deployment is built around the client's program design — not a generic template. Jibe Pro is configured to your measurement framework from day one.
              </p>
            </div>
          </div>

          {/* Right: logo grid */}
          <div
            className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="grid grid-cols-3 gap-3">
              {CLIENTS.map(({ src, alt, tall }) => (
                <div
                  key={alt}
                  className="bg-white border rounded-xl flex items-center justify-center p-4 hover:-translate-y-0.5 hover:shadow-sm transition-all"
                  style={{ borderColor: "#D9D9D5", height: 80 }}
                >
                  <ImageWithFallback
                    src={src}
                    alt={alt}
                    className="object-contain w-full"
                    style={{ maxHeight: tall ? 52 : 40 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
