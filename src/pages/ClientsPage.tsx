import { useEffect } from "react";
import {
  ArrowRight,
  Clapperboard,
  Cpu,
  Eye,
  Gamepad2,
  Globe2,
  Headphones,
  HeartPulse,
  Layers3,
  Network,
  RadioTower,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Link } from "react-router";

const industries = [
  {
    number: "01",
    icon: Clapperboard,
    title: "Streaming, television & digital media",
    signal: "Global audiences. Always-on entertainment.",
    description:
      "Built for the service ecosystems behind category-leading streaming platforms, subscription entertainment, and live television experiences.",
  },
  {
    number: "02",
    icon: RadioTower,
    title: "Cable, broadband & satellite television",
    signal: "National reach. Essential connectivity.",
    description:
      "Experience spanning one of the nation’s largest cable and broadband operators, nationwide connectivity networks, and a leading satellite television provider.",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Social technology & digital platforms",
    signal: "Global influence. Extraordinary scale.",
    description:
      "Designed for the operational complexity behind one of the world’s largest social platforms—connecting people, creators, advertisers, and businesses at global scale.",
  },
  {
    number: "04",
    icon: Gamepad2,
    title: "Interactive entertainment & gaming",
    signal: "Cultural impact. Immersive worlds.",
    description:
      "Customer intelligence for publishers behind landmark open-world franchises and some of interactive entertainment’s most recognizable experiences.",
  },
  {
    number: "05",
    icon: HeartPulse,
    title: "Healthcare & employee benefits",
    signal: "Member trust. Statewide complexity.",
    description:
      "Designed for statewide healthcare and employee-benefits organizations serving public-sector workforces, families, and diverse member populations.",
  },
  {
    number: "06",
    icon: Eye,
    title: "Vision & eye care",
    signal: "Optical science. Global reach.",
    description:
      "Experience supporting global vision-care and ophthalmic-lens leaders spanning optical technology, professional eye-care networks, and consumer journeys.",
  },
  {
    number: "07",
    icon: Trophy,
    title: "Professional sports & global motorsport",
    signal: "Premier competition. Passionate audiences.",
    description:
      "Jibe works across the highest levels of professional baseball, hockey, basketball, American football, and the world’s premier global motorsport.",
  },
  {
    number: "08",
    icon: Headphones,
    title: "Customer experience & BPO",
    signal: "Distributed teams. One performance standard.",
    description:
      "Built for global customer care and outsourcing organizations that need consistent insight, evidence-based coaching, and measurable outcomes.",
  },
  {
    number: "09",
    icon: ShoppingBag,
    title: "Retail, venues & commerce",
    signal: "Physical and digital. One journey.",
    description:
      "For flagship stores, live venues, and enterprise commerce journeys where availability, assistance, fulfillment, and feedback shape conversion and loyalty.",
  },
] as const;

const operatingRealities = [
  {
    icon: Globe2,
    title: "High-volume customer ecosystems",
    description:
      "Bring signals from large, multi-channel operations into one clearer view of performance, friction, and opportunity.",
  },
  {
    icon: Network,
    title: "Distributed teams and partners",
    description:
      "Create a shared operating picture across internal teams, external partners, locations, roles, and regions.",
  },
  {
    icon: Layers3,
    title: "Connected physical and digital journeys",
    description:
      "Understand the customer across channels—from a service interaction to a venue visit, survey, or purchase.",
  },
] as const;

const productContexts = [
  {
    key: "pro",
    product: "Jibe Pro",
    eyebrow: "Customer operations",
    title: "Turn frontline judgment into measurable improvement.",
    description:
      "Connect agent predictions, customer outcomes, coaching, and operational performance across every level of the organization.",
    capabilities: ["Agent predictions", "QA & coaching", "Role-based insight"],
    href: "/jibe-pro",
  },
  {
    key: "retail",
    product: "Jibe Retail",
    eyebrow: "Physical experience & commerce",
    title: "Connect the venue, the shopper, and the next action.",
    description:
      "Combine branded surveys, guided product discovery, extended-aisle ecommerce, and venue-level reporting in one experience.",
    capabilities: ["Branded surveys", "Extended aisle", "Venue-level ROI"],
    href: "/jibe-retail",
  },
  {
    key: "ai",
    product: "Jibe AI",
    eyebrow: "Autonomous intelligence",
    title: "Move from interaction data to a clear operating decision.",
    description:
      "Autonomously analyze customer interactions, identify root causes and best practices, and recommend practical next actions.",
    capabilities: ["Root-cause analysis", "Best-practice discovery", "Recommended action"],
    href: "/jibe-ai",
  },
] as const;

const programSteps = [
  {
    number: "01",
    title: "Start with the operating question",
    description:
      "Define the decision, evidence, and outcome the program must support before configuring the experience.",
  },
  {
    number: "02",
    title: "Configure around the workflow",
    description:
      "Fit Jibe to the organization’s teams, channels, audience, brand, and existing operating model.",
  },
  {
    number: "03",
    title: "Prove what changed",
    description:
      "Keep adoption, signal quality, and outcome movement visible together so leaders know where to act next.",
  },
] as const;

export default function ClientsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Industries | Jibe Platform";
    if (description) {
      description.content =
        "Explore the industries Jibe serves across streaming, communications, technology, customer operations, sports, venues, retail, and commerce.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="flex min-h-[70svh] items-center overflow-hidden border-b border-[#D9D9D9] bg-white px-6 pb-20 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="mx-auto grid w-full max-w-[1320px] gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0076CE]">
              Industries
            </p>
            <h1 className="mt-7 max-w-[980px] font-['Instrument_Serif'] text-[54px] leading-[0.94] tracking-[-0.03em] text-[#243443] sm:text-[72px] lg:text-[88px]">
              Built for the industries behind the world’s most recognized customer experiences.
            </h1>
          </div>

          <div className="border-t-2 border-[#0076CE] pt-7 lg:col-span-4">
            <p className="text-[17px] leading-[1.7] text-[#5F5F5F]">
              Jibe works with organizations at the top of their categories—from global social and entertainment platforms to national connectivity providers, statewide health programs, professional sports, and vision care.
            </p>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#777777]">
              Wherever expectations are high and operations are distributed, Jibe turns customer signal into clearer action.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
              >
                Start a conversation <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <a
                href="#industries"
                className="inline-flex items-center rounded-xl border border-[#CCCCCC] px-6 py-3.5 text-[14px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
              >
                Explore industries
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="industries"
        aria-labelledby="industries-heading"
        className="scroll-mt-28 border-b border-[#D9E2E9] bg-[#F1F5F8] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">
                Where Jibe works
              </p>
              <h2
                id="industries-heading"
                className="mt-5 max-w-[900px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]"
              >
                Designed for the organizations shaping modern customer experience.
              </h2>
            </div>
            <p className="max-w-[440px] text-[15px] leading-[1.75] text-[#5F5F5F] lg:col-span-4">
              Our experience spans household-name categories, essential-service environments, and audiences measured at national and global scale.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <article
                  key={industry.number}
                  className="group min-h-[320px] rounded-[22px] border border-[#D7E2EA] border-t-2 border-t-[#0076CE] bg-white p-7 shadow-[0_14px_36px_rgba(36,52,67,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B7D3E8] hover:shadow-[0_22px_48px_rgba(36,52,67,0.10)] sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#8A969F]">
                      {industry.number}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9DCEB] bg-[#F4F8FC] text-[#0076CE] transition-colors group-hover:border-[#0076CE]">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                    </span>
                  </div>
                  <h3 className="mt-12 text-[26px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#26364A]">
                    {industry.title}
                  </h3>
                  <p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0076CE]">
                    {industry.signal}
                  </p>
                  <p className="mt-5 text-[14px] leading-[1.75] text-[#5F5F5F]">{industry.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="operating-reality-heading"
        className="border-b border-[#D9D9D9] bg-white px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">
                Enterprise operating reality
              </p>
              <h2
                id="operating-reality-heading"
                className="mt-5 max-w-[850px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]"
              >
                Complex enough to require precision. Fast enough to demand action.
              </h2>
            </div>
            <p className="max-w-[440px] text-[15px] leading-[1.75] text-[#5F5F5F] lg:col-span-4">
              Jibe is designed for environments where signals arrive from multiple channels, responsibility spans multiple teams, and insight must lead to a clear next move.
            </p>
          </div>

          <div className="mt-14 grid border-y border-[#D9D9D9] md:grid-cols-3 lg:mt-16">
            {operatingRealities.map((reality, index) => {
              const Icon = reality.icon;
              return (
                <article
                  key={reality.title}
                  className={`py-9 md:px-8 md:py-11 ${index > 0 ? "border-t border-[#D9D9D9] md:border-l md:border-t-0" : ""}`}
                >
                  <Icon aria-hidden="true" className="text-[#0076CE]" size={25} strokeWidth={1.6} />
                  <h3 className="mt-7 text-[23px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#26364A]">
                    {reality.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.75] text-[#5F5F5F]">{reality.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Multi-channel", "Multi-location", "Role-based", "Executive-ready"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#D3D7DB] px-4 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#52616F]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="product-fit-heading"
        className="border-b border-[#D9D9D9] bg-[#F5F5F5] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">
            Product fit
          </p>
          <h2
            id="product-fit-heading"
            className="mt-5 max-w-[790px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]"
          >
            One platform family. Three ways to move the experience forward.
          </h2>

          <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-3">
            {productContexts.map((context) => (
              <article
                key={context.key}
                className="overflow-hidden rounded-[24px] border border-[#D9D9D9] bg-white shadow-[0_18px_48px_rgba(36,52,67,0.06)]"
              >
                <ProductSignalVisual product={context.key} />
                <div className="p-7 sm:p-8">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0076CE]">
                    {context.eyebrow}
                  </p>
                  <h3 className="mt-4 text-[27px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#26364A]">
                    {context.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.75] text-[#5F5F5F]">{context.description}</p>
                  <ul className="mt-6 border-y border-[#E0E0E0]">
                    {context.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-center gap-3 border-b border-[#E0E0E0] py-3 text-[12px] font-medium text-[#52616F] last:border-b-0"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0076CE]" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={context.href}
                    className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076CE] transition-colors hover:text-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                  >
                    Explore {context.product} <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="engagement-heading"
        className="border-b border-[#D9D9D9] bg-white px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">
            How engagements take shape
          </p>
          <h2
            id="engagement-heading"
            className="mt-5 max-w-[850px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]"
          >
            The operating challenge comes first. Jibe fits around it.
          </h2>

          <ol className="mt-14 grid border-y border-[#D9D9D9] md:grid-cols-3 lg:mt-16">
            {programSteps.map((step, index) => (
              <li
                key={step.number}
                className={`py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-[#D9D9D9] md:border-l md:border-t-0" : ""}`}
              >
                <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#0076CE]">
                  {step.number}
                </span>
                <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.025em] text-[#26364A]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#5F5F5F]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#101820] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4A9CFF]">
              Start with the challenge
            </p>
            <h2 className="mt-6 max-w-[960px] font-['Instrument_Serif'] text-[48px] leading-[0.95] tracking-[-0.03em] sm:text-[62px] lg:text-[74px]">
              Bring us the customer challenge. We’ll show how Jibe fits the operation behind it.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="mb-7 text-[15px] leading-[1.75] text-white/65">
              Tell us what the organization needs to understand, improve, or make easier for the customer.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-7 py-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a conversation <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductSignalVisual({ product }: { product: (typeof productContexts)[number]["key"] }) {
  if (product === "pro") {
    const waveform = [24, 42, 64, 38, 78, 52, 30, 70, 86, 48, 66, 36, 58, 28, 44, 72, 54, 32];
    return (
      <div className="relative flex h-[220px] items-center overflow-hidden bg-[#0F1C27] px-8" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
        <div className="flex w-full items-center justify-between gap-1.5">
          {waveform.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-full max-w-[6px] rounded-full bg-[#4A9CFF]"
              style={{ height: `${height}px`, opacity: 0.34 + (index % 5) * 0.12 }}
            />
          ))}
        </div>
        <span className="absolute bottom-6 left-8 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
          Voice of the customer
        </span>
      </div>
    );
  }

  if (product === "retail") {
    return (
      <div className="relative h-[220px] overflow-hidden bg-[#0F1C27]" aria-hidden="true">
        <div className="absolute left-[12%] top-8 h-36 w-20 rounded-[12px] border border-[#4A9CFF]/60 bg-[#142A3A] shadow-[0_18px_30px_rgba(0,0,0,0.25)]">
          <div className="m-2 h-16 rounded-md bg-[#0076CE]/55" />
          <div className="mx-auto mt-4 h-10 w-1 bg-white/20" />
        </div>
        <div className="absolute left-[40%] top-14 h-40 w-24 rounded-[14px] border border-white/15 bg-[#17232E] shadow-[0_18px_30px_rgba(0,0,0,0.25)]">
          <div className="m-2.5 grid h-20 grid-cols-3 gap-1 rounded-md bg-white/[0.045] p-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="rounded-[2px] bg-[#4A9CFF]/50" />
            ))}
          </div>
          <div className="mx-auto mt-4 h-10 w-1 bg-white/20" />
        </div>
        <div className="absolute right-[11%] top-7 h-36 w-20 rounded-[12px] border border-[#4A9CFF]/35 bg-[#14212C] shadow-[0_18px_30px_rgba(0,0,0,0.25)]">
          <div className="m-2 h-16 rounded-md bg-white/[0.06]" />
          <div className="mx-auto mt-4 h-10 w-1 bg-white/20" />
        </div>
        <span className="absolute bottom-6 left-8 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
          Connected venue journeys
        </span>
      </div>
    );
  }

  const columns = [7, 5, 9, 6, 8, 4, 7, 9, 5, 8, 6, 4];
  return (
    <div className="relative flex h-[220px] items-start justify-between overflow-hidden bg-[#EDF4FC] px-8 pt-7" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,118,206,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,118,206,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
      {columns.map((count, columnIndex) => (
        <div key={columnIndex} className="relative flex flex-col gap-2" style={{ marginTop: `${(columnIndex % 4) * 9}px` }}>
          {Array.from({ length: count }).map((_, rowIndex) => (
            <span
              key={rowIndex}
              className="block h-2.5 w-2.5 bg-[#0076CE]"
              style={{ opacity: 0.18 + ((columnIndex + rowIndex) % 5) * 0.15 }}
            />
          ))}
        </div>
      ))}
      <span className="absolute bottom-6 left-8 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#52616F]">
        Autonomous interaction intelligence
      </span>
    </div>
  );
}
