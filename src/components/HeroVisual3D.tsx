import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../assetUrl";

const RING_R   = 195;
const RING_W   = 22;
const HALO_LW  = 10;
// Keep the same full-circle halo choreography across Pro, Retail, and AI while
// giving the ring enough time to read before it tilts into the final lockup.
const DRAW_DUR = 4.2;
const TILT_DUR = 1.6;
const TEXT_DUR = 0.9;
const HALO_RY  = 0.115;
const SETTLED  = DRAW_DUR + TILT_DUR;
const FINAL_TIME = SETTLED + TEXT_DUR + 0.08;

function easeInOut(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c < 0.5 ? 4*c*c*c : 1 - Math.pow(-2*c+2,3)/2;
}
function easeOut(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1-c, 3);
}

function drawArc(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  rx: number, ry: number,
  startA: number, endA: number, lw: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, startA, endA);
  ctx.strokeStyle = "#0076CE";
  ctx.lineWidth   = lw;
  ctx.lineCap     = "round";
  ctx.stroke();
  ctx.restore();
}

function drawHalo(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  rx: number, ry: number,
  lw: number, N = 140
) {
  ctx.lineCap    = "round";
  const brightAt = -Math.PI * 0.52;
  const visRange = Math.PI * 0.86;

  for (let i = 0; i < N; i++) {
    const a0 = (i/N)*Math.PI*2, a1 = ((i+1)/N)*Math.PI*2, am = (a0+a1)/2;
    const x0 = cx+rx*Math.cos(a0), y0 = cy+ry*Math.sin(a0);
    const x1 = cx+rx*Math.cos(a1), y1 = cy+ry*Math.sin(a1);
    const nd = ((am-brightAt+Math.PI)%(2*Math.PI))-Math.PI;
    if (Math.abs(nd) > visRange) continue;
    const alpha = Math.pow(Math.cos(nd*Math.PI/(2*visRange)), 0.45);
    if (alpha < 0.03) continue;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1);
    ctx.strokeStyle = `rgb(0,${Math.round(118+(1-alpha)*50)},206)`;
    ctx.lineWidth   = lw*(0.4+0.6*alpha);
    ctx.stroke();
    ctx.restore();
  }
}

type HeroVisual3DProps = {
  productLabel: "Pro" | "Retail" | "AI";
  reducedMotion?: boolean;
};

type NavigatorWithPerformanceHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export default function HeroVisual3D({ productLabel, reducedMotion = false }: HeroVisual3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showStaticFallback, setShowStaticFallback] = useState(reducedMotion);
  const [fallbackImageFailed, setFallbackImageFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (reducedMotion) {
      setShowStaticFallback(true);
      return;
    }

    setShowStaticFallback(false);

    const SIZE = 560;
    const performanceNavigator = navigator as NavigatorWithPerformanceHints;
    const connection = performanceNavigator.connection;
    const lowPower =
      (performanceNavigator.hardwareConcurrency ?? 8) <= 4 ||
      (performanceNavigator.deviceMemory ?? 8) <= 4 ||
      connection?.saveData === true ||
      connection?.effectiveType === "2g" ||
      window.matchMedia("(max-width: 767px)").matches;
    const renderDpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
    const cssSize = Math.min(canvas.clientWidth || SIZE, SIZE);
    const backingSize = Math.max(1, Math.round(cssSize * renderDpr));
    canvas.width = backingSize;
    canvas.height = backingSize;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) {
      setShowStaticFallback(true);
      return;
    }
    ctx.setTransform(backingSize / SIZE, 0, 0, backingSize / SIZE, 0, 0);

    const CX = SIZE / 2;
    const CY = SIZE / 2 - 40;
    const haloSegments = lowPower ? 64 : 104;
    const minimumFrameInterval = lowPower ? 1000 / 30 : 0;
    let startTime: number | null = null;
    let lastDrawTime = 0;
    let frame: number | null = null;
    let stopped = false;
    let finished = false;
    let watchdog: number | null = null;

    const stopAnimation = () => {
      stopped = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
      if (watchdog !== null) window.clearTimeout(watchdog);
      frame = null;
      watchdog = null;
    };

    const useStaticFallback = () => {
      stopAnimation();
      setShowStaticFallback(true);
    };

    const draw = (now: number) => {
      if (stopped) return;
      if (minimumFrameInterval && lastDrawTime && now - lastDrawTime < minimumFrameInterval) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = now;

      try {
        if (startTime === null) startTime = now;
        const elapsed = (now - startTime) / 1000;
        ctx.clearRect(0, 0, SIZE, SIZE);

        if (elapsed < DRAW_DUR) {
          const p   = elapsed / DRAW_DUR;
          const end = -Math.PI/2 + easeInOut(p) * Math.PI * 2;
          drawArc(ctx, CX, CY, RING_R, RING_R, -Math.PI/2, end, RING_W);

        } else {
          const tiltT = Math.min((elapsed - DRAW_DUR) / TILT_DUR, 1);
          const tiltE = easeOut(tiltT);
          const ry    = RING_R - (RING_R - RING_R * HALO_RY) * tiltE;
          const lw    = RING_W  + (HALO_LW - RING_W) * tiltE;
          const cy    = CY - 38 * tiltE;

          if (tiltE < 0.7) {
            ctx.save();
            ctx.globalAlpha = 1 - tiltE/0.7;
            drawArc(ctx, CX, cy, RING_R, ry, 0, Math.PI*2, lw);
            ctx.restore();
          }
          if (tiltE > 0.25) {
            ctx.save();
            ctx.globalAlpha = (tiltE-0.25)/0.75;
            drawHalo(ctx, CX, cy, RING_R, ry, lw, haloSegments);
            ctx.restore();
          }

          // Text after halo is settled
          if (elapsed > SETTLED) {
            const textAlpha = easeOut(Math.min((elapsed - SETTLED) / TEXT_DUR, 1));
            const appleFont = `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif`;
            ctx.font = `500 100px ${appleFont}`;
            const measured  = ctx.measureText("Jibe").width;
            const jibeWidth = RING_R * 1.8;
            const fontSize  = Math.floor(100 * jibeWidth / measured);
            const cy_s      = CY - 38;
            const haloBottom = cy_s + RING_R * HALO_RY + HALO_LW / 2;

          // Subtract the em-box top padding (~15% of em height) so cap letters
          // start right at the halo bottom rather than 15-20px below it
            const textY = haloBottom + 8;

            const textGrad = ctx.createLinearGradient(0, textY, 0, textY + fontSize);
            textGrad.addColorStop(0,    "#080808");
            textGrad.addColorStop(0.45, "#1A1A1A");
            textGrad.addColorStop(1,    "#707070");

            ctx.save();
            ctx.globalAlpha  = textAlpha;
            ctx.font         = `500 ${fontSize}px ${appleFont}`;
            ctx.textAlign    = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle    = textGrad;
            ctx.fillText("Jibe", CX, textY);
            ctx.restore();

          // Match the supplied product lockups: a compact blue product name
          // tucked into the lower-right edge of the Jibe wordmark.
            let productFontSize = Math.max(24, Math.floor(fontSize * 0.18));
            const productY = textY + fontSize * 0.86;
            const jibeRight = CX + jibeWidth / 2;

            ctx.font = `450 ${productFontSize}px ${appleFont}`;
            const initialProductWidth = ctx.measureText(productLabel).width;
            const initialProductX = jibeRight - productFontSize * 0.68;
            const productMaxWidth = SIZE - initialProductX - 18;

            if (initialProductWidth > productMaxWidth) {
              productFontSize = Math.floor(productFontSize * (productMaxWidth / initialProductWidth));
            }

            const productX = jibeRight - productFontSize * 0.68;

            ctx.save();
            ctx.globalAlpha = textAlpha;
            ctx.font = `450 ${productFontSize}px ${appleFont}`;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#0076CE";
            ctx.fillText(productLabel, productX, productY);
            ctx.restore();

          // Halo redrawn on top
            ctx.save();
            ctx.globalAlpha = textAlpha;
            drawHalo(ctx, CX, cy_s, RING_R, RING_R * HALO_RY, HALO_LW, haloSegments);
            ctx.restore();
          }
        }

        if (elapsed < FINAL_TIME) {
          frame = window.requestAnimationFrame(draw);
        } else {
          finished = true;
          frame = null;
          if (watchdog !== null) window.clearTimeout(watchdog);
          watchdog = null;
        }
      } catch {
        useStaticFallback();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        return;
      }

      if (!stopped && !finished) {
        // A backgrounded page should not resume a long intro several seconds
        // after the visitor returns. Draw its meaningful settled state instead.
        startTime = performance.now() - FINAL_TIME * 1000;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      useStaticFallback();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("contextlost", handleContextLoss);
    watchdog = window.setTimeout(useStaticFallback, (FINAL_TIME + 2) * 1000);
    frame = window.requestAnimationFrame(draw);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("contextlost", handleContextLoss);
      stopAnimation();
    };
  }, [productLabel, reducedMotion]);

  return (
    <div
      className="hero-visual-lockup relative flex w-full items-center justify-center"
      data-static-fallback={showStaticFallback ? "true" : "false"}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="hero-visual-lockup__canvas block w-full"
        style={{ width: "100%", height: "auto", maxWidth: 560, aspectRatio: "1 / 1" }}
      />
      <div className="hero-visual-lockup__static">
        <div className="hero-visual-lockup__static-inner">
          {fallbackImageFailed ? (
            <span className="hero-visual-lockup__wordmark">Jibe</span>
          ) : (
            <img
              src={assetUrl("assets/logos/jibe.png")}
              alt=""
              onError={() => setFallbackImageFailed(true)}
            />
          )}
          <span className="hero-visual-lockup__product">{productLabel}</span>
        </div>
      </div>
    </div>
  );
}
