import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/siteConfig";
import BrokerageLogo from "@/components/site/BrokerageLogo";

// TikTok has no lucide icon; render a compact inline glyph.
function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.7 3.8 3.8 4.2v2.6c-1.4 0-2.7-.4-3.8-1.1v6.6c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V3h2.7z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="block">
              <span className="block font-heading text-2xl md:text-3xl">{siteConfig.agentName}</span>
              <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-background/60 mt-2">
                {siteConfig.role}
              </span>
            </Link>
            <p className="mt-6 text-background/70 max-w-sm leading-relaxed text-[0.95rem]">
              Residential &bull; Commercial &bull; Pre-Construction
            </p>
            <BrokerageLogo variant="light" className="mt-8 h-28 md:h-32 w-auto" />
            <div className="mt-5 text-[0.8rem] leading-relaxed text-background/55">
              <p>Tel: {siteConfig.office.phone} &nbsp; Fax: {siteConfig.office.fax}</p>
              <p>{siteConfig.office.address}</p>
              <p className="mt-1 text-background/45">{siteConfig.office.disclaimer}</p>
            </div>
            <div className="mt-7 flex items-center gap-4">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-background/70 hover:text-background transition-colors">
                <Instagram size={20} />
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/70 hover:text-background transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-background/70 hover:text-background transition-colors">
                <TikTokIcon size={18} />
              </a>
              <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="text-background/70 hover:text-background transition-colors">
                <Mail size={20} />
              </a>
              <a href={`tel:${siteConfig.phoneHref}`} aria-label="Phone" className="text-background/70 hover:text-background transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[0.65rem] uppercase tracking-[0.28em] text-background/50 mb-5">Explore</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-background/80 hover:text-background text-[0.95rem] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[0.65rem] uppercase tracking-[0.28em] text-background/50 mb-5">Contact</h3>
            <ul className="space-y-3 text-[0.95rem]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-background/80 hover:text-background transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="text-background/80 hover:text-background transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-background/60 pt-2">{siteConfig.brokerage}</li>
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-1.5 mt-6 text-background text-sm uppercase tracking-[0.18em] font-semibold group">
              Book a consultation
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-background/50">
            <p>
              © {new Date().getFullYear()} {siteConfig.agentName}. {siteConfig.role}, {siteConfig.brokerage}.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-background/80 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-background/80 transition-colors">Terms &amp; Notices</Link>
            </div>
          </div>
          <p className="mt-6 text-[0.7rem] leading-relaxed text-background/40 max-w-3xl">
            [Brokerage regulatory disclosures and required real estate notices to be inserted here.]
          </p>
        </div>
      </div>
    </footer>
  );
}