import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../assetUrl";

const portalProducts = [
  {
    key: "pro",
    label: "PRO",
    href: "/jibe-pro",
    ariaLabel: "Explore Jibe Pro, customer experience performance",
  },
  {
    key: "retail",
    label: "RETAIL",
    href: "/jibe-retail",
    ariaLabel: "Explore Jibe Retail, in-venue surveys and ecommerce",
  },
  {
    key: "ai",
    label: "AI",
    href: "/jibe-ai",
    ariaLabel: "Explore Jibe AI, interaction intelligence",
  },
] as const;

const retailBars = [24, 36, 22, 30, 48, 42, 57, 34, 66, 51, 78, 40, 91, 61, 84, 52, 96, 70];

const aiPixelRows = 15;
const aiPixelColumns = 13;
const aiSoftColors = ["#B9DCF5", "#A9D2F0", "#95C8EC"];
const aiBrightColors = ["#59AFE6", "#3C9CDD", "#278CD5"];
const aiDeepColors = ["#0874D2", "#0A67BA", "#0B5CA6"];

const aiPixels = Array.from({ length: aiPixelRows * aiPixelColumns }, (_, index) => {
  const row = Math.floor(index / aiPixelColumns);
  const column = index % aiPixelColumns;
  const hash = (row * 29 + column * 17 + row * column * 3) % 97;
  const leadingEdge = 9.2 - column * 0.54 + Math.sin(column * 0.78) * 1.05;
  const nearEdge = row >= leadingEdge - 1.8 && hash % 4 === 0;
  const visible = row >= leadingEdge || nearEdge;
  const density = Math.min(1, Math.max(0, row / (aiPixelRows - 1) * 0.58 + column / (aiPixelColumns - 1) * 0.42));
  const tone = hash % 3;
  const opacity = Math.min(0.78, 0.24 + density * 0.5);
  const peakOpacity = Math.min(0.96, opacity + 0.18);
  const duration = 6.7 + (column % 3) * 0.35;
  const delay = -((column * 0.49 + row * 0.18 + (hash % 5) * 0.025) % duration);
  const fallDistance = 30 + (hash % 5) * 8;

  return {
    index,
    row,
    column,
    visible,
    opacity,
    entryOpacity: opacity * 0.58,
    peakOpacity,
    delay,
    duration,
    fallStart: -fallDistance,
    fallMid: -Math.round(fallDistance * 0.46),
    colorSoft: aiSoftColors[tone],
    colorBright: aiBrightColors[tone],
    colorDeep: aiDeepColors[tone],
  };
}).filter((pixel) => pixel.visible);

function ProWaveArt() {
  return (
    <div className="portal-pro-wave" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          style={
            {
              "--wave-opacity": 0.3 + index * 0.025,
              "--wave-peak-opacity": 0.5 + index * 0.027,
              "--wave-enter-delay": `${430 + index * 34}ms`,
              "--wave-loop-delay": `${1450 + index * 72}ms`,
              width: `${82 + index * 6.5}%`,
              height: `${50 + index * 3.1}%`,
              left: `${-34 - index * 0.8}%`,
              bottom: `${-18 - index * 1.5}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function RetailSignalArt() {
  return (
    <div className="portal-retail-signal" aria-hidden="true">
      {retailBars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="portal-retail-bar"
          style={
            {
              "--bar-height": `${height}%`,
              "--bar-delay": `${index * 45}ms`,
              "--bar-loop-delay": `${1250 + index * 76}ms`,
              left: `${4 + index * 5.35}%`,
              height: `${height}%`,
              opacity: 0.18 + (index % 5) * 0.07,
            } as CSSProperties
          }
        >
          {[4, 7, 10, 13, 16].includes(index) && <i />}
        </span>
      ))}
    </div>
  );
}

function AiPixelArt() {
  return (
    <div className="portal-ai-pixels" aria-hidden="true">
      {aiPixels.map(({ index, row, column, opacity, entryOpacity, peakOpacity, delay, duration, fallStart, fallMid, colorSoft, colorBright, colorDeep }) => (
        <span
          key={index}
          className="portal-ai-pixel"
          style={
            {
              gridColumn: column + 1,
              gridRow: row + 1,
              "--pixel-opacity": opacity,
              "--pixel-entry-opacity": entryOpacity,
              "--pixel-peak-opacity": peakOpacity,
              "--pixel-delay": `${delay}s`,
              "--pixel-duration": `${duration}s`,
              "--pixel-fall-start": `${fallStart}px`,
              "--pixel-fall-mid": `${fallMid}px`,
              "--pixel-color-soft": colorSoft,
              "--pixel-color-bright": colorBright,
              "--pixel-color-deep": colorDeep,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function PortalCard({
  product,
  index,
}: {
  product: (typeof portalProducts)[number];
  index: number;
}) {
  return (
    <div
      className="portal-card-shell"
      style={{ "--card-delay": `${340 + index * 110}ms` } as CSSProperties}
    >
      <Link
        to={product.href}
        className={`portal-product-card portal-product-card--${product.key}`}
        aria-label={product.ariaLabel}
      >
        <span className="portal-card-kicker">JIBE</span>
        <h2 className="portal-card-name">{product.label}</h2>
        <span className="portal-card-explore">
          Explore <ArrowUpRight size={16} aria-hidden="true" />
        </span>
        {product.key === "pro" && <ProWaveArt />}
        {product.key === "retail" && <RetailSignalArt />}
        {product.key === "ai" && <AiPixelArt />}
      </Link>
    </div>
  );
}

export default function PortalHero() {
  return (
    <section id="portal-hero" className="portal-hero" aria-labelledby="portal-heading">
      <a href="#product-choices" className="portal-skip-link">
        Skip to product choices
      </a>

      <div className="portal-blueprint" aria-hidden="true">
        <span className="portal-rule portal-rule--main" />
        <span className="portal-rule portal-rule--top" />
        <span className="portal-rule portal-rule--middle" />
        <span className="portal-rule portal-rule--lower" />
        <span className="portal-rule portal-rule--bottom" />
        <span className="portal-rule portal-rule--short-vertical" />
        <span className="portal-arc" />
      </div>

      <img
        src={assetUrl("assets/logos/jibe.png")}
        alt="Jibe"
        className="portal-brand"
      />

      <div className="portal-copy">
        <h1 id="portal-heading" className="portal-heading" aria-label="Choose your Platform.">
          <span className="portal-heading-mask">
            <span className="portal-heading-line portal-heading-line--one">
              Choose your
            </span>
          </span>
          <span className="portal-heading-mask">
            <span className="portal-heading-line portal-heading-line--two">
              Platform.
            </span>
          </span>
        </h1>

        <nav className="portal-product-index" aria-label="Jibe products">
          {portalProducts.map((product, index) => (
            <span key={product.key} className="portal-product-index-item">
              {index > 0 && <span aria-hidden="true">•</span>}
              <Link to={product.href}>{product.label}</Link>
            </span>
          ))}
        </nav>
      </div>

      <nav id="product-choices" className="portal-card-deck" aria-label="Choose a Jibe product" tabIndex={-1}>
        {portalProducts.map((product, index) => (
          <PortalCard key={product.key} product={product} index={index} />
        ))}
      </nav>
    </section>
  );
}
