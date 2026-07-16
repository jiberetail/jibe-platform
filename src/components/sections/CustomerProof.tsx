import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";

const evidenceAreas = [
  {
    number: "01",
    title: "Baseline and adoption",
    description: "Establish the starting point, participation level, and signal quality before measuring change.",
    points: ["Baseline defined before launch", "Coverage and data quality stay visible"],
  },
  {
    number: "02",
    title: "Performance movement",
    description: "Track customer, frontline, and operational measures together instead of reading each metric alone.",
    points: ["Cohort-aware performance views", "Enterprise result to interaction detail"],
  },
  {
    number: "03",
    title: "A decision the team can use",
    description: "Turn pilot evidence into a clear recommendation to expand, adjust, extend, or stop.",
    points: ["Evidence quality labeled clearly", "Recommended action tied to the result"],
  },
];

export default function CustomerProof() {
  return (
    <section id="customer-impact" className="scroll-mt-24 border-y border-[#D9D9D9] bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.25em] text-[#6D6D6D]">
              Customer impact
            </span>
            <h2 className="max-w-[780px] font-['Instrument_Serif'] text-[clamp(42px,5vw,68px)] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F]">
              Evidence belongs in the operating model.
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-[1.7] text-[#6D6D6D]">
            Jibe Pro programs are structured to show whether the platform is being used, whether behavior is changing, and whether results are moving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#D9D9D9] bg-[#D9D9D9] md:grid-cols-3">
          {evidenceAreas.map((area) => (
            <article key={area.number} className="group flex min-h-[310px] flex-col bg-white p-7 transition-colors hover:bg-[#F7F7F7] lg:p-8">
              <span className="font-mono text-[10px] text-[#0076CE]">{area.number}</span>
              <h3 className="mt-10 text-[18px] font-semibold text-[#2F2F2F]">{area.title}</h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[#6D6D6D]">{area.description}</p>
              <ul className="mt-auto space-y-3 border-t border-[#E4E4E4] pt-6">
                {area.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[12px] leading-[1.5] text-[#4E4E4E]">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#0076CE]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#4A8FE7] bg-[#F2F2F2]">
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-end lg:p-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0076CE]">The standard</p>
              <h3 className="mt-5 max-w-[780px] font-['Instrument_Serif'] text-[36px] leading-[1.02] tracking-[-0.02em] text-[#173A52] sm:text-[46px]">
                A Jibe Pro program should end with a decision—not a debate over the data.
              </h3>
              <p className="mt-5 max-w-[700px] text-[14px] leading-[1.7] text-[#5F5F5F]">
                The measurement framework, operating views, and reporting cadence are designed together so leaders know what changed and what to do next.
              </p>
            </div>
            <Link
              to="/demo?product=pro"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0076CE] px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#004F8C]"
            >
              Book a Pro demo <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
