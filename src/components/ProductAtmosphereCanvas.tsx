import { useEffect, useRef } from "react";

type ProductAtmosphereCanvasProps = {
  mode: "Pro" | "AI";
  reducedMotion: boolean;
};

const BLUE = "0, 118, 206";

function rgba(color: string, alpha: number) {
  return `rgba(${color}, ${Math.max(0, Math.min(1, alpha))})`;
}

function dataColor(blueMix: number, alpha: number) {
  const mix = Math.max(0, Math.min(1, blueMix));
  const red = Math.round(38 * (1 - mix));
  const green = Math.round(54 + (118 - 54) * mix);
  const blue = Math.round(74 + (206 - 74) * mix);
  return `rgba(${red}, ${green}, ${blue}, ${Math.max(0, Math.min(1, alpha))})`;
}

function drawAiRain(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const compact = width < 760;
  const streamCount = compact ? 10 : 18;
  const spacing = width / streamCount;
  const blockSize = compact ? 10 : 12;
  const now = reducedMotion ? 3600 : time;

  for (let stream = 0; stream < streamCount; stream += 1) {
    const blockCount = 6 + (stream % 5);
    const speed = 0.035 + (stream % 6) * 0.0045;
    const cycle = height + 520;
    const startOffset = ((stream * 0.317 + 0.11) % 1) * cycle;
    const headY = ((startOffset + now * speed) % cycle) - 240;
    const x = spacing * (stream + 0.5) + Math.sin(stream * 2.1) * spacing * 0.1;

    for (let block = 0; block < blockCount; block += 1) {
      const y = headY - block * (compact ? 32 : 38);
      if (y < -40 || y > height + 40) continue;
      const edgeFade = Math.min(1, Math.max(0, y / 90), Math.max(0, (height - y) / 110));
      const colorShift = 0.52 + Math.sin(now * 0.00125 + stream * 0.73 + block * 0.58) * 0.48;
      const alpha = (0.15 + ((stream + block) % 4) * 0.025) * edgeFade;
      context.fillStyle = dataColor(colorShift, alpha);
      context.fillRect(x - blockSize / 2, y - blockSize / 2, blockSize, blockSize);
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
    gradient.addColorStop(0.24, rgba(BLUE, wave === 1 ? 0.05 : 0.025));
    gradient.addColorStop(0.48, rgba(BLUE, wave === 1 ? 0.2 : 0.11));
    gradient.addColorStop(1, rgba(BLUE, wave === 1 ? 0.12 : 0.065));
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
