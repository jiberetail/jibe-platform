import { ArrowDown } from "lucide-react";
import "./ScrollCue.css";

type ScrollCueProps = {
  href?: string;
  onActivate?: () => void;
  label?: string;
  className?: string;
};

export default function ScrollCue({
  href,
  onActivate,
  label = "Scroll to explore",
  className = "",
}: ScrollCueProps) {
  const content = (
    <>
      <span aria-hidden="true">Scroll</span>
      <span className="scroll-cue__icon" aria-hidden="true">
        <ArrowDown className="scroll-cue__arrow" size={15} strokeWidth={2} />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`scroll-cue ${className}`.trim()} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      className={`scroll-cue ${className}`.trim()}
      aria-label={label}
    >
      {content}
    </button>
  );
}
