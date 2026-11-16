import { Link } from "react-router-dom";
import PropertyCard from "@/components/site/PropertyCard";
import Reveal from "@/components/site/Reveal";
import { listings } from "@/lib/listings";

// Static listings: the site has no Base44 backend on Cloudflare Pages,
// so featured properties come from src/lib/listings.js, not the API.
// Home shows the first 3, the full list lives on /listings.
export default function FeaturedProperties() {
  const featured = listings.slice(0, 3);

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow">Featured Properties</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">A curated selection of current listings</h2>
          </div>
          <Link to="/listings" className="btn-ghost">View all &amp; enquire</Link>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.id}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
