import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Maximize2,
  MousePointerClick,
} from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../../assetUrl";
import ProductHeroSection from "../ProductHeroSection";
import type {
  ProductPageConfig,
  ProductMediaItem,
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

function InteractionPrompt({
  id,
  title,
  description,
  dark = false,
}: {
  id?: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div
      id={id}
      className="flex items-center px-1 py-1"
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            dark ? "bg-[#0076CE] text-white" : "bg-white text-[#0076CE] shadow-[0_2px_8px_rgba(24,24,24,0.08)]"
          }`}
        >
          <MousePointerClick aria-hidden="true" size={17} />
        </span>
        <span>
          <span className={`block text-[12px] font-semibold ${dark ? "text-white" : "text-[#26364A]"}`}>{title}</span>
          <span className={`mt-0.5 block text-[11px] ${dark ? "text-white/55" : "text-[#5F5F5F]"}`}>{description}</span>
        </span>
      </div>
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
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 overflow-x-auto px-6 py-3 lg:px-10">
        <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#777777]">On this page</span>
        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-[#D9D9D9]" />
        <div className="flex gap-2">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`flex min-h-10 shrink-0 items-center rounded-full border border-[#D9D9D9] bg-white px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5F5F5F] transition-colors hover:border-[#0076CE] hover:bg-[#F5F5F5] hover:text-[#0076CE] ${focusRing}`}
            >
              {label}
            </a>
          ))}
        </div>
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

        <div className="mt-14 lg:mt-16">
          <InteractionPrompt
            id={`${idPrefix}-pathway-instructions`}
            title="Choose what to explore"
            description="Select a focus area to change the story below."
          />
          <div
            role="tablist"
            aria-label={config.eyebrow}
            aria-describedby={`${idPrefix}-pathway-instructions`}
            className={`product-page__pathway-tabs mt-3 grid grid-cols-1 gap-2 rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-2 ${
              config.items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
            }`}
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
                  className={`group relative flex min-h-[76px] cursor-pointer touch-manipulation items-center rounded-xl border px-5 py-4 text-left text-[13px] font-semibold transition-all sm:px-6 ${
                    selected
                      ? "border-[#0076CE] bg-[#0076CE] text-white shadow-[0_8px_22px_rgba(0,118,206,0.2)]"
                      : "border-[#D9D9D9] bg-white text-[#26364A] hover:-translate-y-0.5 hover:border-[#0076CE] hover:text-[#0076CE] hover:shadow-[0_8px_20px_rgba(24,24,24,0.08)]"
                  } ${focusRing}`}
                >
                  <span>{item.label}</span>
                  <span className={`ml-auto flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] ${selected ? "text-white/75" : "text-[#777777] group-hover:text-[#0076CE]"}`}>
                    {selected ? "Selected" : "Explore"}
                    <ChevronRight aria-hidden="true" size={13} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white px-6 sm:px-8 lg:px-10">
            <PathwayPanel key={activePathway.id} pathway={activePathway} idPrefix={idPrefix} />
          </div>
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
            id={`${idPrefix}-media-instructions`}
            className="flex flex-wrap items-center justify-between gap-3 px-1 py-1"
          >
            <div className="flex items-center gap-2.5 text-[12px] text-white/55">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0076CE] text-white">
                <MousePointerClick aria-hidden="true" size={15} />
              </span>
              <span>
                <strong className="font-semibold text-white">Choose a product view</strong>
                <span className="ml-2">— the preview updates directly below.</span>
              </span>
            </div>
          </div>

          <div
            role="tablist"
            aria-label={config.eyebrow}
            aria-describedby={`${idPrefix}-media-instructions`}
            className="product-page__media-tabs mt-3 rounded-2xl border border-white/15 bg-white/[0.04] p-2"
          >
            {config.items.map((item, index) => {
              const selected = index === activeIndex;
              const thumbnailUrl = item.src
                ? assetUrl(item.src)
                : item.images?.[0]
                  ? assetUrl(item.images[0].src)
                  : null;
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
                  className="product-page__media-tab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]"
                >
                  <span className="product-page__media-tab-thumb" aria-hidden="true">
                    {thumbnailUrl && (
                      <img src={thumbnailUrl} alt="" loading="lazy" decoding="async" />
                    )}
                  </span>
                  <span className="product-page__media-tab-copy">
                    <span className="product-page__media-tab-label">{item.label}</span>
                    <span className="product-page__media-tab-status">
                      {selected ? "Viewing now" : "View screen"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`${idPrefix}-media-panel`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-media-tab-${activeItem.id}`}
            tabIndex={0}
            className="product-page__media-panel pt-3 pb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101820]"
          >
            <div className="product-page__media-summary">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A9CFF]">
                  {activeItem.eyebrow}
                </p>
                <h3 className="mt-3 max-w-[720px] text-[clamp(27px,3vw,42px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                  {activeItem.title}
                </h3>
                <p className="mt-4 max-w-[720px] text-[14px] leading-[1.75] text-white/60">
                  {activeItem.description}
                </p>
              </div>
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="product-page__media-fullscreen"
                >
                  View full screen <Maximize2 aria-hidden="true" size={15} />
                </a>
              )}
            </div>

            <figure className="product-page__media-figure">
              <ProductMediaStage
                key={activeItem.id}
                item={activeItem}
                imageUrl={imageUrl}
                galleryImages={galleryImages}
              />
              {activeItem.disclosure && (
                <figcaption className="mt-4 text-[11px] leading-[1.65] text-white/60">
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

function ProductMediaGallery({ config }: { config: ProductPageConfig["media"] }) {
  const screenItems = config.items.filter((item) => item.src);
  const deploymentItem = config.items.find((item) => item.images && item.images.length > 0);

  return (
    <section
      id="product"
      className="product-page__media scroll-mt-32 border-b border-white/10 bg-[#101820] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} dark />

        <div className="retail-media-screen-grid mt-14 lg:mt-16">
          {screenItems.map((item) => {
            const imageUrl = assetUrl(item.src!);
            return (
              <article key={item.id} className="retail-media-screen-item">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size product view: ${item.alt ?? item.label}`}
                  className={`retail-media-screen-link retail-media-screen-link--${item.id} group`}
                >
                  <img src={imageUrl} alt={item.alt ?? ""} loading="lazy" decoding="async" />
                  <span className="product-page__media-shot-action">
                    Open full size <Maximize2 aria-hidden="true" size={14} />
                  </span>
                </a>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A9CFF]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 text-[22px] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[13px] leading-[1.7] text-white/58">{item.description}</p>
                  {item.disclosure && (
                    <p className="mt-4 text-[10px] leading-[1.6] text-white/38">{item.disclosure}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {deploymentItem?.images && (
          <div className="retail-media-deployments mt-20 border-t border-white/15 pt-12 lg:mt-24 lg:pt-16">
            <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A9CFF]">
                  {deploymentItem.eyebrow}
                </p>
                <h3 className="mt-3 max-w-[700px] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                  {deploymentItem.title}
                </h3>
              </div>
              <p className="max-w-[520px] text-[14px] leading-[1.75] text-white/60 lg:col-span-4 lg:col-start-9">
                {deploymentItem.description}
              </p>
            </div>

            <div className="retail-media-deployments-grid mt-10">
              {deploymentItem.images.map((image) => {
                const imageUrl = assetUrl(image.src);
                return (
                  <a
                    key={image.src}
                    href={imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open full-size product view: ${image.alt}`}
                    className="product-page__media-gallery-link group"
                  >
                    <img src={imageUrl} alt={image.alt} loading="lazy" decoding="async" />
                    {image.label && <span className="product-page__media-gallery-label">{image.label}</span>}
                    <span className="product-page__media-shot-action">
                      Open <Maximize2 aria-hidden="true" size={13} />
                    </span>
                  </a>
                );
              })}
            </div>

            {deploymentItem.disclosure && (
              <p className="mt-5 text-[11px] leading-[1.65] text-white/50">{deploymentItem.disclosure}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductMediaStage({
  item,
  imageUrl,
  galleryImages,
}: {
  item: ProductMediaItem;
  imageUrl: string | null;
  galleryImages?: readonly { src: string; alt: string; label?: string; url: string }[];
}) {
  const portrait = item.orientation === "portrait";
  const tall = item.orientation === "tall";

  return (
    <div className="product-page__media-stage-shell">
      <div className={`product-page__media-stage ${portrait ? "product-page__media-stage--portrait" : tall ? "product-page__media-stage--tall" : "product-page__media-stage--landscape"}`}>
        <div className={`product-page__media-stage-canvas ${portrait ? "product-page__media-stage-canvas--portrait" : tall ? "product-page__media-stage-canvas--tall" : "product-page__media-stage-canvas--landscape"}`}>
          {imageUrl && (
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full-size product view: ${item.alt ?? item.label}`}
              className={`product-page__media-shot-link product-page__media-shot-link--${item.id} group ${
                ["team", "finder"].includes(item.id) ? "product-page__media-shot-link--trim-bottom" : ""
              }`}
            >
              <img
                src={imageUrl}
                alt={item.alt ?? ""}
                loading="lazy"
                decoding="async"
                className={`product-page__media-shot product-page__media-shot--${item.id} ${portrait ? "product-page__media-shot--portrait" : tall ? "product-page__media-shot--tall" : "product-page__media-shot--landscape"}`}
              />
            </a>
          )}

          {galleryImages && (
            <div className="product-page__media-gallery">
              {galleryImages.map((image) => (
                <a
                  key={image.src}
                  href={image.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size product view: ${image.alt}`}
                  className="product-page__media-gallery-link group"
                >
                  <img src={image.url} alt={image.alt} loading="lazy" decoding="async" />
                  {image.label && <span className="product-page__media-gallery-label">{image.label}</span>}
                  <span className="product-page__media-shot-action">
                    Open <Maximize2 aria-hidden="true" size={13} />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductWorkflow({ config }: { config: ProductPageConfig["workflow"] }) {
  return config.layout === "paired" ? (
    <ProductPairedWorkflow config={config} />
  ) : (
    <ProductSequentialWorkflow config={config} />
  );
}

function ProductSequentialWorkflow({ config }: { config: ProductPageConfig["workflow"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeStep = config.steps[activeIndex];
  const idPrefix = normalizeId(useId());

  return (
    <section
      id="how-it-works"
      className="product-page__workflow scroll-mt-32 border-b border-[#D9D9D9] bg-[#F5F5F5] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} />

        <div className="mt-14 lg:mt-16">
          <InteractionPrompt
            id={`${idPrefix}-workflow-instructions`}
            title="Choose a step"
            description="Select any stage to see what happens there."
          />
          <ol
            role="tablist"
            aria-label={config.eyebrow}
            aria-describedby={`${idPrefix}-workflow-instructions`}
            className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-[#D9D9D9] bg-white p-2 md:grid-cols-4"
          >
            {config.steps.map((step, index) => {
              const selected = index === activeIndex;
              return (
                <li key={step.number} role="presentation">
                  <button
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`${idPrefix}-workflow-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${idPrefix}-workflow-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) =>
                      focusAndSelectTab(event, index, config.steps.length, tabRefs, setActiveIndex)
                    }
                    className={`product-page__workflow-step group relative flex min-h-[96px] w-full cursor-pointer touch-manipulation items-center gap-4 rounded-xl border px-5 py-5 text-left transition-all ${
                      selected
                        ? "border-[#0076CE] bg-[#0076CE] text-white shadow-[0_8px_22px_rgba(0,118,206,0.2)]"
                        : "border-[#D9D9D9] bg-[#F7F7F7] text-[#26364A] hover:-translate-y-0.5 hover:border-[#0076CE] hover:bg-white hover:text-[#0076CE] hover:shadow-[0_8px_20px_rgba(24,24,24,0.08)]"
                    } ${focusRing}`}
                  >
                    <span className="text-[14px] font-semibold">{step.label ?? step.title}</span>
                    <ChevronRight aria-hidden="true" size={15} className={`ml-auto ${selected ? "text-white/75" : "text-[#888888] group-hover:text-[#0076CE]"}`} />
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            key={activeStep.number}
            id={`${idPrefix}-workflow-panel`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-workflow-tab-${activeIndex}`}
            tabIndex={0}
            className="product-page__workflow-panel mt-3 grid gap-5 rounded-2xl border border-[#D9D9D9] bg-white px-6 py-8 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-10"
            aria-live="polite"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0076CE] lg:col-span-2">
              Process
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

function ProductPairedWorkflow({ config }: { config: ProductPageConfig["workflow"] }) {
  const pairs = [config.steps.slice(0, 2), config.steps.slice(2, 4)];

  return (
    <section
      id="how-it-works"
      className="product-page__workflow scroll-mt-32 border-b border-[#D9D9D9] bg-[#F5F5F5] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <SectionIntro eyebrow={config.eyebrow} title={config.title} description={config.description} />

        <ol className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2">
          {pairs.map((pair) => {
            const capability = pair[0];
            const outcome = pair[1];
            if (!capability || !outcome) return null;

            return (
              <li
                key={`${capability.number}-${outcome.number}`}
                className="border-y border-[#D9D9D9] bg-white px-6 py-8 sm:px-8 lg:px-10 lg:py-10"
              >
                <div className="grid gap-7 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0076CE]">
                      Capability
                    </p>
                    <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0076CE]">
                      {capability.label ?? capability.title}
                    </p>
                    <h3 className="mt-2 text-[26px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#26364A]">
                      {capability.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[#5F5F5F]">{capability.description}</p>
                  </div>

                  <ArrowRight aria-hidden="true" size={20} className="hidden text-[#0076CE] sm:block" />

                  <div className="border-t border-[#D9D9D9] pt-7 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#777777]">Outcome</p>
                    <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0076CE]">
                      {outcome.label ?? outcome.title}
                    </p>
                    <h3 className="mt-2 text-[26px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#26364A]">
                      {outcome.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[#5F5F5F]">{outcome.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
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
                className={`border-b border-[#D9D9D9] py-7 md:px-7 ${
                  index % 2 === 0 ? "md:border-r" : ""
                } ${isInLastDesktopRow ? "md:border-b-0" : ""} ${isLastItem ? "border-b-0" : ""}`}
              >
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

        <div className="mt-14 divide-y divide-[#D9D9D9] border-y border-[#D9D9D9] lg:mt-16">
          {config.items.map((item) => (
            <div key={item.title} className="product-page__proof-item grid gap-8 py-9 lg:grid-cols-12 lg:items-start lg:py-11">
              <div className={item.metrics && item.metrics.length > 0 ? "lg:col-span-5" : "lg:col-span-8"}>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0076CE]">
                  {item.eyebrow}
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
      {config.media.layout === "gallery" ? (
        <ProductMediaGallery config={config.media} />
      ) : (
        <ProductMediaTour config={config.media} />
      )}
      <ProductWorkflow config={config.workflow} />
      <ProductCapabilities config={config.capabilities} />
      <ProductProof config={config.proof} />
      <ProductFinalCTA config={config.cta} />
    </main>
  );
}
