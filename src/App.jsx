import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider } from "@/lib/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/site/Layout";

// Public pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Listings from "@/pages/Listings";
import Neighbourhoods from "@/pages/Neighbourhoods";
import NeighbourhoodDetail from "@/pages/NeighbourhoodDetail";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import Games from "@/pages/Games";
import LostUnderground from "@/pages/LostUnderground";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

// Admin
import LeadsDashboard from "@/pages/admin/LeadsDashboard";

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <GoogleAnalytics />
          <Routes>
            {/* Public site — no login required */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              {/* /buy and /sell now show the Services page too */}
              <Route path="/buy" element={<Services />} />
              <Route path="/sell" element={<Services />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/neighbourhoods" element={<Neighbourhoods />} />
              <Route path="/neighbourhoods/:slug" element={<NeighbourhoodDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/games" element={<Games />} />
              <Route path="/lost-underground" element={<LostUnderground />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Route>

            {/* Private admin area */}
            <Route element={<ProtectedRoute unauthenticatedElement={<PageNotFound />} />}>
              <Route path="/admin/leads" element={<LeadsDashboard />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;