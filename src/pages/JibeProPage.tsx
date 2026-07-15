import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../assetUrl";
import EnterpriseSection from "../components/sections/EnterpriseSection";
import FinalCTA from "../components/sections/FinalCTA";
import JibeLoop from "../components/sections/JibeLoop";
import ProductTour from "../components/sections/ProductTour";

const signalCards = [
  { label: "Frontline signal", value: "Agent prediction", note: "Captured when the interaction ends" },
  { label: "Customer signal", value: "Survey + outcome", note: "Matched back to the same interaction" },
  { label: "Operational signal", value: "Performance context", note: "Connected across teams and channels" },
];

const capabilities = [
  {
    n: "01",
    title: "See beyond survey respondents",
    body: "Connect frontline judgment, customer feedback, and operational outcomes instead of managing each signal in isolation.",
  },
  {
    n: "02",
    title: "Measure judgment, not just activity",
    body: "Compare agent predictions with real customer responses to understand where teams read the experience accurately—and where they need support.",
  },
  {
    n: "03",
    title: "Focus QA where it matters",
    body: "Prioritize interactions where prediction, resolution, survey, and operational signals point to elevated risk or learning value.",
  },
  {
    n: "04",
    title: "Coach with evidence",
    body: "Give supervisors a structured view of patterns and outcomes so coaching is grounded in real customer impact.",
  },
  {
    n: "05",
    title: "Find the reason behind the metric",
    body: "Move from executive KPIs into teams, contact reasons, channels, and individual interactions without losing the thread.",
  },
  {
    n: "06",
    title: "Prove what changed",
    body: "Use consistent baselines, cohorts, and reporting to evaluate pilots, operating changes, and program performance over time.",
  },
];

export default function JibeProPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#D9D9D5] bg-[#F7F7F4] px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute -right-48 top-10 h-[560px] w-[560px] rounded-full border border-[#0076CE]/10" />
        <div className="pointer-events-none absolute -right-24 top-32 h-[360px] w-[360px] rounded-full border border-[#0076CE]/15" />

        <div className="relative mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <img src={assetUrl("assets/logos/jibe-pro-tight.png")} alt="Jibe Pro" className="mb-10 h-[72px] w-auto object-contain sm:h-[82px]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#777976]">Customer experience intelligence</p>
            <h1 className="mt-6 max-w-[760px] font-['Instrument_Serif'] text-[58px] leading-[0.92] tracking-[-0.035em] text-[#2F2F2F] sm:text-[74px] lg:text-[92px]">
              Understand every <em className="font-normal text-[#0076CE]">customer interaction.</em>
            </h1>
            <p className="mt-8 max-w-[600px] text-[17px] leading-[1.7] text-[#62645F]">
              Jibe Pro connects frontline predictions, customer feedback, and operational performance so leaders can see what surveys alone cannot.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/demo?product=pro" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0076CE] px-7 py-4 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#005FA7]">
                Book a Pro Demo
                <ArrowRight size={16} />
              </Link>
              <Link to="/jibe-pro/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C9CBC7] bg-white px-7 py-4 text-[14px] font-semibold text-[#2F2F2F] transition-all hover:border-[#2F2F2F]">
                See how it works
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
            <div className="rounded-[28px] border border-[#D2D4D0] bg-white p-5 shadow-[0_28px_80px_rgba(24,33,42,0.12)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#E3E4E1] pb-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8B8D89]">Live operating view</p>
                  <p className="mt-1 text-[15px] font-semibold text-[#2F2F2F]">The complete customer signal</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0076CE]">
                  <Sparkles size={17} />
                </div>
              </div>

              <div className="space-y-3 py-5">
                {signalCards.map((card, index) => (
                  <div key={card.label} className="grid grid-cols-[34px_1fr] gap-3 rounded-2xl border border-[#E0E2DE] bg-[#FAFAF8] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-mono text-[10px] text-[#0076CE] shadow-sm">0{index + 1}</div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#8B8D89]">{card.label}</p>
                      <p className="mt-1 text-[14px] font-semibold text-[#2F2F2F]">{card.value}</p>
                      <p className="mt-0.5 text-[11px] text-[#777976]">{card.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#0D1B28] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0076CE]"><Check size={15} /></div>
                  <div>
                    <p className="text-[13px] font-semibold">One connected operating picture</p>
                    <p className="mt-0.5 text-[11px] text-white/60">From enterprise trend to the interaction behind it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D5] bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#777976]">Why Jibe Pro</p>
              <h2 className="mt-5 font-['Instrument_Serif'] text-[46px] leading-[0.98] tracking-[-0.025em] text-[#2F2F2F] lg:text-[60px]">
                Turn scattered signals into a performance system.
              </h2>
              <p className="mt-6 max-w-[440px] text-[16px] leading-[1.7] text-[#686A6D]">
                CRMs track cases. Survey platforms capture a sample. QA tools review a fraction. Jibe Pro connects the pieces so teams can understand, coach, and improve from the same evidence.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#D9D9D5] bg-[#D9D9D5] sm:grid-cols-2">
              {capabilities.map((capability) => (
                <article key={capability.n} className="bg-white p-6 transition-colors hover:bg-[#F5F9FC] sm:p-7">
                  <p className="font-mono text-[10px] text-[#0076CE]">{capability.n}</p>
                  <h3 className="mt-5 text-[16px] font-semibold text-[#2F2F2F]">{capability.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#686A6D]">{capability.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductTour />
      <JibeLoop />
      <EnterpriseSection />
      <FinalCTA />
    </main>
  );
}
