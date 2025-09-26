import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// Simple origin allowlist
function cors(res: VercelResponse, req: VercelRequest) {
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = (req.headers.origin as string) || '';
  if (allowed.includes(origin)) {
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

    const { valid, errors, data } = validate(body);
    if (!valid) return bad(res, 400, errors.join(', '));

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error('GOOGLE_SHEETS_ID missing');

    // Append row
    const values = [[
      new Date().toISOString(),
      data.zip,
      data.project_type,
      data.roof_material,
      data.street,
      data.email,
      data.firstName,
      data.lastName,
      data.phone,
      data.tcpa ? 'Yes' : 'No',
      req.headers.origin || '',
      typeof ip === 'string' ? ip : '',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:L', // timestamp, zip, project_type, roof_material, street, email, firstName, lastName, phone, tcpa, source, ip
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('submit-lead error', err?.message || err);
    return bad(res, 500, 'Internal error');
  }
}
