import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../assetUrl";

const portalProducts = [
  {
    key: "pro",
    label: "PRO",
    href: "/jibe-pro",
    ariaLabel: "Explore Jibe Pro, customer experience intelligence",
  },
  {
    key: "retail",
    label: "RETAIL",
    href: "/jibe-retail",
    ariaLabel: "Explore Jibe Retail, in-store demand intelligence",
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

const aiPixels = Array.from({ length: aiPixelRows * aiPixelColumns }, (_, index) => {
  const row = Math.floor(index / aiPixelColumns);
  const column = index % aiPixelColumns;
  const hash = (row * 29 + column * 17 + row * column * 3) % 97;
  const leadingEdge = 9.2 - column * 0.54 + Math.sin(column * 0.78) * 1.05;
  const nearEdge = row >= leadingEdge - 1.8 && hash % 4 === 0;
  const visible = row >= leadingEdge || nearEdge;
  const density = Math.min(1, Math.max(0, row / (aiPixelRows - 1) * 0.58 + column / (aiPixelColumns - 1) * 0.42));
  const accent = hash % 19 === 0 || (row > 10 && column > 8 && hash % 13 === 0);
  const medium = !accent && hash % 5 === 0;
  const scaleOptions = [0.58, 0.72, 0.86, 1];
  const size = scaleOptions[hash % scaleOptions.length];
  const opacity = accent ? 0.9 : Math.min(0.72, 0.12 + density * 0.58 + (medium ? 0.06 : 0));
  const duration = accent ? 5.2 : medium ? 5.8 : 6.4;
  const delay = -((row * 0.31 + column * 0.23 + hash * 0.013) % duration);

  return {
    index,
    row,
    column,
    visible,
    accent,
    size,
    opacity,
    peakOpacity: Math.min(1, opacity + (accent ? 0.1 : 0.12)),
    lowOpacity: Math.max(0.08, opacity * 0.84),
    color: accent ? "#0874D2" : medium ? "#4AA2DE" : "#8CC7EE",
    delay,
    duration,
    driftX: (hash % 3) - 1,
    driftY: -(1 + (hash % 3)),
    peakScale: accent ? 1.16 : medium ? 1.1 : 1.055,
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
      {aiPixels.map(({ index, row, column, accent, size, opacity, peakOpacity, lowOpacity, color, delay, duration, driftX, driftY, peakScale }) => (
        <span
          key={index}
          className={`portal-ai-pixel${accent ? " portal-ai-pixel--accent" : ""}`}
          style={
            {
              gridColumn: column + 1,
              gridRow: row + 1,
              "--pixel-size": `${Math.round(size * 100)}%`,
              "--pixel-opacity": opacity,
              "--pixel-peak-opacity": peakOpacity,
              "--pixel-low-opacity": lowOpacity,
              "--pixel-delay": `${delay}s`,
              "--pixel-duration": `${duration}s`,
              "--pixel-drift-x": `${driftX}px`,
              "--pixel-drift-y": `${driftY}px`,
              "--pixel-peak-scale": peakScale,
              background: color,
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
      <a href="#clients" className="portal-skip-link">
        Skip to clients and company information
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

      <nav className="portal-card-deck" aria-label="Choose a Jibe product">
        {portalProducts.map((product, index) => (
          <PortalCard key={product.key} product={product} index={index} />
        ))}
      </nav>
    </section>
  );
}
