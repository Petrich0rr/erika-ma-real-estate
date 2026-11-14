import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import PropertyCard from "@/components/site/PropertyCard";
import FeaturedListingsPlaceholder from "@/components/site/FeaturedListingsPlaceholder";
import Reveal from "@/components/site/Reveal";

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

        {hasReal ? (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <Reveal key={p.id}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <FeaturedListingsPlaceholder />
        )}
      </div>
    </section>
  );
}