import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import PropertyCard from "@/components/site/PropertyCard";
import Reveal from "@/components/site/Reveal";
import { Image } from "@/components/ui/image";
import { siteConfig } from "@/lib/siteConfig";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    base44.entities.Property.list("-created_date", 12).
    then(setProperties).
    catch(() => setProperties([]));
  }, []);

  const hasReal = properties && properties.length > 0;

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow">Featured Properties</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">A curated selection of current listings</h2>
          </div>
          <Link to="/contact" className="btn-ghost">View all &amp; enquire</Link>
        </Reveal>

        {hasReal ?
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) =>
          <Reveal key={p.id}>
                <PropertyCard property={p} />
              </Reveal>
          )}
          </div> :

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.images.properties.map((img, i) =>
          <Reveal key={i}>
                <article className="group">
                  <div className="relative overflow-hidden aspect-[4/3] bg-sand">
                    <Image src={img} alt="Featured listing placeholder" fittingType="fill" className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em]">EXCLUSIVE LISTING</span>
                  </div>
                  <div className="pt-5">
                    <h3 className="font-heading text-xl">Featured Listing</h3>
                    <p className="text-muted-foreground text-sm mt-1">Property details available soon.</p>
                    <Link to="/contact" className="btn-ghost mt-4 hidden">Contact to feature your home</Link>
                  </div>
                </article>
              </Reveal>
          )}
          </div>
        }
      </div>
    </section>);

}