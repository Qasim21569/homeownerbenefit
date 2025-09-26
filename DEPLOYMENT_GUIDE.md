# Roofing Funnel Deployment Guide

## ✅ What's Complete
- **7-step form with validation** (zip, project type, roof material, address, email, name+phone, consent)
- **Google Sheets API integration** via Vercel serverless function
- **Exact visual styling** matching original landing page
- **React Router** for navigation (Landing → Form → Thank You)
- **Error handling** and spam protection

## 📋 Next Steps for Deployment

### 1. Google Sheets Setup
1. Create a new Google Sheet with headers:
   ```
   A: timestamp | B: zip | C: project_type | D: roof_material | E: street | F: email | G: firstName | H: lastName | I: phone | J: tcpa | K: source | L: ip
   ```
2. Note the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
3. Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project → Enable "Google Sheets API"
   - Create Service Account → Generate JSON key
   - Share the Sheet with service account email (Editor permissions)

### 2. Environment Variables Setup
Create these in Vercel dashboard (Project → Settings → Environment Variables):

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY_B64=<base64-encoded-private-key>
GOOGLE_SHEETS_ID=<your-sheet-id>
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

**To Base64 encode private key:**
```powershell
# Windows PowerShell
(Get-Content .\key.json | ConvertFrom-Json).private_key | Set-Content -NoNewline -Path private_key.txt
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((Get-Content private_key.txt)))
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd my-funnel
vercel --prod
```

### 4. Domain & Analytics Setup
- Add custom domain in Vercel dashboard
- Set up Google Analytics/Facebook Pixel for ad tracking
- Configure CNAME records with your domain provider

## 🧪 Testing Checklist
- [ ] Landing page loads and displays correctly
- [ ] Form validation works on each step
- [ ] Form submission creates row in Google Sheets
- [ ] Thank you page displays after submission
- [ ] Error handling works (invalid email, missing fields)
- [ ] CORS works from your domain

## 🔧 Form Customization
To modify form steps, edit `src/form/schema.ts`:
- Add/remove steps
- Change field labels and validation
- Modify options for radio buttons

## 🚀 Ad Campaign Setup
Your funnel is ready for:
- **Facebook/Meta Ads** → Landing page
- **Google Ads** → Landing page  
- **Native advertising** → Landing page

**Conversion tracking:** Form submission = lead conversion

## 📊 Lead Data Structure
Each submission creates a row with:
- Timestamp, ZIP code, project type, roof material
- Street address, email, full name, phone
- Consent status, traffic source, IP address

## 🛡️ Security Features
- CORS protection via ALLOWED_ORIGINS
- Honeypot spam protection
- Server-side validation
- Rate limiting ready (add Redis if needed)

---

**Your funnel flow:** Landing Page → 7-Step Form → Thank You Page → Google Sheets
