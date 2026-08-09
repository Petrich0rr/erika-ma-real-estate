import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { submitLead } from "@/lib/submitLead";

export default function GuideRequestForm({ guideName }) {
  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setStatus("submitting"); setError("");
    try {
      await submitLead({
        form_type: "contact",
        lead_type: "Buyer Guide",
        name: form.name,
        email: form.email,
        message: `Requested guide: ${guideName}`,
        website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-primary text-sm pt-1">
        <Check size={16} /> Thank you — I&rsquo;ll be in touch shortly with your guide.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <input type="text" name="website" value={form.website} onChange={update("website")} tabIndex={-1} aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <input className="ghost-input" placeholder="Your name" value={form.name} onChange={update("name")} />
      <input className="ghost-input" type="email" placeholder="Email address" value={form.email} onChange={update("email")} />
      {error && <p className="text-destructive text-xs">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
        {status === "submitting" ? (<><Loader2 size={14} className="animate-spin" /> Sending…</>) : "Get the Guide"}
      </button>
    </form>
  );
}