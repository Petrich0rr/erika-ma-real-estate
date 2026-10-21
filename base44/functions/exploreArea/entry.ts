// "Explore the area" — real, live location data (no API key required).
// Geocoding: OpenStreetMap Nominatim. Nearby amenities: OSM Overpass API.
// Both are free, public services — nothing for the app owner to connect.
// Data © OpenStreetMap contributors.

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];
const UA = "ErikaMa-ExploreArea/1.0 (real estate neighbourhood tool)";

// Category key -> Overpass filters. Keys are the only values the client may send.
const CATEGORY_FILTERS = {
  schools: ['nwr["amenity"="school"]', 'nwr["amenity"="college"]', 'nwr["amenity"="university"]'],
  transit: [
    'nwr["public_transport"="station"]',
    'nwr["railway"="station"]',
    'nwr["railway"="subway_entrance"]',
    'nwr["railway"="tram_stop"]',
    'nwr["highway"="bus_stop"]',
  ],
  parks: ['nwr["leisure"="park"]'],
  grocery: ['nwr["shop"="supermarket"]', 'nwr["shop"="grocery"]'],
  restaurants: ['nwr["amenity"="restaurant"]', 'nwr["amenity"="cafe"]'],
  shopping: ['nwr["shop"="mall"]', 'nwr["shop"="department_store"]', 'nwr["shop"="clothes"]'],
  fitness: ['nwr["leisure"="fitness_centre"]', 'nwr["leisure"="sports_centre"]'],
  healthcare: [
    'nwr["amenity"="hospital"]',
    'nwr["amenity"="clinic"]',
    'nwr["amenity"="doctors"]',
    'nwr["amenity"="pharmacy"]',
  ],
};

function categoryOf(tags) {
  if (!tags) return null;
  const a = tags.amenity, l = tags.leisure, s = tags.shop, r = tags.railway, pt = tags.public_transport, hw = tags.highway;
  if (a === "school" || a === "college" || a === "university") return "schools";
  if (pt === "station" || r === "station" || r === "subway_entrance" || r === "tram_stop" || hw === "bus_stop") return "transit";
  if (l === "park") return "parks";
  if (s === "supermarket" || s === "grocery") return "grocery";
  if (a === "restaurant" || a === "cafe") return "restaurants";
  if (s === "mall" || s === "department_store" || s === "clothes") return "shopping";
  if (l === "fitness_centre" || l === "sports_centre") return "fitness";
  if (a === "hospital" || a === "clinic" || a === "doctors" || a === "pharmacy") return "healthcare";
  return null;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function addressOf(tags) {
  const parts = [];
  const hn = tags["addr:housenumber"], st = tags["addr:street"];
  if (hn && st) parts.push(`${hn} ${st}`);
  else if (st) parts.push(st);
  if (tags["addr:city"]) parts.push(tags["addr:city"]);
  return parts.join(", ");
}

function genericName(cat, tags) {
  const a = tags.amenity, r = tags.railway, pt = tags.public_transport, hw = tags.highway;
  if (hw === "bus_stop") return "Bus stop";
  if (r === "subway_entrance") return "Subway entrance";
  if (r === "station" || r === "tram_stop" || pt === "station") return "Transit stop";
  if (cat === "parks") return "Park";
  if (cat === "healthcare") return a === "pharmacy" ? "Pharmacy" : a === "hospital" ? "Hospital" : "Health clinic";
  if (cat === "schools") return "School";
  if (cat === "fitness") return "Fitness centre";
  if (cat === "grocery") return "Grocery store";
  if (cat === "restaurants") return a === "cafe" ? "Café" : "Restaurant";
  if (cat === "shopping") return "Shop";
  return "Place";
}

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const address = String(body.address || "").trim().slice(0, 200);
    const radius = Math.min(Math.max(parseInt(body.radius, 10) || 1000, 500), 5000);
    let categories = Array.isArray(body.categories) ? body.categories.filter((c) => CATEGORY_FILTERS[c]) : [];
    if (categories.length === 0) categories = Object.keys(CATEGORY_FILTERS);

    if (!address) return Response.json({ error: "Please enter an address." });

    // 1) Geocode the address (restricted to Canada for Toronto / GTA intent).
    const geoUrl = `${NOMINATIM}?q=${encodeURIComponent(address)}&format=jsonv2&limit=1&countrycodes=ca&accept-language=en`;
    let geo;
    try {
      const geoRes = await fetch(geoUrl, {
        headers: { "User-Agent": UA, Accept: "application/json" },
        signal: AbortSignal.timeout(12000),
      });
      geo = geoRes.ok ? await geoRes.json() : null;
    } catch (_e) {
      geo = null;
    }
    if (!Array.isArray(geo) || geo.length === 0) {
      return Response.json({
        error: "We couldn’t find that address. Try adding the city — for example “123 Main St, Toronto”.",
      });
    }
    const lat = parseFloat(geo[0].lat);
    const lng = parseFloat(geo[0].lon);
    const label = geo[0].display_name || address;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return Response.json({ error: "We couldn’t locate that address. Please try again." });
    }

    // 2) Query Overpass for nearby amenities within the radius.
    const filters = categories.flatMap((c) => CATEGORY_FILTERS[c]);
    const query = `[out:json][timeout:25];(\n${filters
      .map((f) => `${f}(around:${radius},${lat},${lng});`)
      .join("\n")}\n);\nout center 500;`;

    let elements = null;
    for (const endpoint of OVERPASS_ENDPOINTS) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": UA },
          body: "data=" + encodeURIComponent(query),
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) continue;
        const json = await res.json();
        if (json && Array.isArray(json.elements)) {
          elements = json.elements;
          break;
        }
      } catch (_e) {
        // try the next endpoint
      }
    }
    if (!elements) {
      return Response.json({ error: "Nearby-place lookup is temporarily unavailable. Please try again in a moment." });
    }

    // 3) Normalise, categorise, measure distance, keep the closest per category.
    const all = [];
    for (const el of elements) {
      const tags = el.tags || {};
      const cat = categoryOf(tags);
      if (!cat || !categories.includes(cat)) continue;
      const elLat = el.lat ?? (el.center && el.center.lat);
      const elLng = el.lon ?? (el.center && el.center.lon);
      if (typeof elLat !== "number" || typeof elLng !== "number") continue;
      const distance = haversine(lat, lng, elLat, elLng);
      if (distance > radius) continue;
      all.push({
        name: tags.name || genericName(cat, tags),
        category: cat,
        lat: elLat,
        lng: elLng,
        distance: Math.round(distance),
        address: addressOf(tags),
      });
    }
    all.sort((a, b) => a.distance - b.distance);

    const perCat = {};
    const results = [];
    for (const r of all) {
      perCat[r.category] = (perCat[r.category] || 0) + 1;
      if (perCat[r.category] <= 10) results.push(r);
    }

    return Response.json({
      location: { lat, lng, label },
      radius,
      results,
      total: all.length,
    });
  } catch (error) {
    return Response.json({ error: error?.message || "Something went wrong. Please try again." }, { status: 500 });
  }
}