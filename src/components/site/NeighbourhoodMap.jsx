import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapController({ points }) {
  const map = useMap();
  useEffect(() => {
    const fit = () => {
      map.invalidateSize();
      if (points.length > 0) {
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      }
    };
    const t1 = setTimeout(fit, 200);
    const t2 = setTimeout(fit, 800);
    window.addEventListener("load", fit);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", fit);
    };
  }, [map, points]);
  return null;
}

function makeIcon(featured) {
  return L.divIcon({
    className: "",
    html: `<span class="nh-pin ${featured ? "is-featured" : ""}"></span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function NeighbourhoodMap({ neighbourhoods = [], onSelect }) {
  const [ready, setReady] = useState(false);
  const points = neighbourhoods.filter((n) => n.lat && n.lng);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <div className="h-[520px] w-full bg-sand animate-pulse" />;

  return (
    <MapContainer
      center={[43.6532, -79.3832]}
      zoom={11}
      scrollWheelZoom={false}
      className="h-[520px] w-full"
      aria-label="Map of Toronto and GTA neighbourhoods"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      <MapController points={points} />
      {points.map((n) => (
        <Marker
          key={n.id}
          position={[n.lat, n.lng]}
          icon={makeIcon(n.featured)}
          eventHandlers={{ click: () => onSelect && onSelect(n) }}
        >
          <Popup>
            <div style={{ fontFamily: "Open Sans, sans-serif" }}>
              <strong style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem" }}>{n.name}</strong>
              {n.tagline && <div style={{ color: "#757575", fontSize: "0.8rem", marginTop: "2px" }}>{n.tagline}</div>}
              <div style={{ color: "#0201a7", fontSize: "0.8rem", marginTop: "6px", textDecoration: "underline" }}>View guide →</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}