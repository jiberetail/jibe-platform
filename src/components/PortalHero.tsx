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

type AiNetworkNode = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  core?: boolean;
};

const aiNetworkNodes: readonly AiNetworkNode[] = [
  { x: 13, y: 42, size: 2.7, opacity: 0.44 },
  { x: 20, y: 65, size: 2.1, opacity: 0.5 },
  { x: 29, y: 30, size: 2.35, opacity: 0.58 },
  { x: 33, y: 78, size: 2.55, opacity: 0.52 },
  { x: 40, y: 50, size: 3.2, opacity: 0.68 },
  { x: 51, y: 25, size: 2.2, opacity: 0.56 },
  { x: 58, y: 54, size: 10, opacity: 1, core: true },
  { x: 51, y: 80, size: 2.75, opacity: 0.62 },
  { x: 69, y: 28, size: 2.45, opacity: 0.6 },
  { x: 72, y: 71, size: 3.15, opacity: 0.7 },
  { x: 81, y: 43, size: 2.75, opacity: 0.66 },
  { x: 87, y: 62, size: 2.1, opacity: 0.53 },
  { x: 92, y: 29, size: 2.35, opacity: 0.48 },
  { x: 94, y: 78, size: 2.45, opacity: 0.46 },
  { x: 45, y: 66, size: 2.15, opacity: 0.58 },
];

const aiNetworkLinks = [
  [0, 2], [0, 4], [1, 3], [1, 4], [2, 4], [2, 5], [3, 7], [3, 14],
  [4, 6], [4, 14], [5, 6], [5, 8], [14, 6], [14, 7], [6, 8], [6, 9],
  [6, 10], [7, 9], [8, 10], [8, 12], [9, 10], [9, 11], [9, 13], [10, 11],
  [10, 12], [11, 13],
] as const;

const aiNetworkSegments = aiNetworkLinks.map(([from, to], index) => {
  const start = aiNetworkNodes[from];
  const end = aiNetworkNodes[to];
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  return {
    index,
    x: start.x,
    y: start.y,
    length: Math.hypot(deltaX, deltaY),
    angle: Math.atan2(deltaY, deltaX) * (180 / Math.PI),
    strong: from === 6 || to === 6,
  };
});

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

function AiNetworkArt() {
  return (
    <div className="portal-ai-network" aria-hidden="true">
      <div className="portal-ai-network__field">
        {aiNetworkSegments.map(({ index, x, y, length, angle, strong }) => (
          <span
            key={`link-${index}`}
            className={`portal-ai-network__link${strong ? " portal-ai-network__link--strong" : ""}`}
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                width: `${length}%`,
                transform: `rotate(${angle}deg)`,
                "--link-delay": `${-0.24 * index}s`,
              } as CSSProperties
            }
          />
        ))}

        <span className="portal-ai-network__halo portal-ai-network__halo--outer" />
        <span className="portal-ai-network__halo portal-ai-network__halo--inner" />

        {aiNetworkNodes.map(({ x, y, size, opacity, core }, index) => {
          if (core) return null;

          return (
            <span
              key={`node-${index}`}
              className="portal-ai-network__node"
              style={
                {
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}%`,
                  "--node-opacity": opacity,
                  "--node-delay": `${-0.38 * index}s`,
                } as CSSProperties
              }
            />
          );
        })}

        <span
          className="portal-ai-network__core"
          style={{ left: "58%", top: "54%" }}
        >
          <i className="portal-ai-network__core-mark" />
        </span>
      </div>
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
        {product.key === "ai" && <AiNetworkArt />}
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
