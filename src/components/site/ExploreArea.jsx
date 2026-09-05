import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, Loader2, MapPin, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";

const CATEGORIES = [
  { key: "schools", label: "Schools" },
  { key: "transit", label: "Transit" },
  { key: "parks", label: "Parks" },
  { key: "grocery", label: "Grocery" },
  { key: "restaurants", label: "Restaurants & Cafés" },
  { key: "shopping", label: "Shopping" },
  { key: "fitness", label: "Fitness" },
  { key: "healthcare", label: "Healthcare" },
];

const RADII = [
  { value: 500, label: "500 m" },
  { value: 1000, label: "1 km" },
  { value: 2000, label: "2 km" },
  { value: 5000, label: "5 km" },
];

const addressIcon = L.divIcon({
  className: "",
  html: '<span class="explore-pin"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});
const amenityIcon = L.divIcon({
  className: "",
  html: '<span class="explore-amenity"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    const fit = () => {
      map.invalidateSize();
      if (points.length) {
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
      }
    };
    const t1 = setTimeout(fit, 200);
    const t2 = setTimeout(fit, 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [map, points]);
  return null;
}

export default function ExploreArea() {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(1000);
  const [selected, setSelected] = useState(CATEGORIES.map((c) => c.key));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [usedRadius, setUsedRadius] = useState(1000);

  const toggle = (key) =>
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!address.trim() || loading) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await base44.functions.invoke("exploreArea", {
        address: address.trim(),
        radius,
        categories: selected,
      });
      if (res.data && res.data.error) {
        setError(res.data.error);
      } else {
        setData(res.data);
        setUsedRadius(radius);
      }
    } catch (err) {
      setError("Something went wrong looking up that address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const radiusLabel = RADII.find((r) => r.value === usedRadius)?.label;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="mb-10">
          <span className="eyebrow">Neighbourhood Tools</span>
          <h2 className="font-heading text-4xl md:text-5xl mt-4">Explore the area</h2>
          <p className="mt-5 text-lg text-foreground/80 max-w-xl leading-relaxed">See what's around your next address.</p>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter a Toronto or GTA address — e.g. 100 Queen St W, Toronto"
                className="w-full pl-11 pr-4 py-4 bg-sand border border-primary/20 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="px-4 py-4 bg-sand border border-primary/20 text-foreground focus:border-primary focus:outline-none"
              aria-label="Search radius"
            >
              {RADII.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <button type="submit" disabled={loading || !address.trim()} className="btn-primary">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Searching</> : <><Search size={16} /> Search</>}
            </button>
          </form>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((c) => {
              const active = selected.includes(c.key);
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => toggle(c.key)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "border-primary/25 text-foreground/70 hover:border-primary"}`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {error && <p className="mt-8 text-destructive text-sm">{error}</p>}

        {data && (
          <div className="mt-10 grid lg:grid-cols-2 gap-8">
            <div className="h-[420px] w-full border border-primary/15 overflow-hidden order-2 lg:order-1">
              <MapContainer
                key={data.location.lat + "," + data.location.lng}
                center={[data.location.lat, data.location.lng]}
                zoom={14}
                scrollWheelZoom={false}
                className="h-full w-full"
                aria-label="Map of nearby amenities"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; OpenStreetMap &copy; CARTO'
                  subdomains="abcd"
                  maxZoom={19}
                />
                <FitBounds points={[data.location, ...data.places.slice(0, 60)]} />
                <Marker position={[data.location.lat, data.location.lng]} icon={addressIcon}>
                  <Popup><strong>{data.location.display_name}</strong></Popup>
                </Marker>
                {data.places.map((p) => (
                  <Marker key={p.id} position={[p.lat, p.lng]} icon={amenityIcon}>
                    <Popup>
                      <strong>{p.name}</strong><br />
                      {p.category} · {p.distance} m
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm text-muted-foreground mb-4">
                {data.places.length} {data.places.length === 1 ? "place" : "places"} within {radiusLabel} of {data.location.display_name}
              </p>
              <div className="max-h-[420px] overflow-y-auto border border-primary/15 bg-sand">
                {data.places.length === 0 ? (
                  <p className="p-6 text-muted-foreground text-sm">No amenities found in this radius. Try a larger radius or different categories.</p>
                ) : (
                  data.places.map((p) => (
                    <a
                      key={p.id}
                      href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start justify-between gap-4 px-6 py-4 border-b border-primary/15 hover:bg-background transition-colors"
                    >
                      <div>
                        <h3 className="font-heading text-lg">{p.name}</h3>
                        <p className="text-xs uppercase tracking-[0.18em] text-primary mt-1">{p.category}</p>
                        <p className="text-sm text-muted-foreground mt-1">{p.address}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm text-foreground/80">{p.distance} m</span>
                        <ExternalLink size={14} className="text-primary mt-2 ml-auto block" />
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}