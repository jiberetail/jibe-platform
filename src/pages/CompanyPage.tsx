import { useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { assetUrl } from "../assetUrl";

type CompanySlug = "leadership" | "history" | "ip-protection" | "media-inquiries";

const companyLinks: Array<{ slug: CompanySlug; label: string }> = [
  { slug: "leadership", label: "Leadership" },
  { slug: "history", label: "History" },
  { slug: "ip-protection", label: "IP Protection" },
  { slug: "media-inquiries", label: "Media Inquiries" },
];

const pageMeta: Record<CompanySlug, { number: string; title: string; intro: string; seoDescription: string }> = {
  leadership: {
    number: "01",
    title: "Leadership",
    intro: "Meet the leaders advancing customer experience intelligence and shaping what Jibe makes possible.",
    seoDescription: "Meet the Jibe leadership team spanning customer operations, technology, analytics, product, finance, and client success.",
  },
  history: {
    number: "02",
    title: "Our History",
    intro: "A different way to make customer experience measurable, operational, and useful.",
    seoDescription: "Explore Jibe's history and the idea that made customer perception an actionable operating metric.",
  },
  "ip-protection": {
    number: "03",
    title: "Intellectual Property Protection",
    intro: "Safeguarding innovation in customer experience technology.",
    seoDescription: "Learn how Jibe protects the patents, algorithms, features, and original technology behind its customer experience products.",
  },
  "media-inquiries": {
    number: "04",
    title: "Media Inquiries",
    intro: "Ideas, research, and informed perspectives for the customer experience conversation.",
    seoDescription: "Contact Jibe for interviews, research collaborations, expert commentary, events, and media opportunities.",
  },
};

const leaders = [
  {
    name: "Tim Lavin",
    title: "CEO & Co-founder",
    image: "assets/company/tim-lavin.jpg",
    alt: "Tim Lavin, CEO and co-founder",
    bio: "Tim brings decades of contact-center leadership to Jibe, including service as COO of TELUS International and senior roles at Cendant, Harte-Hanks, and First USA. A decorated U.S. Army veteran, he leads with an operator’s discipline.",
  },
  {
    name: "Brad Young",
    title: "Chief Financial Officer",
    image: "assets/company/brad-young.jpg",
    alt: "Brad Young, Chief Financial Officer",
    bio: "Brad joined in 2012 as an early investor and advisor. A former CEO of Vision Care of Maine, he brings financial and operating experience to investor relations, commercial contracts, and long-term growth.",
  },
  {
    name: "Jacob Raska",
    title: "Head of Client Success",
    image: "assets/company/jacob-raska.jpg",
    alt: "Jacob Raska, Head of Client Success",
    bio: "Jacob joined in 2018 with a background in data analytics and organizational transformation. He leads global integrations and helps clients turn complex information into practical strategies.",
  },
  {
    name: "Archer Alvandi",
    title: "Head of Technology",
    image: "assets/company/archer-alvandi.jpg",
    alt: "Archer Alvandi, Head of Technology",
    bio: "Archer has led Jibe technology work since joining in 2018. Drawing on experience with Microsoft, Intel, True Key, and Hypergrid, he guides the team delivering tailored digital products.",
  },
  {
    name: "Isaac Harrison",
    title: "Head of Product and Analytics",
    image: "assets/company/isaac-harrison.jpg",
    alt: "Isaac Harrison, Head of Product and Analytics",
    bio: "Isaac joined in 2023 with more than 20 years of call-center and B2B experience. His work spans product strategy, analytics, audit research, and performance improvement.",
  },
];

const articlePages: Record<Exclude<CompanySlug, "leadership">, {
  image: string;
  imageAlt: string;
  paragraphs: string[];
}> = {
  history: {
    image: "assets/company/history.jpg",
    imageAlt: "A visual representation of Jibe's company history",
    paragraphs: [
      "Jibe’s story began in Austin, Texas, in 2010, when Tim Lavin and Daniel Pearce founded Zacoustic. Their experience in the contact-center industry had made one challenge clear: customer experience needed to become a core operational metric, not an occasional research exercise.",
      "Traditional surveys reached only a small share of customers—often around ten percent. The founders focused instead on the other participant in every interaction: the agent. They developed a model in which agents predict customer outcomes, then use naturally occurring survey responses to audit and strengthen the accuracy of those predictions.",
      "The idea established customer perception as the point of truth and enabled the agent to serve as a virtual voice of the customer. Protected by patents and shaped through work with recognized global brands, that foundation continues to guide Jibe’s approach to customer experience intelligence.",
    ],
  },
  "ip-protection": {
    image: "assets/company/ip-protection.png",
    imageAlt: "Jibe AI customer experience dashboard",
    paragraphs: [
      "The technology and methodologies behind Jibe are protected by patents issued in the United States and internationally. This protection covers core features, algorithms, and functionality developed to make customer experience intelligence more complete and actionable.",
      "We take those intellectual property rights seriously. Unauthorized use, reproduction, distribution, or infringement of protected Jibe or Zacoustic technology is not permitted and may be subject to enforcement.",
      "Organizations that believe a product or service may conflict with this protected technology are encouraged to contact us. Where appropriate, the company is open to discussing authorized use and potential licensing opportunities.",
      "Protecting this work preserves the integrity of Jibe, supports continued investment in research and development, and creates room for the next generation of customer experience innovation.",
    ],
  },
  "media-inquiries": {
    image: "assets/company/media-inquiries.jpg",
    imageAlt: "A presenter beside a broadcast video camera",
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
        "Explore Jibe Pro, Jibe Retail, and Jibe AI—three purpose-built products for customer experience, retail demand, and interaction intelligence.",
      ],
      ['meta[property="og:title"]', title, "Jibe Platform | Choose Your Platform"],
      [
        'meta[property="og:description"]',
        meta.seoDescription,
        "Three purpose-built products for frontline performance, retail demand, and interaction intelligence.",
      ],
      ['meta[name="twitter:title"]', title, "Jibe Platform | Choose Your Platform"],
      [
        'meta[name="twitter:description"]',
        meta.seoDescription,
        "Three purpose-built products for frontline performance, retail demand, and interaction intelligence.",
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
    <main className="min-h-screen bg-[#F7F7F4]">
      <section className="overflow-hidden border-b border-[#D9D9D5] bg-[#F7F7F4] px-6 pb-16 pt-36 lg:px-10 lg:pb-20 lg:pt-44">
        <div className={`mx-auto grid max-w-[1320px] gap-12 ${section === "leadership" ? "lg:grid-cols-[0.94fr_1.06fr] lg:items-center" : ""}`}>
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0076CE]">Company</span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#A0A29E]">{meta.number} / 04</span>
            </div>
            <h1 className="max-w-[900px] font-['Instrument_Serif'] text-[56px] leading-[0.92] tracking-[-0.03em] text-[#2F2F2F] sm:text-[72px] lg:text-[88px]">
              {meta.title}
            </h1>
            <p className="mt-7 max-w-[650px] text-[17px] leading-[1.7] text-[#686A6D] sm:text-[18px]">
              {meta.intro}
            </p>
          </div>

          {section === "leadership" && (
            <div className="relative overflow-hidden rounded-[28px] border border-[#D9D9D5] bg-[#E7E8E5] shadow-[0_24px_70px_rgba(25,31,38,0.09)]">
              <img
                src={assetUrl("assets/company/leadership-hero.jpg")}
                alt="Guests at a Zacoustic-hosted business dinner"
                className="aspect-[16/10] h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#19212A]/25 via-transparent to-transparent" aria-hidden="true" />
            </div>
          )}
        </div>
      </section>

      <nav aria-label="Company pages" className="border-b border-[#D9D9D5] bg-[#EBEBEB]">
        <div className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-6 py-4 lg:px-10">
          {companyLinks.map((link) => {
            const active = link.slug === section;
            return (
              <Link
                key={link.slug}
                to={`/company/${link.slug}`}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE] ${
                  active
                    ? "border-[#0076CE] bg-[#0076CE] text-white"
                    : "border-[#D0D2CE] bg-white text-[#4E504D] hover:border-[#9FCFEB] hover:text-[#0076CE]"
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
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0076CE] transition-colors hover:bg-[#E8F4FC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Book a demo <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function LeadershipContent() {
  return (
    <section aria-labelledby="leadership-list-heading" className="bg-[#EBEBEB] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6D6D69]">The people behind Jibe</p>
            <h2 id="leadership-list-heading" className="max-w-[760px] font-['Instrument_Serif'] text-[44px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[58px]">
              Experience built across operations, technology, analytics, and client success.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {leaders.map((leader, index) => (
            <article
              key={leader.name}
              className={`overflow-hidden rounded-[24px] border border-[#D9D9D5] bg-white ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className={`grid h-full ${index === 0 ? "md:grid-cols-[0.78fr_1.22fr]" : "sm:grid-cols-[0.82fr_1.18fr]"}`}>
                <div className="min-h-[330px] overflow-hidden bg-[#E2E3E0]">
                  <img
                    src={assetUrl(leader.image)}
                    alt={leader.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col p-7 sm:p-8 lg:p-9">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0076CE]">{leader.title}</span>
                  <h3 className="mt-4 font-['Instrument_Serif'] text-[38px] leading-none tracking-[-0.02em] text-[#2F2F2F] sm:text-[44px]">
                    {leader.name}
                  </h3>
                  <p className="mt-6 text-[14px] leading-[1.75] text-[#686A6D]">{leader.bio}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleContent({ section }: { section: Exclude<CompanySlug, "leadership"> }) {
  const article = articlePages[section];
  const isMedia = section === "media-inquiries";

  return (
    <section aria-labelledby={`${section}-content-heading`} className="bg-[#EBEBEB] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[26px] border border-[#D9D9D5] bg-white shadow-[0_22px_60px_rgba(25,31,38,0.08)] lg:sticky lg:top-28">
            <img
              src={assetUrl(article.image)}
              alt={article.imageAlt}
              className={`aspect-[4/3] w-full ${section === "ip-protection" ? "bg-[#F7F9FB] object-contain p-4 sm:p-6" : "object-cover"}`}
            />
          </div>
        </div>

        <article className="lg:col-span-7">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6D6D69]">Company perspective</p>
          <h2 id={`${section}-content-heading`} className="max-w-[680px] font-['Instrument_Serif'] text-[43px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[54px]">
            {section === "history" && "Customer perception became the point of truth."}
            {section === "ip-protection" && "Innovation is strongest when original work is respected."}
            {section === "media-inquiries" && "Let’s add useful evidence to the conversation."}
          </h2>

          <div className="mt-9 border-t border-[#D2D4D0] pt-8">
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-6 max-w-[720px] text-[16px] leading-[1.8] text-[#4E504D] last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {section === "ip-protection" && (
            <p className="mt-9 border-t border-[#D2D4D0] pt-6 font-mono text-[10px] tracking-[0.08em] text-[#777976]">
              © 2023 BalanceCXI, Inc. All rights reserved.
            </p>
          )}

          {isMedia && (
            <a
              href="mailto:info@zacoustic.com"
              className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-[#D9D9D5] bg-white px-5 py-4 transition-colors hover:border-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0076CE]">
                <Mail aria-hidden="true" size={17} />
              </span>
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#777976]">Media relations</span>
                <span className="mt-1 block text-[14px] font-semibold text-[#2F2F2F]">info@zacoustic.com</span>
              </span>
            </a>
          )}
        </article>
      </div>
    </section>
  );
}
