import { useEffect, useRef } from "react";

type ProductAtmosphereCanvasProps = {
  mode: "Pro" | "AI";
  reducedMotion: boolean;
};

const BLUE = "0, 118, 206";

function rgba(color: string, alpha: number) {
  return `rgba(${color}, ${Math.max(0, Math.min(1, alpha))})`;
}

function drawAiBit(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  bit: 0 | 1,
  alpha: number,
) {
  context.save();
  context.fillStyle = rgba(BLUE, alpha);
  context.font = `500 ${size}px "IBM Plex Mono", ui-monospace, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(String(bit), x, y);
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
    const bitCount = 6 + (stream % 4);
    const speed = 0.028 + (stream % 5) * 0.004;
    const cycle = height + 440;
    const startOffset = ((stream * 0.317 + 0.11) % 1) * cycle;
    const headY = ((startOffset + now * speed) % cycle) - 200;
    const x = spacing * (stream + 0.5) + Math.sin(stream * 2.1) * spacing * 0.12;
    const gap = compact ? 34 : 40;

    for (let bitIndex = 0; bitIndex < bitCount; bitIndex += 1) {
      const y = headY - bitIndex * gap;
      if (y < -40 || y > height + 40) continue;
      const edgeFade = Math.min(1, Math.max(0, y / 105), Math.max(0, (height - y) / 125));
      const pulse = 0.86 + Math.sin(now * 0.0017 + stream * 0.8 + bitIndex) * 0.14;
      const headBoost = bitIndex === 0 ? 1.16 : 1;
      const alpha =
        (0.18 + ((stream + bitIndex) % 4) * 0.034) * edgeFade * pulse * headBoost;
      const size = (compact ? 11 : 13) + ((stream + bitIndex) % 3) * 2;
      const bit = (
        Math.sin((stream + 1) * 91.7 + (bitIndex + 1) * 37.3) > 0 ? 1 : 0
      ) as 0 | 1;
      drawAiBit(context, x, y, size, bit, alpha);
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
