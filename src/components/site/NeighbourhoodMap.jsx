import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const fix = () => map.invalidateSize();
    const t1 = setTimeout(fix, 200);
    const t2 = setTimeout(fix, 800);
    const t3 = setTimeout(fix, 1600);
    window.addEventListener("load", fix);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", fix);
    };
  }, [map]);
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
  const points = neighbourhoods.filter((n) => n.lat && n.lng);
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
      <MapResizer />
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
              <div style={{ color: "#0300A6", fontSize: "0.8rem", marginTop: "6px", textDecoration: "underline" }}>View guide →</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}