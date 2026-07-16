import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ScrollCue from "./ScrollCue";

const heroCueRoutes = new Set(["/jibe-pro", "/jibe-retail", "/jibe-ai"]);

export default function InteriorPageScrollCue() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const usesHeroCue = heroCueRoutes.has(normalizedPath);
  const isHome = normalizedPath === "/";

  useEffect(() => {
    if (isHome || usesHeroCue) {
      setVisible(false);
      return;
    }

    const updateVisibility = () => {
      const hasMoreContent = document.documentElement.scrollHeight > window.innerHeight + 96;
      setVisible(hasMoreContent && window.scrollY < 80);
    };

    const frame = window.requestAnimationFrame(updateVisibility);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [isHome, pathname, usesHeroCue]);

  if (!visible) return null;

  const scrollForward = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({
      top: Math.max(460, window.innerHeight * 0.72),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="interior-page-scroll-cue">
      <ScrollCue onActivate={scrollForward} />
    </div>
  );
}
