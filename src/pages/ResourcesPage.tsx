import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import FinalCTA from "../components/sections/FinalCTA";

const topics = ["All Topics", "Survey Programs", "QA Strategy", "Coaching", "Pilot Design", "CX Analytics", "Contact Center Ops"];
const types = ["All Types", "Article", "Guide", "Case Study", "Product Update", "Webinar"];

const resources = [
  { type: "Guide", topic: "Pilot Design", title: "Five principles for a contact-center pilot that produces a decision", desc: "Most pilots end with ambiguous results. This guide covers baseline design, cohort selection, ramp management, and the measurement rules that make results credible." },
  { type: "Article", topic: "Survey Programs", title: "Why survey response rate is not the same as survey reliability", desc: "Response rate is a common proxy for confidence. Here is why it can mislead program leaders and what to track alongside it." },
  { type: "Article", topic: "QA Strategy", title: "Replacing random QA sampling with risk-based prioritization", desc: "Random sampling finds what it finds. Risk-based QA finds what matters. A practical look at the difference and how to make the shift." },
  { type: "Guide", topic: "Coaching", title: "The evidence problem in agent coaching", desc: "Most coaching conversations rely on memory, observation, or a handful of reviewed calls. There is a more systematic approach." },
  { type: "Article", topic: "CX Analytics", title: "Satisfaction and resolution are not the same metric", desc: "Treating them as equivalent creates blind spots. How tracking each separately changes what you can see and act on." },
  { type: "Product Update", topic: "Contact Center Ops", title: "Jibe Pro — expanded drill-down and pilot cohort management", desc: "New capabilities for enterprise-to-interaction drill-down, cohort assignment, and pilot reporting in the Jibe Pro platform." },
];

export default function ResourcesPage() {
  const [topic, setTopic] = useState("All Topics");
  const [type, setType] = useState("All Types");
  const [query, setQuery] = useState("");

  const filtered = resources.filter((r) => {
    if (type !== "All Types" && r.type !== type) return false;
    if (topic !== "All Topics" && r.topic !== topic) return false;
    if (query && !r.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F7F7F4] pt-32 pb-16 border-b border-[#D8DADC]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#686A6D] uppercase block mb-8">Resources</span>
          <h1 className="font-['Instrument_Serif'] text-[56px] md:text-[72px] leading-[0.95] text-[#2F2F2F] mb-8 max-w-[700px]">
            Insights for customer-experience leaders.
          </h1>

          {/* Featured resource */}
          <div className="bg-white border border-[#D8DADC] rounded-2xl p-8 max-w-[680px]">
            <span className="font-mono text-[10px] text-[#0076CE] uppercase tracking-widest block mb-3">Featured Guide</span>
            <h2 className="font-['Instrument_Serif'] text-[28px] text-[#2F2F2F] leading-snug mb-3">
              Five principles for a contact-center pilot that produces a decision.
            </h2>
            <p className="text-[14px] text-[#686A6D] leading-relaxed mb-5">
              Most pilots end with ambiguous results. This guide covers baseline design, cohort selection, ramp management, and the measurement rules that make results credible.
            </p>
            <button className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076CE] hover:text-[#004F8C] transition-colors">
              Read the guide <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* Search + filters */}
      <section className="bg-white border-b border-[#D8DADC] py-5 sticky top-16 z-30">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 max-w-[320px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#686A6D]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources…"
                className="w-full pl-9 pr-4 py-2.5 border border-[#D8DADC] rounded-xl text-[13px] text-[#2F2F2F] placeholder-[#D8DADC] outline-none focus:border-[#0076CE] transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="px-3 py-1 text-[11px] rounded-full border transition-all"
                  style={{
                    borderColor: type === t ? "#0076CE" : "#D8DADC",
                    background: type === t ? "#EAF5FC" : "white",
                    color: type === t ? "#0076CE" : "#686A6D",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource grid */}
      <section className="bg-[#F7F7F4] py-16">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-1.5 mb-10">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="px-3 py-1 text-[11px] rounded-full border transition-all"
                style={{
                  borderColor: topic === t ? "#0076CE" : "#D8DADC",
                  background: topic === t ? "#EAF5FC" : "white",
                  color: topic === t ? "#0076CE" : "#686A6D",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#686A6D]">No resources match this filter.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
                <div key={r.title} className="bg-white border border-[#D8DADC] rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-[10px] text-[#0076CE] uppercase tracking-widest">{r.type}</span>
                    <span className="font-mono text-[10px] text-[#D8DADC]">·</span>
                    <span className="font-mono text-[10px] text-[#686A6D]">{r.topic}</span>
                  </div>
                  <h3 className="font-semibold text-[#2F2F2F] text-[15px] mb-3 leading-snug">{r.title}</h3>
                  <p className="text-[13px] text-[#686A6D] leading-relaxed mb-5">{r.desc}</p>
                  <button className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0076CE] hover:text-[#004F8C] transition-colors">
                    {r.type === "Guide" ? "Download guide" : r.type === "Case Study" ? "Read case study" : "Read more"} <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
