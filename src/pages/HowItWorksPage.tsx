import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import FinalCTA from "../components/sections/FinalCTA";

const steps = [
  { n: "01", label: "Data Inputs", desc: "Jibe Pro connects to your interaction data, CRM records, operational metrics, and survey platform. Data inputs are configured to your specific technology environment." },
  { n: "02", label: "Agent Prediction Workflow", desc: "Immediately after a customer interaction, the agent records a structured prediction — satisfaction, resolution, and confidence — embedded inside their existing workflow. The prediction is designed to take under ten seconds." },
  { n: "03", label: "Survey Matching", desc: "When a customer survey response arrives, Jibe Pro matches it to the prediction for that interaction. The match captures whether the agent's assessment aligned with the customer's reported experience." },
  { n: "04", label: "Data Validation", desc: "Jibe Pro surfaces participation rates, prediction coverage, and data completeness so leaders can evaluate the strength of the signal before making program decisions." },
  { n: "05", label: "Jibe Accuracy", desc: "Prediction accuracy is tracked at the agent, team, site, and enterprise level. Leaders can understand where frontline judgment is reliable and where further investigation is warranted." },
  { n: "06", label: "Analytics", desc: "Performance across NPS, CSAT, FCR, AHT, resolution, and prediction accuracy is available at every level of the organization — from enterprise summary to individual interaction." },
  { n: "07", label: "QA and Coaching", desc: "Risk signals from predictions, surveys, resolution status, and operational metrics are used to prioritize QA reviews. Agent coaching profiles provide structured evidence for supervisors." },
  { n: "08", label: "Reporting", desc: "Report builder, scheduled delivery, and executive dashboards give leaders the outputs they need for performance reviews, governance meetings, and program measurement." },
];

const faqs = [
  { q: "How does Jibe Pro connect to our existing systems?", a: "Jibe Pro is designed to integrate with your CRM, contact-center platform, survey system, and operational data sources. The specific integration path is configured during implementation." },
  { q: "How long does implementation typically take?", a: "Implementation timeline depends on the scope of your data environment and program design. Jibe works with your team to design the measurement framework and configure the platform before the pilot begins." },
  { q: "What data does Jibe Pro require from agents?", a: "The minimum agent input is a structured prediction of customer satisfaction and issue resolution. The prediction is designed to be captured in under ten seconds within the agent's existing post-interaction workflow." },
  { q: "Does Jibe Pro replace our survey program?", a: "No. Jibe Pro is designed to complement your survey program by connecting prediction data to survey responses, expanding visibility beyond survey respondents, and helping you understand your data more completely." },
  { q: "How is prediction accuracy calculated?", a: "Jibe Pro compares agent predictions with actual survey results for the same interaction. Match rate, mismatch rate, and accuracy trends are tracked at the agent, team, and enterprise level." },
  { q: "Can Jibe Pro be used with partial survey coverage?", a: "Yes. Jibe Pro is designed specifically for environments where survey response rates are partial. The prediction signal provides visibility into interactions that surveys do not reach." },
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="bg-[#F7F7F4] pt-32 pb-20 border-b border-[#D8DADC]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#686A6D] uppercase block mb-8">How It Works</span>
          <h1 className="font-['Instrument_Serif'] text-[56px] md:text-[72px] lg:text-[88px] leading-[0.95] text-[#2F2F2F] mb-8 max-w-[800px]">
            From interaction to action.
          </h1>
          <p className="text-[18px] text-[#686A6D] leading-relaxed max-w-[560px]">
            Jibe Pro connects eight operational stages into a continuous customer-experience intelligence loop.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.n} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 ${i < steps.length - 1 ? "border-b border-[#D8DADC]" : ""}`}>
                <div className="lg:col-span-2">
                  <span className="font-['Instrument_Serif'] text-[60px] leading-none text-[#D8DADC]">{step.n}</span>
                </div>
                <div className="lg:col-span-10">
                  <h2 className="font-semibold text-[#2F2F2F] text-[20px] mb-3">{step.label}</h2>
                  <p className="text-[16px] text-[#686A6D] leading-relaxed max-w-[640px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F4] border-t border-[#D8DADC] py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <h2 className="font-['Instrument_Serif'] text-[40px] lg:text-[52px] leading-[1.0] text-[#2F2F2F] mb-12">
            Frequently asked questions.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px]">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 border border-[#D8DADC]">
                <h3 className="font-semibold text-[#2F2F2F] text-[15px] mb-3">{q}</h3>
                <p className="text-[14px] text-[#686A6D] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/demo?product=pro" className="inline-flex items-center gap-2 px-7 py-4 bg-[#0076CE] text-white font-semibold rounded-xl hover:bg-[#004F8C] transition-colors">
              Book a Demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
