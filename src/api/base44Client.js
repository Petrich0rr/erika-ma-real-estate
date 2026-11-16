// Static-hosting stub for the Base44 client.
//
// WHY THIS EXISTS — the blank page on Cloudflare Pages:
// The exported app used to talk to the Base44 backend through same-origin
// /api/... calls (serverUrl was '' in the original client, so the SDK used
// relative /api URLs). On Base44 hosting a proxy forwards /api to the
// backend. Cloudflare Pages has no such proxy: its SPA fallback answers
// every unknown path — including /api/... — with HTTP 200 and index.html.
// So the SDK "succeeded" with an HTML string instead of an array, and
// FeaturedProperties called .map() on that string during render, which
// threw an uncaught TypeError and unmounted the whole React app
// (blank white page, `TypeError: e.map is not a function` in the console).
//
// This stub keeps the exact same `base44` shape (entities / functions /
// auth) so no other file needs to change, but it makes NO network calls:
// entity reads resolve to empty arrays, writes resolve without storing,
// and auth always reports "not signed in". Public pages therefore render
// from their built-in static content (hero video, testimonials, and the
// Featured Listings / neighbourhood placeholders).
//
// What this deliberately does NOT do: fake a lead submission. See
// src/lib/submitLead.js — the forms show an error telling the visitor to
// email or call Erika instead of pretending the inquiry was received.
//
// TO RESTORE LIVE DATA: host the site on Base44 again (or put a backend
// behind /api/...) and restore the original client that called
// createClient() from '@base44/sdk'.

const notConnected = () =>
  Promise.reject(
    new Error("This site is hosted statically without the Base44 backend, so this action is unavailable.")
  );

// One handler shared by every entity (Neighbourhood, Property, Resource,
// Lead, ...). Reads return empty results; writes resolve without storing.
const entityHandler = {
  list: () => Promise.resolve([]),
  filter: () => Promise.resolve([]),
  get: () => Promise.resolve(null),
  count: () => Promise.resolve(0),
  create: () => Promise.resolve(null),
  update: () => Promise.resolve(null),
  delete: () => Promise.resolve(null),
  deleteMany: () => Promise.resolve(null),
  bulkCreate: () => Promise.resolve(null),
  bulkUpdate: () => Promise.resolve(null),
  updateMany: () => Promise.resolve(null),
  upsert: () => Promise.resolve(null),
  aggregate: () => Promise.resolve([]),
  importEntities: () => Promise.resolve(null),
  subscribe: () => () => {},
};

export const base44 = {
  // Mirrors the SDK's dynamic entity Proxy: base44.entities.X returns the
  // same handler for any entity name, so existing call sites keep working.
  entities: new Proxy(
    {},
    {
      get: (_target, name) =>
        typeof name === "string" && name !== "then" && !name.startsWith("_")
          ? entityHandler
          : undefined,
    }
  ),
  functions: {
    invoke: () => notConnected(),
    fetch: () => notConnected(),
  },
  auth: {
    me: () => notConnected(),
    loginViaEmailPassword: () => notConnected(),
    loginWithProvider: () => notConnected(),
    register: () => notConnected(),
    verifyOtp: () => notConnected(),
    resendOtp: () => notConnected(),
    resetPasswordRequest: () => notConnected(),
    resetPassword: () => notConnected(),
    setToken: () => {},
    logout: () => {},
    redirectToLogin: () => {},
    isAuthenticated: () => false,
  },
};
