import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import LeadForm from "@/components/site/LeadForm";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

function TikTokIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.7 3.8 3.8 4.2v2.6c-1.4 0-2.7-.4-3.8-1.1v6.6c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V3h2.7z" />
    </svg>);

}

export default function Contact() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 max-w-3xl leading-[0.98]">Let&rsquo;s talk</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">Whether you’re ready now or just exploring, I’m always happy to chat.

            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-10">
            <Reveal>
              <h2 className="font-heading text-2xl md:text-3xl">Direct</h2>
              <div className="mt-5 space-y-3 text-foreground/85">
                <p>
                  <a href={`mailto:${siteConfig.email}`} className="link-underline text-lg">{siteConfig.email}</a>
                </p>
                <p>
                  <a href={`tel:${siteConfig.phoneHref}`} className="link-underline text-lg">{siteConfig.phone}</a>
                </p>
                <p className="flex items-center gap-2.5 text-muted-foreground pt-2">
                  <MapPin size={16} className="text-primary" /> Toronto &amp; Greater Toronto Area
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-2xl md:text-3xl">Follow</h2>
              <div className="mt-5 flex items-center gap-5">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-primary transition-colors"><Instagram size={22} /></a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary transition-colors"><Linkedin size={22} /></a>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-foreground/70 hover:text-primary transition-colors"><TikTokIcon size={20} /></a>
                <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="text-foreground/70 hover:text-primary transition-colors"><Mail size={22} /></a>
                <a href={`tel:${siteConfig.phoneHref}`} aria-label="Phone" className="text-foreground/70 hover:text-primary transition-colors"><Phone size={22} /></a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-2xl md:text-3xl">Hours</h2>
              <p className="mt-5 text-foreground/80">Available by appointment</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1} className="bg-sand px-6 py-10 md:px-12 md:py-14 border border-primary/15">
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>);

}