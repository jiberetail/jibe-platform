import { useEffect, useRef } from "react";

type ProductAtmosphereCanvasProps = {
  mode: "Pro" | "AI";
  reducedMotion: boolean;
};

const BLUE = "0, 118, 206";
const AI_DATA_COLORS = [
  "20, 92, 184",
  "50, 109, 206",
  "71, 125, 221",
  "95, 143, 234",
  "73, 196, 244",
  "154, 220, 255",
] as const;

function rgba(color: string, alpha: number) {
  return `rgba(${color}, ${Math.max(0, Math.min(1, alpha))})`;
}

function hash01(primary: number, secondary: number) {
  const raw = Math.sin(primary * 127.1 + secondary * 311.7) * 43758.5453123;
  return raw - Math.floor(raw);
}

function drawAiDataCell(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha: number,
  variant: number,
) {
  const cellSize = Math.max(3, Math.round(size));
  const left = Math.round(x - cellSize / 2);
  const top = Math.round(y - cellSize / 2);
  const thickness = Math.max(1, Math.round(cellSize * 0.2));
  const segment = Math.max(thickness * 2, Math.round(cellSize * 0.48));

  context.fillStyle = rgba(color, alpha);
  context.strokeStyle = rgba(color, alpha);

  if (variant === 1) {
    context.lineWidth = thickness;
    context.strokeRect(
      left + thickness / 2,
      top + thickness / 2,
      cellSize - thickness,
      cellSize - thickness,
    );
  } else if (variant === 2) {
    // A framed, half-built cell: it still reads as a square rather than a dash.
    context.lineWidth = thickness;
    context.strokeStyle = rgba(color, alpha * 0.64);
    context.strokeRect(
      left + thickness / 2,
      top + thickness / 2,
      cellSize - thickness,
      cellSize - thickness,
    );
    context.fillRect(
      left + thickness,
      top + Math.round(cellSize * 0.5),
      cellSize - thickness * 2,
      Math.max(thickness, Math.round(cellSize * 0.5) - thickness),
    );
  } else if (variant === 3) {
    // Opposing corners imply one square whose data has not fully resolved yet.
    context.fillRect(left, top, segment, thickness);
    context.fillRect(left, top, thickness, segment);
    context.fillRect(left + cellSize - segment, top + cellSize - thickness, segment, thickness);
    context.fillRect(left + cellSize - thickness, top + cellSize - segment, thickness, segment);
  } else {
    context.fillRect(left, top, cellSize, cellSize);
  }
}

function drawAiRain(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const compact = width < 760;
  const streamCount = compact
    ? Math.max(11, Math.round(width / 38))
    : Math.max(20, Math.min(36, Math.round(width / 62)));
  const now = reducedMotion ? 3200 : time;

  for (let stream = 0; stream < streamCount; stream += 1) {
    const streamSeed = hash01(stream + 1, 4.7);
    const trailCount = 8 + Math.floor(hash01(stream + 1, 9.3) * 12);
    const baseSize = (compact ? 3.4 : 4.2) + hash01(stream + 1, 16.1) * 4.2;
    const gap = 8 + baseSize + hash01(stream + 1, 22.4) * 7;
    const speed = (compact ? 0.025 : 0.031) + hash01(stream + 1, 31.8) * 0.036;
    const trailLength = trailCount * gap;
    const cycle = height + trailLength + 260;
    const startOffset = hash01(stream + 1, 41.2) * cycle;
    const headY = ((startOffset + now * speed) % cycle) - trailLength - 90;
    const lanePosition = (stream + 0.22 + streamSeed * 0.56) / streamCount;
    const baseX = lanePosition * width;
    const streamDrift = reducedMotion
      ? 0
      : Math.sin(now * 0.00026 + stream * 1.31) * (compact ? 0.6 : 1.2);

    for (let cellIndex = 0; cellIndex < trailCount; cellIndex += 1) {
      const cellSeed = hash01(stream + 1, cellIndex + 57.6);
      if (cellIndex > 0 && cellSeed < 0.13) continue;

      const y = headY - cellIndex * gap;
      if (y < -24 || y > height + 24) continue;

      const tailStrength = 1 - cellIndex / (trailCount + 1);
      const topFade = Math.max(0, Math.min(1, (y + 26) / 100));
      const bottomFade = Math.max(0, Math.min(1, (height - y + 24) / 120));
      const edgeFade = Math.min(topFade, bottomFade);
      const contentLaneFade = compact
        ? 0.8
        : 0.5 + Math.pow(Math.max(0, baseX / width), 0.72) * 0.5;
      const pulse = 0.88 + Math.sin(now * 0.00145 + stream * 0.77 + cellIndex * 0.91) * 0.12;
      const headBoost = cellIndex === 0 ? 0.1 : 0;
      const alpha = Math.min(
        0.62,
        (0.1 + tailStrength * 0.34 + headBoost) * edgeFade * contentLaneFade * pulse,
      );
      const sizeSeed = hash01(stream + 1, cellIndex + 83.1);
      const sizeScale = compact ? 0.9 : 1;
      const distributedSize =
        sizeSeed < 0.15
          ? 3 + sizeSeed * 3
          : sizeSeed < 0.75
            ? 3.7 + ((sizeSeed - 0.15) / 0.6) * 1.9
            : sizeSeed < 0.95
              ? 6 + ((sizeSeed - 0.75) / 0.2) * 1.7
              : 8 + ((sizeSeed - 0.95) / 0.05) * 1.2;
      const size = Math.min(
        compact ? 8 : 9.2,
        Math.max(3, distributedSize * sizeScale * (cellIndex === 0 ? 1.08 : 1)),
      );
      const xJitter = (hash01(stream + 1, cellIndex + 101.4) - 0.5) * (compact ? 1.4 : 2.4);
      const colorIndex = Math.min(
        AI_DATA_COLORS.length - 1,
        Math.floor(hash01(stream + 1, cellIndex + 123.7) * AI_DATA_COLORS.length),
      );
      const variantSeed = hash01(stream + 1, cellIndex + 149.2);
      const variant =
        cellIndex === 0 || variantSeed < 0.66
          ? 0
          : variantSeed < 0.8
            ? 1
            : variantSeed < 0.91
              ? 2
              : 3;

      drawAiDataCell(
        context,
        baseX + streamDrift + xJitter,
        y,
        size,
        AI_DATA_COLORS[colorIndex],
        alpha,
        variant,
      );
    }
  }
}

function drawProVoiceWaves(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const compact = width < 760;
  const now = reducedMotion ? 2600 : time;
  const waveCount = compact ? 2 : 3;
  const baselines = compact ? [0.43, 0.7] : [0.28, 0.5, 0.72];
  const startX = width * (compact ? 0.04 : 0.12);
  const endX = width * 1.02;
  const gap = compact ? 12 : 10;

  for (let wave = 0; wave < waveCount; wave += 1) {
    const baseline = height * baselines[wave];
    const amplitude = height * (wave === 1 ? 0.085 : 0.055);
    const gradient = context.createLinearGradient(startX, 0, endX, 0);
    gradient.addColorStop(0, rgba(BLUE, 0));
    gradient.addColorStop(0.24, rgba(BLUE, wave === 1 ? 0.07 : 0.035));
    gradient.addColorStop(0.48, rgba(BLUE, wave === 1 ? 0.26 : 0.145));
    gradient.addColorStop(1, rgba(BLUE, wave === 1 ? 0.155 : 0.085));
    context.strokeStyle = gradient;
    context.lineWidth = wave === 1 ? 1.8 : 1.25;
    context.lineCap = "round";

    for (let x = startX; x <= endX; x += gap) {
      const progress = (x - startX) / (endX - startX);
      const envelope = 0.18 + Math.sin(Math.PI * progress) ** 1.2 * 0.82;
      const voice =
        Math.sin(progress * Math.PI * (13 + wave * 2) + now * 0.00105 + wave * 1.7) * 0.62 +
        Math.sin(progress * Math.PI * (31 - wave * 3) - now * 0.0007) * 0.26 +
        Math.sin(progress * Math.PI * 7 + now * 0.00042 + wave) * 0.12;
      const halfHeight = 2.5 + Math.abs(voice) * amplitude * envelope;
      context.beginPath();
      context.moveTo(x, baseline - halfHeight);
      context.lineTo(x, baseline + halfHeight);
      context.stroke();
    }
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
    let inViewport = true;
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
        drawProVoiceWaves(context, width, height, time, reducedMotion);
      }
    };

    const animate = (time: number) => {
      if (visible && inViewport && time - lastDraw >= frameInterval) {
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
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) draw(performance.now());
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(container);
    viewportObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();

    if (!reducedMotion) {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      viewportObserver.disconnect();
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
