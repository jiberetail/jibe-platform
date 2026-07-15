import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import FinalCTA from "../components/sections/FinalCTA";

const filters = {
  industry: ["All Industries", "Financial Services", "Healthcare", "Retail", "Insurance", "Telecommunications"],
  program: ["All Programs", "QA Prioritization", "Agent Coaching", "Driver Analysis", "Pilot Measurement"],
  size: ["All Sizes", "Under 500 agents", "500–2,000 agents", "2,000+ agents"],
};

export default function CustomersPage() {
  const [industry, setIndustry] = useState("All Industries");
  const [program, setProgram] = useState("All Programs");
  const [size, setSize] = useState("All Sizes");

  return (
    <main>
      <section className="bg-[#F7F7F4] pt-32 pb-20 border-b border-[#D8DADC]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#686A6D] uppercase block mb-8">Customers</span>
          <h1 className="font-['Instrument_Serif'] text-[56px] md:text-[72px] lg:text-[88px] leading-[0.95] text-[#2F2F2F] mb-8 max-w-[800px]">
            Customer-experience programs built to produce evidence.
          </h1>
          <div className="p-4 border border-[#D8DADC] bg-white rounded-xl max-w-[640px]">
            <p className="font-mono text-[11px] text-[#686A6D]">
              ⚠ PLACEHOLDER — All customer names, logos, outcomes, and testimonials on this page must be replaced with externally approved content before publication.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[#D8DADC] py-6 sticky top-16 z-30">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-4">
            {Object.entries(filters).map(([key, opts]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#686A6D] uppercase">{key}:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {opts.map((opt) => {
                    const selected =
                      (key === "industry" && industry === opt) ||
                      (key === "program" && program === opt) ||
                      (key === "size" && size === opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          if (key === "industry") setIndustry(opt);
                          else if (key === "program") setProgram(opt);
                          else setSize(opt);
                        }}
                        className="px-3 py-1 text-[11px] rounded-full border transition-all"
                        style={{
                          borderColor: selected ? "#0076CE" : "#D8DADC",
                          background: selected ? "#EAF5FC" : "white",
                          color: selected ? "#0076CE" : "#686A6D",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study grid */}
      <section className="bg-[#F7F7F4] py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#D8DADC] rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <div className="h-8 w-28 bg-[#D8DADC] rounded mb-5 opacity-30" title="Logo placeholder" />
                <div className="font-mono text-[10px] text-[#0076CE] uppercase tracking-widest mb-1">[Industry Placeholder]</div>
                <div className="text-[12px] text-[#686A6D] mb-5">[Program scope placeholder]</div>
                <div className="space-y-2 mb-6">
                  <div className="p-3 bg-[#EAF5FC] rounded-xl border border-[#B9DDF4]">
                    <p className="text-[12px] text-[#004F8C]">[Approved customer outcome placeholder]</p>
                  </div>
                  <div className="p-3 bg-[#F7F7F4] rounded-xl border border-[#D8DADC]">
                    <p className="text-[12px] text-[#686A6D]">[Approved operational outcome placeholder]</p>
                  </div>
                </div>
                <Link to="/customers" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076CE] hover:text-[#004F8C] transition-colors">
                  Read the case study <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
