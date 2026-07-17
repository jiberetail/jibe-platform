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

function hashUnit(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function smoothStep(min: number, max: number, value: number) {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return normalized * normalized * (3 - 2 * normalized);
}

function drawAiRain(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const compact = width < 760;
  const now = reducedMotion ? 4200 : time;
  const packetCount = compact ? 64 : 104;
  const cycle = height + 280;
  const layerAlpha = [0.11, 0.18, 0.29];

  for (let packet = 0; packet < packetCount; packet += 1) {
    const seed = packet * 17.37 + 1;
    const layer = packet % 3;
    const depth = (layer + 1) / 3;
    const speed = 0.018 + layer * 0.008 + hashUnit(seed + 7) * 0.009;
    const y = ((hashUnit(seed + 19) * cycle + now * speed) % cycle) - 140;
    if (y < -70 || y > height + 70) continue;

    const rawX = hashUnit(seed + 37) * width;
    const organizationBand = width * (((packet % 5) + 0.5) / 5);
    const lowerProgress = Math.max(0, Math.min(1, y / Math.max(1, height)));
    const organization = 0.07 + Math.pow(lowerProgress, 1.7) * 0.14;
    const sway =
      Math.sin(now * (0.00035 + depth * 0.00008) + hashUnit(seed + 23) * Math.PI * 2) *
      (2 + depth * 5);
    const x = rawX + (organizationBand - rawX) * organization + sway;

    const edgeFade =
      smoothStep(-25, 100, y) * (1 - smoothStep(height - 120, height + 35, y));
    const copyFade = compact ? 0.82 : 0.32 + smoothStep(0.18, 0.5, x / width) * 0.68;
    const logoDistance = Math.hypot(
      (x - width * 0.75) / (width * 0.2),
      (y - height * 0.48) / (height * 0.3),
    );
    const logoQuietZone = compact ? 1 : 0.38 + smoothStep(0.68, 1.14, logoDistance) * 0.62;
    const pulse = 0.82 + Math.sin(now * 0.001 + seed) * 0.18;
    const alpha = layerAlpha[layer] * edgeFade * copyFade * logoQuietZone * pulse;
    if (alpha <= 0.002) continue;

    const isNode = hashUnit(seed + 43) < 0.34;
    const blueMix = packet % 7 === 0 ? 1 : 0.48 + hashUnit(seed + 47) * 0.46;
    const packetHeight = isNode ? 4 + depth * 2 : 2.4 + depth * 1.5;
    const packetWidth = isNode ? packetHeight : 10 + hashUnit(seed + 59) * (18 + depth * 20);

    if (packet % 7 === 0) {
      const trailLength = 28 + hashUnit(seed + 61) * 28;
      context.beginPath();
      context.moveTo(x, y - trailLength);
      context.lineTo(x, y - packetHeight * 1.5);
      context.strokeStyle = dataColor(blueMix, alpha * 0.42);
      context.lineWidth = 0.7 + depth * 0.45;
      context.lineCap = "round";
      context.stroke();
    }

    context.fillStyle = dataColor(blueMix, alpha);
    context.beginPath();
    if (isNode) {
      context.arc(x, y, packetWidth / 2, 0, Math.PI * 2);
    } else {
      context.roundRect(
        x - packetWidth / 2,
        y - packetHeight / 2,
        packetWidth,
        packetHeight,
        packetHeight,
      );
    }
    context.fill();
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
