import { siteConfig } from "@/lib/siteConfig";

// Shared lead submission.
//
// NOTE — static hosting, no backend: this site is hosted on Cloudflare
// Pages with no Base44 backend, so there is nowhere to store a lead and
// no notification to send. Do NOT show a fake "thank you, I'll be in
// touch" success here: a visitor would believe Erika received their
// inquiry when she did not. Instead this throws, and every form that
// calls submitLead (LeadForm, BuyerForm, SellerForm, GuideRequestForm)
// already catches the error and shows this message to the visitor, so
// they can reach Erika directly by email or phone.
//
// To restore lead storage, host the site on Base44 again (or connect a
// real form backend) and restore the original submitLead that called
// base44.functions.invoke("submitLead", ...).
export async function submitLead(_payload) {
  throw new Error(
    `Online submission is not connected on this site yet. Please email ${siteConfig.email} or call ${siteConfig.phone} and I'll get back to you.`
  );
}
