// Marketing attribution: capture UTM + first-touch referrer/landing on the
// visitor's first arrival, persist across the session, and expose it to every
// lead form so submissions carry their original campaign source.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STORAGE_KEY = "ma_attribution";

export function captureUtm() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });

    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const attribution = {
        ...utm,
        referrer: document.referrer || "direct",
        landing_page: window.location.pathname + window.location.search,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } else if (Object.keys(utm).length) {
      // New campaign params present on this visit — refresh them.
      const attribution = { ...JSON.parse(existing), ...utm };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    }
  } catch {
    /* sessionStorage unavailable — attribution silently skipped */
  }
}

export function getUtmParams() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}