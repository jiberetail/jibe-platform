import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../../assetUrl";
import ProductHeroSection from "../ProductHeroSection";
import type {
  ProductPageConfig,
  ProductPathway,
  ProductSectionIntro,
} from "./productPage.types";

type ProductPageTemplateProps = {
  config: ProductPageConfig;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-4";

function normalizeId(value: string) {
  return value.replace(/:/g, "");
}

function getNextTabIndex(
  event: KeyboardEvent<HTMLButtonElement>,
  currentIndex: number,
  count: number,
) {
  switch (event.key) {
    case "ArrowRight":
      return (currentIndex + 1) % count;
    case "ArrowLeft":
      return (currentIndex - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

function focusAndSelectTab(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  count: number,
  refs: RefObject<(HTMLButtonElement | null)[]>,
  onSelect: (index: number) => void,
) {
  const nextIndex = getNextTabIndex(event, index, count);
  if (nextIndex === null) return;

  event.preventDefault();
  onSelect(nextIndex);
  window.requestAnimationFrame(() => refs.current?.[nextIndex]?.focus());
}

function SectionIntro({
  eyebrow,
  title,
  description,
  dark = false,
}: ProductSectionIntro & { dark?: boolean }) {
  return (
    <div className="product-page__section-intro grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p
          className={`mb-5 text-[10px] font-bold uppercase tracking-[0.2em] ${
            dark ? "text-[#4A9CFF]" : "text-[#0076CE]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`max-w-[900px] text-[clamp(38px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.035em] ${
            dark ? "text-white" : "text-[#26364A]"
          }`}
        >
          {title}
        </h2>
      </div>
      <p
        className={`max-w-[450px] text-[15px] leading-[1.75] lg:col-span-4 ${
          dark ? "text-white/65" : "text-[#5F5F5F]"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function ProductAnchorNav({ productName }: { productName: string }) {
  const links = [
    ["#overview", "Overview"],
    ["#product", "Product"],
    ["#how-it-works", "How it works"],
    ["#proof", "Proof"],
  ] as const;

  return (
    <nav
      className="product-page__anchor-nav sticky top-[76px] z-20 border-b border-[#D9D9D9] bg-white/95 backdrop-blur-sm"
      aria-label={`${productName} page sections`}
    >
      <div className="mx-auto flex max-w-[1320px] gap-7 overflow-x-auto px-6 py-4 lg:px-10">
        {links.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className={`shrink-0 border-b border-transparent pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5F5F5F] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] ${focusRing}`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function ProductPathways({ config }: { config: ProductPageConfig["pathways"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const idPrefix = normalizeId(useId());
  const activePathway = config.items[activeIndex];

  return (
    <section
      id="overview"
      className="product-page__pathways scroll-mt-32 border-b border-[#D9D9D9] bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} />

        <div className="mt-14 border-y border-[#D9D9D9] lg:mt-16">
          <div
            role="tablist"
            aria-label={config.eyebrow}
            className="product-page__pathway-tabs flex overflow-x-auto border-b border-[#D9D9D9]"
          >
            {config.items.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`${idPrefix}-pathway-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${idPrefix}-pathway-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) =>
                    focusAndSelectTab(event, index, config.items.length, tabRefs, setActiveIndex)
                  }
                  className={`relative min-w-[150px] flex-1 px-5 py-5 text-left text-[13px] font-semibold transition-colors sm:px-7 ${
                    selected ? "text-[#0076CE]" : "text-[#5F5F5F] hover:text-[#26364A]"
                  } ${focusRing}`}
                >
                  <span className="mr-3 text-[10px] font-bold tracking-[0.15em] text-[#888888]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#0076CE] transition-opacity ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <PathwayPanel key={activePathway.id} pathway={activePathway} idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}

function PathwayPanel({ pathway, idPrefix }: { pathway: ProductPathway; idPrefix: string }) {
  return (
    <div
      id={`${idPrefix}-pathway-panel`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-pathway-tab-${pathway.id}`}
      tabIndex={0}
      className={`product-page__pathway-panel grid gap-10 py-10 lg:grid-cols-12 lg:py-14 ${focusRing}`}
    >
      <div className="lg:col-span-6">
        <h3 className="max-w-[620px] text-[clamp(28px,3.2vw,44px)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#26364A]">
          {pathway.title}
        </h3>
        <p className="mt-5 max-w-[590px] text-[15px] leading-[1.75] text-[#5F5F5F]">
          {pathway.description}
        </p>
      </div>
      <ul className="divide-y divide-[#D9D9D9] border-y border-[#D9D9D9] lg:col-span-5 lg:col-start-8">
        {pathway.outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-3 py-4 text-[14px] leading-[1.6] text-[#26364A]">
            <Check aria-hidden="true" size={15} className="mt-1 shrink-0 text-[#0076CE]" strokeWidth={2} />
            {outcome}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductMediaTour({ config }: { config: ProductPageConfig["media"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const idPrefix = normalizeId(useId());
  const activeItem = config.items[activeIndex];
  const imageUrl = activeItem.src ? assetUrl(activeItem.src) : null;
  const galleryImages = activeItem.images?.map((image) => ({
    ...image,
    url: assetUrl(image.src),
  }));

  return (
    <section
      id="product"
      className="product-page__media scroll-mt-32 border-b border-white/10 bg-[#101820] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} dark />

        <div className="mt-14 lg:mt-16">
          <div
            role="tablist"
            aria-label={config.eyebrow}
            className="product-page__media-tabs flex gap-7 overflow-x-auto border-b border-white/15"
          >
            {config.items.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`${idPrefix}-media-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${idPrefix}-media-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) =>
                    focusAndSelectTab(event, index, config.items.length, tabRefs, setActiveIndex)
                  }
                  className={`relative shrink-0 pb-4 text-[12px] font-semibold transition-colors ${
                    selected ? "text-white" : "text-white/50 hover:text-white/80"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#4A9CFF] transition-opacity ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div
            id={`${idPrefix}-media-panel`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-media-tab-${activeItem.id}`}
            tabIndex={0}
            className="product-page__media-panel grid items-center gap-10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]"
          >
            <div className="lg:col-span-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A9CFF]">
                {activeItem.eyebrow}
              </p>
              <h3 className="mt-4 text-[clamp(28px,3.2vw,44px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                {activeItem.title}
              </h3>
              <p className="mt-5 text-[14px] leading-[1.75] text-white/60">{activeItem.description}</p>
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A9CFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]"
                >
                  View full image <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              )}
            </div>

            <figure className="product-page__media-figure lg:col-span-8">
              {imageUrl && (
                <img
                  key={activeItem.id}
                  src={imageUrl}
                  alt={activeItem.alt ?? ""}
                  loading="lazy"
                  decoding="async"
                  className={`block rounded-2xl bg-white ${
                    activeItem.orientation === "portrait"
                      ? "mx-auto max-h-[760px] w-auto max-w-full"
                      : "h-auto w-full"
                  }`}
                />
              )}
              {galleryImages && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {galleryImages.map((image) => (
                    <a
                      key={image.src}
                      href={image.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View full image: ${image.alt}`}
                      className="block overflow-hidden rounded-2xl bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full rounded-2xl"
                      />
                    </a>
                  ))}
                </div>
              )}
              {activeItem.disclosure && (
                <figcaption className="mt-4 text-[10px] leading-[1.6] text-white/45">
                  {activeItem.disclosure}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductWorkflow({ config }: { config: ProductPageConfig["workflow"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = config.steps[activeIndex];
  const idPrefix = normalizeId(useId());

  return (
    <section
      id="how-it-works"
      className="product-page__workflow scroll-mt-32 border-b border-[#D9D9D9] bg-[#F5F5F5] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} />

        <div className="mt-14 border-y border-[#D9D9D9] lg:mt-16">
          <ol className="grid grid-cols-1 md:grid-cols-4">
            {config.steps.map((step, index) => {
              const selected = index === activeIndex;
              return (
                <li key={step.number} className="border-b border-[#D9D9D9] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveIndex(index)}
                    className={`product-page__workflow-step relative flex min-h-[104px] w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white ${
                      selected ? "bg-white text-[#0076CE]" : "text-[#5F5F5F]"
                    } ${focusRing}`}
                  >
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#888888]">{step.number}</span>
                    <span className="text-[14px] font-semibold">{step.title}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-0.5 bg-[#0076CE] transition-opacity ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            key={activeStep.number}
            id={`${idPrefix}-workflow-panel`}
            className="product-page__workflow-panel grid gap-5 border-t border-[#D9D9D9] bg-white px-6 py-8 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-10"
            aria-live="polite"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0076CE] lg:col-span-2">
              Step {activeStep.number}
            </p>
            <div className="lg:col-span-8">
              <h3 className="text-[24px] font-semibold tracking-[-0.025em] text-[#26364A]">{activeStep.title}</h3>
              <p className="mt-3 max-w-[720px] text-[15px] leading-[1.75] text-[#5F5F5F]">
                {activeStep.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCapabilities({ config }: { config: ProductPageConfig["capabilities"] }) {
  return (
    <section className="product-page__capabilities border-b border-[#D9D9D9] bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} />

        <ol className="mt-14 grid grid-cols-1 border-y border-[#D9D9D9] md:grid-cols-2 lg:mt-16">
          {config.items.map((item, index) => {
            const isLastItem = index === config.items.length - 1;
            const isInLastDesktopRow = index >= config.items.length - 2;

            return (
              <li
                key={item.title}
                className={`grid grid-cols-[auto_1fr] gap-5 border-b border-[#D9D9D9] py-7 md:px-7 ${
                  index % 2 === 0 ? "md:border-r" : ""
                } ${isInLastDesktopRow ? "md:border-b-0" : ""} ${isLastItem ? "border-b-0" : ""}`}
              >
                <span className="pt-1 text-[10px] font-bold tracking-[0.15em] text-[#0076CE]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#26364A]">{item.title}</h3>
                  <p className="mt-2 max-w-[480px] text-[13px] leading-[1.7] text-[#5F5F5F]">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function ProductProof({ config }: { config: ProductPageConfig["proof"] }) {
  return (
    <section
      id="proof"
      className="product-page__proof scroll-mt-32 border-b border-[#D9D9D9] bg-[#F5F5F5] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} />

        {config.logos && (
          <div id="clients" className="product-page__client-strip mt-14 scroll-mt-32 lg:mt-16">
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#5F5F5F]">
              {config.logos.label}
            </p>
            <ul className="grid grid-cols-2 border-y border-[#D9D9D9] sm:grid-cols-3 lg:grid-cols-9">
              {config.logos.items.map((logo, index) => (
                <li
                  key={logo.alt}
                  className={`flex min-h-[92px] items-center justify-center px-5 py-6 ${
                    index > 0 ? "border-l border-[#D9D9D9]" : ""
                  }`}
                >
                  <img src={logo.src} alt={logo.alt} loading="lazy" className="max-h-10 w-full object-contain grayscale" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 divide-y divide-[#D9D9D9] border-y border-[#D9D9D9] lg:mt-16">
          {config.items.map((item, index) => (
            <div key={item.title} className="product-page__proof-item grid gap-8 py-9 lg:grid-cols-12 lg:items-start lg:py-11">
              <div className={item.metrics && item.metrics.length > 0 ? "lg:col-span-5" : "lg:col-span-8"}>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0076CE]">
                  {String(index + 1).padStart(2, "0")} / {item.eyebrow}
                </p>
                <h3 className="mt-4 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#26364A]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[580px] text-[14px] leading-[1.75] text-[#5F5F5F]">{item.description}</p>
              </div>

              {item.metrics && item.metrics.length > 0 && (
                <dl className="grid grid-cols-1 border-y border-[#D9D9D9] sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
                  {item.metrics.map((metric, metricIndex) => (
                    <div
                      key={metric.label}
                      className={`flex flex-col py-5 sm:px-5 ${
                        metricIndex > 0 ? "border-t border-[#D9D9D9] sm:border-l sm:border-t-0" : ""
                      }`}
                    >
                      <dt className="order-2 mt-3 text-[11px] leading-[1.55] text-[#5F5F5F]">{metric.label}</dt>
                      <dd className="order-1 text-[clamp(30px,3.6vw,48px)] font-semibold leading-none tracking-[-0.035em] text-[#0076CE]">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>

        {config.note && <p className="mt-5 max-w-[960px] text-[10px] leading-[1.7] text-[#5F5F5F]">{config.note}</p>}
      </div>
    </section>
  );
}

function ProductFinalCTA({ config }: { config: ProductPageConfig["cta"] }) {
  return (
    <section className="product-page__cta bg-[#101820] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A9CFF]">{config.eyebrow}</p>
        <h2 className="mt-6 max-w-[930px] text-[clamp(42px,6vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
          {config.title}
        </h2>
        <p className="mt-7 max-w-[600px] text-[16px] leading-[1.75] text-white/65">{config.description}</p>
        <Link
          to={config.href}
          className="mt-9 inline-flex items-center gap-2 bg-[#0076CE] px-7 py-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]"
        >
          {config.label} <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}

export default function ProductPageTemplate({ config }: ProductPageTemplateProps) {
  useEffect(() => {
    const title = `${config.hero.productName} | Jibe`;
    const description = config.hero.description;
    const updates = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ] as const;
    const previousTitle = document.title;
    const previousContent = updates.map(([selector]) =>
      document.querySelector<HTMLMetaElement>(selector)?.content,
    );

    document.title = title;
    updates.forEach(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    });

    return () => {
      document.title = previousTitle;
      updates.forEach(([selector], index) => {
        const element = document.querySelector<HTMLMetaElement>(selector);
        if (element && previousContent[index]) element.content = previousContent[index]!;
      });
    };
  }, [config]);

  return (
    <main className={`product-page product-page--${config.slug} bg-white`}>
      <ProductHeroSection {...config.hero} />
      <ProductAnchorNav productName={config.hero.productName} />
      <ProductPathways config={config.pathways} />
      <ProductMediaTour config={config.media} />
      <ProductWorkflow config={config.workflow} />
      <ProductCapabilities config={config.capabilities} />
      <ProductProof config={config.proof} />
      <ProductFinalCTA config={config.cta} />
    </main>
  );
}
