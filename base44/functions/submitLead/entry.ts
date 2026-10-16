import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets, waitUntil } from 'base44:runtime';

// --- Server-side abuse protection (no login required, no form changes) ---
// Obvious spam terms (checked case-insensitively against the message body).
const SPAM_KEYWORDS = [
  'casino', 'viagra', 'cialis', 'cryptocurrency giveaway', 'bitcoin giveaway',
  'free crypto', 'seo backlinks', 'adult content', 'escort service', 'porn'
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_URLS = 3;
const MAX_MSG_LEN = 5000;
const IP_WINDOW_MIN = 10;     // per-IP window
const IP_WINDOW_LIMIT = 3;    // max submissions per IP in the window
const EMAIL_WINDOW_MIN = 5;   // per-email cooldown
const EMAIL_WINDOW_LIMIT = 1; // max submissions per email in the window

function getClientIp(req) {
  const fwd = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  if (fwd) return fwd;
  return req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip') || 'unknown';
}

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

    const name = String(body.name).slice(0, 120).trim();
    const email = String(body.email).slice(0, 200).trim();
    const message = String(body.message || '');

    // Email format validation
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    // Content spam heuristics
    if (name.length < 1) {
      return Response.json({ error: 'Please provide your name.' }, { status: 400 });
    }
    const lowerMsg = message.toLowerCase();
    const urlCount = (message.match(/https?:\/\//gi) || []).length;
    if (urlCount > MAX_URLS) {
      return Response.json({ error: 'Your message contains too many links.' }, { status: 400 });
    }
    if (message.length > MAX_MSG_LEN) {
      return Response.json({ error: 'Your message is too long.' }, { status: 400 });
    }
    if (SPAM_KEYWORDS.some((k) => lowerMsg.includes(k))) {
      return Response.json({ error: 'Your message was flagged as spam.' }, { status: 400 });
    }

    // Rate limiting by IP and by email (queries recent saved leads)
    const ip = getClientIp(req);
    const ipSince = new Date(Date.now() - IP_WINDOW_MIN * 60 * 1000).toISOString();
    const emailSince = new Date(Date.now() - EMAIL_WINDOW_MIN * 60 * 1000).toISOString();

    const [recentIp, recentEmail] = await Promise.all([
      base44.asServiceRole.entities.Lead.filter({ ip, created_date: { $gte: ipSince } }),
      base44.asServiceRole.entities.Lead.filter({ email, created_date: { $gte: emailSince } })
    ]);
    const recentIpCount = Array.isArray(recentIp) ? recentIp.length : 0;
    const recentEmailCount = Array.isArray(recentEmail) ? recentEmail.length : 0;

    if (recentIpCount >= IP_WINDOW_LIMIT) {
      return Response.json({ error: 'Too many submissions from your location. Please try again later.' }, { status: 429 });
    }
    if (recentEmailCount >= EMAIL_WINDOW_LIMIT) {
      return Response.json({ error: 'A submission was already received from this email recently. Please wait a few minutes.' }, { status: 429 });
    }

    const lead = await base44.asServiceRole.entities.Lead.create({
      name,
      email,
      phone: body.phone ? String(body.phone).slice(0, 40) : '',
      lead_type: body.lead_type || 'Contact',
      form_type: body.form_type || 'contact',
      message,
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
      ip,
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

    // Always notify the agent directly with the full lead details.
    const detailLines = [
      'A new real estate lead was just submitted on your website.',
      '',
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      body.phone ? `Phone: ${body.phone}` : '',
      `Service interested in: ${body.lead_type || 'Contact'}`,
      body.property_address ? `Property address: ${body.property_address}` : '',
      body.preferred_locations ? `Preferred locations: ${body.preferred_locations}` : '',
      body.budget ? `Budget: ${body.budget}` : '',
      body.property_type ? `Property type: ${body.property_type}` : '',
      body.bedrooms ? `Bedrooms: ${body.bedrooms}` : '',
      body.bathrooms ? `Bathrooms: ${body.bathrooms}` : '',
      body.timeframe ? `Timeline: ${body.timeframe}` : '',
      body.message ? `\nMessage:\n${body.message}` : ''
    ].filter(Boolean).join('\n');

    waitUntil(
      base44.asServiceRole.integrations.Core.SendEmail({
        to: 'realerikama@gmail.com',
        subject: `🏡 New Real Estate Lead — ${body.name}`,
        body: detailLines
      }).catch(() => {})
    );

    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}