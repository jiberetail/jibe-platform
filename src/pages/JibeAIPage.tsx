import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Compass,
  Gauge,
  Layers3,
  ScanSearch,
  Target,
} from "lucide-react";
import { assetUrl } from "../assetUrl";
import ProductHeroSection from "../components/ProductHeroSection";

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

const productViews = [
  {
    number: "01",
    eyebrow: "Portfolio health",
    title: "See the program at a glance.",
    description:
      "Bring CSAT, resolution, interaction volume, and quartile performance into one operating view.",
    src: "assets/jibe-ai/performance-overview.png",
    alt: "Jibe AI overview dashboard showing CSAT, resolution rate, interaction summary, and quartile performance.",
    label: "Performance overview",
    imageClassName: "min-w-[760px]",
    copyClassName: "lg:col-span-3",
    frameClassName: "lg:col-span-9",
    copyOrderClassName: "",
    frameOrderClassName: "",
  },
  {
    number: "02",
    eyebrow: "Driver prioritization",
    title: "Know which contact reasons are moving the outcome.",
    description:
      "Map volume change against CSAT or resolution impact, then rank the reasons that deserve attention first.",
    src: "assets/jibe-ai/contact-reason-impact.png",
    alt: "Jibe AI contact reason impact analysis with a scatter plot and ranked CSAT drivers.",
    label: "Contact reason impact analysis",
    imageClassName: "min-w-[760px]",
    copyClassName: "lg:col-span-3 lg:col-start-10",
    frameClassName: "lg:col-span-9 lg:col-start-1",
    copyOrderClassName: "order-1 lg:order-2",
    frameOrderClassName: "order-2 lg:order-1",
  },
  {
    number: "03",
    eyebrow: "Prescriptive analysis",
    title: "Turn a root cause into a practical response.",
    description:
      "Move from root-cause analysis to agent impact, transcripts, and best-practice guidance grounded in top-quartile behavior.",
    src: "assets/jibe-ai/best-practice-opportunity.png",
    alt: "Jibe AI root cause analysis showing performance metrics, quartile analysis, and recommended best practices.",
    label: "AI-generated best-practice opportunity",
    imageClassName: "min-w-[640px]",
    copyClassName: "lg:col-span-4",
    frameClassName: "lg:col-span-8",
    copyOrderClassName: "",
    frameOrderClassName: "",
  },
] as const;

function ProductLogo() {
  return (
    <img src={assetUrl("assets/logos/jibe-ai-tight.png")} alt="Jibe AI" className="h-[70px] w-auto object-contain sm:h-[78px]" />
  );
}

function ProductScreenshot({
  src,
  alt,
  label,
  imageClassName,
}: {
  src: string;
  alt: string;
  label: string;
  imageClassName: string;
}) {
  const imageUrl = assetUrl(src);

  return (
    <figure className="overflow-hidden rounded-[24px] border border-white/15 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.24)]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-[#D9D9D5] bg-white px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#B9DDF4]" />
            <span className="h-2 w-2 rounded-full bg-[#D9D9D5]" />
            <span className="h-2 w-2 rounded-full bg-[#D9D9D5]" />
          </span>
          <span className="truncate font-mono text-[8px] uppercase tracking-[0.15em] text-[#6D6D69] sm:text-[9px]">
            {label} · Example data
          </span>
        </div>
        <a
          href={imageUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md text-[10px] font-semibold text-[#0076CE] outline-none transition-colors hover:text-[#004F8C] focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-2"
          aria-label={`Open full-size ${label} screenshot`}
        >
          Full view <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </figcaption>
      <div
        className="overflow-x-auto bg-[#F5F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#40C4FF]"
        tabIndex={0}
        aria-label={`Scrollable ${label} product screenshot`}
      >
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-auto w-full max-w-none lg:min-w-0 ${imageClassName}`}
        />
      </div>
    </figure>
  );
}

export default function JibeAIPage() {
  return (
    <main className="overflow-hidden bg-white">
      <ProductHeroSection
        productName="Jibe AI"
        productLabel="AI"
        descriptor="Interaction Intelligence"
        line1="See what happened."
        line2="Know what to do next."
        description="Jibe AI connects predictions, real feedback, drivers, and verbatims to explain why outcomes moved and turn scattered signals into clear action."
        primaryHref="/demo?product=ai"
        primaryLabel="Book an AI demo"
        secondaryHref="#product-views"
        secondaryLabel="See Jibe AI in action"
        proofPoints={["Unified context", "Calibrated signals", "Root-cause clarity", "Prescriptive insight"]}
      />

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

      <section id="product-views" className="scroll-mt-24 border-b border-[#263545] bg-[#101820] py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="mb-7 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#40C4FF]">
                Jibe AI in action
              </span>
              <h2 className="font-['Instrument_Serif'] text-[44px] leading-[1.02] text-white md:text-[58px]">
                From portfolio signal to root cause to a better next move.
              </h2>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-[15px] leading-[1.7] text-white/55">
                Explore real Jibe AI product views shown with example program data.
              </p>
            </div>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {productViews.map((view) => (
              <article key={view.number} className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-10">
                <div className={`${view.copyOrderClassName} ${view.copyClassName}`}>
                  <span className="mb-5 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#40C4FF]">
                    {view.number} / {view.eyebrow}
                  </span>
                  <h3 className="mb-5 font-['Instrument_Serif'] text-[38px] leading-[1.04] text-white lg:text-[44px]">
                    {view.title}
                  </h3>
                  <p className="text-[14px] leading-[1.75] text-white/55">{view.description}</p>
                </div>

                <div className={`${view.frameOrderClassName} ${view.frameClassName}`}>
                  <ProductScreenshot
                    src={view.src}
                    alt={view.alt}
                    label={view.label}
                    imageClassName={view.imageClassName}
                  />
                </div>
              </article>
            ))}
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
