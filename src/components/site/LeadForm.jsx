import { useState } from "react";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import FormSuccess from "@/components/site/FormSuccess";

const INTERESTS = ["Buying", "Selling", "Buying & Selling", "Investing", "General Question"];

export default function LeadForm({ defaultInterest = "General Question" }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", interest: defaultInterest, message: "", consent: false, website: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Please provide your name and email."); return; }
    if (!form.consent) { setError("Please agree to be contacted."); return; }
    setStatus("submitting"); setError("");
    try {
      await submitLead({
        form_type: "contact", lead_type: form.interest,
        name: form.name, email: form.email, phone: form.phone, message: form.message,
        website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again or email me directly.");
    }
  };

  if (status === "success") return <FormSuccess />;

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <input
        type="text" name="website" value={form.website} onChange={update("website")}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className="ghost-label" htmlFor="lf-name">Name</label>
          <input id="lf-name" className="ghost-input" value={form.name} onChange={update("name")} required autoComplete="name" />
        </div>
        <div>
          <label className="ghost-label" htmlFor="lf-email">Email</label>
          <input id="lf-email" type="email" className="ghost-input" value={form.email} onChange={update("email")} required autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className="ghost-label" htmlFor="lf-phone">Phone</label>
          <input id="lf-phone" type="tel" className="ghost-input" value={form.phone} onChange={update("phone")} autoComplete="tel" />
        </div>
        <div>
          <label className="ghost-label" htmlFor="lf-interest">I&rsquo;m interested in</label>
          <select id="lf-interest" className="ghost-input appearance-none cursor-pointer" value={form.interest} onChange={update("interest")}>
            {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="ghost-label" htmlFor="lf-message">Message</label>
        <textarea id="lf-message" rows={4} className="ghost-input resize-none" value={form.message} onChange={update("message")} />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
        <input type="checkbox" checked={form.consent} onChange={update("consent")} className="mt-1 accent-[#0300A6] w-4 h-4" />
        <span>I agree to be contacted regarding my inquiry and have reviewed the <a href="/privacy" className="text-primary underline">Privacy Policy</a>.</span>
      </label>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : "Submit Inquiry"}
      </button>
    </form>
  );
}