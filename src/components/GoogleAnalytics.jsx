import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// The gtag.js bootstrap in index.html loads once and already reports the
// landing page view. This component reports a page_view for every later
// client-side route change so internal navigation is counted exactly once.
export default function GoogleAnalytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}