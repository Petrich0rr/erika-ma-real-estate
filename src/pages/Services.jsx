import { Link } from "react-router-dom";
import Reveal from "@/components/site/Reveal";
import BuyerForm from "@/components/site/BuyerForm";
import SellerForm from "@/components/site/SellerForm";
import { Image } from "@/components/ui/image";

// One page for everything Erika does: buy, sell, lease, and invest.
// Replaces the separate Buy and Sell pages (Nov 16, 2026) — their AI
// photos are gone, every photo here is real: her own listings and stills
// from her hero video. /buy and /sell still render this page.
const SERVICES = [
  {
    id: "buy",
    eyebrow: "Buy",
    title: "Find the home that fits your life",
    body: "Finding a home should feel exciting, not overwhelming. I\u2019ll help you navigate the market, understand your options, and find a home that feels right for you.",
    img: "/listings/culford.jpg",
    alt: "A real Toronto home Erika leased for a client",
    cta: { label: "Start Your Home Search", href: "#buy-form" },
  },
  {
    id: "sell",
    eyebrow: "Sell",
    title: "Sell with a marketing edge",
    body: "Selling your home is more than putting it on the market. I\u2019ll combine thoughtful strategy, strong presentation, and modern marketing to help your property stand out.",
    img: "/listings/david-salomon.jpg",
    alt: "A real Toronto condo tower",
    cta: { label: "What\u2019s My Home Worth?", href: "#sell-form" },
  },
  {
    id: "lease",
    eyebrow: "Lease",
    title: "Find a rental that actually fits",
    body: "Looking to rent in Toronto or the GTA? Tell me your budget, your must-haves, and your move-in date, and I\u2019ll send you places worth seeing.",
    img: "/listings/dundas.jpg",
    alt: "A real downtown Toronto condo tower",
    cta: { label: "See Current Rentals", to: "/listings" },
    cta2: { label: "Tell Me What You Need", to: "/contact" },
  },
  {
    id: "invest",
    eyebrow: "Invest",
    title: "Invest with the numbers in mind",
    body: "Looking for your next opportunity? I\u2019ll help you explore properties with your goals, the numbers, and the market in mind.",
    img: "/services/skyline-invest.jpg",
    alt: "Toronto skyline at dusk",
    cta: { label: "Let\u2019s Talk", to: "/contact" },
  },
];

function ServiceRow({ service, flip }) {
  const photo = (
    <Reveal className="lg:col-span-5">
      <div className="aspect-[4/3] overflow-hidden bg-sand">
        <Image src={service.img} alt={service.alt} fittingType="fill" className="w-full h-full" />
      </div>
    </Reveal>
  );
  const text = (
    <div className="lg:col-span-7">
      <Reveal><span className="eyebrow">{service.eyebrow}</span></Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">{service.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 text-foreground/80 max-w-xl leading-relaxed">{service.body}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap gap-4">
          {service.cta.to ? (
            <Link to={service.cta.to} className="btn-primary">{service.cta.label}</Link>
          ) : (
            <a href={service.cta.href} className="btn-primary">{service.cta.label}</a>
          )}
          {service.cta2 && (
            <Link to={service.cta2.to} className="btn-ghost">{service.cta2.label}</Link>
          )}
        </div>
      </Reveal>
    </div>
  );
  return (
    <section id={service.id} className="py-20 md:py-28 border-t border-primary/15 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {flip ? (
          <>
            <div className="lg:order-2">{text}</div>
            <div className="lg:order-1">{photo}</div>
          </>
        ) : (
          <>
            {text}
            {photo}
          </>
        )}
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">Services</span></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-heading text-5xl md:text-7xl mt-5 leading-[0.98]">Buy, sell, lease, or invest</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">One place to start, whatever your next move is. Tell me what you&apos;re looking for and I&apos;ll take it from there.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <Image src="/services/skyline-dusk.jpg" alt="Toronto skyline at dusk" fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <ServiceRow key={s.id} service={s} flip={i % 2 === 1} />
      ))}

      {/* BUYER FORM */}
      <section id="buy-form" className="py-20 md:py-32 bg-sand scroll-mt-24">
        <div className="mx-auto max-w-[1000px] px-5 md:px-10">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">Start Your Search</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Tell me what you&apos;re looking for</h2>
            <p className="mt-5 text-foreground/75 max-w-lg mx-auto">
              Share a few details and I&apos;ll personally review your criteria and reach out to start your search. No account needed.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="bg-background px-6 py-10 md:px-12 md:py-14 border border-primary/15">
            <BuyerForm />
          </Reveal>
        </div>
      </section>

      {/* SELLER FORM */}
      <section id="sell-form" className="py-20 md:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1000px] px-5 md:px-10">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">What&rsquo;s My Home Worth?</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Request a complimentary evaluation</h2>
            <p className="mt-5 text-foreground/75 max-w-lg mx-auto">
              Share a few details about your property and I&apos;ll personally review the information and follow up to arrange a complimentary evaluation. This is not an automated estimate — every request is reviewed by me.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="bg-sand px-6 py-10 md:px-12 md:py-14 border border-primary/15">
            <SellerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
