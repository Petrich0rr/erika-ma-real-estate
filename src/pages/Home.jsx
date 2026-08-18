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

const MARKETING_PILLARS = [
{ title: "Digital Marketing & Social Exposure", body: "Your property is strategically showcased across digital and social platforms to reach buyers beyond the MLS." },
{ title: "Professional Photography & Video", body: "High quality photography and video present your property at its best and help make a strong first impression online." },
{ title: "Strategic Positioning & Pricing", body: "Market data, comparable properties, and current conditions help inform a pricing and positioning strategy designed for your property." },
{ title: "Personalized, One-on-One Service", body: "You\u2019ll have a dedicated point of contact who understands your goals, priorities, and timeline from our first conversation through closing." },
{ title: "Market Research & Insight", body: "Clear, current insight into Toronto and GTA market conditions helps you make informed decisions with confidence." },
{ title: "Transparent Communication", body: "Clear communication throughout the process, so you always know what\u2019s happening, what comes next, and what your options are." }];


const RESOURCE_PREVIEWS = [
{ label: "First-Time Home Buyer Guide", to: "/resources" },
{ label: "Seller Guide", to: "/resources" },
{ label: "Mortgage Calculator", to: "/resources" },
{ label: "Land Transfer Tax", to: "/resources" },
{ label: "Closing Costs", to: "/resources" },
{ label: "Toronto & GTA Market Updates", to: "/resources" }];


export default function Home() {
  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() => {
    base44.entities.Neighbourhood.list().
    then((n) => setNeighbourhoods(n.filter((x) => x.featured).concat(n).slice(0, 3))).
    catch(() => setNeighbourhoods([]));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-32 pb-16 md:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal y={20}>
                <span className="eyebrow">{siteConfig.shortTagline}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-heading text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] leading-[0.95] mt-5">
                  {siteConfig.agentName}
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                

                
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {siteConfig.role}
                  <span className="mx-2.5 text-primary">·</span>
                  {siteConfig.brokerage}
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/buy" className="btn-primary">Buy a Home</Link>
                  <Link to="/sell" className="btn-outline">Sell a Home</Link>
                  <Link to="/contact" className="btn-ghost">Let&rsquo;s Talk</Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal y={32} className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-sand">
                  <Image src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/9923cdafa_Head_Shot__4_.png"

                  alt={`${siteConfig.agentName} — professional real estate headshot`}
                  fittingType="fill"
                  className="w-full h-full" />
                  
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-background px-6 py-4 border-l-2 border-primary">
                  <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">Serving</span>
                  <span className="block font-heading text-lg">Toronto &amp; the GTA</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 md:py-32 border-t border-primary/15">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-sand">
              <Image src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/bfe3e9eb8_IMG_3447.jpeg" alt={`${siteConfig.agentName}`} fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">Meet erika</span></Reveal>
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

      {/* MARKETING / WHY WORK WITH ME */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <Reveal><span className="eyebrow">Why Work With Me</span></Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-heading text-4xl md:text-5xl mt-4">Real estate, marketed with intention</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-foreground/80 max-w-md leading-relaxed">With a background in digital marketing, I bring a modern, strategic approach to real estate, combining strong presentation, market insight, and personalized service to help your property stand out.

                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8 aspect-[16/10] overflow-hidden bg-sand">
                <Image src={siteConfig.images.marketing} alt="Toronto architecture" fittingType="fill" className="w-full h-full" />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-x-10">
                {MARKETING_PILLARS.map((p, i) =>
                <Reveal key={p.title} delay={i * 0.05} className="py-7 border-b border-primary/15">
                    <span className="font-heading text-primary text-2xl">0{i + 1}</span>
                    <h3 className="font-heading text-xl mt-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.body}</p>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* RESOURCES PREVIEW */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">Resources</span>
              <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">Tools &amp; guides for your move</h2>
            </div>
            <Link to="/resources" className="btn-ghost">Browse all resources</Link>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {RESOURCE_PREVIEWS.map((r, i) =>
            <Reveal key={r.label} delay={i * 0.04}>
                <Link to={r.to} className="group flex items-center justify-between py-6 border-b border-primary/15">
                  <span className="font-heading text-lg md:text-xl group-hover:text-primary transition-colors">{r.label}</span>
                  <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            )}
          </div>
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
              <p>
                <a href={`mailto:${siteConfig.email}`} className="link-underline">{siteConfig.email}</a>
              </p>
              <p>
                <a href={`tel:${siteConfig.phoneHref}`} className="link-underline">{siteConfig.phone}</a>
              </p>
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