import { Link } from "react-router-dom";
import { Bed, Bath, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";

const formatPrice = (p) => (p ? `$${Number(p).toLocaleString("en-CA")}` : "Price on request");

export default function PropertyCard({ property }) {
  return (
    <>
      <div className="relative overflow-hidden aspect-[4/3] bg-sand">
        {property.photo ? (
          <Image
            src={property.photo}
            alt={property.address || property.title}
            fittingType="fill"
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Photo</div>
        )}
        {property.status && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em]">
            {property.status}
          </span>
        )}
      </div>
      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-xl">{property.title || property.address}</h3>
          <span className="font-heading text-lg text-primary whitespace-nowrap">{formatPrice(property.price)}</span>
        </div>
        {property.address && (
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
            <MapPin size={13} /> {property.address}
          </p>
        )}
        <div className="flex items-center gap-5 mt-4 text-sm text-foreground/70">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1.5"><Bed size={15} /> {property.bedrooms} Beds</span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1.5"><Bath size={15} /> {property.bathrooms} Baths</span>
          )}
          {property.property_type && <span>{property.property_type}</span>}
        </div>
        <Link to="/contact" className="btn-ghost mt-5">View Property</Link>
      </div>
    </>
  );
}