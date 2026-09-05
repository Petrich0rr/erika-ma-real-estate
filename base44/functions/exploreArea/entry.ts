// Explore the Area — real location data.
// Address lookup:  Nominatim (OpenStreetMap) — free, no key.
// Nearby amenities: Google Places API (Nearby Search) — requires a
// GOOGLE_PLACES_API_KEY secret (enable "Places API" in Google Cloud Console).
// Nothing is invented or placeholder — all places are live Google Places data.

import { secrets } from "base44:runtime";

const CATEGORY_TYPES: Record<string, string> = {
  schools: "school",
  transit: "transit_station",
  parks: "park",
  grocery: "supermarket",
  restaurants: "restaurant",
  shopping: "shopping_mall",
  fitness: "gym",
  healthcare: "hospital",
};

const CATEGORY_LABELS: Record<string, string> = {
  schools: "Schools",
  transit: "Transit",
  parks: "Parks",
  grocery: "Grocery",
  restaurants: "Restaurants & Cafés",
  shopping: "Shopping",
  fitness: "Fitness",
  healthcare: "Healthcare",
};

const VALID_RADII = [500, 1000, 2000, 5000];
const UA = "MetropolitanArchive/1.0 (real-estate resources)";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default async function (req: Request): Promise<Response> {
  try {
    const apiKey = secrets.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      return Response.json(
        { error: "Nearby places lookup is not configured yet. The site owner needs to add a Google Places API key." },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const address = String(body.address || "").trim();
    const radius = VALID_RADII.includes(Number(body.radius)) ? Number(body.radius) : 1000;
    const requested: string[] = Array.isArray(body.categories) ? body.categories : [];
    const categories = requested.filter((c) => CATEGORY_TYPES[c]);
    const cats = categories.length ? categories : Object.keys(CATEGORY_TYPES);

    if (!address) return Response.json({ error: "Please enter an address." }, { status: 400 });
    if (address.length > 200) return Response.json({ error: "Address is too long." }, { status: 400 });

    // 1. Geocode the address (biased to Ontario, Canada for Toronto/GTA results).
    const q = encodeURIComponent(address + ", Ontario, Canada");
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${q}`,
      { headers: { "User-Agent": UA } }
    );
    if (!geoRes.ok) {
      return Response.json({ error: "Could not look up that address right now. Please try again." }, { status: 502 });
    }
    const geo = await geoRes.json();
    if (!Array.isArray(geo) || !geo.length) {
      return Response.json({ error: "Address not found. Try a more specific Toronto or GTA address." });
    }
    const loc = geo[0];
    const lat = parseFloat(loc.lat);
    const lng = parseFloat(loc.lon);
    if (!isFinite(lat) || !isFinite(lng)) {
      return Response.json({ error: "Could not pinpoint that address." });
    }

    // 2. Fetch real nearby amenities from Google Places (one request per category).
    const seen = new Set<string>();
    const places: any[] = [];
    let denied = false;
    for (const cat of cats) {
      const type = CATEGORY_TYPES[cat];
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
      try {
        const ctrl = new AbortController();
        const to = setTimeout(() => ctrl.abort(), 12000);
        const res = await fetch(url, { signal: ctrl.signal });
        clearTimeout(to);
        if (!res.ok) continue;
        const data: any = await res.json();
        if (data.status === "REQUEST_DENIED" || data.status === "INVALID_REQUEST") {
          denied = true;
          break;
        }
        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") continue;
        for (const p of data.results || []) {
          if (seen.has(p.place_id)) continue;
          seen.add(p.place_id);
          const plat = p.geometry?.location?.lat;
          const plng = p.geometry?.location?.lng;
          if (plat == null || plng == null) continue;
          places.push({
            id: p.place_id,
            name: p.name,
            category: CATEGORY_LABELS[cat],
            distance: haversine(lat, lng, plat, plng),
            address: p.vicinity || "Address not listed",
            lat: plat,
            lng: plng,
          });
        }
      } catch {
        // ignore individual category failures and continue with the rest
      }
    }

    if (denied) {
      return Response.json(
        { error: "Google Places request was denied. Check that the API key is valid and the Places API is enabled." },
        { status: 502 }
      );
    }

    places.sort((a, b) => a.distance - b.distance);
    return Response.json({
      location: { lat, lng, display_name: loc.display_name },
      radius,
      places: places.slice(0, 80),
      count: places.length,
    });
  } catch (error: any) {
    return Response.json({ error: error?.message || "Something went wrong." }, { status: 500 });
  }
}