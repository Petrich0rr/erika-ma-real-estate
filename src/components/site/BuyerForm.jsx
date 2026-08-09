import { useState } from "react";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import FormSuccess from "@/components/site/FormSuccess";
import Selectable from "@/components/site/Selectable";

const BUDGETS = ["Under $500K", "$500K–$750K", "$750K–$1M", "$1M–$1.5M", "$1.5M–$2M", "$2M–$3M", "$3M+"];
const TYPES = ["Condo", "Detached", "Semi-Detached", "Townhouse", "Loft"];
const BEDS = ["Studio", "1", "2", "3", "4", "5+"];
const TIMEFRAMES = ["Immediately (0–3 mo)", "3–6 months", "6–12 months", "Just exploring"];

export default function BuyerForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", preferred_locations: "", budget: "", property_type: "", bedrooms: "", timeframe: "", notes: "", consent: false, website: "",
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
        form_type: "buyer", lead_type: "Buyer Inquiry",
        name: form.name, email: form.email, phone: form.phone,
        preferred_locations: form.preferred_locations, budget: form.budget,
        property_type: form.property_type, bedrooms: form.bedrooms, timeframe: form.timeframe,
        message: form.notes, website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again or email me directly.");
    }
  };

  if (status === "success") {
    return <FormSuccess title="Thank you." message="I'll personally review your search criteria and reach out shortly to start your home search." />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <input type="text" name="website" value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className="ghost-label" htmlFor="bf-name">Name</label>
          <input id="bf-name" className="ghost-input" value={form.name} onChange={update("name")} required autoComplete="name" />
        </div>
        <div>
          <label className="ghost-label" htmlFor="bf-email">Email</label>
          <input id="bf-email" type="email" className="ghost-input" value={form.email} onChange={update("email")} required autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className="ghost-label" htmlFor="bf-phone">Phone</label>
          <input id="bf-phone" type="tel" className="ghost-input" value={form.phone} onChange={update("phone")} autoComplete="tel" />
        </div>
        <div>
          <label className="ghost-label" htmlFor="bf-loc">Preferred location(s)</label>
          <input id="bf-loc" className="ghost-input" value={form.preferred_locations} onChange={update("preferred_locations")} placeholder="e.g. King West, Leslieville, Mississauga" />
        </div>
      </div>
      <div>
        <label className="ghost-label" htmlFor="bf-budget">Approximate budget</label>
        <select id="bf-budget" className="ghost-input appearance-none cursor-pointer" value={form.budget} onChange={update("budget")}>
          <option value="">Select a range</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <Selectable label="Property type" options={TYPES} value={form.property_type} onChange={pick("property_type")} />
      <Selectable label="Bedrooms" options={BEDS} value={form.bedrooms} onChange={pick("bedrooms")} />
      <Selectable label="Buying timeframe" options={TIMEFRAMES} value={form.timeframe} onChange={pick("timeframe")} />
      <div>
        <label className="ghost-label" htmlFor="bf-notes">Additional notes (optional)</label>
        <textarea id="bf-notes" rows={3} className="ghost-input resize-none" value={form.notes} onChange={update("notes")} />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
        <input type="checkbox" checked={form.consent} onChange={update("consent")} className="mt-1 accent-[#0300A6] w-4 h-4" />
        <span>I agree to be contacted about my home search and have reviewed the <a href="/privacy" className="text-primary underline">Privacy Policy</a>.</span>
      </label>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : "Start My Home Search"}
      </button>
    </form>
  );
}