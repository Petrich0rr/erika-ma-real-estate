import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/siteConfig";
import { captureUtm } from "@/lib/utm";
import BrokerageLogo from "@/components/site/BrokerageLogo";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-primary/15"
          : "bg-background/70 backdrop-blur-[2px] border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="group flex items-center gap-4" aria-label={`${siteConfig.agentName} — home`}>
            <div>
              <span className="block font-heading text-xl md:text-2xl leading-none text-foreground">
                {siteConfig.agentName}
              </span>
              <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-primary mt-1.5">
                {siteConfig.shortTagline}
              </span>
            </div>
            <span className="hidden md:block h-14 w-px bg-primary/20" />
            <BrokerageLogo className="hidden md:block h-14 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-[0.8rem] uppercase tracking-[0.18em] font-semibold transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link to="/contact" className="btn-primary">
              Let&rsquo;s Talk
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-background border-t border-primary/15"
          >
            <nav className="px-5 py-6 flex flex-col" aria-label="Mobile">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `py-3.5 text-sm uppercase tracking-[0.2em] font-semibold border-b border-primary/10 ${
                      isActive ? "text-primary" : "text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-6 w-full">
                Let&rsquo;s Talk
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}