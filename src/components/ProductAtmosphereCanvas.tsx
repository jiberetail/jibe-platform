import { useEffect, useRef } from "react";

type ProductAtmosphereCanvasProps = {
  mode: "Pro" | "AI";
  reducedMotion: boolean;
};

type Point = {
  x: number;
  y: number;
};

const BLUE = "0, 118, 206";
const GRAPHITE = "38, 54, 74";

function rgba(color: string, alpha: number) {
  return `rgba(${color}, ${Math.max(0, Math.min(1, alpha))})`;
}

function cubicPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const inverse = 1 - t;
  return {
    x:
      inverse ** 3 * p0.x +
      3 * inverse ** 2 * t * p1.x +
      3 * inverse * t ** 2 * p2.x +
      t ** 3 * p3.x,
    y:
      inverse ** 3 * p0.y +
      3 * inverse ** 2 * t * p1.y +
      3 * inverse * t ** 2 * p2.y +
      t ** 3 * p3.y,
  };
}

function traceCurve(
  context: CanvasRenderingContext2D,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
) {
  context.beginPath();
  context.moveTo(p0.x, p0.y);
  context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  context.stroke();
}

function drawAiGlyph(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  type: number,
  alpha: number,
) {
  context.save();
  context.translate(x, y);
  context.lineWidth = 1;
  context.strokeStyle = rgba(BLUE, alpha);
  context.fillStyle = rgba(BLUE, alpha * 0.9);

  if (type === 0) {
    context.strokeRect(-size / 2, -size / 2, size, size);
    context.fillRect(-1.5, -1.5, 3, 3);
  } else if (type === 1) {
    const offset = size * 0.42;
    context.beginPath();
    context.moveTo(-offset, offset);
    context.lineTo(0, -offset);
    context.lineTo(offset, offset);
    context.stroke();
    [-offset, 0, offset].forEach((nodeX, index) => {
      const nodeY = index === 1 ? -offset : offset;
      context.beginPath();
      context.arc(nodeX, nodeY, 2, 0, Math.PI * 2);
      context.fill();
    });
  } else if (type === 2) {
    const cell = Math.max(2.5, size * 0.24);
    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 2; column += 1) {
        context.fillRect(
          (column - 0.5) * (cell + 2) - cell / 2,
          (row - 0.5) * (cell + 2) - cell / 2,
          cell,
          cell,
        );
      }
    }
  } else if (type === 3) {
    const half = size * 0.38;
    context.strokeRect(-half, -half, half * 2, half * 2);
    [-0.5, 0.5].forEach((position) => {
      context.beginPath();
      context.moveTo(position * half, -half - 3);
      context.lineTo(position * half, -half);
      context.moveTo(position * half, half);
      context.lineTo(position * half, half + 3);
      context.moveTo(-half - 3, position * half);
      context.lineTo(-half, position * half);
      context.moveTo(half, position * half);
      context.lineTo(half + 3, position * half);
      context.stroke();
    });
  } else {
    context.beginPath();
    context.moveTo(-size * 0.48, 0);
    context.lineTo(-size * 0.08, 0);
    context.lineTo(size * 0.12, -size * 0.3);
    context.lineTo(size * 0.48, -size * 0.3);
    context.stroke();
    context.beginPath();
    context.arc(-size * 0.48, 0, 1.8, 0, Math.PI * 2);
    context.arc(size * 0.48, -size * 0.3, 1.8, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

function drawAiRain(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const compact = width < 760;
  const streamCount = compact ? 8 : 15;
  const spacing = width / streamCount;
  const now = reducedMotion ? 3200 : time;

  for (let stream = 0; stream < streamCount; stream += 1) {
    const glyphCount = 5 + (stream % 4);
    const speed = 0.028 + (stream % 5) * 0.004;
    const cycle = height + 420;
    const startOffset = ((stream * 0.317 + 0.11) % 1) * cycle;
    const headY = ((startOffset + now * speed) % cycle) - 190;
    const x = spacing * (stream + 0.5) + Math.sin(stream * 2.1) * spacing * 0.12;

    context.beginPath();
    context.moveTo(x, headY - (glyphCount - 1) * 38);
    context.lineTo(x, headY + 8);
    context.strokeStyle = rgba(BLUE, compact ? 0.035 : 0.05);
    context.lineWidth = 0.75;
    context.stroke();

    for (let glyph = 0; glyph < glyphCount; glyph += 1) {
      const y = headY - glyph * (compact ? 34 : 40);
      if (y < -40 || y > height + 40) continue;
      const edgeFade = Math.min(1, Math.max(0, y / 110), Math.max(0, (height - y) / 130));
      const pulse = 0.86 + Math.sin(now * 0.0017 + stream * 0.8 + glyph) * 0.14;
      const alpha = (0.11 + ((stream + glyph) % 4) * 0.025) * edgeFade * pulse;
      const size = (compact ? 9 : 11) + ((stream + glyph) % 3) * 2;
      drawAiGlyph(context, x, y, size, (stream * 3 + glyph) % 5, alpha);
    }
  }
}

function drawProSignals(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const compact = width < 760;
  const currentCount = compact ? 4 : 7;
  const upperCount = Math.ceil(currentCount / 2);
  const lineGradient = context.createLinearGradient(0, 0, width, 0);
  lineGradient.addColorStop(0, rgba(BLUE, 0));
  lineGradient.addColorStop(0.28, rgba(BLUE, 0.025));
  lineGradient.addColorStop(0.52, rgba(BLUE, 0.12));
  lineGradient.addColorStop(1, rgba(BLUE, 0.06));
  const evidenceGradient = context.createLinearGradient(0, 0, width, 0);
  evidenceGradient.addColorStop(0, rgba(GRAPHITE, 0));
  evidenceGradient.addColorStop(0.35, rgba(GRAPHITE, 0.035));
  evidenceGradient.addColorStop(0.58, rgba(GRAPHITE, 0.09));
  evidenceGradient.addColorStop(1, rgba(GRAPHITE, 0.02));

  for (let index = 0; index < currentCount; index += 1) {
    const upper = index < upperCount;
    const row = upper ? index : index - upperCount;
    const baseY = upper
      ? height * (0.12 + row * (compact ? 0.1 : 0.075))
      : height * (0.69 + row * (compact ? 0.1 : 0.075));
    const drift = reducedMotion ? 0 : Math.sin(time * 0.00045 + index * 1.3) * 2.5;
    const node: Point = {
      x: width * (0.58 + (index % 2) * 0.035),
      y: baseY + drift + (upper ? 10 + row * 2 : -10 - row * 2),
    };
    const startX = width * 0.17;
    const gap = 5 + (index % 3);
    const predictionStart: Point = { x: startX, y: baseY + drift - gap };
    const evidenceStart: Point = { x: startX, y: baseY + drift + gap };
    const predictionControl1: Point = { x: width * 0.31, y: baseY + drift - gap * 1.4 };
    const evidenceControl1: Point = { x: width * 0.31, y: baseY + drift + gap * 1.4 };
    const convergeControl: Point = {
      x: width * 0.49,
      y: node.y + (upper ? -8 : 8),
    };

    context.lineWidth = compact ? 0.8 : 1;
    context.strokeStyle = lineGradient;
    traceCurve(context, predictionStart, predictionControl1, convergeControl, node);
    context.strokeStyle = evidenceGradient;
    traceCurve(context, evidenceStart, evidenceControl1, convergeControl, node);

    const end: Point = {
      x: width * 1.04,
      y: baseY + drift + (upper ? -18 - row * 3 : 18 + row * 3),
    };
    const postControl1: Point = {
      x: width * 0.72,
      y: node.y + (upper ? -18 : 18),
    };
    const postControl2: Point = {
      x: width * 0.9,
      y: end.y + (upper ? 10 : -10),
    };
    context.strokeStyle = lineGradient;
    context.lineWidth = compact ? 0.9 : 1.1;
    traceCurve(context, node, postControl1, postControl2, end);

    const nodePulse = reducedMotion ? 0.25 : 0.18 + (Math.sin(time * 0.0018 + index) + 1) * 0.07;
    context.beginPath();
    context.arc(node.x, node.y, 3, 0, Math.PI * 2);
    context.fillStyle = rgba(BLUE, 0.24);
    context.fill();
    context.beginPath();
    context.arc(node.x, node.y, 6 + nodePulse * 5, 0, Math.PI * 2);
    context.strokeStyle = rgba(BLUE, nodePulse * 0.55);
    context.lineWidth = 0.8;
    context.stroke();

    const progress = reducedMotion ? 0.64 : (time / (7200 + index * 380) + index * 0.17) % 1;
    const pulse = cubicPoint(node, postControl1, postControl2, end, progress);
    context.beginPath();
    context.arc(pulse.x, pulse.y, compact ? 1.7 : 2.1, 0, Math.PI * 2);
    context.fillStyle = rgba(BLUE, 0.3);
    context.fill();
  }
}

export default function ProductAtmosphereCanvas({
  mode,
  reducedMotion,
}: ProductAtmosphereCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;
    let visible = !document.hidden;
    const hardwareThreads = navigator.hardwareConcurrency ?? 8;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lowPower = hardwareThreads <= 4 || connection?.saveData === true;
    const fps = lowPower ? 18 : 24;
    const frameInterval = 1000 / fps;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(performance.now());
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (mode === "AI") {
        drawAiRain(context, width, height, time, reducedMotion);
      } else {
        drawProSignals(context, width, height, time, reducedMotion);
      }
    };

    const animate = (time: number) => {
      if (visible && time - lastDraw >= frameInterval) {
        draw(time);
        lastDraw = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible) draw(performance.now());
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();

    if (!reducedMotion) {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mode, reducedMotion]);

  return (
    <div
      className={`product-atmosphere product-atmosphere--${mode.toLowerCase()}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
