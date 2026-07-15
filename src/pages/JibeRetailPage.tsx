import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BellRing,
  PackageSearch,
  ScanLine,
} from "lucide-react";
import { assetUrl } from "../assetUrl";
import ProductHeroSection from "../components/ProductHeroSection";

const workflow = [
  {
    number: "01",
    label: "Capture",
    title: "Ask while the intent is still fresh.",
    description:
      "A fast, in-store flow records why a shopper did not buy and what they were looking for—from product and team to size, style, and color.",
    icon: ScanLine,
  },
  {
    number: "02",
    label: "Fulfill",
    title: "Create a thoughtful second chance.",
    description:
      "With permission, teams can reconnect when an item is available and guide the shopper back to the store, online inventory, or another fulfillment path.",
    icon: BellRing,
  },
  {
    number: "03",
    label: "Analyze",
    title: "See demand the register missed.",
    description:
      "Dashboards organize unmet demand by location, category, product, size, experience issue, and time—so teams can make better inventory and operating decisions.",
    icon: BarChart3,
  },
];

const retailScreens = [
  {
    number: "01",
    title: "Choose the experience",
    description: "Start with the sport, league, or retail world that fits the venue.",
    src: assetUrl("assets/jibe-retail/sport-selector.png"),
    alt: "Jibe Retail Fan Town screen inviting a shopper to select a sport.",
  },
  {
    number: "02",
    title: "Choose the team",
    description: "Guide shoppers with familiar team identities in a fully branded flow.",
    src: assetUrl("assets/jibe-retail/team-selector.png"),
    alt: "Jibe Retail Major League Baseball screen inviting a shopper to select a team.",
  },
  {
    number: "03",
    title: "Find the missing item",
    description: "Capture the exact jersey or product the shopper could not find in store.",
    src: assetUrl("assets/jibe-retail/product-finder.png"),
    alt: "Jibe Retail Yankees product finder showing a searchable grid of jerseys.",
  },
  {
    number: "04",
    title: "Recover the basket",
    description: "Connect missed demand to a cart, QR checkout, shipping, and a return offer.",
    src: assetUrl("assets/jibe-retail/cart-recovery.png"),
    alt: "Jibe Retail NHL cart screen with selected merchandise and a QR code to complete the purchase.",
  },
] as const;

const podiums = [
  {
    src: assetUrl("assets/podiums/jibe-retail-mlb.png"),
    label: "MLB",
    caption: "MLB-wrapped retail podium",
    alt: "Slim retail podium with an MLB-branded vinyl wrap and a New York Mets merchandise screen",
  },
  {
    src: assetUrl("assets/podiums/jibe-retail-nhl.png"),
    label: "NHL",
    caption: "NHL-wrapped retail podium",
    alt: "Slim retail podium with an NHL-branded vinyl wrap and an order-and-delivery screen",
  },
];

const caseStudies = [
  {
    index: "01",
    location: "MLB NYC Flagship Store",
    eyebrow: "Captured unmet merchandise demand",
    description:
      "Jibe Retail recorded what shoppers wanted but could not find, exposing patterns across merchandise category, product availability, sizing, and store navigation.",
    metrics: [
      { value: "$1.2M", label: "Scaled demand opportunity identified" },
      { value: "3,972", label: "Unfulfilled merchandise requests" },
      { value: "68%", label: "Size-related friction in recorded demand" },
    ],
    insight:
      "Men’s merchandise represented the largest share of recorded unfulfilled demand, with hats and jerseys among the leading missed categories.",
  },
  {
    index: "02",
    location: "Colorado Rockies · Coors Field",
    eyebrow: "Captured fan demand and experience friction",
    description:
      "Podium and mobile feedback made missed merchandise, size gaps, assistance needs, and other purchase friction visible while fans were still in the venue.",
    metrics: [
      { value: "$181K", label: "Demand opportunity identified" },
      { value: "600", label: "Missed purchase opportunities recorded" },
      { value: "456", label: "Customer responses analyzed" },
    ],
    insight:
      "The findings gave the retail team a clearer view of where procurement, product availability, staffing, and fan experience could be improved.",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-4";

export default function JibeRetailPage() {
  return (
    <main className="overflow-hidden bg-white">
      <ProductHeroSection
        productName="Jibe Retail"
        productLabel="Retail"
        descriptor="In-store Demand Intelligence"
        line1="See what almost sold."
        line2="Recover more of it."
        description="Jibe Retail captures what shoppers wanted, why they walked away, and which unmet demand deserves action—before that signal disappears beyond the store exit."
        primaryHref="/demo?product=retail"
        primaryLabel="Book a Retail demo"
        secondaryHref="#how-it-works"
        secondaryLabel="See how it works"
        proofPoints={["Exit-moment capture", "Item-level demand", "Fulfillment follow-up", "Actionable reporting"]}
      />

      <section className="border-b border-[#D9D9D5] bg-white py-24 lg:py-36">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <SectionLabel number="01" label="The POS blind spot" />
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="max-w-[620px] font-['Instrument_Serif'] text-[42px] leading-[1] tracking-[-0.02em] text-[#2F2F2F] sm:text-[52px] lg:text-[64px]">
                The sale that never happened never reaches POS.
              </h2>
              <p className="mt-7 max-w-[540px] text-[16px] leading-[1.7] text-[#6D6D69]">
                Transaction data is excellent at explaining what sold. It cannot tell you what a shopper intended to buy, what was missing, or which experience issue sent them away empty-handed.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="border-y border-[#D9D9D5]">
                <ComparisonRow label="Point of sale sees" value="Purchases, returns, baskets, and transaction value" muted />
                <ComparisonRow label="Jibe Retail reveals" value="Unavailable products, sizes, styles, assistance gaps, and stated demand" />
                <ComparisonRow label="Teams can act on" value="Inventory priorities, shopper follow-up, staffing, placement, and store experience" />
              </div>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#B9DDF4] bg-[#E8F4FC] p-5">
                <PackageSearch aria-hidden="true" className="mt-0.5 shrink-0 text-[#0076CE]" size={21} />
                <p className="text-[14px] leading-[1.65] text-[#004F8C]">
                  The result is not another generic satisfaction score. It is a structured view of demand that was present in the store but absent from the transaction record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 border-b border-white/10 bg-[#101113] py-24 text-white lg:py-36">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <SectionLabel number="02" label="The workflow" dark />
          <div className="mb-16 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end">
            <h2 className="font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.02em] sm:text-[56px] lg:col-span-8 lg:text-[72px]">
              Capture the signal. Create a path back. Learn at scale.
            </h2>
            <p className="max-w-[420px] text-[15px] leading-[1.7] text-white/60 lg:col-span-4">
              One continuous workflow turns an otherwise invisible no-buy moment into a usable demand record and an optional service-recovery opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 border-y border-white/15 md:grid-cols-3">
            {workflow.map(({ number, label, title, description, icon: Icon }, index) => (
              <article
                key={number}
                className={`py-9 md:px-7 lg:px-9 ${index > 0 ? "border-t border-white/15 md:border-l md:border-t-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/35">{number}</span>
                  <Icon aria-hidden="true" size={20} className="text-[#36A8FA]" strokeWidth={1.5} />
                </div>
                <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[#36A8FA]">{label}</p>
                <h3 className="mt-4 max-w-[330px] font-['Instrument_Serif'] text-[30px] leading-[1.05]">{title}</h3>
                <p className="mt-5 text-[14px] leading-[1.7] text-white/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="survey-experience" className="scroll-mt-28 border-b border-[#D9D9D5] bg-[#EBEBEB] py-24 lg:py-36">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <SectionLabel number="03" label="The shopper experience" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[56px] lg:col-span-8 lg:text-[72px]">
              Fast enough for the exit. Flexible enough for the venue.
            </h2>
            <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#6D6D69] lg:col-span-4">
              From sport and team selection to product lookup and cart recovery, each flow can reflect the environment around it.
            </p>
          </div>

          <div
            className="-mx-6 mt-16 overflow-x-auto px-6 pb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0076CE] lg:mx-0 lg:overflow-visible lg:px-0"
            role="region"
            aria-label="Jibe Retail shopper experience screens"
            tabIndex={0}
          >
            <div className="flex w-max snap-x snap-mandatory gap-5 lg:grid lg:w-auto lg:grid-cols-4">
              {retailScreens.map((screen) => (
                <figure key={screen.number} className="w-[82vw] max-w-[330px] shrink-0 snap-start lg:w-auto lg:max-w-none">
                  <div className="overflow-hidden rounded-[22px] border border-[#C9CBCB] bg-white shadow-[0_18px_50px_rgba(47,47,47,0.10)]">
                    <div className="flex items-center justify-between gap-4 border-b border-[#D9D9D5] px-4 py-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6D6D69]">
                        Screen {screen.number}
                      </span>
                      <a
                        href={screen.src}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-md text-[10px] font-semibold text-[#0076CE] transition-colors hover:text-[#004F8C] ${focusRing}`}
                        aria-label={`Open full-size ${screen.title} screenshot`}
                      >
                        Full view <ArrowUpRight aria-hidden="true" size={12} />
                      </a>
                    </div>
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="px-1 pt-5">
                    <h3 className="text-[15px] font-semibold text-[#2F2F2F]">{screen.title}</h3>
                    <p className="mt-2 text-[12px] leading-[1.6] text-[#6D6D69]">{screen.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D5] bg-white py-24 lg:py-36">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <SectionLabel number="04" label="The podium" />
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[56px] lg:col-span-8 lg:text-[72px]">
              One podium. Wrapped for every venue.
            </h2>
            <p className="max-w-[390px] text-[15px] leading-[1.7] text-[#6D6D69] lg:col-span-4">
              Venue-specific wraps turn the same compact hardware into a natural extension of the store, team, or league around it.
            </p>
          </div>

          <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-5 md:grid-cols-2">
            {podiums.map((podium) => (
              <figure key={podium.label} className="group">
                <div className="overflow-hidden rounded-2xl border border-[#D9D9D5] bg-[#EBEBEB]">
                  <img
                    src={podium.src}
                    alt={podium.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[2/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <figcaption className="flex items-start justify-between gap-5 px-1 pt-4">
                  <div>
                    <p className="text-[14px] font-semibold text-[#2F2F2F]">{podium.label}</p>
                    <p className="mt-1 text-[12px] text-[#6D6D69]">{podium.caption}</p>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#A4A5A2]">Illustrative</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D5] bg-[#EBEBEB] py-24 lg:py-36">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <SectionLabel number="05" label="Demand made visible" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[56px] lg:col-span-8 lg:text-[72px]">
              Evidence for the opportunities that used to walk out unseen.
            </h2>
            <p className="max-w-[390px] text-[15px] leading-[1.7] text-[#6D6D69] lg:col-span-4">
              Deployment findings show the scale and shape of expressed demand—giving retail teams a better basis for procurement, staffing, and experience decisions.
            </p>
          </div>

          <div className="mt-16 space-y-5">
            {caseStudies.map((study) => (
              <article key={study.location} className="rounded-2xl border border-[#D9D9D5] bg-white p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <span className="font-['Instrument_Serif'] text-[54px] leading-none text-[#B9DDF4]">{study.index}</span>
                    <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-[#0076CE]">{study.eyebrow}</p>
                    <h3 className="mt-3 font-['Instrument_Serif'] text-[34px] leading-[1.02] text-[#2F2F2F] lg:text-[40px]">{study.location}</h3>
                    <p className="mt-5 text-[14px] leading-[1.7] text-[#6D6D69]">{study.description}</p>
                  </div>

                  <div className="lg:col-span-8">
                    <dl className="grid grid-cols-1 border-y border-[#D9D9D5] sm:grid-cols-3">
                      {study.metrics.map((metric, index) => (
                        <div
                          key={metric.label}
                          className={`py-6 sm:px-6 ${index > 0 ? "border-t border-[#D9D9D5] sm:border-l sm:border-t-0" : ""}`}
                        >
                          <dd className="font-['Instrument_Serif'] text-[42px] leading-none text-[#0076CE] lg:text-[52px]">{metric.value}</dd>
                          <dt className="mt-3 max-w-[190px] text-[12px] leading-[1.5] text-[#6D6D69]">{metric.label}</dt>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 border-l-2 border-[#0076CE] pl-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6D6D69]">What the signal revealed</p>
                      <p className="mt-2 text-[14px] leading-[1.7] text-[#2F2F2F]">{study.insight}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 max-w-[940px] font-mono text-[10px] leading-[1.7] text-[#6D6D69]">
            Reporting note: these deployment figures describe captured shopper responses, expressed unmet demand, and estimated opportunity identified through Jibe Retail. Dollar values do not represent booked, realized, or recovered revenue.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-32 lg:py-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-[#B9DDF4]/35 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6D6D69]">Book a Retail Demo</p>
          <h2 className="mt-8 max-w-[920px] font-['Instrument_Serif'] text-[52px] leading-[0.94] tracking-[-0.025em] text-[#2F2F2F] sm:text-[68px] lg:text-[96px]">
            Your next source of demand is already in the store.
          </h2>
          <p className="mt-8 max-w-[560px] text-[17px] leading-[1.7] text-[#6D6D69]">
            See how Jibe Retail can fit your environment, capture the no-buy moment, and give your team a clearer view of what shoppers came to find.
          </p>
          <Link
            to="/demo?product=retail"
            className={`mt-10 inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#004F8C] motion-reduce:transition-none ${focusRing}`}
          >
            Book a Retail Demo <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className={`font-['Instrument_Serif'] text-[28px] ${dark ? "text-[#36A8FA]" : "text-[#0076CE]"}`}>{number}</span>
      <span aria-hidden="true" className={`h-px w-10 ${dark ? "bg-white/20" : "bg-[#D9D9D5]"}`} />
      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${dark ? "text-white/50" : "text-[#6D6D69]"}`}>{label}</p>
    </div>
  );
}

function ComparisonRow({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-[#D9D9D5] py-6 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-8">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6D6D69]">{label}</p>
      <p className={`text-[14px] leading-[1.6] ${muted ? "text-[#8C8E8A]" : "font-medium text-[#2F2F2F]"}`}>{value}</p>
    </div>
  );
}
