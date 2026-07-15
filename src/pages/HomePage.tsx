import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  MoveUpRight,
  Store,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoMeta from "@/imports/Meta-Logo.png";
import logoATT from "@/imports/AT_T-logo_2016.png";
import logoTMobile from "@/imports/t-mobile-logo-png-transparent.png";
import logoSutherland from "@/imports/Image_6-17-26_at_5.58_PM.png";
import logoMLB from "@/imports/Major_League_Baseball_logo.svg.png";
import logoGoDaddy from "@/imports/GD_LOCKUP_RGB_BLACK.png";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-4";

const products = [
  {
    number: "01",
    name: "Jibe Pro",
    audience: "Contact centers",
    headline: "Understand every interaction.",
    description:
      "Connect frontline predictions, customer feedback, and operational performance in one clear view.",
    href: "/jibe-pro",
    demoHref: "/demo?product=pro",
    icon: BarChart3,
    surface: "#0076CE",
    foreground: "#FFFFFF",
    muted: "rgba(255,255,255,0.72)",
    rule: "rgba(255,255,255,0.26)",
    accent: "rgba(255,255,255,0.13)",
  },
  {
    number: "02",
    name: "Jibe Retail",
    audience: "Physical retail",
    headline: "See what almost sold.",
    description:
      "Capture unmet demand in the store and turn it into inventory, service, and experience decisions.",
    href: "/jibe-retail",
    demoHref: "/demo?product=retail",
    icon: Store,
    surface: "#262A2D",
    foreground: "#FFFFFF",
    muted: "rgba(255,255,255,0.68)",
    rule: "rgba(255,255,255,0.2)",
    accent: "rgba(255,255,255,0.08)",
  },
  {
    number: "03",
    name: "Jibe AI",
    audience: "Applied intelligence",
    headline: "Move from context to action.",
    description:
      "Surface patterns, concise summaries, and useful recommendations from interaction data.",
    href: "/jibe-ai",
    demoHref: "/demo?product=ai",
    icon: BrainCircuit,
    surface: "#E8F4FC",
    foreground: "#173A52",
    muted: "#486A80",
    rule: "#B9DDF4",
    accent: "rgba(0,118,206,0.08)",
  },
] as const;

const clients = [
  { src: logoMeta, alt: "Meta", maxHeight: 54 },
  { src: logoATT, alt: "AT&T", maxHeight: 40 },
  { src: logoTMobile, alt: "T-Mobile", maxHeight: 36 },
  { src: logoSutherland, alt: "Sutherland", maxHeight: 38 },
  { src: logoMLB, alt: "Major League Baseball", maxHeight: 48 },
  { src: logoGoDaddy, alt: "GoDaddy", maxHeight: 34 },
];

const comparison = [
  {
    label: "Signal",
    values: [
      "Frontline predictions + customer feedback",
      "In-store demand + shopper friction",
      "Interaction data + operational context",
    ],
  },
  {
    label: "Makes visible",
    values: [
      "Experience risk and performance gaps",
      "Missed products, sizes, and service needs",
      "Patterns, summaries, and next actions",
    ],
  },
  {
    label: "Built for",
    values: [
      "CX, operations, QA, and coaching",
      "Retail, merchandising, and venue teams",
      "Leaders working across complex workflows",
    ],
  },
];

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const Icon = product.icon;

  return (
    <article
      className="group relative min-h-[285px] overflow-hidden rounded-[22px] border p-6 sm:p-7 lg:min-h-[310px] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
      style={{
        background: product.surface,
        color: product.foreground,
        borderColor: product.rule,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full border"
        style={{ borderColor: product.rule, background: product.accent }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-28 w-40 border-l border-t opacity-70"
        style={{ borderColor: product.rule }}
      >
        <div className="absolute left-1/3 top-0 h-full border-l" style={{ borderColor: product.rule }} />
        <div className="absolute left-2/3 top-0 h-full border-l" style={{ borderColor: product.rule }} />
        <div className="absolute left-0 top-1/2 w-full border-t" style={{ borderColor: product.rule }} />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: product.muted }}>
              {product.number}
            </span>
            <span className="h-3 w-px" style={{ background: product.rule }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: product.muted }}>
              {product.audience}
            </span>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full border"
            style={{ borderColor: product.rule, background: product.accent }}
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
          </div>
        </div>

        <div className="mb-7">
          <p className="mb-2 text-[13px] font-semibold">{product.name}</p>
          <h2
            className="max-w-[310px] font-['Instrument_Serif'] text-[38px] leading-[0.98] tracking-[-0.02em] sm:text-[42px]"
          >
            {product.headline}
          </h2>
        </div>

        <p className="mb-8 max-w-[340px] text-[13px] leading-[1.6]" style={{ color: product.muted }}>
          {product.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-5" style={{ borderColor: product.rule }}>
          <Link
            to={product.href}
            className={`inline-flex items-center gap-2 text-[13px] font-semibold ${focusRing}`}
            aria-label={`Explore ${product.name}`}
          >
            Explore product
            <MoveUpRight
              aria-hidden="true"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
            />
          </Link>
          <Link
            to={product.demoHref}
            className={`text-[12px] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 motion-reduce:transition-none ${focusRing}`}
            style={{ color: product.muted }}
            aria-label={`Book a ${product.name} demo`}
          >
            Book a demo
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main>
      <section
        className="border-b bg-white pt-[150px] lg:min-h-[100svh] lg:pt-[154px]"
        style={{ borderColor: "#D9D9D5" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 pb-12 lg:px-10 lg:pb-10">
          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6D6D69]">Jibe Platform</span>
                <span className="h-3 w-px bg-[#D9D9D5]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6D6D69]">Three focused products</span>
              </div>
              <h1 className="font-['Instrument_Serif'] text-[54px] leading-[0.9] tracking-[-0.025em] text-[#2F2F2F] sm:text-[70px] lg:text-[84px] xl:text-[96px]">
                Choose your Jibe.
                <span className="block italic text-[#0076CE]">See it work.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-1">
              <p className="mb-6 max-w-[430px] text-[15px] leading-[1.65] text-[#6D6D69]">
                Three purpose-built products help teams understand customer interactions, capture missed retail demand, and turn complex context into clear next steps.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  to="/demo"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#0076CE] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#004F8C] motion-reduce:transition-none ${focusRing}`}
                >
                  Book a demo <ArrowRight aria-hidden="true" size={15} />
                </Link>
                <a
                  href="#products"
                  className={`inline-flex items-center justify-center rounded-xl border border-[#D9D9D5] px-6 py-3.5 text-[14px] font-medium text-[#2F2F2F] transition-colors hover:border-[#2F2F2F] motion-reduce:transition-none ${focusRing}`}
                >
                  Compare products
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="clients"
        aria-labelledby="clients-heading"
        className="scroll-mt-[150px] border-b bg-[#EBEBEB]"
        style={{ borderColor: "#D9D9D5" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 py-10 lg:px-10">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="clients-heading" className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6D6D69]">
              Selected clients
            </h2>
            <div className="h-px w-full bg-[#D9D9D5]" />
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#D9D9D5] bg-[#D9D9D5] sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <div key={client.alt} className="flex h-[92px] items-center justify-center bg-white px-6 py-5">
                <ImageWithFallback
                  src={client.src}
                  alt={client.alt}
                  className="h-auto w-full object-contain grayscale opacity-70"
                  style={{ maxHeight: client.maxHeight }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="products"
        aria-labelledby="products-heading"
        className="scroll-mt-[150px] border-b bg-white py-24 lg:py-32"
        style={{ borderColor: "#D9D9D5" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6D6D69]">Choose your Jibe</p>
              <h2
                id="products-heading"
                className="font-['Instrument_Serif'] text-[46px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[58px] lg:text-[68px]"
              >
                Start with the signal your team cannot afford to miss.
              </h2>
            </div>
            <p className="max-w-[430px] text-[15px] leading-[1.7] text-[#6D6D69] lg:col-span-4 lg:col-start-9">
              Each Jibe product is designed for a distinct operating moment. Choose the one that matches your workflow, or talk with us about where to begin.
            </p>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-[#D9D9D5]">
            <div className="hidden grid-cols-[170px_repeat(3,1fr)] bg-[#EBEBEB] md:grid">
              <div className="border-r border-[#D9D9D5] p-5" />
              {products.map((product) => (
                <div key={product.name} className="border-r border-[#D9D9D5] p-5 last:border-r-0">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#6D6D69]">{product.audience}</p>
                  <h3 className="text-[15px] font-semibold text-[#2F2F2F]">{product.name}</h3>
                </div>
              ))}
            </div>

            {comparison.map((row) => (
              <div key={row.label} className="border-t border-[#D9D9D5] first:border-t-0 md:grid md:grid-cols-[170px_repeat(3,1fr)]">
                <div className="bg-[#F6F6F3] p-5 md:border-r md:border-[#D9D9D5]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6D6D69]">{row.label}</p>
                </div>
                {row.values.map((value, index) => (
                  <div key={value} className="flex gap-3 border-t border-[#D9D9D5] p-5 md:border-r md:border-t-0 md:last:border-r-0">
                    <span className="mt-0.5 font-mono text-[9px] text-[#0076CE] md:hidden">0{index + 1}</span>
                    <p className="text-[13px] leading-[1.55] text-[#2F2F2F]">{value}</p>
                  </div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-1 gap-px border-t border-[#D9D9D5] bg-[#D9D9D5] md:grid-cols-3 md:pl-[170px]">
              {products.map((product) => (
                <div key={product.name} className="flex flex-wrap items-center gap-x-5 gap-y-3 bg-white p-5">
                  <Link
                    to={product.href}
                    className={`inline-flex items-center gap-2 text-[13px] font-semibold text-[#0076CE] transition-colors hover:text-[#004F8C] motion-reduce:transition-none ${focusRing}`}
                  >
                    Explore {product.name} <ArrowRight aria-hidden="true" size={13} />
                  </Link>
                  <Link
                    to={product.demoHref}
                    className={`text-[12px] text-[#6D6D69] underline underline-offset-4 transition-colors hover:text-[#2F2F2F] motion-reduce:transition-none ${focusRing}`}
                  >
                    Demo
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="company"
        aria-labelledby="company-heading"
        className="scroll-mt-[150px] border-b bg-[#EBEBEB] py-24 lg:py-32"
        style={{ borderColor: "#D9D9D5" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6D6D69]">Company</p>
              <div className="font-['Instrument_Serif'] text-[112px] leading-[0.72] tracking-[-0.04em] text-[#D1D1CC] sm:text-[150px]" aria-hidden="true">
                03
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2
                id="company-heading"
                className="mb-8 max-w-[760px] font-['Instrument_Serif'] text-[46px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[58px] lg:text-[68px]"
              >
                We build for the moments important signals are easy to miss.
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <p className="text-[16px] leading-[1.75] text-[#2F2F2F]">
                  Jibe creates focused products for customer conversations, store visits, and complex operational workflows. Each one turns overlooked inputs into a structured view people can use.
                </p>
                <p className="text-[15px] leading-[1.75] text-[#6D6D69]">
                  The products solve different problems, but the standard is the same: fit the work, make the signal clear, and give the team a practical next step.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#D9D9D5] bg-[#D9D9D5] sm:grid-cols-3">
                {[
                  ["01", "Fit the workflow", "Designed around how the team already works."],
                  ["02", "Make it legible", "Clear views for operators and leaders."],
                  ["03", "Move to action", "Useful direction, not another data dump."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="bg-white p-6">
                    <span className="mb-8 block font-mono text-[10px] text-[#0076CE]">{number}</span>
                    <h3 className="mb-2 text-[14px] font-semibold text-[#2F2F2F]">{title}</h3>
                    <p className="text-[12px] leading-[1.6] text-[#6D6D69]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-[150px] bg-[#0076CE] py-20 text-white lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">Book a demo</p>
              <h2
                id="contact-heading"
                className="max-w-[850px] font-['Instrument_Serif'] text-[50px] leading-[0.94] tracking-[-0.025em] sm:text-[64px] lg:text-[78px]"
              >
                Bring us the problem. We’ll show you the right Jibe.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="mb-6 text-[15px] leading-[1.65] text-white/75">
                Choose a product for a focused walkthrough, or book a general conversation and we’ll help route you.
              </p>
              <Link
                to="/demo"
                className={`inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0076CE] transition-colors hover:bg-[#E8F4FC] motion-reduce:transition-none ${focusRing}`}
              >
                Book a Jibe demo <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-white/25 bg-white/25 md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.name}
                to={product.demoHref}
                className={`group flex min-h-[190px] flex-col bg-[#0076CE] p-6 transition-colors hover:bg-[#086BB3] motion-reduce:transition-none ${focusRing}`}
                aria-label={`Book a ${product.name} demo`}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">{product.audience}</span>
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <div className="mt-auto">
                  <h3 className="mb-2 font-['Instrument_Serif'] text-[34px] leading-none">{product.name}</h3>
                  <div className="flex items-center gap-2 text-[12px] text-white/72">
                    <Check aria-hidden="true" size={13} /> Focused product walkthrough
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
