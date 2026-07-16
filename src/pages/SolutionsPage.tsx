import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import FinalCTA from "../components/sections/FinalCTA";

const solutions = [
  {
    id: "customer-experience",
    label: "Customer Experience",
    desc: "Give CX leaders a more complete view of how interactions are going — beyond the customers who respond to a survey.",
    points: [
      "Visibility across all interactions, not just survey respondents",
      "Satisfaction and resolution tracked separately",
      "Contact driver analysis across channels and teams",
      "Executive reporting and performance governance",
    ],
  },
  {
    id: "contact-center",
    label: "Contact Center Operations",
    desc: "Connect customer outcomes with operational metrics to understand what is driving results and where to focus.",
    points: [
      "AHT, FCR, and resolution tied to customer signals",
      "Multi-site and multi-team performance views",
      "Operational metric integration",
      "Performance trend and benchmark reporting",
    ],
  },
  {
    id: "quality-assurance",
    label: "Quality Assurance",
    desc: "Replace random sampling with risk-driven QA prioritization based on customer signals and prediction data.",
    points: [
      "Risk-prioritized interaction queues",
      "Prediction mismatch and survey outcome flagging",
      "Side-panel interaction review",
      "QA status tracking and assignment",
    ],
  },
  {
    id: "agent-coaching",
    label: "Agent Coaching",
    desc: "Give supervisors structured evidence for coaching — grounded in outcomes, accuracy trends, and participation patterns.",
    points: [
      "Agent performance profiles with prediction accuracy",
      "Coaching plan creation and tracking",
      "Strength and opportunity identification",
      "30-day satisfaction and resolution trends",
    ],
  },
  {
    id: "performance-analytics",
    label: "Performance Analytics",
    desc: "Analyze CX performance at every level — from enterprise summary to individual interaction.",
    points: [
      "Drill-down from enterprise to interaction level",
      "Configurable KPI dashboards",
      "Report builder with metric, group-by, and date selectors",
      "Scheduled executive report delivery",
    ],
  },
  {
    id: "pilot-measurement",
    label: "Pilot and Program Measurement",
    desc: "Design pilots that produce a decision — with baseline validation, cohort design, ramp management, and measurement discipline.",
    points: [
      "Five-stage measurement framework",
      "Test and control cohort management",
      "Baseline-to-outcome reporting",
      "Data quality indicators on all results",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <main>
      <section className="bg-[#F7F7F7] pt-32 pb-20 border-b border-[#DADADA]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#686A6D] uppercase block mb-8">Solutions</span>
          <h1 className="font-['Instrument_Serif'] text-[56px] md:text-[72px] lg:text-[80px] leading-[0.95] text-[#2F2F2F] mb-8 max-w-[700px]">
            Built for every layer of the customer-experience operation.
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(({ id, label, desc, points }) => (
              <div key={id} className="border border-[#DADADA] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all bg-white">
                <div className="w-8 h-px bg-[#0076CE] mb-5" />
                <h2 className="font-semibold text-[#2F2F2F] text-[18px] mb-3">{label}</h2>
                <p className="text-[14px] text-[#686A6D] leading-relaxed mb-5">{desc}</p>
                <div className="space-y-2 mb-6">
                  {points.map((p) => (
                    <div key={p} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0076CE] mt-1.5 shrink-0" />
                      <span className="text-[13px] text-[#686A6D]">{p}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/solutions/${id}`}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076CE] hover:text-[#004F8C] transition-colors"
                >
                  Learn more <ArrowRight size={13} />
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
