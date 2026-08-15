import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";
import NeighbourhoodMap from "@/components/site/NeighbourhoodMap";
import NeighbourhoodCard from "@/components/site/NeighbourhoodCard";
import { Image } from "@/components/ui/image";

export default function Neighbourhoods() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.Neighbourhood.list().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <>
      <section className="pt-36 md:pt-44 pb-10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal><span className="eyebrow">Neighbourhoods</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 max-w-3xl leading-[0.98]">Explore Toronto &amp; the GTA</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">Every neighbourhood has something different to offer. Explore Toronto and the GTA to find an area that fits your lifestyle, needs, and next move.

            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="border border-primary/15 overflow-hidden">
                <NeighbourhoodMap neighbourhoods={items} onSelect={setSelected} />
              </div>
            </div>
            <div className="lg:col-span-4">
              <h2 className="font-heading text-2xl mb-4">Areas</h2>
              <ul className="border-y border-primary/15">
                {items.length === 0 &&
                <li className="py-4 text-muted-foreground text-sm">Neighbourhood guides coming soon. Add areas from your dashboard to populate the map.</li>
                }
                {items.map((n) =>
                <li key={n.id} className="border-b border-primary/10 last:border-0">
                    <button onClick={() => setSelected(n)} className="w-full text-left py-4 flex items-center justify-between group">
                      <span className="font-heading text-lg group-hover:text-primary transition-colors">{n.name}</span>
                      <ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {items.length > 0 &&
      <section className="py-20 md:py-28 bg-sand">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <Reveal className="mb-12">
              <h2 className="font-heading text-4xl md:text-5xl">Featured guides</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((n) =>
            <Reveal key={n.id}><NeighbourhoodCard neighbourhood={n} /></Reveal>
            )}
            </div>
          </div>
        </section>
      }

      <AnimatePresence>
        {selected &&
        <>
            <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/40 z-[60]" />
          
            <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background overflow-y-auto">
            
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="eyebrow">Neighbourhood</span>
                  <button onClick={() => setSelected(null)} aria-label="Close" className="text-foreground hover:text-primary"><X size={22} /></button>
                </div>
                {selected.photo &&
              <div className="aspect-[4/3] overflow-hidden bg-sand mb-5">
                    <Image src={selected.photo} alt={selected.name} fittingType="fill" className="w-full h-full" />
                  </div>
              }
                <h2 className="font-heading text-3xl">{selected.name}</h2>
                {selected.tagline && <p className="text-primary text-sm uppercase tracking-[0.18em] mt-2">{selected.tagline}</p>}
                {selected.description && <p className="mt-4 text-foreground/80 leading-relaxed">{selected.description}</p>}
                {selected.highlights && selected.highlights.length > 0 &&
              <>
                    <h3 className="font-heading text-lg mt-6 mb-2">Local highlights</h3>
                    <ul className="space-y-1.5 text-foreground/75 text-sm">
                      {selected.highlights.map((h) => <li key={h}>— {h}</li>)}
                    </ul>
                  </>
              }
                <Link to={`/neighbourhoods/${selected.slug}`} className="btn-primary mt-8 w-full">View Full Guide</Link>
              </div>
            </motion.aside>
          </>
        }
      </AnimatePresence>
    </>);

}