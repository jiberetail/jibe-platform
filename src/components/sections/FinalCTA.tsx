import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="get-started" className="scroll-mt-24 py-40 lg:py-56 border-t" style={{ background: "#FFFFFF", borderColor: "#D9D9D9" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="max-w-[860px]">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase block mb-10" style={{ color: "#6D6D6D" }}>
            Get started
          </span>

          <h2
            className="font-['Instrument_Serif'] leading-[0.95] mb-10"
            style={{
              fontSize: "clamp(48px, 7vw, 104px)",
              color: "#2F2F2F",
              letterSpacing: "-0.02em",
            }}
          >
            Stop managing customer experience through a sample.
          </h2>

          <p className="text-[17px] leading-relaxed max-w-[520px] mb-12" style={{ color: "#6D6D6D" }}>
            See what becomes possible when customer feedback, frontline judgment, and operational performance move together.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              to="/demo?product=pro"
              className="px-8 py-4 font-semibold text-[15px] rounded-xl transition-colors hover:opacity-90"
              style={{ background: "#0076CE", color: "white" }}
            >
              Book a demo
            </Link>
            <Link
              to="/jibe-pro/how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 font-medium text-[15px] rounded-xl border transition-colors hover:border-[#2F2F2F]"
              style={{ borderColor: "#D9D9D9", color: "#6D6D6D" }}
            >
              See how it works <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
