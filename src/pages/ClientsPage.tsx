import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../assetUrl";
import logoATT from "../imports/AT_T-logo_2016.png";
import logoGoDaddy from "../imports/GD_LOCKUP_RGB_BLACK.png";
import logoHughesNet from "../imports/HughesNet-Logo.png";
import logoMLB from "../imports/Major_League_Baseball_logo.svg.png";
import logoMeta from "../imports/Meta-Logo.png";
import logoSutherland from "../imports/Image_6-17-26_at_5.58_PM.png";
import logoTMobile from "../imports/t-mobile-logo-png-transparent.png";
import logoTXHB from "../imports/txhb-logo-blue-1.png";
import logoUbiquity from "../imports/ubiquity_logo.png";

// VERIFY / BLOCKED — CLIENT-01: every relationship, name, logo, alt label, and
// public-use right must be approved before this review-only portfolio ships.
const clients = [
  { src: logoMeta, alt: "Meta" },
  { src: logoATT, alt: "AT&T" },
  { src: logoTMobile, alt: "T-Mobile" },
  { src: logoSutherland, alt: "Sutherland" },
  { src: logoMLB, alt: "Major League Baseball" },
  { src: logoGoDaddy, alt: "GoDaddy" },
  { src: logoHughesNet, alt: "HughesNet" },
  { src: logoUbiquity, alt: "Ubiquity" },
  { src: logoTXHB, alt: "Texas Health Benefits Pool" },
] as const;

const programSteps = [
  {
    number: "01",
    title: "Define the decision",
    description:
      "Align the use case, source data, measures of success, and evidence required before the program begins.",
  },
  {
    number: "02",
    title: "Fit the workflow",
    description:
      "Configure Jibe around the client’s operating model, brand, audience, and existing customer journey.",
  },
  {
    number: "03",
    title: "Keep evidence visible",
    description:
      "Track adoption, signal quality, and outcome movement together so the next decision is clear.",
  },
] as const;

const productContexts = [
  {
    key: "pro",
    product: "Jibe Pro",
    eyebrow: "Customer operations",
    title: "Connect frontline judgment, customer feedback, and operational performance.",
    description:
      "Give agents, supervisors, managers, QA teams, and leaders the view they need to understand performance and act on it.",
    href: "/jibe-pro",
  },
  {
    key: "retail",
    product: "Jibe Retail",
    eyebrow: "Venues & retail",
    title: "Survey, extend the aisle, or connect both.",
    description:
      "Create a branded in-venue experience that can collect feedback, help customers find merchandise, and continue a purchase for home delivery.",
    href: "/jibe-retail",
  },
  {
    key: "ai",
    product: "Jibe AI",
    eyebrow: "Interaction intelligence",
    title: "Explain performance shifts and identify the next action.",
    description:
      "Turn interaction volume into root-cause analysis, agent-level insight, and practical recommendations teams can use.",
    href: "/jibe-ai",
  },
] as const;

export default function ClientsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Clients | Jibe Platform";
    if (description) {
      description.content =
        "See how Jibe supports customer operations, venues, retailers, and experience teams with programs configured around real workflows and decisions.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="flex min-h-[68svh] items-center border-b border-[#D9D9D9] bg-white px-6 pb-20 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="mx-auto grid w-full max-w-[1320px] gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0076CE]">Clients</p>
            <h1 className="mt-7 max-w-[940px] font-['Instrument_Serif'] text-[54px] leading-[0.94] tracking-[-0.03em] text-[#243443] sm:text-[72px] lg:text-[88px]">
              Built for the operation behind the experience.
            </h1>
          </div>

          <div className="border-t-2 border-[#0076CE] pt-7 lg:col-span-4">
            {/* VERIFY / BLOCKED — CLIENT-01: relationship language requires approval with the logo set. */}
            <p className="text-[17px] leading-[1.7] text-[#5F5F5F]">
              Jibe works with teams across customer operations and live retail environments, configuring each program around the signals, workflows, and decisions that matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {/* COPY REVIEW / BLOCKED — CONTACT-01 / D-10: neutral interim CTA pending approved scheduling details. */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
              >
                Start a conversation <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <a
                href="#portfolio"
                className="inline-flex items-center rounded-xl border border-[#CCCCCC] px-6 py-3.5 text-[14px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
              >
                Explore the portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" aria-labelledby="portfolio-heading" className="scroll-mt-28 border-b border-[#D9D9D9] bg-[#F5F5F5] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">Client portfolio</p>
              <h2 id="portfolio-heading" className="mt-5 max-w-[800px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]">
                Organizations represented in Jibe’s client portfolio.
              </h2>
            </div>
            <p className="max-w-[440px] text-[15px] leading-[1.75] text-[#5F5F5F] lg:col-span-4">
              Enterprise brands, service organizations, and live-experience teams use Jibe in environments where customer signals need to become useful action.
            </p>
          </div>

          <ul className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#D9D9D9] bg-[#D9D9D9] gap-px sm:grid-cols-3 lg:mt-16">
            {clients.map((client) => (
              <li key={client.alt} className="flex min-h-[126px] items-center justify-center bg-white px-7 py-8 sm:min-h-[142px]">
                <img
                  src={client.src}
                  alt={client.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 w-full max-w-[170px] object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="program-shape-heading" className="border-b border-[#D9D9D9] bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">How client programs take shape</p>
          <h2 id="program-shape-heading" className="mt-5 max-w-[850px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]">
            The program comes first. The platform fits around it.
          </h2>

          <ol className="mt-14 grid grid-cols-1 border-y border-[#D9D9D9] md:grid-cols-3 lg:mt-16">
            {programSteps.map((step, index) => (
              <li
                key={step.number}
                className={`py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-[#D9D9D9] md:border-l md:border-t-0" : ""}`}
              >
                <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#0076CE]">{step.number}</span>
                <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.025em] text-[#26364A]">{step.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#5F5F5F]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="jibe-context-heading" className="border-b border-[#D9D9D9] bg-[#F5F5F5] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">Jibe in context</p>
          <h2 id="jibe-context-heading" className="mt-5 max-w-[790px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.025em] text-[#243443] sm:text-[56px] lg:text-[66px]">
            Different environments. One commitment to useful evidence.
          </h2>

          <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {productContexts.map((context) => (
              <article key={context.key} className="border-t-2 border-[#0076CE] pt-6">
                <ProductContextVisual product={context.key} />
                <p className="mt-7 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0076CE]">{context.eyebrow}</p>
                <h3 className="mt-4 text-[27px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#26364A]">{context.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#5F5F5F]">{context.description}</p>
                <Link
                  to={context.href}
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076CE] transition-colors hover:text-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                >
                  Explore {context.product} <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-[900px] text-[10px] leading-[1.7] text-[#777777]">
            Product interfaces are shown with demonstration data. Branded podiums are representative visualizations of Jibe Retail configurations.
          </p>
        </div>
      </section>

      <section className="bg-[#101820] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4A9CFF]">Start with the challenge</p>
            <h2 className="mt-6 max-w-[920px] font-['Instrument_Serif'] text-[48px] leading-[0.95] tracking-[-0.03em] sm:text-[62px] lg:text-[74px]">
              Bring us the challenge. We’ll show how Jibe fits the operation around it.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="mb-7 text-[15px] leading-[1.75] text-white/65">
              Tell us what the team needs to understand, improve, or make easier for the customer.
            </p>
            {/* COPY REVIEW / BLOCKED — CONTACT-01 / D-10: neutral interim CTA pending approved scheduling details. */}
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

function ProductContextVisual({ product }: { product: (typeof productContexts)[number]["key"] }) {
  if (product === "retail") {
    return (
      <div className="grid aspect-[16/10] grid-cols-3 gap-2 overflow-hidden rounded-[26px] border border-white/10 bg-[#101820] p-3 shadow-[0_24px_54px_rgba(16,24,32,0.22)]">
        {[
          ["assets/podiums/jibe-retail-mlb.png", "Representative MLB-branded Jibe Retail podium", "MLB NYC"],
          ["assets/podiums/jibe-retail-nhl.png", "Representative NHL-branded Jibe Retail podium", "NHL"],
          ["assets/podiums/jibe-retail-fan-town.png", "Representative Fan Town-branded Jibe Retail podium", "Fan Town"],
        ].map(([src, alt, label]) => (
          <figure key={src} className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-[15px] bg-[#16212B]">
            <img src={assetUrl(src)} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            <figcaption className="absolute left-2 top-2 rounded-md bg-[#101820]/90 px-2 py-1 font-mono text-[6px] font-semibold uppercase tracking-[0.12em] text-white">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const image =
    product === "pro"
      ? {
          src: "assets/jibe-pro/screens/manager-dashboard.png",
          alt: "Jibe Pro manager dashboard with program performance and operational insight",
        }
      : {
          src: "assets/jibe-ai/performance-overview.png",
          alt: "Jibe AI performance overview with satisfaction, resolution, and interaction analysis",
        };

  return (
    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-[#101820] p-4 shadow-[0_24px_54px_rgba(16,24,32,0.22)]">
      <img
        src={assetUrl(image.src)}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="h-auto max-h-full w-full rounded-[16px] border border-white/70 bg-white object-contain shadow-[0_16px_32px_rgba(0,0,0,0.28)]"
      />
    </div>
  );
}
