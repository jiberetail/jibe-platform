import { Link } from "react-router";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ClipboardList,
  Compass,
  Gauge,
  Layers3,
  Mail,
  MessageSquare,
  Phone,
  Quote,
  ScanSearch,
  Sparkles,
  Target,
} from "lucide-react";
import { assetUrl } from "../assetUrl";

const flowSteps = [
  {
    number: "01",
    title: "Ingest",
    description:
      "Bring chat, email, case, and voice interactions together by timestamp to create one coherent customer narrative.",
  },
  {
    number: "02",
    title: "Dual prediction",
    description:
      "Capture the agent's view of the outcome while Jibe AI independently predicts the customer's experience signal.",
  },
  {
    number: "03",
    title: "Customer response",
    description:
      "When feedback arrives, preserve the customer's actual response as an outcome signal tied to the interaction.",
  },
  {
    number: "04",
    title: "Audit & calibrate",
    description:
      "Compare both predictions with real responses to create a visible, measurable calibration loop.",
  },
  {
    number: "05",
    title: "Build confidence",
    description:
      "Use calibrated signals to support analytics, coaching, and quality review across the interaction stream.",
  },
  {
    number: "06",
    title: "Act",
    description:
      "Surface the drivers, verbatims, and prescriptive recommendations that help teams decide what to do next.",
  },
];

const benefits = [
  {
    icon: Layers3,
    eyebrow: "Broader context",
    title: "Beyond survey sampling",
    description:
      "Use the broader interaction stream as context while customer responses remain a valuable audit signal.",
    className: "lg:col-span-2",
  },
  {
    icon: Gauge,
    eyebrow: "Measurable learning",
    title: "A calibrated prediction loop",
    description:
      "Grade agent and AI predictions against real feedback so teams can understand where the signal is dependable.",
    className: "lg:col-span-1",
  },
  {
    icon: ScanSearch,
    eyebrow: "Traceable evidence",
    title: "KPI to root cause to verbatim",
    description:
      "Move from a top-line shift to its drivers, affected interactions, and the conversations behind the pattern.",
    className: "lg:col-span-1",
  },
  {
    icon: Target,
    eyebrow: "Frontline enablement",
    title: "Focused coaching and QA",
    description:
      "Give supervisors structured evidence to prioritize reviews and coach around the moments that matter.",
    className: "lg:col-span-1",
  },
  {
    icon: Compass,
    eyebrow: "Clear next moves",
    title: "Prescriptive action",
    description:
      "Go beyond what happened to understand why it happened and where process or behavior can improve.",
    className: "lg:col-span-1",
  },
];

const intelligenceDimensions = [
  "Sentiment",
  "Emotion",
  "Reason for contact",
  "Root cause",
  "Resolution",
];

function ProductLogo() {
  return (
    <img src={assetUrl("assets/logos/jibe-ai-tight.png")} alt="Jibe AI" className="h-[70px] w-auto object-contain sm:h-[78px]" />
  );
}

function IntelligenceCanvas() {
  const channels = [
    { label: "Voice", icon: Phone },
    { label: "Chat", icon: MessageSquare },
    { label: "Email", icon: Mail },
    { label: "Cases", icon: ClipboardList },
  ];

  const signalBars = [
    { label: "Resolution signal", width: "w-[86%]" },
    { label: "Experience shift", width: "w-[64%]" },
    { label: "Repeat-contact pattern", width: "w-[74%]" },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-5 rounded-[36px] bg-[#0076CE]/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-[#263545] bg-[#101820] p-3 shadow-[0_28px_80px_rgba(16,24,32,0.18)] sm:p-4">
        <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#40C4FF]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
              Conceptual intelligence view
            </span>
          </div>
          <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
            Illustrative
          </span>
        </div>

        <div className="rounded-[20px] bg-[#F7F7F4] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#D9D9D5] pb-4">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#6D6D69]">
                Interaction intelligence
              </div>
              <div className="mt-1 text-[13px] font-semibold text-[#2F2F2F]">Signal workspace</div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0076CE]">
              <BrainCircuit size={16} />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-4 gap-2">
            {channels.map(({ label, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-[#D9D9D5] bg-white px-2 py-2.5 text-center">
                <Icon size={13} className="mx-auto mb-1.5 text-[#0076CE]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#6D6D69]">{label}</span>
              </div>
            ))}
          </div>

          <div className="mb-4 rounded-2xl border border-[#B9DDF4] bg-[#EAF5FC] p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[#0076CE]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#004F8C]">
                  Unified interaction
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#6D6D69]">Context assembled</span>
            </div>
            <div className="flex gap-3">
              <Quote size={15} className="mt-0.5 shrink-0 text-[#0076CE]" />
              <p className="text-[11px] leading-[1.55] text-[#2F2F2F]">
                Conversation context, outcome predictions, and available feedback are organized into one evidence trail.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#D9D9D5] bg-white p-4">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 size={13} className="text-[#0076CE]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#6D6D69]">
                  Signal map
                </span>
              </div>
              <div className="space-y-3">
                {signalBars.map(({ label, width }) => (
                  <div key={label}>
                    <div className="mb-1.5 text-[9px] text-[#6D6D69]">{label}</div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#E8E8E4]">
                      <div className={`h-full rounded-full bg-gradient-to-r from-[#0076CE] to-[#40C4FF] ${width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#D9D9D5] bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <ScanSearch size={13} className="text-[#0076CE]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#6D6D69]">
                  Root-cause trail
                </span>
              </div>
              <div className="space-y-2">
                {["Experience signal", "Contact driver", "Process friction"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF5FC] font-mono text-[7px] text-[#0076CE]">
                      {index + 1}
                    </span>
                    <span className="text-[9px] text-[#2F2F2F]">{item}</span>
                    {index < 2 && <ArrowRight size={9} className="ml-auto text-[#A2A4A6]" />}
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-[#101820] px-3 py-2.5 text-[9px] leading-relaxed text-white/80">
                Recommended focus: simplify the handoff and review the conversations behind the pattern.
              </div>
            </div>
          </div>
        </div>

        <p className="px-2 pb-1 pt-3 text-[9px] leading-relaxed text-white/45">
          Illustrative visualization of the Jibe AI intelligence model — not a product screenshot.
        </p>
      </div>
    </div>
  );
}

export default function JibeAIPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-[#D9D9D5] bg-[#F7F7F4] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute right-[-10%] top-[-25%] h-[620px] w-[620px] rounded-full bg-[#0076CE]/[0.06] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <ProductLogo />
              <span className="h-7 w-px bg-[#D9D9D5]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6D6D69]">
                Interaction intelligence
              </span>
            </div>

            <h1
              className="mb-8 font-['Instrument_Serif'] leading-[0.94] text-[#2F2F2F]"
              style={{ fontSize: "clamp(54px, 6.2vw, 88px)", letterSpacing: "-0.025em" }}
            >
              See what happened.
              <span className="block italic text-[#0076CE]">Understand why.</span>
              <span className="block">Know what to do next.</span>
            </h1>

            <p className="mb-10 max-w-[590px] text-[17px] leading-[1.7] text-[#6D6D69]">
              Jibe AI brings customer conversations into one intelligence layer—connecting predictions, real feedback,
              drivers, and verbatims so teams can move from scattered signals to clear action.
            </p>

            <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                to="/demo?product=ai"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#004F8C]"
              >
                Book an AI Demo <ArrowRight size={15} />
              </Link>
              <a
                href="#intelligence-loop"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D9D9D5] px-7 py-3.5 text-[14px] font-medium text-[#6D6D69] transition-all hover:-translate-y-0.5 hover:border-[#2F2F2F] hover:text-[#2F2F2F]"
              >
                Explore the intelligence loop <ArrowDown size={15} />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#D9D9D5] pt-6">
              {["Unified context", "Calibrated signals", "Root-cause clarity", "Prescriptive insight"].map((item) => (
                <span key={item} className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6D6D69]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:pl-2">
            <IntelligenceCanvas />
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D5] bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <span className="mb-7 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#0076CE]">
                Beyond survey sampling
              </span>
              <h2 className="font-['Instrument_Serif'] text-[44px] leading-[1.02] text-[#2F2F2F] md:text-[58px]">
                The response is one signal. The conversation is the context.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="mb-10 max-w-[590px] text-[17px] leading-[1.75] text-[#6D6D69]">
                Surveys remain valuable, but they only tell the story of the customers who answer. Jibe AI organizes the
                wider interaction stream, then uses available responses to audit predictions and deepen confidence in the
                signals teams use to make decisions.
              </p>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#D9D9D5] bg-[#D9D9D5] sm:grid-cols-3">
                {[
                  ["01", "Unify", "A coherent customer narrative across channels."],
                  ["02", "Calibrate", "Predictions measured against real feedback."],
                  ["03", "Explain", "Drivers and verbatims attached to the signal."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="bg-[#F7F7F4] p-5">
                    <span className="mb-8 block font-mono text-[9px] text-[#0076CE]">{number}</span>
                    <h3 className="mb-2 text-[14px] font-semibold text-[#2F2F2F]">{title}</h3>
                    <p className="text-[12px] leading-relaxed text-[#6D6D69]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence-loop" className="scroll-mt-24 border-b border-[#D9D9D5] bg-[#F7F7F4] py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-7 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#0076CE]">
                The Jibe AI flow
              </span>
              <h2 className="font-['Instrument_Serif'] text-[44px] leading-[1.02] text-[#2F2F2F] md:text-[58px]">
                From raw interaction to a clear next move.
              </h2>
            </div>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <p className="text-[16px] leading-[1.7] text-[#6D6D69]">
                A continuous loop turns conversations into structured evidence—and structured evidence into action.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-[#D9D9D5] bg-[#D9D9D5] md:grid-cols-2 lg:grid-cols-3">
            {flowSteps.map((step, index) => (
              <article key={step.number} className="group relative min-h-[260px] bg-white p-7 transition-colors hover:bg-[#FDFDFC] lg:p-8">
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-['Instrument_Serif'] text-[44px] leading-none text-[#C9CBCB] transition-colors group-hover:text-[#0076CE]">
                    {step.number}
                  </span>
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="text-[#C9CBCB] transition-colors group-hover:text-[#0076CE]" size={16} />
                  )}
                </div>
                <h3 className="mb-3 text-[17px] font-semibold text-[#2F2F2F]">{step.title}</h3>
                <p className="max-w-[330px] text-[13px] leading-[1.7] text-[#6D6D69]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D5] bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-7 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#0076CE]">
                What it unlocks
              </span>
              <h2 className="font-['Instrument_Serif'] text-[44px] leading-[1.02] text-[#2F2F2F] md:text-[58px]">
                Intelligence that stays connected to the evidence.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, eyebrow, title, description, className }) => (
              <article
                key={title}
                className={`${className} group rounded-[24px] border border-[#D9D9D5] bg-[#F7F7F4] p-7 transition-all hover:-translate-y-1 hover:border-[#B9DDF4] hover:bg-white hover:shadow-[0_18px_50px_rgba(47,47,47,0.07)] lg:p-8`}
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0076CE]">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#6D6D69]">{eyebrow}</span>
                </div>
                <h3 className="mb-3 font-['Instrument_Serif'] text-[30px] leading-[1.05] text-[#2F2F2F]">{title}</h3>
                <p className="max-w-[540px] text-[13px] leading-[1.7] text-[#6D6D69]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#263545] bg-[#101820] py-24 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="mb-7 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#40C4FF]">
                Structured interaction intelligence
              </span>
              <h2 className="mb-7 font-['Instrument_Serif'] text-[44px] leading-[1.02] text-white md:text-[58px]">
                Make the interaction stream queryable, explainable, and actionable.
              </h2>
              <p className="max-w-[540px] text-[16px] leading-[1.75] text-white/60">
                Jibe AI structures the signals inside customer conversations so teams can explore patterns without losing
                the underlying evidence.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="rounded-[24px] border border-white/15 bg-white/[0.04] p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <BrainCircuit size={18} className="text-[#40C4FF]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Intelligence dimensions
                  </span>
                </div>
                <div className="space-y-0">
                  {intelligenceDimensions.map((dimension) => (
                    <div key={dimension} className="flex items-center justify-between border-t border-white/10 py-4 first:border-t-0 first:pt-0">
                      <span className="text-[14px] text-white/80">{dimension}</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#40C4FF]/15 text-[#40C4FF]">
                        <Check size={11} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-32 lg:py-44">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="max-w-[900px]">
            <div className="mb-8 flex items-center gap-4">
              <ProductLogo />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6D6D69]">See it in context</span>
            </div>
            <h2
              className="mb-9 font-['Instrument_Serif'] leading-[0.96] text-[#2F2F2F]"
              style={{ fontSize: "clamp(48px, 7vw, 92px)", letterSpacing: "-0.02em" }}
            >
              Turn the conversations you already have into clearer decisions.
            </h2>
            <p className="mb-10 max-w-[570px] text-[17px] leading-[1.7] text-[#6D6D69]">
              Bring your CX, operations, coaching, and quality questions. We’ll show how Jibe AI connects the signals
              behind them.
            </p>
            <Link
              to="/demo?product=ai"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-8 py-4 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#004F8C]"
            >
              Book an AI Demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
