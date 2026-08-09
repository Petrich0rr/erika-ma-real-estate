import { useState } from "react";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import FormSuccess from "@/components/site/FormSuccess";
import Selectable from "@/components/site/Selectable";

const TYPES = ["Detached", "Semi-Detached", "Townhouse", "Condo", "Loft"];
const BEDS = ["1", "2", "3", "4", "5+"];
const BATHS = ["1", "2", "3", "4+"];
const TIMEFRAMES = ["Immediately (0–3 mo)", "3–6 months", "6–12 months", "Just exploring"];

export default function SellerForm() {
  const [form, setForm] = useState({
    property_address: "", name: "", email: "", phone: "", property_type: "", bedrooms: "", bathrooms: "", timeframe: "", message: "", consent: false, website: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const pick = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Please provide your name and email."); return; }
    if (!form.consent) { setError("Please agree to be contacted."); return; }
    setStatus("submitting"); setError("");
    try {
      await submitLead({
        form_type: "seller", lead_type: "Seller Inquiry",
        name: form.name, email: form.email, phone: form.phone,
        property_address: form.property_address, property_type: form.property_type,
        bedrooms: form.bedrooms, bathrooms: form.bathrooms, timeframe: form.timeframe,
        message: form.message, website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again or email me directly.");
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Thank you for your request."
        message="I'll personally review your property information and follow up shortly to arrange a complimentary property evaluation."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <input type="text" name="website" value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <div>
        <label className="ghost-label" htmlFor="sf-address">Property address</label>
        <input id="sf-address" className="ghost-input" value={form.property_address} onChange={update("property_address")} placeholder="Street address, city" />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className="ghost-label" htmlFor="sf-name">Name</label>
          <input id="sf-name" className="ghost-input" value={form.name} onChange={update("name")} required autoComplete="name" />
        </div>
        <div>
          <label className="ghost-label" htmlFor="sf-email">Email</label>
          <input id="sf-email" type="email" className="ghost-input" value={form.email} onChange={update("email")} required autoComplete="email" />
        </div>
      </div>
      <div>
        <label className="ghost-label" htmlFor="sf-phone">Phone</label>
        <input id="sf-phone" type="tel" className="ghost-input" value={form.phone} onChange={update("phone")} autoComplete="tel" />
      </div>
      <Selectable label="Property type" options={TYPES} value={form.property_type} onChange={pick("property_type")} />
      <div className="grid gap-8 sm:grid-cols-2">
        <Selectable label="Approximate bedrooms" options={BEDS} value={form.bedrooms} onChange={pick("bedrooms")} />
        <Selectable label="Approximate bathrooms" options={BATHS} value={form.bathrooms} onChange={pick("bathrooms")} />
      </div>
      <Selectable label="Selling timeframe" options={TIMEFRAMES} value={form.timeframe} onChange={pick("timeframe")} />
      <div>
        <label className="ghost-label" htmlFor="sf-message">Message (optional)</label>
        <textarea id="sf-message" rows={3} className="ghost-input resize-none" value={form.message} onChange={update("message")} />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
        <input type="checkbox" checked={form.consent} onChange={update("consent")} className="mt-1 accent-[#0300A6] w-4 h-4" />
        <span>I agree to be contacted about my property evaluation and have reviewed the <a href="/privacy" className="text-primary underline">Privacy Policy</a>.</span>
      </label>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : "Request My Evaluation"}
      </button>
    </form>
  );
}