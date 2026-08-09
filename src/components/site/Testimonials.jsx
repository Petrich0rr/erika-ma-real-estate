import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    base44.entities.Testimonial.list()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const hasReal = items && items.length > 0;

  return (
    <section className="py-20 md:py-32 bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="mb-14">
          <span className="eyebrow">Client Stories</span>
          <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">In their words</h2>
        </Reveal>

        {hasReal ? (
          <div className="grid gap-10 md:grid-cols-3">
            {items.map((t) => (
              <Reveal key={t.id}>
                <blockquote className="border-l border-primary/40 pl-6">
                  <Quote className="text-primary/40" size={28} />
                  <p className="font-heading text-xl md:text-2xl italic leading-relaxed mt-4 text-foreground/85">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-5 text-sm text-muted-foreground">
                    {t.client_name}{t.location ? ` · ${t.location}` : ""}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i}>
                <blockquote className="border-l border-primary/40 pl-6">
                  <Quote className="text-primary/40" size={28} />
                  <p className="font-heading text-xl md:text-2xl italic leading-relaxed mt-4 text-foreground/80">
                    &ldquo;Your client&rsquo;s testimonial will appear here. Add a real review from your dashboard to showcase the experience of working with you.&rdquo;
                  </p>
                  <footer className="mt-5 text-sm text-muted-foreground">[Client Name] · [Neighbourhood]</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}