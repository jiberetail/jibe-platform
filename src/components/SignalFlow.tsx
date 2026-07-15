import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
  aligned?: boolean;
}

export default function SignalFlow({ className = "", aligned = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const px = (mouse.x - 0.5) * 20;
  const py = (mouse.y - 0.5) * 12;

  return (
    <div ref={containerRef} className={`relative select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ transform: `translate(${px * 0.3}px, ${py * 0.3}px)`, transition: "transform 0.8s ease-out" }}
      >
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0076CE" stopOpacity="0" />
            <stop offset="50%" stopColor="#0076CE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0076CE" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B9DDF4" stopOpacity="0" />
            <stop offset="60%" stopColor="#B9DDF4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0076CE" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0076CE" stopOpacity="0" />
            <stop offset="40%" stopColor="#004F8C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0076CE" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0076CE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#004F8C" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid dots */}
        {!aligned && Array.from({ length: 12 }).map((_, i) =>
          Array.from({ length: 8 }).map((_, j) => (
            <circle
              key={`dot-${i}-${j}`}
              cx={40 + i * 65}
              cy={30 + j * 60}
              r={1.5}
              fill="#D8DADC"
              opacity={0.5}
            />
          ))
        )}

        {/* Scattered input signals — pre-convergence state */}
        {!aligned && (
          <>
            {/* Signal 1: top-left diagonal */}
            <path
              d="M 20 40 C 80 60, 120 100, 180 140 C 220 165, 260 160, 300 180"
              stroke="url(#lineGrad2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            >
              <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" begin="0.3s" fill="freeze" />
            </path>

            {/* Signal 2: top-right arc */}
            <path
              d="M 750 20 C 680 80, 620 100, 560 130 C 510 155, 470 160, 440 180"
              stroke="url(#lineGrad1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ strokeDasharray: 320, strokeDashoffset: 320 }}
            >
              <animate attributeName="stroke-dashoffset" from="320" to="0" dur="2s" begin="0.5s" fill="freeze" />
            </path>

            {/* Signal 3: left center */}
            <path
              d="M 10 220 C 70 210, 130 215, 200 220 C 250 224, 290 228, 340 230"
              stroke="#B9DDF4"
              strokeWidth="1"
              strokeLinecap="round"
              opacity={0.7}
              style={{ strokeDasharray: 340, strokeDashoffset: 340 }}
            >
              <animate attributeName="stroke-dashoffset" from="340" to="0" dur="2s" begin="0.7s" fill="freeze" />
            </path>

            {/* Signal 4: bottom-left */}
            <path
              d="M 30 400 C 100 360, 160 320, 220 290 C 265 268, 300 255, 340 245"
              stroke="url(#lineGrad3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ strokeDasharray: 420, strokeDashoffset: 420 }}
            >
              <animate attributeName="stroke-dashoffset" from="420" to="0" dur="2.2s" begin="0.4s" fill="freeze" />
            </path>

            {/* Signal 5: bottom-right */}
            <path
              d="M 780 430 C 700 390, 640 350, 580 320 C 530 295, 490 275, 450 258"
              stroke="#0076CE"
              strokeWidth="1"
              strokeLinecap="round"
              opacity={0.6}
              style={{ strokeDasharray: 380, strokeDashoffset: 380 }}
            >
              <animate attributeName="stroke-dashoffset" from="380" to="0" dur="2.2s" begin="0.6s" fill="freeze" />
            </path>

            {/* Signal 6: top-center gentle */}
            <path
              d="M 380 10 C 385 80, 388 130, 390 180 C 392 210, 393 220, 393 240"
              stroke="#B9DDF4"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={0.5}
              style={{ strokeDasharray: 230, strokeDashoffset: 230 }}
            >
              <animate attributeName="stroke-dashoffset" from="230" to="0" dur="1.8s" begin="0.8s" fill="freeze" />
            </path>
          </>
        )}

        {/* Convergence zone */}
        <g>
          {/* Convergence node */}
          <circle cx="395" cy="240" r="18" fill="#0076CE" opacity="0.1">
            <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="395" cy="240" r="9" fill="#0076CE" opacity="0.3">
            <animate attributeName="r" values="9;12;9" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="395" cy="240" r="4" fill="#0076CE" filter="url(#glow)" />
        </g>

        {/* Main unified flow — always visible */}
        <path
          d="M 395 240 C 430 240, 470 238, 510 236 C 560 233, 610 230, 660 228 C 700 226, 730 226, 780 226"
          stroke="url(#flowGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ strokeDasharray: 400, strokeDashoffset: aligned ? 0 : 400 }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={aligned ? 0 : 400}
            to="0"
            dur="1.5s"
            begin={aligned ? "0s" : "2s"}
            fill="freeze"
          />
        </path>

        {/* Parallel flow lines */}
        <path
          d="M 395 252 C 430 251, 480 250, 530 249 C 580 248, 640 247, 690 246 C 730 245, 760 245, 790 244"
          stroke="#0076CE"
          strokeWidth="1"
          opacity={0.3}
          strokeLinecap="round"
          style={{ strokeDasharray: 410, strokeDashoffset: aligned ? 0 : 410 }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={aligned ? 0 : 410}
            to="0"
            dur="1.5s"
            begin={aligned ? "0.1s" : "2.2s"}
            fill="freeze"
          />
        </path>
        <path
          d="M 395 228 C 430 228, 480 227, 530 227 C 580 226, 640 226, 690 225 C 730 225, 760 225, 790 225"
          stroke="#B9DDF4"
          strokeWidth="1"
          opacity={0.4}
          strokeLinecap="round"
          style={{ strokeDasharray: 400, strokeDashoffset: aligned ? 0 : 400 }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={aligned ? 0 : 400}
            to="0"
            dur="1.5s"
            begin={aligned ? "0.2s" : "2.1s"}
            fill="freeze"
          />
        </path>

        {/* Moving data particles on flow */}
        {[0, 1, 2].map((i) => (
          <circle key={`particle-${i}`} r="3" fill="#0076CE" opacity="0.8" filter="url(#glow)">
            <animateMotion
              dur={`${2.5 + i * 0.8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.9}s`}
              path="M 395 240 C 430 240, 470 238, 510 236 C 560 233, 610 230, 660 228 C 700 226, 730 226, 780 226"
            />
          </circle>
        ))}

        {/* Small data nodes floating */}
        {[
          { cx: 160, cy: 120, label: "Survey" },
          { cx: 60, cy: 240, label: "CRM" },
          { cx: 140, cy: 370, label: "Agent" },
          { cx: 620, cy: 110, label: "Ops" },
          { cx: 710, cy: 360, label: "QA" },
        ].map(({ cx, cy, label }, i) => (
          <g key={label}>
            <rect
              x={cx - 26}
              y={cy - 12}
              width={52}
              height={24}
              rx={6}
              fill="#F7F7F4"
              stroke="#D8DADC"
              strokeWidth={1}
            >
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.5s"
                begin={`${0.3 + i * 0.2}s`}
                fill="freeze"
              />
            </rect>
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize={9}
              fill="#686A6D"
            >
              {label}
            </text>
          </g>
        ))}

        {/* Jibe Pro output label */}
        <g>
          <rect x="640" y="196" width="90" height="28" rx="6" fill="#0076CE" opacity="0.9">
            <animate attributeName="opacity" values="0;0.9" dur="0.5s" begin="2.5s" fill="freeze" />
          </rect>
          <text
            x="685"
            y="214"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize={9}
            fill="white"
            fontWeight="500"
          >
            JIBE PRO
          </text>
        </g>
      </svg>
    </div>
  );
}
