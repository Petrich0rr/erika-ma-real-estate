import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CATEGORY_COLOR, CATEGORY_LABEL } from "@/lib/exploreCategories";

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const fit = () => {
      map.invalidateSize();
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 15 });
    };
    const t1 = setTimeout(fit, 150);
    const t2 = setTimeout(fit, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [map, points]);
  return null;
}

function pinIcon(color, isHome) {
  const size = isHome ? 18 : 14;
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid #f9f0e8;box-shadow:0 0 0 4px ${color}33,0 2px 6px rgba(0,0,0,.35);"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function ExploreMap({ location, results = [] }) {
  if (!location) return null;
  const home = [location.lat, location.lng];
  const allPoints = [{ lat: location.lat, lng: location.lng }, ...results];

  return (
    <MapContainer
      center={home}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[420px] w-full md:h-[480px]"
      aria-label="Map of nearby amenities"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      <FitBounds points={allPoints} />
      <Marker position={home} icon={pinIcon("#001768", true)}>
        <Popup>
          <strong style={{ fontFamily: "Playfair Display, serif" }}>Your address</strong>
          <div style={{ color: "#757575", fontSize: "0.8rem", marginTop: "2px" }}>{location.label}</div>
        </Popup>
      </Marker>
      {results.map((r, i) => (
        <Marker key={`${r.name}-${i}`} position={[r.lat, r.lng]} icon={pinIcon(CATEGORY_COLOR[r.category] || "#001768", false)}>
          <Popup>
            <strong style={{ fontFamily: "Playfair Display, serif" }}>{r.name}</strong>
            <div style={{ color: "#757575", fontSize: "0.8rem", marginTop: "2px" }}>{CATEGORY_LABEL[r.category]}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}