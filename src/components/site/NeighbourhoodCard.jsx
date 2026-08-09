import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function NeighbourhoodCard({ neighbourhood }) {
  return (
    <Link to={`/neighbourhoods/${neighbourhood.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/3] bg-sand">
        {neighbourhood.photo ? (
          <Image
            src={neighbourhood.photo}
            alt={neighbourhood.name}
            fittingType="fill"
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">{neighbourhood.name}</div>
        )}
      </div>
      <div className="pt-4 flex items-baseline justify-between">
        <h3 className="font-heading text-xl">{neighbourhood.name}</h3>
        <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      {neighbourhood.tagline && <p className="text-muted-foreground text-sm mt-1">{neighbourhood.tagline}</p>}
    </Link>
  );
}