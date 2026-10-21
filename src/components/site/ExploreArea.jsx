import { useState } from "react";
import { Search, Loader2, MapPin, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";
import ExploreMap from "@/components/site/ExploreMap";
import { EXPLORE_CATEGORIES, RADII } from "@/lib/exploreCategories";

function formatDistance(m) {
  if (m == null) return "";
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}

function mapsUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
}

function chipClass(active) {
  return `px-4 py-2 text-sm border transition-colors duration-200 ${
    active
      ? "bg-primary text-primary-foreground border-primary"
      : "border-primary/25 text-foreground/80 hover:border-primary"
  }`;
}

export default function ExploreArea() {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(1000);
  const [selected, setSelected] = useState(EXPLORE_CATEGORIES.map((c) => c.key));
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const toggleCategory = (key) =>
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  const runSearch = async (e) => {
    e.preventDefault();
    if (!address.trim() || status === "loading") return;
    if (selected.length === 0) {
      setStatus("error");
      setError("Choose at least one category to search.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await base44.functions.invoke("exploreArea", {
        address: address.trim(),
        radius,
        categories: selected,
      });
      const payload = res?.data || {};
      if (payload.error || !payload.location) {
        setData(null);
        setStatus("error");
        setError(payload.error || "We couldn’t find that address. Please try again.");
        return;
      }
      setData({ location: payload.location, results: payload.results || [] });
      setStatus("success");
    } catch (err) {
      setData(null);
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  const groups = data
    ? EXPLORE_CATEGORIES.filter((c) => selected.includes(c.key))
        .map((c) => ({ ...c, items: data.results.filter((r) => r.category === c.key) }))
        .filter((g) => g.items.length > 0)
    : [];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <span className="eyebrow">Neighbourhood Tools</span>
          <h2 className="font-heading text-4xl md:text-5xl mt-4">Explore the area</h2>
          <p className="mt-5 text-lg text-foreground/80 max-w-xl leading-relaxed">
            See what’s around your next address.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-9">
          <form onSubmit={runSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter a Toronto or GTA address"
                aria-label="Address"
                className="w-full border border-primary/25 bg-transparent pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || !address.trim()}
              className="btn-primary shrink-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Searching…
                </>
              ) : (
                <>
                  <Search size={15} /> Search
                </>
              )}
            </button>
          </form>

          <div className="mt-7">
            <span className="ghost-label">Categories</span>
            <div className="flex flex-wrap gap-2">
              {EXPLORE_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => toggleCategory(c.key)}
                  className={chipClass(selected.includes(c.key))}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <span className="ghost-label">Search radius</span>
            <div className="flex flex-wrap gap-2">
              {RADII.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRadius(r.value)}
                  className={chipClass(radius === r.value)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-destructive text-sm mt-5">{error}</p>}
        </Reveal>

        {status === "success" && data && (
          <div className="mt-12">
            <p className="text-sm text-muted-foreground">
              Places near{" "}
              <span className="text-foreground">
                {data.location.label.split(",").slice(0, 4).join(",").trim()}
              </span>
            </p>
            <div className="mt-4 border border-primary/15">
              <ExploreMap location={data.location} results={data.results} />
            </div>

            {groups.length === 0 ? (
              <p className="mt-10 text-muted-foreground">
                No places found nearby. Try a larger radius or more categories.
              </p>
            ) : (
              <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-12">
                {groups.map((g) => (
                  <div key={g.key}>
                    <div className="flex items-center gap-2.5 border-t border-primary/25 pt-5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.color }} />
                      <h3 className="font-heading text-xl">{g.label}</h3>
                      <span className="text-muted-foreground text-sm ml-auto">{g.items.length}</span>
                    </div>
                    <ul className="mt-2 divide-y divide-primary/10">
                      {g.items.map((r, i) => (
                        <li key={`${r.name}-${i}`}>
                          <a
                            href={mapsUrl(r)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-4 py-3"
                          >
                            <span className="min-w-0">
                              <span className="block text-foreground group-hover:text-primary transition-colors">
                                {r.name}
                              </span>
                              {r.address && (
                                <span className="block text-muted-foreground text-sm mt-0.5">{r.address}</span>
                              )}
                            </span>
                            <span className="text-sm text-primary whitespace-nowrap inline-flex items-center gap-1 shrink-0">
                              {formatDistance(r.distance)} <ArrowUpRight size={13} />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-10 text-xs text-muted-foreground">
              Nearby places from OpenStreetMap contributors.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}