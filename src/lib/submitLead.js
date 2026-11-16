import { siteConfig } from "@/lib/siteConfig";

// Shared lead submission via Formspree (static hosting, no Base44 backend).
// Formspree endpoint for Erika: https://formspree.io/f/mwloldya
// Leads are emailed to the Formspree account owner and listed in the
// Formspree dashboard. Free plan: 50 submissions/month.
// All forms on the site (LeadForm, BuyerForm, SellerForm, GuideRequestForm)
// call this one function, so they all store leads the same way.
const FORMSPREE_URL = "https://formspree.io/f/mwloldya";

export async function submitLead(payload = {}) {
  // Honeypot field: the forms include a hidden "website" input that real
  // visitors leave blank. If it is filled, it is a bot, so do not send.
  if (payload.website) {
    return;
  }

  const { website, ...fields } = payload;

  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      _subject: fields.lead_type
        ? `New website lead: ${fields.lead_type}`
        : "New website lead",
      _replyto: fields.email,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Sorry, that did not send. Please email ${siteConfig.email} or call ${siteConfig.phone} and I'll get back to you.`
    );
  }
}
