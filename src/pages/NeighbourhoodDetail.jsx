import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";
import PropertyCard from "@/components/site/PropertyCard";
import CtaBand from "@/components/site/CtaBand";
import { Image } from "@/components/ui/image";

export default function NeighbourhoodDetail() {
  const { slug } = useParams();
  const [nh, setNh] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setLoading(true);
    base44.entities.Neighbourhood.filter({ slug }).
    then((list) => setNh(list[0] || null)).
    catch(() => setNh(null)).
    finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (nh) {
      base44.entities.Property.filter({ neighbourhood: nh.name }).
      then(setProperties).
      catch(() => setProperties([]));
    }
  }, [nh]);

  if (loading) {
    return <div className="pt-40 pb-40 text-center text-muted-foreground">Loading…</div>;
  }
  if (!nh) {
    return (
      <div className="pt-40 pb-40 text-center">
        <h1 className="font-heading text-3xl">Neighbourhood not found</h1>
        <Link to="/neighbourhoods" className="btn-ghost mt-6">Back to neighbourhoods</Link>
      </div>);

  }

  return (
    <>
      <section className="pt-36 md:pt-44 pb-10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Link to="/neighbourhoods" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> All neighbourhoods
          </Link>
          <Reveal><span className="eyebrow">Neighbourhood Guide</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 leading-[0.98]">{nh.name}</h1>
          </Reveal>
          {nh.tagline && <Reveal delay={0.1}><p className="mt-4 text-lg text-primary">{nh.tagline}</p></Reveal>}
        </div>
      </section>

      {nh.photo &&
      <section className="pb-16">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="aspect-[16/9] overflow-hidden bg-sand">
              <Image src={nh.photo} alt={nh.name} fittingType="fill" className="w-full h-full" />
            </div>
          </div>
        </section>
      }

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-10">
            {nh.description &&
            <Reveal>
                <h2 className="font-heading text-3xl mb-4">Overview</h2>
                <p className="text-foreground/80 leading-relaxed">{nh.description}</p>
              </Reveal>
            }
            {nh.lifestyle &&
            <Reveal>
                <h2 className="font-heading text-3xl mb-4">Lifestyle</h2>
                <p className="text-foreground/80 leading-relaxed">{nh.lifestyle}</p>
              </Reveal>
            }
          </div>
          <aside className="lg:col-span-5 space-y-8">
            {nh.highlights && nh.highlights.length > 0 &&
            <Reveal>
                <h3 className="font-heading text-xl mb-3">Local highlights</h3>
                <ul className="space-y-2 text-foreground/80">
                  {nh.highlights.map((h) =>
                <li key={h} className="flex gap-2"><span className="text-primary">—</span>{h}</li>
                )}
                </ul>
              </Reveal>
            }
            {nh.property_types &&
            <Reveal>
                <h3 className="font-heading text-xl mb-2">Property types</h3>
                <p className="text-muted-foreground">{nh.property_types}</p>
              </Reveal>
            }
            {nh.market_info &&
            <Reveal>
                <h3 className="font-heading text-xl mb-2">Market information</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{nh.market_info}</p>
              </Reveal>
            }
          </aside>
        </div>
      </section>

      {nh.gallery && nh.gallery.length > 0 &&
      <section className="py-12 md:py-16 bg-sand">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nh.gallery.map((g) =>
          <div key={g} className="aspect-[4/3] overflow-hidden bg-background">
                <Image src={g} alt={`${nh.name}`} fittingType="fill" className="w-full h-full" />
              </div>
          )}
          </div>
        </section>
      }

      {properties.length > 0 &&
      <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <h2 className="font-heading text-3xl md:text-4xl mb-10">Featured in {nh.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      }

      <CtaBand
        title={`Thinking about ${nh.name}?`}
        message="[An invitation to discuss this neighbourhood or a property here. Replace with your own wording.]"
        primaryLabel="Get in Touch"
        primaryTo="/contact"
        secondaryLabel="All Neighbourhoods"
        secondaryTo="/neighbourhoods" />
      
    </>);

}