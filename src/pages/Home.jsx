import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import FeaturedProperties from "@/components/site/FeaturedProperties";
import Testimonials from "@/components/site/Testimonials";
import NeighbourhoodCard from "@/components/site/NeighbourhoodCard";
import LeadForm from "@/components/site/LeadForm";
import { Image } from "@/components/ui/image";
import HeroVideo from "@/components/site/HeroVideo";

const HERO_TEXT_SHADOW = {
  textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)"
};


export default function Home() {
  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() => {
    base44.entities.Neighbourhood.list().
    // Guard: a non-array response must never reach render.
    then((n) => setNeighbourhoods(Array.isArray(n) ? n.filter((x) => x.featured).concat(n).slice(0, 3) : [])).
    catch(() => setNeighbourhoods([]));
  }, []);

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
              <p style={HERO_TEXT_SHADOW} className="mt-7 text-[19px] text-white leading-[1.95] max-w-[36rem] mx-auto">
                I will guide you through every step, from first showing to
                <br className="hidden sm:block" />
                <span className="whitespace-nowrap">keys in hand.</span>
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex justify-center">
                <a href="#contact" className="btn-primary px-12 py-5 text-base">Let&rsquo;s Grab Coffee</a>
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
              <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">Your Trusted Partner in Real Estate.</h2>
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

      {/* BUY / SELL PATHWAYS */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2">
            <Reveal className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-primary/15">
              <span className="eyebrow">For Buyers</span>
              <h3 className="font-heading text-3xl md:text-4xl mt-4">Looking to Buy?</h3>
              <p className="mt-5 text-foreground/75 max-w-md leading-relaxed">Finding the right home is about more than just the property. I’ll help you navigate the market, explore your options, and find a home that fits your needs and goals.

              </p>
              <Link to="/buy" className="btn-primary mt-8">Start Your Search</Link>
            </Reveal>
            <Reveal delay={0.08} className="p-10 md:p-16">
              <span className="eyebrow">For Sellers</span>
              <h3 className="font-heading text-3xl md:text-4xl mt-4">Looking to Sell?</h3>
              <p className="mt-5 text-foreground/75 max-w-md leading-relaxed">Your home deserves a strategy that helps it stand out. With a marketing focused approach, I’ll position and showcase your property to reach the right buyers.

              </p>
              <Link to="/sell" className="btn-primary mt-8">What&rsquo;s My Home Worth?</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <FeaturedProperties />

      {/* NEIGHBOURHOODS PREVIEW */}
      <section className="py-20 md:py-32 bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">Neighbourhoods</span>
              <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">Explore Toronto &amp; the GTA</h2>
            </div>
            <Link to="/neighbourhoods" className="btn-ghost">Explore Neighbourhoods</Link>
          </Reveal>
          {neighbourhoods.length > 0 ?
          <div className="grid sm:grid-cols-3 gap-8">
              {neighbourhoods.map((n) =>
            <Reveal key={n.id}><NeighbourhoodCard neighbourhood={n} /></Reveal>
            )}
            </div> :

          <div className="grid sm:grid-cols-3 gap-8">
              {Object.values(siteConfig.images.neighbourhoods).map((img, i) =>
            <Reveal key={i}>
                  <Link to="/neighbourhoods" className="group block">
                    <div className="relative overflow-hidden aspect-[4/3] bg-background">
                      <Image src={img} alt="Toronto neighbourhood" fittingType="fill" className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                      <h3 className="font-heading text-xl">Neighbourhood Guide</h3>
                      <ArrowUpRight size={18} className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">Coming soon</p>
                  </Link>
                </Reveal>
            )}
            </div>
          }
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-32 bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal><span className="eyebrow">Contact ERIKA</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-4xl md:text-5xl mt-4">Let&rsquo;s start a conversation</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-foreground/80 max-w-md leading-relaxed">Every real estate journey starts with a conversation. Whether you’re buying, selling, renting, investing, or exploring your options, let’s connect and make your next move happen.

              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 space-y-3 text-foreground/85">
              <p className="flex items-center gap-1.5 text-muted-foreground pt-2"><MapPin size={16} className="text-primary" /> Toronto &amp; Greater Toronto Area</p>
              <p><span className="text-muted-foreground">Email: </span><a href={`mailto:${siteConfig.email}`} className="link-underline">{siteConfig.email}</a></p>
              <p><span className="text-muted-foreground">Phone: </span><a href={`tel:${siteConfig.phoneHref}`} className="link-underline">{siteConfig.phone}</a></p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>);

}