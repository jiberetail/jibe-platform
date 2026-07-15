import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const HomePage = lazy(() => import("../pages/HomePage"));
const JibeProPage = lazy(() => import("../pages/JibeProPage"));
const JibeRetailPage = lazy(() => import("../pages/JibeRetailPage"));
const JibeAIPage = lazy(() => import("../pages/JibeAIPage"));
const HowItWorksPage = lazy(() => import("../pages/HowItWorksPage"));
const BookDemoPage = lazy(() => import("../pages/BookDemoPage"));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <main className="flex min-h-[78vh] items-center bg-[#F7F7F4] px-6 pb-24 pt-36">
      <div className="mx-auto w-full max-w-[1320px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#777976]">404 · Page not found</p>
        <h1 className="mt-6 max-w-[720px] font-['Instrument_Serif'] text-[64px] leading-[0.94] tracking-[-0.03em] text-[#2F2F2F] md:text-[88px]">
          Let&apos;s get you back in the loop.
        </h1>
        <Link to="/" className="mt-9 inline-flex rounded-xl bg-[#0076CE] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-[#005FA7]">
          Return to Jibe
        </Link>
      </div>
    </main>
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F7F4] pt-24" role="status" aria-live="polite">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#777976]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#0076CE]" />
        Loading Jibe
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] text-[#2F2F2F]">
      <Navigation />
      <ScrollManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jibe-pro" element={<JibeProPage />} />
          <Route path="/jibe-retail" element={<JibeRetailPage />} />
          <Route path="/jibe-ai" element={<JibeAIPage />} />
          <Route path="/jibe-pro/how-it-works" element={<HowItWorksPage />} />
          <Route path="/how-it-works" element={<Navigate to="/jibe-pro/how-it-works" replace />} />
          <Route path="/demo" element={<BookDemoPage />} />
          <Route path="/clients" element={<Navigate to="/#clients" replace />} />
          <Route path="/customers" element={<Navigate to="/#clients" replace />} />
          <Route path="/company" element={<Navigate to="/#company" replace />} />
          <Route path="/about" element={<Navigate to="/#company" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  const baseName = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={baseName}>
      <AppContent />
    </BrowserRouter>
  );
}
