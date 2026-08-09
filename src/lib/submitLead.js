import { base44 } from "@/api/base44Client";
import { getUtmParams } from "@/lib/utm";

// Shared lead submission: merges stored marketing attribution into the payload
// and invokes the backend function that stores the lead + sends notification.
export async function submitLead(payload) {
  const utm = getUtmParams();
  const res = await base44.functions.invoke("submitLead", { ...payload, ...utm });
  return res.data;
}