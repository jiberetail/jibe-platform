import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { Link, useNavigate } from "react-router";
import { assetUrl } from "../assetUrl";

const portalProducts = [
  {
    key: "pro",
    label: "PRO",
    name: "Jibe Pro",
    href: "/jibe-pro",
    description: "Agent predictions improving behavior and analytics.",
    ariaLabel: "Jibe Pro — agent predictions improving behavior and analytics",
  },
  {
    key: "retail",
    label: "RETAIL",
    name: "Jibe Retail",
    href: "/jibe-retail",
    description: "In-venue surveys and ecommerce that recover sales and reveal demand.",
    ariaLabel: "Jibe Retail — in-venue surveys and ecommerce that recover sales and reveal demand",
  },
  {
    key: "ai",
    label: "AI",
    name: "Jibe AI",
    href: "/jibe-ai",
    description: "Autonomous, AI-driven analysis turning every customer interaction into action.",
    ariaLabel: "Jibe AI — autonomous AI-driven analysis turning every customer interaction into action",
  },
] as const;

type PortalProduct = (typeof portalProducts)[number];
type PortalProductKey = PortalProduct["key"];
type NavigatorWithPortalHints = Navigator & {
  deviceMemory?: number;
  connection?: EventTarget & {
    saveData?: boolean;
    effectiveType?: string;
  };
};

const productRouteLoaders: Record<PortalProductKey, () => Promise<unknown>> = {
  pro: () => import("../pages/JibeProPage"),
  retail: () => import("../pages/JibeRetailPage"),
  ai: () => import("../pages/JibeAIPage"),
};

const routePreloads = new Map<PortalProductKey, Promise<unknown>>();

function preloadProductRoute(key: PortalProductKey) {
  const cached = routePreloads.get(key);
  if (cached) return cached;

  const request = productRouteLoaders[key]().catch((error) => {
    routePreloads.delete(key);
    throw error;
  });
  routePreloads.set(key, request);
  return request;
}

function isPlainLeftClick(event: ReactMouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function productDocumentUrl(href: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${href}` || href;
}

function shouldUseEfficientPortalMotion() {
  const performanceNavigator = navigator as NavigatorWithPortalHints;
  return (
    (performanceNavigator.hardwareConcurrency ?? 8) <= 4 ||
    (performanceNavigator.deviceMemory ?? 8) <= 4 ||
    performanceNavigator.connection?.saveData === true ||
    performanceNavigator.connection?.effectiveType === "2g" ||
    window.matchMedia("(update: slow)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

const retailBars = [24, 36, 22, 30, 48, 42, 57, 34, 66, 51, 78, 40, 91, 61, 84, 52, 96, 70];

const aiPixelRows = 15;
const aiPixelColumns = 13;
const aiSoftColors = ["#B8C9FF", "#A4BAF7", "#91ACF0"];
const aiBrightColors = ["#5F8FEA", "#477DDD", "#326DCE"];
const aiDeepColors = ["#145CB8", "#164E9D", "#173F82"];

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
  isOpening,
  onPreload,
  onSelect,
}: {
  product: PortalProduct;
  index: number;
  isOpening: boolean;
  onPreload: (product: PortalProduct) => void;
  onSelect: (product: PortalProduct, event: ReactMouseEvent<HTMLAnchorElement>) => void;
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
        aria-busy={isOpening || undefined}
        data-transition-state={isOpening ? "opening" : "idle"}
        onClick={(event) => onSelect(product, event)}
        onFocus={() => onPreload(product)}
        onPointerEnter={() => onPreload(product)}
        onTouchStart={() => onPreload(product)}
      >
        <span className="portal-card-kicker">JIBE</span>
        <h2 className="portal-card-name">{product.label}</h2>
        <span className="portal-card-description">{product.description}</span>
        <span className="portal-card-opening" aria-hidden={!isOpening}>
          <i aria-hidden="true" /> Opening {product.name}
        </span>
        {product.key === "pro" && <ProWaveArt />}
        {product.key === "retail" && <RetailSignalArt />}
        {product.key === "ai" && <AiPixelArt />}
      </Link>
    </div>
  );
}

export default function PortalHero() {
  const navigate = useNavigate();
  const [openingProduct, setOpeningProduct] = useState<PortalProductKey | null>(null);
  const [brandFailed, setBrandFailed] = useState(false);
  const [efficientMotion, setEfficientMotion] = useState(shouldUseEfficientPortalMotion);
  const transitionIdRef = useRef(0);
  const firstFrameRef = useRef<number | null>(null);
  const secondFrameRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  const clearScheduledNavigation = useCallback(() => {
    if (firstFrameRef.current !== null) window.cancelAnimationFrame(firstFrameRef.current);
    if (secondFrameRef.current !== null) window.cancelAnimationFrame(secondFrameRef.current);
    if (fallbackTimerRef.current !== null) window.clearTimeout(fallbackTimerRef.current);
    firstFrameRef.current = null;
    secondFrameRef.current = null;
    fallbackTimerRef.current = null;
  }, []);

  const resetTransition = useCallback(() => {
    transitionIdRef.current += 1;
    clearScheduledNavigation();
    setOpeningProduct(null);
  }, [clearScheduledNavigation]);

  useEffect(() => {
    // A page restored from the browser's back-forward cache must never retain
    // the previous card's busy state.
    window.addEventListener("pageshow", resetTransition);
    window.addEventListener("popstate", resetTransition);
    return () => {
      window.removeEventListener("pageshow", resetTransition);
      window.removeEventListener("popstate", resetTransition);
      transitionIdRef.current += 1;
      clearScheduledNavigation();
    };
  }, [clearScheduledNavigation, resetTransition]);

  useEffect(() => {
    const slowUpdateQuery = window.matchMedia("(update: slow)");
    const narrowViewportQuery = window.matchMedia("(max-width: 767px)");
    const connection = (navigator as NavigatorWithPortalHints).connection;
    const updateProfile = () => setEfficientMotion(shouldUseEfficientPortalMotion());

    slowUpdateQuery.addEventListener("change", updateProfile);
    narrowViewportQuery.addEventListener("change", updateProfile);
    connection?.addEventListener("change", updateProfile);
    return () => {
      slowUpdateQuery.removeEventListener("change", updateProfile);
      narrowViewportQuery.removeEventListener("change", updateProfile);
      connection?.removeEventListener("change", updateProfile);
    };
  }, []);

  const handlePreload = useCallback((product: PortalProduct) => {
    void preloadProductRoute(product.key).catch(() => undefined);
  }, []);

  const handleSelect = useCallback(
    (product: PortalProduct, event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (!isPlainLeftClick(event)) return;
      event.preventDefault();

      clearScheduledNavigation();
      const transitionId = transitionIdRef.current + 1;
      transitionIdRef.current = transitionId;
      setOpeningProduct(product.key);

      const routeRequest = preloadProductRoute(product.key);
      let routeReady = false;
      let feedbackPainted = false;

      const finishNavigation = () => {
        if (transitionIdRef.current !== transitionId) return;
        clearScheduledNavigation();
        navigate(product.href);
      };

      routeRequest
        .then(() => {
          routeReady = true;
          // Navigation waits for the opening state to receive a paint. When
          // the route chunk is already cached, the feedback is still immediate.
          if (feedbackPainted) finishNavigation();
        })
        .catch(() => {
          if (
            transitionIdRef.current === transitionId ||
            window.location.pathname.endsWith(product.href)
          ) {
            // A full document request gives a transient chunk failure one clean
            // retry instead of leaving the visitor in a broken SPA state.
            window.location.assign(productDocumentUrl(product.href));
          }
        });

      firstFrameRef.current = window.requestAnimationFrame(() => {
        firstFrameRef.current = null;
        secondFrameRef.current = window.requestAnimationFrame(() => {
          secondFrameRef.current = null;
          feedbackPainted = true;
          if (routeReady) {
            finishNavigation();
            return;
          }

          // On a throttled connection, keep the visible selection feedback for
          // a short beat, then hand off to the shared route loading state.
          fallbackTimerRef.current = window.setTimeout(finishNavigation, 900);
        });
      });
    },
    [clearScheduledNavigation, navigate],
  );

  return (
    <section
      id="portal-hero"
      className="portal-hero"
      aria-labelledby="portal-heading"
      aria-busy={openingProduct !== null || undefined}
      data-motion-profile={efficientMotion ? "efficient" : "full"}
    >
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

      {brandFailed ? (
        <span className="portal-brand portal-brand--fallback" role="img" aria-label="Jibe">
          Jibe
        </span>
      ) : (
        <img
          src={assetUrl("assets/logos/jibe.png")}
          alt="Jibe"
          className="portal-brand"
          onError={() => setBrandFailed(true)}
        />
      )}

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
              <Link
                to={product.href}
                aria-busy={openingProduct === product.key || undefined}
                onClick={(event) => handleSelect(product, event)}
                onFocus={() => handlePreload(product)}
                onPointerEnter={() => handlePreload(product)}
              >
                {product.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>

      <nav id="product-choices" className="portal-card-deck" aria-label="Choose a Jibe product" tabIndex={-1}>
        {portalProducts.map((product, index) => (
          <PortalCard
            key={product.key}
            product={product}
            index={index}
            isOpening={openingProduct === product.key}
            onPreload={handlePreload}
            onSelect={handleSelect}
          />
        ))}
      </nav>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {openingProduct
          ? `Opening ${portalProducts.find((product) => product.key === openingProduct)?.name}.`
          : ""}
      </p>
    </section>
  );
}
