import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { assetUrl } from "../assetUrl";

type CompanySlug = "leadership" | "history" | "ip-protection" | "media-inquiries";

const companyLinks: Array<{ slug: CompanySlug; label: string }> = [
  { slug: "leadership", label: "Leadership" },
  { slug: "history", label: "History" },
  { slug: "ip-protection", label: "IP Protection" },
  { slug: "media-inquiries", label: "Media Inquiries" },
];

const pageMeta: Record<CompanySlug, { title: string; intro: string; seoDescription: string }> = {
  leadership: {
    title: "Leadership Team",
    intro: "Meet the visionary leaders driving innovation in customer experience intelligence at Zacoustic.",
    seoDescription: "Meet the Jibe leadership team spanning customer operations, technology, analytics, product, finance, and client success.",
  },
  history: {
    title: "Our History",
    intro: "A different way to make customer experience measurable, operational, and useful.",
    seoDescription: "Explore Jibe's history and the idea that made customer perception an actionable operating metric.",
  },
  "ip-protection": {
    title: "Intellectual Property Protection",
    intro: "Safeguarding innovation in customer experience technology.",
    seoDescription: "Learn how Jibe protects the patents, algorithms, features, and original technology behind its customer experience products.",
  },
  "media-inquiries": {
    title: "Media Inquiries",
    intro: "Ideas, research, and informed perspectives for the customer experience conversation.",
    seoDescription: "Contact Jibe for interviews, research collaborations, expert commentary, events, and media opportunities.",
  },
};

// VERIFY / BLOCKED — COMPANY-01 / D-11: names, roles, portraits, and bios are
// retained for private review only and require owner approval before release.
const leaders = [
  {
    name: "Tim Lavin",
    title: "CEO",
    image: "assets/company/tim-lavin.jpg",
    alt: "Tim Lavin, CEO of Zacoustic",
    bio: "Tim Lavin, the co-founder and CEO of Zacoustic, is a visionary leader in the contact center industry, striving to create a revolutionary tool for customer experience management. With a diverse background that includes serving as the Chief Operating Officer for TELUS International and holding senior positions at prominent companies like Cendant Corp., Harte-Hanks, and First USA Bank, Tim brings extensive expertise in driving operational excellence and fostering customer satisfaction. As a decorated U.S. Army combat veteran and graduate of Maine Central Institute, Tim's leadership is characterized by strategic thinking, dedication, and a strong commitment to Zacoustic's mission.",
  },
  {
    name: "Brad Young",
    title: "CFO",
    image: "assets/company/brad-young.jpg",
    alt: "Brad Young, CFO of Zacoustic",
    bio: "Brad Young, the Chief Financial Officer of Zacoustic, joined the company in 2012 as an early investor and advisor. With a strong background in finance and business leadership, Brad brings invaluable expertise to the team. Prior to Zacoustic, he served as the CEO of Vision Care of Maine, successfully driving substantial revenue growth and retiring significant company debt. Brad's passion for innovation and his desire to make a meaningful impact led him to join Zacoustic, where he plays a vital role in investor relations and commercial contract negotiation. His strategic acumen and financial acuity contribute to Zacoustic's vision of revolutionizing the contact center industry.",
  },
  {
    name: "Jacob Raska",
    title: "Head of Client Success",
    image: "assets/company/jacob-raska.jpg",
    alt: "Jacob Raska, Head of Client Success at Zacoustic",
    bio: "Jacob Raska is the Head of Client Success at Zacoustic, where he is dedicated to supporting clients at the forefront of the customer experience revolution. With a strong background in data analytics, Jacob joined the Zacoustic team in 2018 after working on transformative projects that harnessed data insights to drive organizational change for Fortune 500 companies. Throughout his tenure at Zacoustic, Jacob has successfully led integrations across the globe, working with prestigious clients ranging from the largest bank in New Zealand to Fortune 50 companies spanning multiple continents. Passionate about engaging with customers and shaping data-driven strategies, Jacob is instrumental in redefining the customer experience industry through his work at Zacoustic.",
  },
  {
    name: "Archer Alvandi",
    title: "Head of Technology",
    image: "assets/company/archer-alvandi.jpg",
    alt: "Archer Alvandi, Head of Technology at Zacoustic",
    bio: "Archer is the Head of Technology at Zacoustic, where he leads and empowers a top-tier software development team to exceed client expectations in delivering cutting-edge, personalized customer experiences through next-generation digital solutions. Joining Zacoustic in 2018, Archer has held increasingly senior positions within the software development group, driving the company's growth as a customer experience innovator. With a career dedicated to innovative software design and development, Archer has collaborated with renowned industry leaders such as Microsoft and Intel, contributing to the development of True Key, as well as smaller disruptive companies like Hypergrid. Archer is proud to be part of Zacoustic's dynamic and disruptive journey, committed to providing exceptional solutions and services to partners and clients worldwide.",
  },
  {
    name: "Isaac Harrison",
    title: "Head of Product & Analytics",
    image: "assets/company/isaac-harrison-july-2026.jpg",
    alt: "Isaac Harrison, Head of Product & Analytics at Zacoustic",
    bio: "Isaac joined Zacoustic in 2023 and has played a key role in driving client success through data, product strategy, and operational insight. With over 20 years of experience in call center and B2B environments, he brings deep expertise in analytics, customer experience, and performance improvement. Isaac has led teams of data scientists and audit researchers, managed large-scale data collection and distribution, and helped clients improve customer satisfaction through practical, data-driven solutions. His strengths span product development, design, analytics, and problem-solving, making him a major contributor to Zacoustic's continued growth and client results.",
  },
];

// VERIFY / BLOCKED — COMPANY-01 / D-11: history, entity, IP, copyright, and
// media statements require factual and legal verification before release.
const articlePages: Record<Exclude<CompanySlug, "leadership">, {
  paragraphs: string[];
}> = {
  history: {
    paragraphs: [
      "Jibe’s story began in Austin, Texas, in 2010, when Tim Lavin and Daniel Pearce founded Zacoustic. Their experience in the contact-center industry had made one challenge clear: customer experience needed to become a core operational metric, not an occasional research exercise.",
      "Traditional surveys reached only a small share of customers—often around ten percent. The founders focused instead on the other participant in every interaction: the agent. They developed a model in which agents predict customer outcomes, then use naturally occurring survey responses to audit and strengthen the accuracy of those predictions.",
      "The idea established customer perception as the point of truth and enabled the agent to serve as a virtual voice of the customer. Protected by patents and shaped through work with recognized global brands, that foundation continues to guide Jibe’s approach to customer experience intelligence.",
    ],
  },
  "ip-protection": {
    paragraphs: [
      "The technology and methodologies behind Jibe are protected by patents issued in the United States and internationally. This protection covers core features, algorithms, and functionality developed to make customer experience intelligence more complete and actionable.",
      "We take those intellectual property rights seriously. Unauthorized use, reproduction, distribution, or infringement of protected Jibe or Zacoustic technology is not permitted and may be subject to enforcement.",
      "Organizations that believe a product or service may conflict with this protected technology are encouraged to contact us. Where appropriate, the company is open to discussing authorized use and potential licensing opportunities.",
      "Protecting this work preserves the integrity of Jibe, supports continued investment in research and development, and creates room for the next generation of customer experience innovation.",
    ],
  },
  "media-inquiries": {
    paragraphs: [
      "We welcome inquiries from journalists, researchers, and industry professionals seeking interviews, research collaboration, expert commentary, or participation in speaking engagements and tradeshows.",
      "Our team can discuss customer experience intelligence, the Jibe Data Stream, emerging industry trends, and the role of better evidence in customer-centric decision making.",
      "For interview requests, media appearances, research opportunities, or event participation, contact our media relations team. We value thoughtful conversations that help organizations understand and improve the experiences they create.",
    ],
  },
};

function isCompanySlug(value: string | undefined): value is CompanySlug {
  return companyLinks.some((link) => link.slug === value);
}

export default function CompanyPage() {
  const { section } = useParams<{ section: string }>();
  const validSection: CompanySlug = isCompanySlug(section) ? section : "leadership";
  const meta = pageMeta[validSection];

  useEffect(() => {
    const title = `${meta.title} | Jibe`;
    const selectors = [
      [
        'meta[name="description"]',
        meta.seoDescription,
        "Explore Jibe Pro, Jibe Retail, and Jibe AI—three purpose-built products for frontline performance, in-venue surveys and ecommerce, and interaction intelligence.",
      ],
      ['meta[property="og:title"]', title, "Jibe Platform | Choose Your Platform"],
      [
        'meta[property="og:description"]',
        meta.seoDescription,
        "Three purpose-built products for frontline performance, in-venue surveys and ecommerce, and interaction intelligence.",
      ],
      ['meta[name="twitter:title"]', title, "Jibe Platform | Choose Your Platform"],
      [
        'meta[name="twitter:description"]',
        meta.seoDescription,
        "Three purpose-built products for frontline performance, in-venue surveys and ecommerce, and interaction intelligence.",
      ],
    ] as const;

    document.title = title;
    selectors.forEach(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    });

    return () => {
      document.title = "Jibe Platform | Choose Your Platform";
      selectors.forEach(([selector, , defaultContent]) => {
        const element = document.querySelector<HTMLMetaElement>(selector);
        if (element) element.content = defaultContent;
      });
    };
  }, [meta]);

  if (!isCompanySlug(section)) {
    return <Navigate to="/company/leadership" replace />;
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <section className="flex min-h-[26svh] items-center overflow-hidden border-b border-[#D9D9D9] bg-white px-6 pb-10 pt-24 lg:px-10 lg:pb-12 lg:pt-28">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="mx-auto max-w-[900px] text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0076CE]">Company</span>
            </div>
            <h1 className="mx-auto max-w-[900px] font-['Instrument_Serif'] text-[42px] leading-[0.96] tracking-[-0.025em] text-[#243443] sm:text-[54px] lg:text-[64px]">
              {meta.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[650px] text-[15px] leading-[1.6] text-[#686A6D] sm:text-[16px]">
              {meta.intro}
            </p>
          </div>
        </div>
      </section>

      <nav aria-label="Company pages" className="border-b border-[#D9D9D9] bg-white">
        <div className="mx-auto flex max-w-[1320px] gap-8 overflow-x-auto px-6 lg:px-10">
          {companyLinks.map((link) => {
            const active = link.slug === section;
            return (
              <Link
                key={link.slug}
                to={`/company/${link.slug}`}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 border-b-2 px-0 py-5 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE] ${
                  active
                    ? "border-[#0076CE] text-[#0076CE]"
                    : "border-transparent text-[#5F5F5F] hover:border-[#0076CE] hover:text-[#0076CE]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {section === "leadership" ? <LeadershipContent /> : <ArticleContent section={section} />}

      <section className="bg-[#0076CE] px-6 py-20 text-white lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">Start a conversation</p>
            <h2 className="max-w-[850px] font-['Instrument_Serif'] text-[48px] leading-[0.95] tracking-[-0.025em] sm:text-[62px] lg:text-[72px]">
              See what the right Jibe can do for your team.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="mb-6 text-[15px] leading-[1.7] text-white/75">
              Bring us the challenge. We’ll shape a focused conversation around your customers, operation, and goals.
            </p>
            {/* COPY REVIEW / BLOCKED — CONTACT-01 / D-10: neutral interim CTA pending approved scheduling details. */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0076CE] transition-colors hover:bg-[#F2F2F2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a conversation <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function LeadershipContent() {
  const [selectedLeaderName, setSelectedLeaderName] = useState<string | null>(null);
  const selectedLeader = leaders.find((leader) => leader.name === selectedLeaderName);

  return (
    <section aria-labelledby="leadership-list-heading" className="bg-[#F5F5F5] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <h2 id="leadership-list-heading" className="sr-only">Leadership profiles</h2>
        <div className="mb-8 flex flex-col gap-3 border-b border-[#D2D2D2] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0076CE]">The people behind Jibe</p>
          <p className="text-[13px] text-[#686A6D]">Click any leader or select “Read bio” to learn more.</p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {leaders.map((leader) => {
            const active = leader.name === selectedLeaderName;

            return (
              <li key={leader.name} className="min-w-0">
                <button
                  type="button"
                  aria-expanded={active}
                  aria-controls="leadership-biography"
                  aria-label={`${active ? "Close" : "Read"} biography for ${leader.name}`}
                  onClick={() => setSelectedLeaderName(active ? null : leader.name)}
                  className={`group w-full cursor-pointer rounded-[22px] border-2 p-2 text-left transition-[transform,opacity,filter,box-shadow,border-color,background-color] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0076CE] focus-visible:opacity-100 focus-visible:grayscale-0 focus-visible:saturate-100 motion-reduce:transform-none motion-reduce:transition-none motion-reduce:hover:transform-none ${
                    active
                      ? "relative z-10 -translate-y-2 scale-[1.035] border-[#0076CE] bg-white shadow-[0_22px_50px_rgba(0,118,206,0.2)]"
                      : selectedLeaderName
                        ? "scale-[0.96] border-transparent opacity-60 saturate-[0.65] grayscale-[35%] hover:scale-[0.98] hover:border-[#B8D9EF] hover:bg-white/70 hover:opacity-90 hover:grayscale-0 hover:saturate-100"
                        : "border-transparent hover:-translate-y-1 hover:border-[#B8D9EF] hover:bg-white/70 hover:shadow-[0_16px_34px_rgba(36,52,67,0.1)]"
                  }`}
                >
                  <div
                    className={`aspect-[4/5] w-full overflow-hidden rounded-[18px] border bg-[#E9E9E9] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_38px_rgba(36,52,67,0.14)] ${
                      active
                        ? "border-[#0076CE] shadow-[0_18px_38px_rgba(0,118,206,0.14)]"
                        : "border-[#D2D2D2]"
                    }`}
                  >
                    <img
                      src={assetUrl(leader.image)}
                      alt={leader.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className={`mx-2 mt-4 border-t pb-2 pt-4 ${active ? "border-[#0076CE]" : "border-[#CFCFCF]"}`}>
                    <h3 className="font-['Instrument_Serif'] text-[27px] leading-[0.98] tracking-[-0.02em] text-[#243443] min-[1180px]:text-[25px]">
                      {leader.name}
                    </h3>
                    <p className="mt-2 text-[13px] font-semibold leading-[1.4] text-[#0076CE]">{leader.title}</p>
                    <span
                      className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold transition-colors ${
                        active
                          ? "border-[#0076CE] bg-[#0076CE] text-white"
                          : "border-[#B9C4CC] bg-white text-[#243443] group-hover:border-[#0076CE] group-hover:text-[#0076CE]"
                      }`}
                    >
                      {active ? "Close bio" : "Read bio"}
                      <ChevronDown
                        aria-hidden="true"
                        size={14}
                        className={`transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                      />
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div id="leadership-biography" aria-live="polite">
          {selectedLeader && (
            <article
              aria-labelledby="leadership-biography-heading"
              className="mt-10 animate-in overflow-hidden rounded-[22px] border border-[#B8D9EF] bg-white shadow-[0_20px_46px_rgba(36,52,67,0.1)] duration-500 fade-in-0 slide-in-from-top-4 motion-reduce:animate-none lg:mt-12"
            >
              <div aria-hidden="true" className="h-1.5 bg-[#0076CE]" />
              <div className="grid gap-7 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-12 lg:gap-12 lg:px-10">
                <div className="lg:col-span-4">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0076CE]">Selected profile · Full biography</p>
                  <h3
                    id="leadership-biography-heading"
                    className="mt-4 font-['Instrument_Serif'] text-[42px] leading-[0.96] tracking-[-0.025em] text-[#243443] sm:text-[48px]"
                  >
                    {selectedLeader.name}
                  </h3>
                  <p className="mt-3 text-[16px] font-semibold text-[#0076CE]">{selectedLeader.title}</p>
                </div>
                <p className="text-[15px] leading-[1.85] text-[#5F5F5F] sm:text-[16px] lg:col-span-8">
                  {selectedLeader.bio}
                </p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function ArticleContent({ section }: { section: Exclude<CompanySlug, "leadership"> }) {
  const article = articlePages[section];
  const isMedia = section === "media-inquiries";

  return (
    <section aria-labelledby={`${section}-content-heading`} className="bg-[#F5F5F5] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[820px] text-center">
        <article>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6D6D6D]">Company perspective</p>
          <h2 id={`${section}-content-heading`} className="mx-auto max-w-[680px] font-['Instrument_Serif'] text-[43px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[54px]">
            {section === "history" && "Customer perception became the point of truth."}
            {section === "ip-protection" && "Innovation is strongest when original work is respected."}
            {section === "media-inquiries" && "Let’s add useful evidence to the conversation."}
          </h2>

          <div className="mx-auto mt-9 max-w-[720px] border-t border-[#D2D2D2] pt-8">
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-6 text-[16px] leading-[1.8] text-[#4E4E4E] last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {section === "ip-protection" && (
            <p className="mt-9 border-t border-[#D2D2D2] pt-6 font-mono text-[10px] tracking-[0.08em] text-[#777777]">
              © 2023 BalanceCXI, Inc. All rights reserved.
            </p>
          )}

          {/* VERIFY / BLOCKED — COMPANY-01 / D-11: do not restore a mailto until the media inbox is approved. */}
          {isMedia && (
            <div className="mt-9 border-y border-[#CCCCCC] py-5">
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#777777]">Media relations</span>
              <span className="mt-2 block text-[14px] font-semibold text-[#2F2F2F]">Contact channel under review</span>
              <span className="mx-auto mt-2 block max-w-[560px] text-[12px] leading-[1.65] text-[#6D6D6D]">
                Jibe is verifying the correct media contact before publishing a destination.
              </span>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
