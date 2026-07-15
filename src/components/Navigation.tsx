import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

const products = [
  {
    label: "Jibe Pro",
    description: "Develop people. Elevate performance.",
    href: "/jibe-pro",
  },
  {
    label: "Jibe Retail",
    description: "Capture missed demand. Recover revenue.",
    href: "/jibe-retail",
  },
  {
    label: "Jibe AI",
    description: "Turn interaction data into action.",
    href: "/jibe-ai",
  },
];

const sectionLinks = [
  { label: "Clients", href: "/#clients" },
  { label: "Company", href: "/#company" },
  { label: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-[#D9D9D5] bg-[#F7F7F4]/95 shadow-[0_8px_30px_rgba(24,24,24,0.06)]" : "border-transparent bg-[#F7F7F4]/90"
        }`}
        style={{ backdropFilter: "blur(18px)" }}
      >
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-6 lg:px-10">
          <Link to="/" aria-label="Jibe home" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0076CE]">
            <img src="/assets/logos/jibe.png" alt="Jibe" className="h-[46px] w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            <div ref={productsRef} className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((open) => !open)}
                aria-expanded={productsOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#2F2F2F] transition-colors hover:bg-white hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-[#0076CE]"
              >
                Products
                <ChevronDown size={14} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>

              {productsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-[350px] overflow-hidden rounded-2xl border border-[#D9D9D5] bg-white p-2 shadow-[0_24px_70px_rgba(26,31,37,0.16)]"
                >
                  {products.map((product) => (
                    <Link
                      key={product.href}
                      to={product.href}
                      role="menuitem"
                      className="group flex items-start justify-between gap-5 rounded-xl px-4 py-4 transition-colors hover:bg-[#F2F7FB] focus-visible:outline-2 focus-visible:outline-[#0076CE]"
                    >
                      <span>
                        <span className="block text-[14px] font-semibold text-[#2F2F2F]">{product.label}</span>
                        <span className="mt-1 block text-[12px] leading-relaxed text-[#6D6D69]">{product.description}</span>
                      </span>
                      <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-[#9B9D9F] transition-colors group-hover:text-[#0076CE]" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#2F2F2F] transition-colors hover:bg-white hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-[#0076CE]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(0,118,206,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
            >
              Book a Demo
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2.5 text-[#2F2F2F] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#0076CE] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#F7F7F4] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex h-[76px] items-center justify-between border-b border-[#D9D9D5] px-5 sm:px-6">
            <Link to="/" aria-label="Jibe home">
              <img src="/assets/logos/jibe.png" alt="Jibe" className="h-[46px] w-auto object-contain" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2.5 text-[#2F2F2F] hover:bg-white"
              aria-label="Close navigation"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#777976]">Products</p>
            <div className="grid gap-2">
              {products.map((product) => (
                <Link key={product.href} to={product.href} className="rounded-2xl border border-[#D9D9D5] bg-white p-5">
                  <span className="flex items-center justify-between gap-4 text-[20px] font-semibold text-[#2F2F2F]">
                    {product.label}
                    <ArrowUpRight size={18} className="text-[#0076CE]" />
                  </span>
                  <span className="mt-1 block text-[13px] text-[#6D6D69]">{product.description}</span>
                </Link>
              ))}
            </div>

            <div className="mt-8 border-t border-[#D9D9D5] pt-4">
              {sectionLinks.map((link) => (
                <Link key={link.href} to={link.href} className="flex items-center justify-between border-b border-[#D9D9D5] py-4 text-[22px] font-medium text-[#2F2F2F]">
                  {link.label}
                  <ArrowUpRight size={18} className="text-[#9B9D9F]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-[#D9D9D5] p-5 sm:p-6">
            <Link to="/demo" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0076CE] px-6 py-4 text-[15px] font-semibold text-white">
              Book a Demo
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
