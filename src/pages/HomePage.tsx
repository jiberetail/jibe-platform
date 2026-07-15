import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import PortalHero from "../components/PortalHero";
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
    name: "Jibe Pro",
    audience: "Contact centers",
    demoHref: "/demo?product=pro",
  },
  {
    name: "Jibe Retail",
    audience: "Physical retail",
    demoHref: "/demo?product=retail",
  },
  {
    name: "Jibe AI",
    audience: "Applied intelligence",
    demoHref: "/demo?product=ai",
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

const companyPages = [
  {
    number: "01",
    title: "Leadership",
    copy: "Meet the operators, technologists, and strategists guiding Jibe.",
    href: "/company/leadership",
  },
  {
    number: "02",
    title: "History",
    copy: "See how a better way to measure customer experience became Jibe.",
    href: "/company/history",
  },
  {
    number: "03",
    title: "IP Protection",
    copy: "Learn how Jibe protects the original technology behind its products.",
    href: "/company/ip-protection",
  },
  {
    number: "04",
    title: "Media Inquiries",
    copy: "Connect with Jibe for interviews, research, events, and commentary.",
    href: "/company/media-inquiries",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <PortalHero />

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

              <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#D9D9D5] bg-[#D9D9D5] sm:grid-cols-2">
                {companyPages.map((page) => (
                  <Link
                    key={page.href}
                    to={page.href}
                    className={`group flex min-h-[210px] flex-col bg-white p-6 transition-colors hover:bg-[#F2F7FB] motion-reduce:transition-none ${focusRing}`}
                  >
                    <span className="flex items-center justify-between font-mono text-[10px] text-[#0076CE]">
                      {page.number}
                      <ArrowRight
                        aria-hidden="true"
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </span>
                    <div className="mt-auto pt-12">
                      <h3 className="mb-2 font-['Instrument_Serif'] text-[31px] leading-none text-[#2F2F2F]">{page.title}</h3>
                      <p className="max-w-[310px] text-[12px] leading-[1.65] text-[#6D6D69]">{page.copy}</p>
                    </div>
                  </Link>
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
