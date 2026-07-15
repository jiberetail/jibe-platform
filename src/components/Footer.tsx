import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { assetUrl } from "../assetUrl";

const productLinks = [
  { label: "Jibe Pro", href: "/jibe-pro" },
  { label: "Jibe Retail", href: "/jibe-retail" },
  { label: "Jibe AI", href: "/jibe-ai" },
];

const companyLinks = [
  { label: "Leadership", href: "/company/leadership" },
  { label: "History", href: "/company/history" },
  { label: "IP Protection", href: "/company/ip-protection" },
  { label: "Media Inquiries", href: "/company/media-inquiries" },
  { label: "Clients", href: "/#clients" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#D9D9D5] bg-[#ECEDEA]">
      <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-14 border-b border-[#D1D3CF] pb-14 lg:grid-cols-[1.4fr_0.7fr_0.7fr] lg:gap-20">
          <div>
            <img src={assetUrl("assets/logos/jibe.png")} alt="Jibe" className="h-[58px] w-auto object-contain" />
            <h2 className="mt-7 max-w-[640px] font-['Instrument_Serif'] text-[42px] leading-[0.98] tracking-[-0.02em] text-[#2F2F2F] sm:text-[52px]">
              Better signals. Better decisions. Better experiences.
            </h2>
            <Link
              to="/demo"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0076CE] px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#005FA7]"
            >
              Book a Demo
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#777976]">Products</p>
            <ul className="space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[14px] font-medium text-[#4E504D] transition-colors hover:text-[#0076CE]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#777976]">Company</p>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[14px] font-medium text-[#4E504D] transition-colors hover:text-[#0076CE]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[12px] text-[#777976] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jibe. All rights reserved.</p>
          <p>Customer intelligence for teams, retail, and enterprise operations.</p>
        </div>
      </div>
    </footer>
  );
}
