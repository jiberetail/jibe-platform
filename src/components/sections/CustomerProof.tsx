import { Play } from "lucide-react";
import { Link } from "react-router";

const caseStudies = [
  { industry: "Financial Services", scope: "Enterprise contact center · 2,400 agents · 3 sites" },
  { industry: "Healthcare Services", scope: "Multi-site contact center · 1,800 agents · 5 regions" },
  { industry: "Retail & E-commerce", scope: "Customer service operations · 900 agents · Omnichannel" },
];

export default function CustomerProof() {
  return (
    <section className="py-24 lg:py-32 border-t border-b" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase block mb-4" style={{ color: "#6D6D69" }}>Customer Impact</span>
            <h2 className="font-['Instrument_Serif'] leading-[1.0]" style={{ fontSize: "clamp(36px, 4.8vw, 60px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Evidence belongs in the operating model.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed max-w-[340px]" style={{ color: "#6D6D69" }}>
            Jibe Pro programs are built to produce measurable results, not just reports.
          </p>
        </div>

        {/* Design note */}
        <div className="mb-8 p-4 border rounded-xl" style={{ borderColor: "#D9D9D5", background: "#EBEBEB" }}>
          <p className="font-mono text-[11px]" style={{ color: "#6D6D69" }}>
            ⚠ Replace all case study content with externally approved claims, customer names, logos, and outcomes before publication.
          </p>
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {caseStudies.map((cs) => (
            <div key={cs.industry} className="border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all bg-white" style={{ borderColor: "#D9D9D5" }}>
              <div className="h-8 w-28 rounded mb-6 opacity-20" style={{ background: "#2F2F2F" }} />
              <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "#0076CE" }}>{cs.industry}</div>
              <div className="text-[12px] mb-6 leading-relaxed" style={{ color: "#6D6D69" }}>{cs.scope}</div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-xl border" style={{ background: "#E8F4FC", borderColor: "#B9DDF4" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#0076CE" }} />
                  <p className="text-[12px]" style={{ color: "#004F8C" }}>[Approved customer outcome placeholder]</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl border" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#D9D9D5" }} />
                  <p className="text-[12px]" style={{ color: "#6D6D69" }}>[Approved operational outcome placeholder]</p>
                </div>
              </div>
              <Link to="/customers" className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors hover:text-[#004F8C]" style={{ color: "#0076CE" }}>
                Read the case study →
              </Link>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="rounded-2xl p-8 md:p-12 lg:p-16 border" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="font-['Instrument_Serif'] italic leading-[1.3] mb-8" style={{ fontSize: "clamp(20px, 2.8vw, 34px)", color: "#2F2F2F" }}>
                "[Approved customer testimonial — replace with externally verified quote before publication.]"
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full" style={{ background: "#D9D9D5" }} />
                <div>
                  <div className="font-semibold text-[14px]" style={{ color: "#2F2F2F" }}>[Customer Name]</div>
                  <div className="text-[13px]" style={{ color: "#6D6D69" }}>[Title] · [Company]</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="border rounded-2xl aspect-video flex items-center justify-center cursor-pointer hover:border-[#0076CE] transition-colors group" style={{ background: "white", borderColor: "#D9D9D5" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-colors group-hover:opacity-90" style={{ background: "#0076CE" }}>
                  <Play size={20} fill="white" className="text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
