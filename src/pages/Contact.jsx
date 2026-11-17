import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import LeadForm from "@/components/site/LeadForm";
import ErikaRunner from "@/components/site/ErikaRunner";
import WeChatButton from "@/components/site/WeChatButton";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 max-w-3xl leading-[0.98]">Work with Erika!</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">Whether you’re ready or just exploring, I’m always happy to chat.

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
                  <span className="text-muted-foreground text-sm uppercase tracking-[0.18em] font-semibold mr-2">Email:</span>
                  <a href={`mailto:${siteConfig.email}`} className="link-underline text-lg">{siteConfig.email}</a>
                </p>
                <p>
                  <span className="text-muted-foreground text-sm uppercase tracking-[0.18em] font-semibold mr-2">Phone:</span>
                  <a href={`tel:${siteConfig.phoneHref}`} className="link-underline text-lg">{siteConfig.phone}</a>
                </p>
                <p className="flex items-center gap-1.5 text-muted-foreground pt-2">
                  <MapPin size={16} className="text-primary" /> Toronto &amp; Greater Toronto Area
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-2xl md:text-3xl">Follow</h2>
              <div className="mt-5 flex items-center gap-5">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-primary transition-colors"><Instagram size={22} /></a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary transition-colors"><Linkedin size={22} /></a>
                <WeChatButton size={22} className="text-foreground/70 hover:text-primary transition-colors" />
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

      {/* PLAY A GAME — moved here from the home page Nov 16, 2026: the game
          belongs on the Contact page (menu Minigame and the Work With Erika
          button both land here). */}
      <section id="play" className="pb-20 md:pb-32 bg-sand scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="text-center">
            <span className="eyebrow">Just for fun</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Tired of browsing properties?</h2>
            <p className="mt-5 text-foreground/75 max-w-lg mx-auto">
              Help mini Erika jump the obstacles to get to her next showing. See if you can beat the high score.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <ErikaRunner />
          </Reveal>
        </div>
      </section>
    </>);

}