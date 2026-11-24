# Partner Onboarding Form Setup (Google Sheets + Documents + Email)

The 7-step Partner Onboarding Wizard posts `multipart/form-data` (and backwards-compatible JSON) to `POST /api/lead` handled by [`functions/api/lead.ts`](../functions/api/lead.ts).

Every submission captures:
- **Reference ID** (`PV-XXXXXX`) & preferred **Callback Language (`Kontaktsprache`)** (`Deutsch`, `Türkisch`, `Kurdisch`, `Hindi`, `Englisch`, `Afghanisch`)
- **Model & Legal Structure** (`Amazon Paketshop` / `Amazon Locker` / `Beides`; `Einzelunternehmen` / `Gesellschaft`)
- **Personal & Company Data** (contact name, mobile, optional email, company name, industry, optional VAT ID, optional IBAN, street, postcode, city, federal state, store phone)
- **Documents** (uploaded files or deferred `"Später nachreichen"`)
- **Storefront & Opening Hours** (display name, website, parcel capacity, existing carriers, full weekly schedule summary, open days, weekly hours)
- **Attribution** (`landingPage`, `referrer`, `utmSource`, `utmMedium`, `utmCampaign`)

---

## Option A — Google Sheets + Instant Email + Optional Google Drive (Fastest)

1. Create a Google Sheet (e.g. `PAYVITY Parcels Leads`).
2. *(Optional, for storing uploaded partner documents in Google Drive)*: Create a folder in Google Drive (e.g. `PAYVITY Onboarding Docs`) and copy its folder ID from the URL.
3. In your Google Sheet, open **Extensions → Apps Script**, paste [`docs/google-sheets-apps-script.js`](./google-sheets-apps-script.js).
4. Set `SHARED_SECRET`, `NOTIFY_EMAIL` (e.g. `partner@payvityparcels.de`), and optionally `DRIVE_FOLDER_ID`.
5. Click **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. In **Cloudflare Pages → Settings → Environment variables**, set:
   - `GOOGLE_SHEETS_WEBHOOK_URL` = Apps Script Web App URL
   - `GOOGLE_SHEETS_SECRET` = matching `SHARED_SECRET`
   - `UPLOAD_DOCS_TO_DRIVE` = `true` (only if you set `DRIVE_FOLDER_ID`)

---

## Option B — Cloudflare R2 Storage for Uploaded Documents (Recommended for High Volume)

1. Create a private Cloudflare R2 bucket (e.g. `payvity-onboarding-docs`).
2. In **Cloudflare Pages → Settings → Functions → R2 bucket bindings**, bind variable name **`ONBOARDING_DOCS`** to your R2 bucket.
3. Uploaded files are stored under `applications/<referenceId>/<docId>_<filename>` and the exact object keys are recorded in your Google Sheet & notification email.

---

## Option C — Branded Transactional Emails via Resend (Optional Add-on)

Add these Cloudflare Pages environment variables alongside Option A/B:
- `RESEND_API_KEY` = your Resend API key
- `LEAD_TO_EMAIL` = `partner@payvityparcels.de`
- `LEAD_FROM_EMAIL` = `PAYVITY Parcels <noreply@payvityparcels.de>`

---

## Optional: Cloudflare Turnstile Bot Protection

Honeypot filtering is active by default. To require Cloudflare Turnstile verification as well, add `TURNSTILE_SECRET_KEY` in Cloudflare Pages environment variables and pass `turnstileToken` in the wizard payload.
