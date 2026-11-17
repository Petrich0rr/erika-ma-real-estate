import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import FeaturedProperties from "@/components/site/FeaturedProperties";
import InstagramFeed from "@/components/site/InstagramFeed";
import Testimonials from "@/components/site/Testimonials";
import ErikaRunner from "@/components/site/ErikaRunner";
import { Image } from "@/components/ui/image";
import HeroVideo from "@/components/site/HeroVideo";

const HERO_TEXT_SHADOW = {
  textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)"
};


export default function Home() {

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-black min-h-[92vh] flex items-center pt-32 pb-24 md:pt-36">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 w-full">
          <div className="max-w-[52rem] mx-auto text-center">
            <Reveal delay={0.05}>
              <h1 style={HERO_TEXT_SHADOW} className="font-heading text-[2.6rem] sm:text-[3.6rem] lg:text-[4.25rem] leading-[1.08] text-white">
                Want to buy, sell, or lease in{" "}
                <em className="italic font-normal text-white text-[1.12em]">Toronto and the GTA</em>?
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 h-px w-16 bg-white/70 mx-auto" />
            </Reveal>
            <Reveal delay={0.18}>
              <p style={HERO_TEXT_SHADOW} className="mt-7 text-[19px] text-white leading-[1.95] max-w-[36rem] mx-auto sm:whitespace-nowrap">
                From first showing to keys in hand.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex justify-center">
                <Link to="/contact" className="btn-primary px-12 py-5 text-base">Let&rsquo;s Grab Coffee</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 md:py-32 border-t border-primary/15">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-sand">
              <Image src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/a980f6ce5_HalfBody_Headshot.png" alt={`${siteConfig.agentName}`} fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow" style={{ fontSize: "0.8rem" }}>Meet erika</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">Your <span className="inline-block font-heading italic text-primary text-[1.2em] leading-none">Trusted Partner</span> in Real Estate.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-foreground/80 max-w-xl leading-relaxed">Buying or selling a home is a big decision. I'm here to help make the process simple, transparent, and as stress-free as possible.

              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/about" className="btn-ghost mt-8">More about me</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FEATURED PROPERTIES */}
      <FeaturedProperties />

      {/* WHAT I DO */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 text-center">
          <Reveal>
            <span className="eyebrow">What I Do</span>
            <h2 className="font-heading text-3xl md:text-5xl mt-4">Residential sales, leases, and commercial</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Link to="/contact" className="btn-primary mt-8 inline-block">Let&rsquo;s Talk</Link>
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <InstagramFeed />

      {/* PLAY A GAME — replaced the home Contact section Nov 16, 2026: it
          duplicated the Contact page (header "Work With Erika", "Let's Talk",
          and /contact all lead there). The form still lives on /contact. */}
      <section id="play" className="py-20 md:py-32 bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="text-center">
            <span className="eyebrow">Just for fun</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Mini Erika vs. Toronto</h2>
            <p className="mt-5 text-foreground/75 max-w-lg mx-auto">
              House hunting can wait 30 seconds. Help mini Erika jump the houses and condos — how far can you get?
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <ErikaRunner />
          </Reveal>
          <p className="mt-8 text-center text-foreground/70">
            Want to talk real estate instead? <Link to="/contact" className="link-underline text-primary">Say hi</Link>
          </p>
        </div>
      </section>
    </>);

}
