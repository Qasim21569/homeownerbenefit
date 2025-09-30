import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// Simple origin allowlist
function cors(res: VercelResponse, req: VercelRequest) {
  // Allow your specific domains
  const allowed = [
    'https://homeownerbenefitguide.com',
    'https://homeownerbenefit-qasim21569-qasim-kharodias-projects.vercel.app',
    'http://localhost:5173', // for development
    'https://localhost:5173', // for development
    ...(process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
  ];
  
  const origin = (req.headers.origin as string) || '';
  if (allowed.includes(origin) || origin.includes('localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function bad(res: VercelResponse, code: number, msg: string) {
  return res.status(code).json({ ok: false, error: msg });
}

// Optional honeypot field check
function isSpam(body: any) {
  if (typeof body.honeypot === 'string' && body.honeypot.trim().length > 0) return true;
  return false;
}

async function verifyRecaptcha(token?: string, remoteIp?: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // skip if not configured
  if (!token) return false;

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);
  if (remoteIp) params.set('remoteip', remoteIp);

  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  const data = await resp.json();
  return !!data.success;
}

function decodePrivateKey(): string {
  const b64 = process.env.GOOGLE_PRIVATE_KEY_B64;
  if (!b64) throw new Error('GOOGLE_PRIVATE_KEY_B64 missing');
  return Buffer.from(b64, 'base64').toString('utf8');
}

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: decodePrivateKey(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Minimal field validation
function validate(body: any) {
  const errors: string[] = [];
  const zip = String(body.zip || '').trim();
  const project_type = String(body.project_type || '').trim();
  const roof_material = String(body.roof_material || '').trim();
  const street = String(body.street || '').trim();
  const email = String(body.email || '').trim();
  const firstName = String(body.firstName || '').trim();
  const lastName = String(body.lastName || '').trim();
  const phone = String(body.phone || '').trim();
  const tcpa = Boolean(body.tcpa);

  if (!zip || !/^\d{5}$/.test(zip)) errors.push('valid 5-digit zip code required');
  if (!project_type) errors.push('project type required');
  if (!roof_material) errors.push('roof material required');
  if (!street) errors.push('street address required');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('valid email required');
  if (!firstName) errors.push('first name required');
  if (!lastName) errors.push('last name required');
  if (!phone || !/^\d{10}$/.test(phone)) errors.push('valid 10-digit phone number required');
  if (!tcpa) errors.push('consent agreement required');

  return { 
    valid: errors.length === 0, 
    errors, 
    data: { zip, project_type, roof_material, street, email, firstName, lastName, phone, tcpa }
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res, req);
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') return bad(res, 405, 'Method Not Allowed');

  try {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    if (isSpam(body)) return bad(res, 400, 'Spam detected');

    // Optional recaptcha verification
    const recaptchaOk = await verifyRecaptcha(body.recaptchaToken, typeof ip === 'string' ? ip : undefined);
    if (!recaptchaOk && process.env.RECAPTCHA_SECRET) {
      return bad(res, 400, 'reCAPTCHA verification failed');
    }

    const { valid, errors, data } = validate(body);
    if (!valid) return bad(res, 400, errors.join(', '));

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error('GOOGLE_SHEETS_ID missing');

    // Append row to the "Roofing Leads Funnel" tab
    // Column structure: A: timestamp, B: firstName, C: lastName, D: email, E: phone, F: zip, 
    // G: street, H: project_type, I: roof_material, J: tcpa_consent, K: source, L: ip_address
    const fullName = `${data.firstName} ${data.lastName}`;
    const values = [[
      new Date().toISOString(), // A: timestamp
      data.firstName, // B: firstName
      data.lastName, // C: lastName
      data.email, // D: email
      data.phone, // E: phone
      data.zip, // F: zip
      data.street, // G: street
      data.project_type, // H: project_type
      data.roof_material, // I: roof_material
      data.tcpa ? 'Yes' : 'No', // J: tcpa_consent
      body.source || req.headers.origin || req.headers.referer || '', // K: source
      typeof ip === 'string' ? ip : '', // L: ip_address
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Roofing Leads Funnel!A:L', // Using the correct tab name
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('submit-lead error', err?.message || err);
    return bad(res, 500, 'Internal error');
  }
}
