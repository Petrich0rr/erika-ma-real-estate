import { Link } from "react-router-dom";
import Reveal from "@/components/site/Reveal";
import PropertyCard from "@/components/site/PropertyCard";
import { listings } from "@/lib/listings";

export default function Listings() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal><span className="eyebrow">Listings</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 leading-[0.98]">Current and recent listings</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">
              My current exclusive listing, plus homes I have recently leased for my clients.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <p className="text-muted-foreground">Looking for something else?</p>
            <Link to="/contact" className="btn-primary mt-5 inline-block">Enquire</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
