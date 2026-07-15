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

const aiPixels = Array.from({ length: 168 }, (_, index) => {
  const row = Math.floor(index / 12);
  const column = index % 12;
  const strength = Math.max(0, Math.min(1, (row + column - 5) / 16));
  const accent = (row * 7 + column * 11) % 17 === 0 || (row > 10 && column > 8 && (row + column) % 3 === 0);
  return { index, strength, accent, row, column };
});

function ProWaveArt() {
  return (
    <div className="portal-pro-wave" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          style={
            {
              "--wave-index": index,
              width: `${82 + index * 6.5}%`,
              height: `${50 + index * 3.1}%`,
              left: `${-34 - index * 0.8}%`,
              bottom: `${-18 - index * 1.5}%`,
              opacity: 0.3 + index * 0.025,
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
      {aiPixels.map(({ index, strength, accent, row, column }) => (
        <span
          key={index}
          style={
            {
              opacity: strength,
              background: accent ? "#0874D6" : "#75B8EC",
              "--pixel-delay": `${(row + column) * 24}ms`,
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
