import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets, waitUntil } from 'base44:runtime';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // Honeypot: real visitors never fill the hidden "website" field. Silently accept bots.
    if (body.website && String(body.website).trim() !== '') {
      return Response.json({ ok: true });
    }

    if (!body.name || !body.email) {
      return Response.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const lead = await base44.asServiceRole.entities.Lead.create({
      name: String(body.name).slice(0, 120),
      email: String(body.email).slice(0, 200),
      phone: body.phone ? String(body.phone).slice(0, 40) : '',
      lead_type: body.lead_type || 'Contact',
      form_type: body.form_type || 'contact',
      message: body.message || '',
      preferred_locations: body.preferred_locations || '',
      budget: body.budget || '',
      property_type: body.property_type || '',
      bedrooms: body.bedrooms || '',
      bathrooms: body.bathrooms || '',
      timeframe: body.timeframe || '',
      property_address: body.property_address || '',
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || '',
      utm_content: body.utm_content || '',
      utm_term: body.utm_term || '',
      referrer: body.referrer || '',
      landing_page: body.landing_page || '',
      status: 'New'
    });

    const notifyEmail = secrets.get('LEAD_NOTIFICATION_EMAIL');
    if (notifyEmail) {
      const lines = [
        'A new inquiry was submitted on your website.',
        '',
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        body.phone ? `Phone: ${body.phone}` : '',
        `Interest: ${body.lead_type || 'Contact'}`,
        body.property_address ? `Property address: ${body.property_address}` : '',
        body.preferred_locations ? `Preferred locations: ${body.preferred_locations}` : '',
        body.budget ? `Budget: ${body.budget}` : '',
        body.property_type ? `Property type: ${body.property_type}` : '',
        body.bedrooms ? `Bedrooms: ${body.bedrooms}` : '',
        body.bathrooms ? `Bathrooms: ${body.bathrooms}` : '',
        body.timeframe ? `Timeframe: ${body.timeframe}` : '',
        body.message ? `\nMessage:\n${body.message}` : '',
        '',
        '— Marketing attribution —',
        `Source: ${body.utm_source || 'direct'}`,
        body.utm_medium ? `Medium: ${body.utm_medium}` : '',
        body.utm_campaign ? `Campaign: ${body.utm_campaign}` : '',
        body.utm_content ? `Content: ${body.utm_content}` : '',
        body.utm_term ? `Term: ${body.utm_term}` : '',
        body.referrer ? `Referrer: ${body.referrer}` : '',
        body.landing_page ? `Landing page: ${body.landing_page}` : ''
      ].filter(Boolean).join('\n');

      waitUntil(
        base44.asServiceRole.integrations.Core.SendEmail({
          to: notifyEmail,
          subject: `New lead — ${body.name} (${body.lead_type || 'Contact'})`,
          body: lines
        }).catch(() => {})
      );
    }

    const notifySms = secrets.get('LEAD_NOTIFICATION_SMS');
    if (notifySms) {
      const smsBody = [
        `New lead — ${body.name}`,
        body.phone ? `Ph: ${body.phone}` : `Email: ${body.email}`,
        `Interest: ${body.lead_type || 'Contact'}`,
        body.message ? `Msg: ${String(body.message).slice(0, 120)}` : ''
      ].filter(Boolean).join(' | ');

      waitUntil(
        base44.asServiceRole.integrations.Core.SendEmail({
          to: notifySms,
          subject: `Lead: ${body.name}`,
          body: smsBody
        }).catch(() => {})
      );
    }

    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}