// Shared metadata for the "Explore the area" tool. Keys must match the
// category keys accepted by the exploreArea backend function.
export const EXPLORE_CATEGORIES = [
  { key: "schools", label: "Schools", color: "#2F5D8C" },
  { key: "transit", label: "Transit", color: "#0F766E" },
  { key: "parks", label: "Parks", color: "#3F7D3B" },
  { key: "grocery", label: "Grocery", color: "#B45309" },
  { key: "restaurants", label: "Restaurants & Cafés", color: "#B03A2E" },
  { key: "shopping", label: "Shopping", color: "#7E3F8F" },
  { key: "fitness", label: "Fitness", color: "#0E7490" },
  { key: "healthcare", label: "Healthcare", color: "#BE123C" },
];

export const RADII = [
  { value: 500, label: "500 m" },
  { value: 1000, label: "1 km" },
  { value: 2000, label: "2 km" },
  { value: 5000, label: "5 km" },
];

export const CATEGORY_LABEL = Object.fromEntries(EXPLORE_CATEGORIES.map((c) => [c.key, c.label]));
export const CATEGORY_COLOR = Object.fromEntries(EXPLORE_CATEGORIES.map((c) => [c.key, c.color]));