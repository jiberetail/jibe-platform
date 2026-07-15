import { useEffect, useRef } from "react";

const RING_R   = 195;
const RING_W   = 22;
const HALO_LW  = 10;
const DRAW_DUR = 5.2;
const TILT_DUR = 1.6;
const TEXT_DUR = 0.9;
const HALO_RY  = 0.115;
const SETTLED  = DRAW_DUR + TILT_DUR;

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
  ctx.shadowColor   = "rgba(0,60,140,0.15)";
  ctx.shadowBlur    = 5;
  ctx.shadowOffsetY = 2;
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

export default function HeroVisual3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 560;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const CX = SIZE / 2;
    const CY = SIZE / 2 - 40;

    let startTime: number | null = null;
    let frame: number;

    const draw = (now: number) => {
      if (!startTime) startTime = now;
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
          drawHalo(ctx, CX, cy, RING_R, ry, lw);
          ctx.restore();
        }

        // Text after halo is settled
        if (elapsed > SETTLED) {
          const textAlpha = easeOut(Math.min((elapsed - SETTLED) / TEXT_DUR, 1));
          const appleFont = `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif`;
          ctx.font = `500 100px ${appleFont}`;
          const measured  = ctx.measureText("Jibe").width;
          const fontSize  = Math.floor(100 * RING_R * 1.8 / measured);
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

          // Halo redrawn on top
          ctx.save();
          ctx.globalAlpha = textAlpha;
          drawHalo(ctx, CX, cy_s, RING_R, RING_R * HALO_RY, HALO_LW);
          ctx.restore();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full" style={{ maxWidth: 560 }} />
    </div>
  );
}
