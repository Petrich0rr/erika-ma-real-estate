// Erika's listings, shown on the home page (Featured Properties, first 3)
// and on the full /listings page (all of them).
// Prices are monthly rent. Status is "For Lease" for the current exclusive
// listing and "Leased" for completed deals. Only include beds/baths where
// they are known for certain, PropertyCard omits them otherwise.
export const listings = [
  {
    id: "david-salomon-1311",
    title: "15 David Salomon Dr, Unit 1311",
    address: "15 David Salomon Dr, Toronto",
    price: 2850,
    price_suffix: "/mo",
    status: "For Lease",
    bedrooms: 2,
    bathrooms: 2,
    property_type: "Condo",
    photo: "/listings/david-salomon.jpg",
  },
  {
    id: "dundas-2508",
    title: "181 Dundas St E, Unit 2508",
    address: "181 Dundas St E, Toronto",
    price: 2150,
    price_suffix: "/mo",
    status: "Leased",
    property_type: "Condo",
    photo: "/listings/dundas.jpg",
  },
  {
    id: "military-302",
    title: "1635 Military Trail, Unit 302",
    address: "1635 Military Trail, Toronto",
    price: 2950,
    price_suffix: "/mo",
    status: "Leased",
    property_type: "Condo",
    photo: "/listings/military.jpg",
  },
  {
    id: "culford-355",
    title: "355 Culford Rd",
    address: "355 Culford Rd, Toronto",
    price: 4000,
    price_suffix: "/mo",
    status: "Leased",
    property_type: "House",
    photo: "/listings/culford.jpg",
  },
];
